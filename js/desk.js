/**
 * desk.js — Desk Mode logic.
 *
 * Responsibilities:
 *  - Build a filtered, sized session from the question bank
 *  - Render question cards with open-answer input
 *  - Validate answers (via validate.js)
 *  - Count-up timer (pauses on submission)
 *  - Session summary (score, time, topic breakdown, pitfalls triggered)
 *  - Review Mistakes flow (in-memory session state only)
 *  - Bookmark toggle
 */

import { checkAnswer } from './validate.js';
import { getSettings, recordResult, isBookmarked, toggleBookmark, getBookmarks } from './state.js';

// ── Module state ──────────────────────────────────────────────

let _allQuestions   = [];
let _sessionQuestions = []; // questions for this session
let _currentIndex   = 0;
let _sessionResults = []; // { questionId, correct, pitfall? }
let _sessionActive  = false;

// Timer
let _timerInterval  = null;
let _timerSeconds   = 0;
let _timerPaused    = false;

// ── Public API ────────────────────────────────────────────────

export function init(questions) {
  _allQuestions = questions.filter(q => q.mode === 'desk');

  // Apply default set size from settings
  const settings = getSettings();
  const setsizeEl = document.getElementById('desk-setsize-filter');
  if (setsizeEl) setsizeEl.value = String(settings.deskSetSize);

  _sessionActive = false;
  _stopTimer();
  _bindFilterControls();
  _renderStartPrompt();
}

// ── Filter controls ───────────────────────────────────────────

function _bindFilterControls() {
  document.getElementById('desk-start-btn')?.addEventListener('click', () => _startSession());
}

function _buildFilteredSet() {
  const topic    = document.getElementById('desk-topic-filter')?.value ?? '';
  const diff     = document.getElementById('desk-difficulty-filter')?.value ?? '';
  const bookmark = document.getElementById('desk-bookmark-filter')?.value ?? '';
  const sizeRaw  = document.getElementById('desk-setsize-filter')?.value ?? '10';

  const bookmarks = getBookmarks();

  let pool = _allQuestions.filter(q => {
    if (topic    && q.topic      !== topic)           return false;
    if (diff     && q.difficulty !== Number(diff))    return false;
    if (bookmark === 'bookmarked' && !bookmarks.includes(q.id)) return false;
    return true;
  });

  _shuffle(pool);

  if (sizeRaw !== 'all') {
    const n = parseInt(sizeRaw, 10);
    pool = pool.slice(0, n);
  }

  return pool;
}

// ── Session lifecycle ─────────────────────────────────────────

function _startSession(questionsOverride) {
  _sessionQuestions = Array.isArray(questionsOverride) ? questionsOverride : _buildFilteredSet();
  _currentIndex   = 0;
  _sessionResults = [];
  _sessionActive  = true;
  _timerSeconds   = 0;
  _timerPaused    = false;

  if (_sessionQuestions.length === 0) {
    _renderStartPrompt('No questions match your filters. Try changing topic or difficulty.');
    return;
  }

  _startTimer();
  _renderQuestion();
}

function _endSession() {
  _stopTimer();
  _sessionActive = false;
  _renderSummary();
}

// ── Rendering: start prompt ───────────────────────────────────

function _renderStartPrompt(msg) {
  const area = document.getElementById('desk-question-area');
  area.innerHTML = `
    <div class="desk-start-prompt">
      <p>${msg ?? 'Choose your filters above and press Start to begin a session.'}</p>
    </div>`;
}

// ── Rendering: question card ──────────────────────────────────

function _renderQuestion() {
  const q     = _sessionQuestions[_currentIndex];
  const total = _sessionQuestions.length;
  const bookmarked = isBookmarked(q.id);

  const area = document.getElementById('desk-question-area');
  area.innerHTML = `
    <div class="session-meta">
      <span class="progress-label">Q${_currentIndex + 1} of ${total}</span>
      <div class="desk-timer-wrap">
        <span class="desk-timer-count" id="desk-timer-count">${_formatTime(_timerSeconds)}</span>
        <span class="desk-timer-target">Target: ${_formatTime(q.time_target_seconds)}</span>
      </div>
    </div>

    <div class="question-card question-card--desk" id="desk-card" role="article" aria-label="Question ${_currentIndex + 1} of ${total}">
      <div class="card-meta">
        <span class="topic-tag">${_topicLabel(q.topic)}</span>
        ${_difficultyDots(q.difficulty)}
        <span class="question-counter">${q.stage}</span>
      </div>

      <div class="card-controls">
        <button class="bookmark-btn ${bookmarked ? 'bookmarked' : ''}" id="desk-bookmark-btn" data-id="${q.id}" title="${bookmarked ? 'Remove bookmark' : 'Bookmark'}" aria-label="${bookmarked ? 'Remove bookmark' : 'Bookmark this question'}" aria-pressed="${bookmarked}">
          <svg viewBox="0 0 24 24" fill="${bookmarked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        </button>
      </div>

      <p class="question-text">${_escHtml(q.question)}</p>

      <div class="answer-input-row">
        ${q.unit ? `<span class="unit-hint">Answer in ${_escHtml(q.unit)}</span>` : ''}
        <input
          type="text"
          class="answer-input"
          id="desk-answer-input"
          placeholder="Type your final answer"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
          aria-label="Your answer"
        >
      </div>

      <button class="btn btn--primary-desk btn--full" id="desk-check-btn">Check Answer</button>

      <div id="desk-result-section"></div>
    </div>`;

  _bindCardEvents(q);

  // Focus the input
  document.getElementById('desk-answer-input')?.focus();
}

function _showResult(q, correct) {
  _timerPaused = true; // stop counting review time

  const input = document.getElementById('desk-answer-input');
  if (input) {
    input.disabled = true;
    input.classList.add(correct ? 'correct' : 'incorrect');
  }

  const checkBtn = document.getElementById('desk-check-btn');
  if (checkBtn) checkBtn.style.display = 'none';

  const section = document.getElementById('desk-result-section');
  if (!section) return;

  const isLast = _currentIndex >= _sessionQuestions.length - 1;

  section.innerHTML = `
    <div class="desk-result-msg ${correct ? 'correct' : 'incorrect'}" role="alert">
      ${correct
        ? '✓ Correct!'
        : `✗ Not quite — the answer is <strong>${_escHtml(q.answer)}${q.unit ? ' ' + _escHtml(q.unit) : ''}</strong>`
      }
    </div>
    <div class="explanation-box">${_escHtml(q.explanation)}</div>
    ${q.pitfall ? `
      <div class="pitfall-box" role="note">
        <span class="pitfall-box__icon" aria-hidden="true">⚠</span>
        <div class="pitfall-box__text">
          <span class="pitfall-box__label">Common mistake</span>
          ${_escHtml(q.pitfall)}
        </div>
      </div>` : ''}
    <button class="btn btn--primary-desk btn--full" id="desk-next-btn">
      ${isLast ? 'See Results' : 'Next Question →'}
    </button>`;

  document.getElementById('desk-next-btn')?.addEventListener('click', () => {
    if (isLast) {
      _endSession();
    } else {
      _currentIndex += 1;
      _timerPaused  = false;
      _renderQuestion();
    }
  });

  section.querySelector('.desk-result-msg')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ── Card event binding ────────────────────────────────────────

function _bindCardEvents(q) {
  const checkBtn = document.getElementById('desk-check-btn');
  const input    = document.getElementById('desk-answer-input');

  const submit = () => {
    const raw     = input?.value ?? '';
    const correct = checkAnswer(raw, q);
    _sessionResults.push({
      questionId: q.id,
      question:   q,
      userAnswer: raw,
      correct,
    });
    recordResult(q.id, correct ? 'correct' : 'incorrect');
    _showResult(q, correct);
  };

  checkBtn?.addEventListener('click', submit);
  input?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') submit();
  });

  document.getElementById('desk-bookmark-btn')?.addEventListener('click', (e) => {
    const nowBookmarked = toggleBookmark(q.id);
    const btn = e.currentTarget;
    btn.classList.toggle('bookmarked', nowBookmarked);
    btn.setAttribute('aria-pressed', String(nowBookmarked));
    btn.querySelector('svg').setAttribute('fill', nowBookmarked ? 'currentColor' : 'none');
  });
}

// ── Session summary ───────────────────────────────────────────

function _renderSummary() {
  const total   = _sessionResults.length;
  const correct = _sessionResults.filter(r => r.correct).length;
  const pct     = total > 0 ? Math.round((correct / total) * 100) : 0;

  // Topic breakdown
  const byTopic = {};
  _sessionResults.forEach(r => {
    const topic = r.question.topic;
    if (!byTopic[topic]) byTopic[topic] = { correct: 0, total: 0 };
    byTopic[topic].total  += 1;
    byTopic[topic].correct += r.correct ? 1 : 0;
  });

  const topicRows = Object.entries(byTopic).map(([topic, data]) => {
    const allRight = data.correct === data.total;
    return `
      <div class="topic-breakdown-row">
        <span class="topic-breakdown-name">${_topicLabel(topic)}</span>
        <span class="topic-breakdown-score ${allRight ? 'all-correct' : 'some-wrong'}">
          ${data.correct}/${data.total} ${allRight ? '✓' : ''}
        </span>
      </div>`;
  }).join('');

  // Pitfalls triggered (wrong answers only)
  const pitfallItems = _sessionResults
    .filter(r => !r.correct && r.question.pitfall)
    .map(r => `
      <div class="pitfall-summary-item">
        <div class="pitfall-summary-q">${_escHtml(r.question.question)}</div>
        ${_escHtml(r.question.pitfall)}
      </div>`).join('');

  const hasMistakes = _sessionResults.some(r => !r.correct);

  const area = document.getElementById('desk-question-area');
  area.innerHTML = `
    <div class="summary-screen">
      <div class="summary-hero">
        <div class="summary-score">
          <span class="correct-count">${correct}</span> / ${total}
        </div>
        <div class="summary-pct">${pct}%</div>
        <div class="summary-time">Total time: ${_formatTime(_timerSeconds)}</div>
      </div>

      ${topicRows ? `
        <div class="summary-section">
          <div class="summary-section-title">By Topic</div>
          ${topicRows}
        </div>` : ''}

      ${pitfallItems ? `
        <div class="summary-section">
          <div class="summary-section-title">Pitfalls Triggered</div>
          ${pitfallItems}
        </div>` : ''}

      <div class="summary-actions">
        <button class="btn btn--secondary" id="summary-new-set-btn">New Set</button>
        <button class="btn btn--primary-desk" id="summary-retry-btn">Try Again</button>
        ${hasMistakes ? `<button class="btn btn--secondary" id="summary-review-btn">Review Mistakes</button>` : ''}
      </div>
    </div>`;

  document.getElementById('summary-new-set-btn')?.addEventListener('click', () => {
    _sessionActive = false;
    _renderStartPrompt();
  });

  document.getElementById('summary-retry-btn')?.addEventListener('click', () => {
    const reshuffled = [..._sessionQuestions];
    _shuffle(reshuffled);
    _startSession(reshuffled);
  });

  document.getElementById('summary-review-btn')?.addEventListener('click', () => {
    const mistakes = _sessionResults
      .filter(r => !r.correct)
      .map(r => r.question);
    _shuffle(mistakes);
    _startSession(mistakes);
  });
}

// ── Timer ─────────────────────────────────────────────────────

function _startTimer() {
  _stopTimer();
  _timerInterval = setInterval(() => {
    if (!_timerPaused) {
      _timerSeconds += 1;
      _updateTimerDisplay();
    }
  }, 1000);
}

function _stopTimer() {
  clearInterval(_timerInterval);
  _timerInterval = null;
}

function _updateTimerDisplay() {
  const el = document.getElementById('desk-timer-count');
  if (el) el.textContent = _formatTime(_timerSeconds);
}

// ── Helpers ───────────────────────────────────────────────────

function _shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function _formatTime(totalSeconds) {
  const s = Math.max(0, totalSeconds);
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${String(sec).padStart(2, '0')}`;
}

function _topicLabel(topic) {
  const labels = {
    number_operations: 'Number & Arithmetic',
    fractions:         'Fractions',
    decimals:          'Decimals & Place Value',
    ratio:             'Ratio & Proportion',
    geometry:          'Geometry',
    measures:          'Measures & Units',
    algebra:           'Algebra & Sequences',
  };
  return labels[topic] ?? topic;
}

function _difficultyDots(difficulty) {
  const dots = [1, 2, 3].map(n =>
    `<span class="difficulty-dot${n <= difficulty ? ' filled' : ''}" aria-hidden="true"></span>`
  ).join('');
  return `<span class="difficulty-dots" title="Difficulty ${difficulty}/3" aria-label="Difficulty ${difficulty} out of 3">${dots}</span>`;
}

function _escHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

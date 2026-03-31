/**
 * walk.js — Walk Mode logic.
 *
 * Responsibilities:
 *  - Build a filtered question set from the full bank
 *  - Render question cards (front: question + options; back: answer revealed)
 *  - Optional countdown timer
 *  - Quick-result buttons (Got it / Missed / Discussed)
 *  - Previous/Next navigation + swipe gestures
 *  - Bookmark toggle
 */

import { getProgress, recordResult, getSettings, isBookmarked, toggleBookmark, getBookmarks } from './state.js';

// ── Module state ──────────────────────────────────────────────

let _allQuestions   = [];
let _currentSet     = [];   // filtered + shuffled subset
let _currentIndex   = 0;
let _answerRevealed = false;
let _timerOn        = false;
let _timerInterval  = null;
let _timerRemaining = 0;

// Swipe tracking
let _touchStartX = 0;
let _touchStartY = 0;

// ── Public API ────────────────────────────────────────────────

export function init(questions) {
  _allQuestions = questions.filter(q => q.mode === 'walk');

  _timerOn = getSettings().walkTimer;
  _currentIndex   = 0;
  _answerRevealed = false;

  _bindFilterControls();
  _applyFilters();
}

// ── Filters ───────────────────────────────────────────────────

function _bindFilterControls() {
  const topicEl      = document.getElementById('walk-topic-filter');
  const diffEl       = document.getElementById('walk-difficulty-filter');
  const bookmarkEl   = document.getElementById('walk-bookmark-filter');
  const shuffleBtn   = document.getElementById('walk-shuffle-btn');

  // Avoid stacking listeners on re-entry — replace elements' listeners via cloning trick
  [topicEl, diffEl, bookmarkEl].forEach(el => {
    el.addEventListener('change', () => { _currentIndex = 0; _applyFilters(); });
  });

  shuffleBtn.addEventListener('click', () => {
    _shuffle(_currentSet);
    _currentIndex   = 0;
    _answerRevealed = false;
    _stopTimer();
    _renderCard();
  });
}

function _applyFilters() {
  const topic    = document.getElementById('walk-topic-filter').value;
  const diff     = document.getElementById('walk-difficulty-filter').value;
  const bookmark = document.getElementById('walk-bookmark-filter').value;

  const bookmarks = getBookmarks();

  _currentSet = _allQuestions.filter(q => {
    if (topic    && q.topic      !== topic)           return false;
    if (diff     && q.difficulty !== Number(diff))    return false;
    if (bookmark === 'bookmarked' && !bookmarks.includes(q.id)) return false;
    return true;
  });

  _currentIndex   = 0;
  _answerRevealed = false;
  _stopTimer();
  _renderCard();
}

// ── Rendering ─────────────────────────────────────────────────

function _renderCard() {
  const area = document.getElementById('walk-question-area');

  if (_currentSet.length === 0) {
    area.innerHTML = `
      <div class="empty-state">
        <p>No questions match your filters.</p>
        <p style="font-size:0.9rem">Try changing the topic or difficulty.</p>
      </div>`;
    return;
  }

  const q = _currentSet[_currentIndex];
  const total = _currentSet.length;
  const bookmarked = isBookmarked(q.id);

  area.innerHTML = `
    <div class="question-card question-card--walk" id="walk-card" role="article" aria-label="Question ${_currentIndex + 1} of ${total}">
      <div class="card-meta">
        <span class="topic-tag">${_topicLabel(q.topic)}</span>
        ${_difficultyDots(q.difficulty, 'walk')}
        <span class="question-counter">Q${_currentIndex + 1} of ${total}</span>
      </div>

      <div class="card-controls">
        ${_timerOn ? `<div class="walk-timer-display">
          <span class="walk-timer-count" id="walk-timer-count">${_formatTime(q.time_target_seconds)}</span>
        </div>` : ''}
        <button class="timer-toggle-btn" id="walk-timer-toggle" title="${_timerOn ? 'Hide timer' : 'Show timer'}" aria-label="${_timerOn ? 'Hide timer' : 'Show timer'}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
        </button>
        <button class="bookmark-btn ${bookmarked ? 'bookmarked' : ''}" id="walk-bookmark-btn" data-id="${q.id}" title="${bookmarked ? 'Remove bookmark' : 'Bookmark'}" aria-label="${bookmarked ? 'Remove bookmark' : 'Bookmark this question'}" aria-pressed="${bookmarked}">
          <svg viewBox="0 0 24 24" fill="${bookmarked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        </button>
      </div>

      <p class="question-text">${_escHtml(q.question)}</p>

      <ul class="options-list" role="list">
        ${q.options.map((opt, i) => `
          <li class="option-item" role="listitem">
            <span class="option-label">${String.fromCharCode(65 + i)}</span>
            <span>${_escHtml(opt)}</span>
          </li>`).join('')}
      </ul>

      <div id="walk-answer-section"></div>

      <div class="card-nav">
        <button class="btn btn--secondary" id="walk-prev-btn" ${_currentIndex === 0 ? 'disabled aria-disabled="true"' : ''}>
          ← Back
        </button>
        <button class="btn btn--primary" id="walk-show-answer-btn">
          Show Answer
        </button>
        <button class="btn btn--secondary" id="walk-next-btn" ${_currentIndex >= _currentSet.length - 1 ? 'disabled aria-disabled="true"' : ''}>
          Next →
        </button>
      </div>
    </div>`;

  _bindCardEvents(q);
  _bindSwipeEvents();

  if (_timerOn) _startTimer(q.time_target_seconds);
}

function _revealAnswer(q) {
  _answerRevealed = true;
  _stopTimer();

  const section = document.getElementById('walk-answer-section');
  if (!section) return;

  // Highlight correct option
  const items = document.querySelectorAll('.option-item');
  items.forEach((item, i) => {
    if (i === q.answer_index) item.classList.add('option-item--correct');
  });

  section.innerHTML = `
    <div class="answer-reveal">
      <div class="correct-answer-banner">
        ✓ ${q.answer_display} — ${_escHtml(q.answer)}
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
      <div class="quick-result-btns" role="group" aria-label="Mark your result">
        <button class="btn btn--correct"   data-result="correct">✓ Got it</button>
        <button class="btn btn--incorrect" data-result="incorrect">✗ Missed</button>
        <button class="btn btn--discussed" data-result="discussed">~ Discussed</button>
      </div>
    </div>`;

  // Update nav: hide Show Answer, keep Prev/Next
  const showBtn = document.getElementById('walk-show-answer-btn');
  if (showBtn) showBtn.style.display = 'none';

  // Bind quick-result buttons — only the first click records a result
  let resultRecorded = false;
  section.querySelectorAll('[data-result]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!resultRecorded) {
        recordResult(q.id, btn.dataset.result);
        resultRecorded = true;
      }
      // Dim all result buttons, highlight selected
      section.querySelectorAll('[data-result]').forEach(b => b.style.opacity = '0.4');
      btn.style.opacity = '1';
      btn.style.outline = '2px solid currentColor';
    });
  });

  section.querySelector('.answer-reveal').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ── Card event binding ────────────────────────────────────────

function _bindCardEvents(q) {
  document.getElementById('walk-show-answer-btn')?.addEventListener('click', () => {
    if (!_answerRevealed) _revealAnswer(q);
  });

  document.getElementById('walk-prev-btn')?.addEventListener('click', () => _navigate(-1));
  document.getElementById('walk-next-btn')?.addEventListener('click', () => _navigate(1));

  document.getElementById('walk-bookmark-btn')?.addEventListener('click', (e) => {
    const id = q.id;
    const nowBookmarked = toggleBookmark(id);
    const btn = e.currentTarget;
    btn.classList.toggle('bookmarked', nowBookmarked);
    btn.setAttribute('aria-pressed', String(nowBookmarked));
    btn.title = nowBookmarked ? 'Remove bookmark' : 'Bookmark';
    btn.querySelector('svg').setAttribute('fill', nowBookmarked ? 'currentColor' : 'none');
  });

  document.getElementById('walk-timer-toggle')?.addEventListener('click', () => {
    _timerOn = !_timerOn;
    _stopTimer();
    _renderCard();
  });
}

// ── Navigation ────────────────────────────────────────────────

function _navigate(direction) {
  const next = _currentIndex + direction;
  if (next < 0 || next >= _currentSet.length) return;
  _currentIndex   = next;
  _answerRevealed = false;
  _stopTimer();
  _renderCard();
}

// ── Swipe gestures ────────────────────────────────────────────

function _bindSwipeEvents() {
  const card = document.getElementById('walk-card');
  if (!card) return;

  card.addEventListener('touchstart', (e) => {
    _touchStartX = e.touches[0].clientX;
    _touchStartY = e.touches[0].clientY;
  }, { passive: true });

  card.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - _touchStartX;
    const dy = e.changedTouches[0].clientY - _touchStartY;
    // Only register horizontal swipes (dx dominant, at least 50px)
    if (Math.abs(dx) < 50 || Math.abs(dy) > Math.abs(dx)) return;
    _navigate(dx < 0 ? 1 : -1);
  }, { passive: true });
}

// ── Timer ─────────────────────────────────────────────────────

function _startTimer(seconds) {
  _timerRemaining = seconds;
  _updateTimerDisplay();

  _timerInterval = setInterval(() => {
    _timerRemaining -= 1;
    _updateTimerDisplay();
    if (_timerRemaining <= 0) _stopTimer();
  }, 1000);
}

function _stopTimer() {
  clearInterval(_timerInterval);
  _timerInterval = null;
}

function _updateTimerDisplay() {
  const el = document.getElementById('walk-timer-count');
  if (!el) return;
  el.textContent = _formatTime(_timerRemaining);
  el.classList.toggle('urgent', _timerRemaining <= 10 && _timerRemaining > 0);
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

function _difficultyDots(difficulty, mode) {
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

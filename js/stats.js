/**
 * stats.js — Stats / Progress screen.
 *
 * Reads progress from state.js and cross-references with the
 * full question bank to compute per-topic, per-mode, per-difficulty
 * accuracy figures. All computation is done fresh on each visit.
 */

import { getProgress, getStreak } from './state.js';

let _allQuestions = [];

// ── Public API ────────────────────────────────────────────────

export function init(questions) {
  _allQuestions = questions;
  _render();
}

// ── Rendering ─────────────────────────────────────────────────

function _render() {
  const content = document.getElementById('stats-content');
  const progress = getProgress();
  const streak   = getStreak();

  const attempted = Object.values(progress);
  const totalAttempted = attempted.reduce((s, e) => s + e.attempted, 0);
  const totalCorrect   = attempted.reduce((s, e) => s + e.correct,   0);

  if (totalAttempted === 0) {
    content.innerHTML = `
      <div class="stats-empty">
        <p>No progress yet.</p>
        <p style="font-size:0.9rem; margin-top:0.5rem;">Complete some questions in Walk or Desk Mode to see your stats here.</p>
      </div>`;
    return;
  }

  const overallPct = _pct(totalCorrect, totalAttempted);

  // By mode
  const walkStats = _statsByFilter(progress, q => q.mode === 'walk');
  const deskStats = _statsByFilter(progress, q => q.mode === 'desk');

  // By topic
  const TOPICS = [
    'number_operations', 'fractions', 'decimals',
    'ratio', 'geometry', 'measures', 'algebra',
  ];
  const topicStats = TOPICS.map(topic => ({
    topic,
    label: _topicLabel(topic),
    ...(_statsByFilter(progress, q => q.topic === topic)),
  })).filter(t => t.attempted > 0);

  // By difficulty
  const diffStats = [1, 2, 3].map(d => ({
    diff: d,
    label: d === 1 ? '1 — Warm-up' : d === 2 ? '2 — Exam-level' : '3 — Stretch',
    ...(_statsByFilter(progress, q => q.difficulty === d)),
  })).filter(d => d.attempted > 0);

  // Weak spots: subtopics with lowest accuracy (min 2 attempts, at most 3)
  const subtopicMap = {};
  _allQuestions.forEach(q => {
    const entry = progress[q.id];
    if (!entry || entry.attempted < 2) return;
    const key = `${q.topic}__${q.subtopic}`;
    if (!subtopicMap[key]) subtopicMap[key] = { topic: q.topic, subtopic: q.subtopic, correct: 0, attempted: 0 };
    subtopicMap[key].correct  += entry.correct;
    subtopicMap[key].attempted += entry.attempted;
  });
  const weakSpots = Object.values(subtopicMap)
    .map(s => ({ ...s, pct: _pct(s.correct, s.attempted) }))
    .filter(s => s.pct < 60)
    .sort((a, b) => a.pct - b.pct)
    .slice(0, 3);

  content.innerHTML = `
    ${_sectionOverall(totalCorrect, totalAttempted, overallPct)}
    ${_sectionStreak(streak)}
    ${_sectionByMode(walkStats, deskStats)}
    ${_sectionByTopic(topicStats)}
    ${_sectionByDifficulty(diffStats)}
    ${weakSpots.length ? _sectionWeakSpots(weakSpots) : ''}
  `;
}

// ── Section builders ──────────────────────────────────────────

function _sectionOverall(correct, attempted, pct) {
  return `
    <div class="stats-section">
      <div class="stats-section-title">Overall</div>
      <div class="stats-big-number">${pct}%</div>
      <div class="stats-sub">${correct} correct out of ${attempted} attempts</div>
    </div>`;
}

function _sectionStreak(streak) {
  const days = streak.currentStreak ?? 0;
  return `
    <div class="stats-section">
      <div class="stats-section-title">Daily Streak</div>
      <div class="streak-display">
        <span class="streak-number">${days}</span>
        <span class="streak-label">${days === 1 ? 'day' : 'days'} in a row</span>
      </div>
    </div>`;
}

function _sectionByMode(walkStats, deskStats) {
  return `
    <div class="stats-section">
      <div class="stats-section-title">By Mode</div>
      ${_statRow('Walk Mode (SET)', walkStats)}
      ${_statRow('Desk Mode (NWSSEE)', deskStats)}
    </div>`;
}

function _sectionByTopic(topicStats) {
  if (!topicStats.length) return '';
  const rows = topicStats.map(t => _statRow(t.label, t)).join('');
  return `
    <div class="stats-section">
      <div class="stats-section-title">By Topic</div>
      ${rows}
    </div>`;
}

function _sectionByDifficulty(diffStats) {
  if (!diffStats.length) return '';
  const rows = diffStats.map(d => _statRow(d.label, d)).join('');
  return `
    <div class="stats-section">
      <div class="stats-section-title">By Difficulty</div>
      ${rows}
    </div>`;
}

function _sectionWeakSpots(spots) {
  const items = spots.map(s => `
    <div class="weak-spot-item">
      <strong>${_topicLabel(s.topic)}</strong> — ${_escHtml(s.subtopic.replace(/_/g, ' '))}
      <span style="color:var(--color-text-muted); font-size:0.8rem; margin-left:0.5rem">${s.pct}% correct</span>
    </div>`).join('');
  return `
    <div class="stats-section">
      <div class="stats-section-title">Needs Work</div>
      ${items}
    </div>`;
}

function _statRow(label, stats) {
  if (stats.attempted === 0) return '';
  const pct     = stats.pct ?? _pct(stats.correct, stats.attempted);
  const needsWork = pct < 60;
  return `
    <div class="stats-row">
      <span style="flex:1; font-size:0.875rem">${label}</span>
      <div class="stats-bar-wrap" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" aria-label="${label} accuracy">
        <div class="stats-bar ${needsWork ? 'needs-work' : ''}" style="width:${pct}%"></div>
      </div>
      <span class="stats-pct ${needsWork ? 'needs-work' : ''}">${pct}%</span>
    </div>`;
}

// ── Internal helpers ──────────────────────────────────────────

/**
 * Computes aggregate stats for questions matching `filterFn`.
 */
function _statsByFilter(progress, filterFn) {
  const matching = _allQuestions.filter(filterFn);
  let correct = 0, attempted = 0;
  matching.forEach(q => {
    const entry = progress[q.id];
    if (!entry) return;
    correct  += entry.correct;
    attempted += entry.attempted;
  });
  return { correct, attempted, pct: _pct(correct, attempted) };
}

function _pct(correct, attempted) {
  if (attempted === 0) return 0;
  return Math.round((correct / attempted) * 100);
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

function _escHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

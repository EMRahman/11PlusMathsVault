/**
 * state.js — localStorage wrappers with schema versioning.
 *
 * All persistent state lives here. Modules call these functions;
 * they never touch localStorage directly.
 */

const SCHEMA_VERSION = 2;

const KEYS = {
  version:   'mathsvault_schema_version',
  progress:  'mathsvault_progress',
  bookmarks: 'mathsvault_bookmarks',
  settings:  'mathsvault_settings',
  streak:    'mathsvault_streak',
  daily:     'mathsvault_daily',
};

// ── Internal helpers ──────────────────────────────────────────

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw !== null ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or unavailable — fail silently
  }
}

// ── Initialisation ────────────────────────────────────────────

export function initState() {
  const stored = read(KEYS.version, null);
  if (stored === null) {
    // First visit — just stamp the version
    write(KEYS.version, SCHEMA_VERSION);
  } else if (stored < SCHEMA_VERSION) {
    // Keep bookmarks, settings and progress. Only the most recent legacy
    // discussion can be identified; older records did not store its count.
    const progress = getProgress();
    Object.values(progress).forEach(entry => {
      if (entry.lastResult === 'discussed') {
        entry.attempted = Math.max(entry.correct || 0, (entry.attempted || 0) - 1);
        entry.discussed = 1;
      }
    });
    write(KEYS.progress, progress);
    write(KEYS.version, SCHEMA_VERSION);
  }
}

// ── Progress ──────────────────────────────────────────────────

/**
 * Returns the full progress map: { [questionId]: { attempted, correct, lastResult, lastAttempted } }
 */
export function getProgress() {
  return read(KEYS.progress, {});
}

/**
 * Records the result of a question attempt.
 * @param {number} questionId
 * @param {'correct'|'incorrect'|'discussed'} result
 */
export function recordResult(questionId, result, { assisted = false, usedSupport = false, now = new Date() } = {}) {
  const progress = getProgress();
  const entry = progress[questionId] ?? { attempted: 0, correct: 0 };
  const independent = !assisted && ['correct', 'incorrect'].includes(result);
  if (independent) {
    entry.attempted += 1;
    if (result === 'correct') entry.correct += 1;
  }
  if (result === 'discussed') entry.discussed = (entry.discussed || 0) + 1;
  else if (assisted || usedSupport || result === 'assisted') entry.supported = (entry.supported || 0) + 1;
  const mastered = independent && result === 'correct' && !usedSupport;
  entry.reviewLevel = mastered ? Math.min((entry.reviewLevel || 0) + 1, 5) : 0;
  const days = mastered ? [1, 3, 7, 14, 30, 60][entry.reviewLevel] : 1;
  entry.nextReview = new Date(now.getTime() + days * 86400000).toISOString();
  entry.lastResult = assisted && result !== 'discussed' ? 'assisted' : result;
  entry.lastAttempted = now.toISOString();
  progress[questionId] = entry;
  write(KEYS.progress, progress);
  _updateStreak();
}

export function getDaily() { return read(KEYS.daily, null); }
export function saveDaily(plan) { write(KEYS.daily, plan); }

// ── Bookmarks ─────────────────────────────────────────────────

/** Returns array of bookmarked question IDs. */
export function getBookmarks() {
  return read(KEYS.bookmarks, []);
}

/**
 * Toggles bookmark for a question.
 * @returns {boolean} true if now bookmarked, false if removed
 */
export function toggleBookmark(questionId) {
  const bookmarks = getBookmarks();
  const idx = bookmarks.indexOf(questionId);
  if (idx === -1) {
    bookmarks.push(questionId);
    write(KEYS.bookmarks, bookmarks);
    return true;
  } else {
    bookmarks.splice(idx, 1);
    write(KEYS.bookmarks, bookmarks);
    return false;
  }
}

/** Returns true if the given question ID is bookmarked. */
export function isBookmarked(questionId) {
  return getBookmarks().includes(questionId);
}

// ── Settings ──────────────────────────────────────────────────

const DEFAULT_SETTINGS = {
  walkTimer:   false,
  deskSetSize: 10,
};

/** Returns current settings merged with defaults. */
export function getSettings() {
  return { ...DEFAULT_SETTINGS, ...read(KEYS.settings, {}) };
}

/** Merges partial updates into settings. */
export function updateSettings(updates) {
  write(KEYS.settings, { ...getSettings(), ...updates });
}

// ── Streak ────────────────────────────────────────────────────

/** Returns { lastSessionDate: ISO date string | null, currentStreak: number } */
export function getStreak() {
  return read(KEYS.streak, { lastSessionDate: null, currentStreak: 0 });
}

function _updateStreak() {
  const streak = getStreak();
  const today = localDate(new Date());
  if (streak.lastSessionDate === today) return; // already counted today

  const yesterday = localDate(new Date(Date.now() - 86_400_000));
  streak.currentStreak = streak.lastSessionDate === yesterday
    ? streak.currentStreak + 1
    : 1;
  streak.lastSessionDate = today;
  write(KEYS.streak, streak);
}

export function localDate(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

// ── Reset ─────────────────────────────────────────────────────

/** Clears all app data and re-stamps the schema version. */
export function resetAll() {
  _clearAppKeys();
  write(KEYS.version, SCHEMA_VERSION);
}

function _clearAppKeys() {
  Object.values(KEYS).forEach(key => localStorage.removeItem(key));
}

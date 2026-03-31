/**
 * state.js — localStorage wrappers with schema versioning.
 *
 * All persistent state lives here. Modules call these functions;
 * they never touch localStorage directly.
 */

const SCHEMA_VERSION = 1;

const KEYS = {
  version:   'mathsvault_schema_version',
  progress:  'mathsvault_progress',
  bookmarks: 'mathsvault_bookmarks',
  settings:  'mathsvault_settings',
  streak:    'mathsvault_streak',
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
  } else if (stored !== SCHEMA_VERSION) {
    // Future migrations would be handled here by version number.
    // For now, wipe only this app's keys (not the whole origin).
    _clearAppKeys();
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
export function recordResult(questionId, result) {
  const progress = getProgress();
  const entry = progress[questionId] ?? { attempted: 0, correct: 0 };
  entry.attempted += 1;
  if (result === 'correct') entry.correct += 1;
  entry.lastResult = result;
  entry.lastAttempted = new Date().toISOString();
  progress[questionId] = entry;
  write(KEYS.progress, progress);
  _updateStreak();
}

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
  const today = _isoDate(new Date());
  if (streak.lastSessionDate === today) return; // already counted today

  const yesterday = _isoDate(new Date(Date.now() - 86_400_000));
  streak.currentStreak = streak.lastSessionDate === yesterday
    ? streak.currentStreak + 1
    : 1;
  streak.lastSessionDate = today;
  write(KEYS.streak, streak);
}

function _isoDate(date) {
  return date.toISOString().slice(0, 10);
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

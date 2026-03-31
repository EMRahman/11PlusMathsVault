/**
 * router.js — Hash-based screen router.
 *
 * Maps URL hashes to screen IDs and calls the appropriate
 * module's init function when the route changes.
 */

const ROUTES = {
  '':          'home',
  '/':         'home',
  '/walk':     'walk',
  '/desk':     'desk',
  '/stats':    'stats',
  '/settings': 'settings',
};

let _questions = [];
let _modules   = {};

/**
 * Initialises the router.
 *
 * @param {object[]} questions  — full question array
 * @param {object}   modules   — { walk, desk, stats, settings }
 *   Each module must export an `init(questions?)` function.
 */
export function initRouter(questions, modules) {
  _questions = questions;
  _modules   = modules;

  window.addEventListener('hashchange', _onHashChange);
  _onHashChange(); // handle the initial URL
}

/** Programmatically navigate to a route (e.g. '#/walk'). */
export function navigate(hash) {
  window.location.hash = hash;
}

// ── Internal ──────────────────────────────────────────────────

function _onHashChange() {
  const hash     = window.location.hash.slice(1) || '/';
  const screenId = ROUTES[hash] ?? 'home';
  _showScreen(screenId);
}

function _showScreen(screenId) {
  // Hide all screens
  document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));

  // Show target screen
  const target = document.getElementById(`screen-${screenId}`);
  if (target) target.classList.add('active');

  // Scroll to top
  window.scrollTo(0, 0);

  // Call module init if registered
  const mod = _modules[screenId];
  if (mod?.init) {
    mod.init(_questions);
  }
}

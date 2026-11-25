/**
 * app.js — Entry point.
 *
 * 1. Shows loading overlay
 * 2. Fetches questions.json (single source of truth)
 * 3. Initialises state (localStorage schema version check)
 * 4. Wires up all modules and the router
 * 5. Wires settings screen controls
 * 6. Hides loading overlay
 *
 * Offline support: a service worker (sw.js) caches the app shell and
 * questions.json so Walk Mode works without a network. Registration is
 * fire-and-forget — if it fails, the app behaves as if no SW were present.
 */

import { initState, getSettings, updateSettings, resetAll } from './state.js';
import { initRouter } from './router.js';
import * as walk  from './walk.js';
import * as desk  from './desk.js';
import * as stats from './stats.js';
import * as hacks from './hacks.js';
import * as daily from './daily.js';
import { topicOptions } from './content.js';

async function main() {
  // Show loading overlay (it's visible by default in HTML)
  const overlay = document.getElementById('loading-overlay');
  let loadingQuestions = false;

  try {
    // Initialise state first (schema version check / migration)
    initState();

    // Fetch question bank
    loadingQuestions = true;
    const response = await fetch('data/questions.json');
    if (!response.ok) throw new Error(`Failed to load questions: ${response.status}`);
    const questions = await response.json();
    loadingQuestions = false;
    for (const id of ['walk-topic-filter', 'desk-topic-filter']) {
      document.getElementById(id).innerHTML = topicOptions();
    }

    // Wire up settings screen
    _initSettings();

    // Start the router — modules receive questions on each route activation
    initRouter(questions, {
      home:     { init: daily.home },
      daily:    daily,
      walk:     walk,
      desk:     desk,
      hacks:    hacks,
      stats:    stats,
      settings: { init: _initSettings },
    });

    // Hide loading overlay
    overlay.classList.add('hidden');
    setTimeout(() => { overlay.style.display = 'none'; }, 350);

  } catch (err) {
    console.error('11+ Maths Vault — startup error:', err);
    _showStartupError(overlay, loadingQuestions);
  }
}

// Families get a plain explanation and a retry. Setup help appears only when the page is opened as a file.
function _showStartupError(overlay, loadingQuestions) {
  const [title, message] = !loadingQuestions
    ? ['Something went wrong', 'The app couldn’t start. Please try again.']
    : navigator.onLine === false
      ? ['You’re offline', 'Connect to the internet, then try again. Once the app has loaded online, it works offline too.']
      : ['The questions didn’t load', 'Check your internet connection, then try again.'];
  overlay.innerHTML = `
    <div class="startup-error">
      <p class="startup-error__title">${title}</p>
      <p>${message}</p>
      <button type="button" class="btn btn--primary-desk" id="startup-retry-btn">Try again</button>
      ${location.protocol === 'file:' ? '<p class="muted">Opening the files directly? Serve this folder instead, for example with <code>python3 -m http.server</code>, then visit http://localhost:8000.</p>' : ''}
    </div>`;
  const retry = overlay.querySelector('#startup-retry-btn');
  retry.addEventListener('click', () => window.location.reload());
  retry.focus();
}

// ── Settings screen ───────────────────────────────────────────

function _initSettings() {
  const settings = getSettings();

  // Walk timer toggle
  const walkTimerEl = document.getElementById('setting-walk-timer');
  if (walkTimerEl) {
    walkTimerEl.checked = settings.walkTimer;
    // Remove stale listener before adding
    const fresh = walkTimerEl.cloneNode(true);
    walkTimerEl.replaceWith(fresh);
    fresh.checked = settings.walkTimer;
    fresh.addEventListener('change', () => {
      updateSettings({ walkTimer: fresh.checked });
    });
  }

  // Desk set size
  const deskSizeEl = document.getElementById('setting-desk-setsize');
  if (deskSizeEl) {
    deskSizeEl.value = String(settings.deskSetSize);
    const fresh = deskSizeEl.cloneNode(true);
    deskSizeEl.replaceWith(fresh);
    fresh.value = String(settings.deskSetSize);
    // A saved size may no longer exist (the old "Paper 50" became fixed mock papers).
    if (!fresh.value) fresh.value = '10';
    fresh.addEventListener('change', () => {
      updateSettings({ deskSetSize: parseInt(fresh.value, 10) });
      // Also update the desk filter bar to reflect new default
      const deskEl = document.getElementById('desk-setsize-filter');
      if (deskEl) deskEl.value = fresh.value;
    });
  }

  // Reset button
  const resetBtn = document.getElementById('settings-reset-btn');
  if (resetBtn) {
    const fresh = resetBtn.cloneNode(true);
    resetBtn.replaceWith(fresh);
    fresh.addEventListener('click', () => {
      const confirmed = window.confirm(
        'This will permanently delete all your progress, bookmarks, and stats. Are you sure?'
      );
      if (confirmed) {
        resetAll();
        window.location.hash = '#/';
      }
    });
  }
}

// ── Boot ──────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', main);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch((err) => {
      console.warn('Service worker registration failed:', err);
    });
  });
}

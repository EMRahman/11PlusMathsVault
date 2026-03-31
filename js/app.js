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
 * NOTE: Offline / PWA support is not implemented in v1.
 * The app requires a network connection (or local server) to load
 * questions.json. This is fine for typical home/school use over WiFi.
 * A service worker cache layer can be added in a future iteration.
 */

import { initState, getSettings, updateSettings, resetAll } from './state.js';
import { initRouter } from './router.js';
import * as walk  from './walk.js';
import * as desk  from './desk.js';
import * as stats from './stats.js';

async function main() {
  // Show loading overlay (it's visible by default in HTML)
  const overlay = document.getElementById('loading-overlay');

  try {
    // Initialise state first (schema version check / migration)
    initState();

    // Fetch question bank
    const response = await fetch('data/questions.json');
    if (!response.ok) throw new Error(`Failed to load questions: ${response.status}`);
    const questions = await response.json();

    // Wire up settings screen
    _initSettings();

    // Start the router — modules receive questions on each route activation
    initRouter(questions, {
      walk:     walk,
      desk:     desk,
      stats:    stats,
      settings: { init: _initSettings },
    });

    // Hide loading overlay
    overlay.classList.add('hidden');
    setTimeout(() => { overlay.style.display = 'none'; }, 350);

  } catch (err) {
    console.error('11+ Maths Vault — startup error:', err);
    overlay.innerHTML = `
      <p style="color:#ef4444; text-align:center; padding:2rem; max-width:400px">
        <strong>Could not load questions.</strong><br><br>
        Make sure you're running the app through a local server (not directly from the file system).<br><br>
        <code style="font-size:0.8rem; color:#94a3b8">python3 -m http.server</code><br>
        then open <code style="font-size:0.8rem; color:#94a3b8">http://localhost:8000</code>
      </p>`;
  }
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

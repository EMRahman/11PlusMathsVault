# 11+ Maths Vault

A lightweight, static web app for Year 5/6 maths practice tailored to Nonsuch-style 11+ preparation.

## What this repo contains

- **Walk Mode**: quick verbal, multiple-choice questions for parent/child practice on the go.
- **Desk Mode**: written, open-answer questions for seated practice.
- **Question bank**: JSON-based dataset covering core KS2/11+ topics.
- **Local progress tracking**: bookmarks, settings, and session data stored in `localStorage`.

## Tech stack

- Vanilla **HTML/CSS/JavaScript** (no frameworks)
- No build step, no backend, no external API dependency
- Suitable for static hosting (e.g. GitHub Pages)

## Project layout

- `index.html` — app shell
- `css/style.css` — styling
- `js/` — app logic (routing, mode flows, state, validation, stats)
- `data/questions.json` — question dataset
- `SPEC.md` — full product and content specification

## Run locally

Because this is a static app, open `index.html` directly in a browser, or serve the folder with any simple static server.

Example:

```bash
python3 -m http.server
```

Then visit `http://localhost:8000`.

## Data validation

Use the included validator script:

```bash
node validate-data.js
```

This checks schema consistency and basic question-data integrity.

---

For full product requirements, content rules, and UX details, see `SPEC.md`.

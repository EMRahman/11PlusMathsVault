# 11+ Maths Vault

A lightweight, static web app for Year 5/6 maths practice tailored to Nonsuch-style 11+ preparation.

**Live site: [emrahman.github.io/11PlusMathsVault](https://emrahman.github.io/11PlusMathsVault/)**

---

## Features

- **Walk Mode** — quick verbal, multiple-choice questions for parent/child practice on the go
- **Desk Mode** — written, open-answer questions for seated practice
- **Question bank** — JSON-based dataset covering core KS2/11+ topics
- **Progress tracking** — bookmarks, settings, and session data stored in `localStorage` (no account needed)

## Tech stack

- Vanilla **HTML/CSS/JavaScript** — no frameworks, no build step, no backend
- Zero external dependencies
- Hosted on GitHub Pages

## Project layout

```
index.html          app shell
css/
  style.css         styling
js/
  app.js            app entry point
  router.js         client-side routing
  walk.js           Walk Mode logic
  desk.js           Desk Mode logic
  state.js          shared state management
  stats.js          progress and statistics
  validate.js       answer validation
  hacks.js          browser quirk workarounds
data/
  questions.json    question dataset
validate-data.js    data integrity validator (Node.js)
SPEC.md             full product and content specification
```

## Run locally

Open `index.html` directly in a browser, or serve with any static server:

```bash
python3 -m http.server
```

Then visit `http://localhost:8000`.

## Data validation

```bash
node validate-data.js
```

Checks schema consistency and basic question-data integrity across the full question bank.

---

For full product requirements, content rules, and UX details see [`SPEC.md`](SPEC.md).

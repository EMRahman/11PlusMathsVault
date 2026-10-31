# 11+ Maths Vault

A static, offline-capable maths practice app for Year 5/6, inspired by the Nonsuch SET and NWSSEE formats.

**Live site: [emrahman.github.io/11PlusMathsVault](https://emrahman.github.io/11PlusMathsVault/)**

## Learning flows

- **Daily practice:** a saved daily plan with roughly ten minutes of suggested solving time. Includes due skills, weaker skills, new questions and mixed revision. Finished answers and partially completed questions survive a reload.
- **Walk Mode:** five or ten oral questions, optional choices, listening-level filters, parent discussion prompts, bookmarks and optional device speech. Mark independent success, a missed answer or a discussion separately. Swipe or use Back/Next; finishing gives a short summary.
- **Guided Desk Mode:** two question-specific hints, retries before revealing the solution, and a different question practising the same skill. First attempts, supported work and final understanding are distinguished.
- **Exam practice:** SET choices or NWSSEE written answers; 40-, 45- or 50-minute timers; skip, flag, jump back and review before submitting. Answers stay hidden until submission. The paper is automatically submitted when time expires. Leaving the screen ends the active exam session.
- **Paper practice:** print one fixed question set and its matching, separate answer sheet. Questions include working space and diagrams where appropriate.
- **Common Hacks:** worked examples with “why it works” and “when to use it” notes, optional extension topics and a 16-question quiz.

## Content

The main bank contains **210 questions: 120 oral and 90 written**, evenly covering ten domains: arithmetic, fractions, decimals, ratio, percentages, geometry, measures, algebra, statistics and coordinates. Written questions include tables, bar charts, line graphs, pie charts, coordinate grids and shape diagrams with text equivalents. Each skill has multiple questions for transfer and revision.

`data/questions.json` is the static runtime bank. The original question IDs are preserved. To edit content, update `data/seed-questions.json` (the original 20 questions) or the authored families in `scripts/build-questions.cjs`, then regenerate and validate:

```bash
node scripts/build-questions.cjs
node validate-data.js
node --test tests/*.test.mjs
```

Node 22 or newer is recommended for the checks. Content generation is an authoring tool, not a runtime dependency. Difficulty labels are practice guidance, not calibrated entrance-test predictions. The questions are original practice materials, not official papers.

## Progress and revision

No account or backend is needed. Progress, bookmarks, preferences and today’s plan stay in this browser’s local storage. New independent correct answers schedule review after 3, 7, 14, 30 and then 60 days of repeated success; missed or supported work returns after one day. Daily planning prefers a fresh question for a due skill. These intervals are a product heuristic, not an individually validated learning prescription.

Accuracy counts the first answer given without help. A later hint does not erase an earlier independent error. Discussions and answers given after hints are tracked separately. The upgrade preserves existing progress, bookmarks and settings; it can remove the latest identifiable legacy discussion from the old accuracy denominator, but the old schema did not retain enough information to recover earlier discussions.

## Run locally

Serve the folder with a static server (ES modules require HTTP):

```bash
python3 -m http.server
```

Open `http://localhost:8000`. The service worker caches the app for later offline visits. Read-aloud availability and offline voices depend on the device. Bump `CACHE_VERSION` in `sw.js` after changing cached runtime files.

The app uses vanilla HTML/CSS/JavaScript, with no framework, external runtime dependencies or deployment build step. GitHub Pages can serve this folder unchanged.

## Evidence and exam context

The parent guide links to [official Nonsuch guidance](https://www.nonsuchschool.org/page/?pid=300&title=Second+Stage+Entrance+Examination+(NWSSEE)) and the [KS2 maths curriculum](https://www.gov.uk/government/publications/national-curriculum-in-england-mathematics-programmes-of-study/national-curriculum-in-england-mathematics-programmes-of-study). Exam guidance was checked in October 2026; families should follow the school’s current instructions. Hints and transfer practice draw on [EEF guidance on modelling](https://educationendowmentfoundation.org.uk/news/eef-blog-integrating-evidence-into-mathematics-teaching-making-sense-through-modelling); spaced revision draws on the [IES learning practice guide](https://ies.ed.gov/ncee/wwc/PracticeGuide/1).

See [SPEC.md](SPEC.md) for the original specification and the current implementation update.

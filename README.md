# 11+ Maths Vault

A static, offline-capable maths practice app for Year 5/6, aligned to the Nonsuch SET and NWSSEE formats and to the school's published SET sample questions.

**Live site: [emrahman.github.io/11PlusMathsVault](https://emrahman.github.io/11PlusMathsVault/)**

## Learning flows

- **Daily practice:** a saved daily plan with roughly ten minutes of suggested solving time. Includes due skills, weaker skills, new questions and mixed revision. Finished answers and partially completed questions survive a reload.
- **Walk Mode:** five or ten oral questions, optional choices, listening-level filters, parent discussion prompts, bookmarks and optional device speech. This is a warm-up, easier than the real papers. Mark independent success, a missed answer or a discussion separately.
- **Guided practice:** two question-specific hints, retries before revealing the solution, and a different question practising the same skill, for SET-style choices or NWSSEE-style written answers. First attempts, supported work and final understanding are distinguished.
- **Timed sets:** any filtered set at exam pace (54 seconds per SET question, 108 seconds per NWSSEE question). Skip, flag, jump back and review before submitting. Answers stay hidden until submission, and the paper is automatically submitted when time expires. Leaving the screen ends the session.
- **Mock papers:** three fixed papers per stage, each with the same topic balance and a similar difficulty mix: 50 SET questions and 25 NWSSEE questions, with a 40-, 45- or 50-minute timer. Paper 3 of each stage is left out of everyday practice so it stays unseen for a dress rehearsal.
- **Paper practice:** print a fixed set with working space, a separate answer key and, for SET, an A to E answer grid like the real answer sheet.
- **Common Hacks:** worked examples with “why it works” and “when to use it” notes, optional extension topics and a 16-question quiz.

## Content

The bank contains **420 questions**, all with worked solutions, two hints and a pitfall:

| Bank | IDs | Purpose |
|---|---|---|
| 120 oral (`walk`) | 1 to 120 | Warm-ups across ten domains. Each wrong option comes from a named mistake. |
| 150 SET-style (`set`) | 211 to 360 | Written multiple choice, covering all six types in the official samples plus wider KS2 topics, weighted towards number, fractions, ratio and geometry. |
| 150 NWSSEE-style (`desk`) | 121 to 210, 361 to 420 | Written answers. The newer questions are multi-step problems for the school's warning that candidates "will need to adapt their learning". |

`data/questions.json` is the static runtime bank, and original question IDs are preserved. To edit content, update the sources and regenerate:

- `data/seed-questions.json` and the families in `scripts/build-questions.cjs`: the original 210 questions.
- `data/authored/`: the SET and NWSSEE banks, Walk Mode wrong answers and difficulty ratings. See [its guide](data/authored/README.md).

```bash
node scripts/check-batch.mjs data/authored/<file>.json --kind set --ids <first>-<last>
node scripts/build-questions.cjs
node validate-data.js
node --test tests/*.test.mjs
```

`check-batch` evaluates an arithmetic proof of each authored answer, and rejects filler options and malformed diagrams. `validate-data` also fails if the correct option can be guessed from its size or letter. These checks cover arithmetic and structure: they cannot prove a question is well worded or pitched correctly.

Node 22 or newer is recommended for the checks. Content generation is an authoring tool, not a runtime dependency. Difficulty labels are our judgement against the official samples, not calibrated entrance-test predictions. The questions are original practice materials, not official papers. The schools publish paper length (40 to 50 minutes) but not question counts; the 50 and 25 used in mock papers are estimates from tutoring sites.

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

The parent guide links to [official Nonsuch guidance](https://www.nonsuchschool.org/page/?pid=300&title=Second+Stage+Entrance+Examination+(NWSSEE)) and the [KS2 maths curriculum](https://www.gov.uk/government/publications/national-curriculum-in-england-mathematics-programmes-of-study/national-curriculum-in-england-mathematics-programmes-of-study). The school also publishes [SET maths sample questions](https://www.nonsuchschool.org/_site/data/files/information/admissions/set2027/96D936786A72865A82CBAF7C7E2ECC0A.pdf), but no NWSSEE samples. Exam guidance was checked in November 2026 for September 2027 entry; families should follow the school’s current instructions. Hints and transfer practice draw on [EEF guidance on modelling](https://educationendowmentfoundation.org.uk/news/eef-blog-integrating-evidence-into-mathematics-teaching-making-sense-through-modelling); spaced revision draws on the [IES learning practice guide](https://ies.ed.gov/ncee/wwc/PracticeGuide/1).

See [SPEC.md](SPEC.md) for the original specification and the current implementation update.

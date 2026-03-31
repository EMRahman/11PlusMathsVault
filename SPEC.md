# Product Specification: 11+ Maths Vault

## 1. Project Overview

**11+ Maths Vault** (working title: `11PlusMathsVault`) is a lightweight, static web application that helps Year 5/6 students prepare for the Nonsuch High School for Girls 11+ entrance exams (SET and NWSSEE). It provides a curated bank of 210 original maths questions split across two distinct practice modes — **Walk Mode** (verbal/mental maths for parent-child practice on the go) and **Desk Mode** (written multi-step problems for seated practice with paper).

This is a companion project to [11PlusVocabVault](https://github.com/EMRahman/11PlusVocabVault), following the same technical philosophy: vanilla HTML/CSS/JS, no frameworks, no build step, no server, hostable on GitHub Pages.

## 2. Target Audience

- **Primary:** Students aged 9–11 preparing for the Nonsuch/Wallington 11+ entrance tests (SET Stage 1 and NWSSEE Stage 2).
- **Secondary:** Parents acting as practice partners — particularly during the school walk (Walk Mode) and supervising desk sessions (Desk Mode).
- **Tertiary:** Tutors looking for structured, exam-aligned practice materials.

## 3. Exam Context (What This App Is Designed Around)

The Nonsuch 11+ has two stages. This app must reflect both:

### 3.1 Stage 1 — Selective Eligibility Test (SET)
- **Format:** Multiple-choice (A–E), answers on a bubble sheet.
- **Timing:** ~40–50 minutes for ~50 questions (~1 min per question).
- **Content:** KS2 maths curriculum. Topics evidenced in official sample questions: multi-step arithmetic, ratio word problems, fractions (simplifying), decimals (BODMAS/brackets), angles (triangle angle facts), fraction-of-a-shape/shading.
- **Marking:** No negative marking. Distractors match common calculation errors.
- **Key challenge:** Speed under time pressure.

### 3.2 Stage 2 — NWSSEE Maths
- **Format:** Written open-answer (not multiple-choice). Multi-part sub-questions (a, b, c).
- **Timing:** ~45 minutes.
- **Content:** Harder than SET. Evidenced topics: decimals in context (money/exchange rates), speed–distance–time, sequences/consecutive numbers, perimeter and geometry reasoning, unit conversions (g→kg), equivalent fractions, ratio linking area to volume.
- **Marking:** No marks for working out — only the correct final answer scores. Difficulty is spread throughout the paper (not necessarily increasing).
- **Key challenge:** Precision of final answer with no partial credit.

### 3.3 Weighting
The final Nonsuch score = (SET aggregate ÷ 2) + NWSSEE English + NWSSEE Maths. In effect, Stage 2 is ~⅔ of the total score. Both stages matter but Stage 2 matters more.

## 4. The Two Modes — Rationale

The app is built around a core insight: maths practice happens in two distinct physical contexts that demand different question types.

### 4.1 Walk Mode
- **Context:** Parent and child walking to school (~15 minutes). Parent holds the phone, reads questions aloud. Child answers verbally. No paper, no pencil.
- **Question style:** MCQ with 5 options (A–E), solvable entirely in the head. Mirrors SET format.
- **Pedagogy:** Builds mental arithmetic fluency, estimation, number sense, and MCQ elimination skills. Trains the rapid decision-making needed for SET's ~1-min-per-question pace.

### 4.2 Desk Mode
- **Context:** Child sitting at a table with paper and pencil. Working independently or with parent nearby. ~20–30 minute sessions.
- **Question style:** Open-answer, multi-step, often wordy/contextual. Mirrors NWSSEE format.
- **Pedagogy:** Builds accuracy, written method discipline, and the habit of checking final answers — critical because NWSSEE awards zero marks for working, only for the correct final answer.

## 5. Data Structure

### 5.1 Question Schema

Every question in the bank is a JSON object with the following fields:

```json
{
  "id": 1,
  "mode": "walk",
  "topic": "number_operations",
  "subtopic": "multiplication_strategies",
  "stage": "SET",
  "difficulty": 2,
  "question": "Work out 38 × 24.",
  "options": ["812", "872", "892", "912", "962"],
  "answer": "912",
  "answer_index": 3,
  "answer_display": "D",
  "explanation": "38 × 24 = 38 × (6 × 4) = (38 × 6) × 4 = 228 × 4 = 912. Tip: break the multiplication into easier steps. You can also check: 38 × 25 = 950, so 38 × 24 = 950 − 38 = 912.",
  "pitfall": "Common error: 38 × 24 ≈ 40 × 24 = 960 — but forgetting to subtract 2 × 24 = 48 gives wrong estimates. Option A (812) matches 38 × 21 (a digit slip).",
  "unit": null,
  "time_target_seconds": 60
}
```

```json
{
  "id": 121,
  "mode": "desk",
  "topic": "decimals",
  "subtopic": "money_multiplication",
  "stage": "NWSSEE",
  "difficulty": 2,
  "question": "A cinema ticket costs £7.85. How much do 9 tickets cost? Give your answer in pounds.",
  "options": null,
  "answer": "70.65",
  "answer_index": null,
  "answer_display": null,
  "explanation": "7.85 × 9 = 7.85 × (10 − 1) = 78.50 − 7.85 = 70.65. Alternatively: 7 × 9 = 63, 0.85 × 9 = 7.65, total = 63 + 7.65 = 70.65.",
  "pitfall": "Decimal point misplacement — a common error flagged in official NWSSEE commentary. Children may write £7.065 or £706.5. Always check: 9 tickets at ~£8 each ≈ £72, so £70.65 is sensible.",
  "unit": "£",
  "time_target_seconds": 120
}
```

### 5.2 Field Definitions

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | integer | Yes | Unique question ID. Walk Mode: 1–120. Desk Mode: 121–210. |
| `mode` | string enum: `"walk"` or `"desk"` | Yes | Which practice context this question is designed for. |
| `topic` | string enum (see §6) | Yes | Primary maths domain. |
| `subtopic` | string | Yes | Specific sub-skill within the topic (free text, descriptive). |
| `stage` | string enum: `"SET"` or `"NWSSEE"` | Yes | Which exam stage this question mirrors in style and difficulty. |
| `difficulty` | integer 1–3 | Yes | 1 = warm-up/confidence builder. 2 = exam-level. 3 = stretch/challenge. |
| `question` | string | Yes | Full question text. Must be self-contained (no external images). For geometry, describe shapes in words. |
| `options` | array of 5 strings, or `null` | Yes | Five MCQ options for Walk Mode questions. `null` for Desk Mode questions. |
| `answer` | string | Yes | The correct answer as a string. Must match one of `options` for Walk Mode. For Desk Mode, this is what the child's input is validated against. |
| `answer_index` | integer 0–4, or `null` | Yes | Zero-based index into `options` for Walk Mode. `null` for Desk Mode. |
| `answer_display` | string or `null` | Yes | Human-readable answer label: `"A"`, `"B"`, `"C"`, `"D"`, or `"E"` for Walk Mode. `null` for Desk Mode. |
| `explanation` | string | Yes | Step-by-step worked solution. Written for a Year 5/6 child to understand. Should include at least one alternative method or checking strategy where applicable. |
| `pitfall` | string or `null` | No | The specific common error this question is designed to expose. Mapped from official NWSSEE/SET commentary where possible. `null` if no specific pitfall applies. |
| `unit` | string or `null` | No | The unit the answer should be given in (e.g. `"£"`, `"cm"`, `"kg"`, `"°"`). Displayed in the answer input area for Desk Mode. `null` if unitless. |
| `time_target_seconds` | integer | Yes | Suggested solve time. Walk Mode: typically 45–90s. Desk Mode: typically 90–180s. |

### 5.3 Answer Validation Rules (Desk Mode)

Because Desk Mode is open-answer, the app must handle minor formatting variations. Rules:

1. **Strip whitespace** from both ends of the child's input.
2. **Strip currency/unit symbols** (£, cm, kg, etc.) — the unit is shown in the UI, so the child may or may not type it.
3. **Accept equivalent decimal forms:** `70.65` and `70.650` are both correct.
4. **Accept fraction forms where specified:** If the answer is `"1/2"`, accept `"1/2"` and `"0.5"`. The `answer` field should specify the canonical form; add an `answer_alt` array field for accepted alternatives.
5. **Case-insensitive** for any text answers.
6. **Do NOT accept** approximations or rounded answers unless the question explicitly asks for rounding.

Add an optional field:

| Field | Type | Required | Description |
|---|---|---|---|
| `answer_alt` | array of strings, or `null` | No | Alternative acceptable answers (e.g. `["0.5", "2/4"]` if answer is `"1/2"`). |

## 6. Topic Taxonomy

Seven domains, directly mapped from official SET/NWSSEE sample materials and KS2 programme of study:

### 6.1 Topic Enum Values and Descriptions

| `topic` value | Display Name | What It Covers |
|---|---|---|
| `number_operations` | Number & Arithmetic | Multiplication, division, multi-step arithmetic, BODMAS, estimation, mental strategies, factor/last-digit reasoning |
| `fractions` | Fractions | Simplifying, equivalent fractions, multiplying fractions, fractions of amounts, mixed numbers, comparing fractions |
| `decimals` | Decimals & Place Value | Decimal arithmetic, ordering decimals, rounding, money calculations, decimal-in-context problems |
| `ratio` | Ratio & Proportion | Sharing in a ratio, scaling, unitary method, ratio direction, ratio linking to area/volume |
| `geometry` | Geometry | Angle facts (triangles, straight lines, around a point), properties of 2D/3D shapes, perimeter of compound shapes, area, volume of cuboids, "not to scale" diagram reasoning |
| `measures` | Measures & Units | Metric unit conversions (g↔kg, mm↔cm↔m, ml↔l), time arithmetic, speed–distance–time, interpreting multi-step word problems with units |
| `algebra` | Algebra & Sequences | Number sequences, find-the-rule, consecutive number problems, using letters for unknowns, simple equations, parity constraints |

### 6.2 Question Distribution

Target distribution across 210 questions, weighted by evidence of frequency in official materials:

| Topic | Walk Mode (120) | Desk Mode (90) | Total | % of Bank |
|---|---|---|---|---|
| `number_operations` | 22 | 15 | 37 | 17.6% |
| `fractions` | 20 | 15 | 35 | 16.7% |
| `decimals` | 20 | 14 | 34 | 16.2% |
| `ratio` | 18 | 13 | 31 | 14.8% |
| `geometry` | 16 | 13 | 29 | 13.8% |
| `measures` | 12 | 10 | 22 | 10.5% |
| `algebra` | 12 | 10 | 22 | 10.5% |
| **Total** | **120** | **90** | **210** | **100%** |

### 6.3 Difficulty Distribution

Within each topic, aim for approximately:
- **Difficulty 1 (warm-up):** 25% of questions — builds confidence, revises basics.
- **Difficulty 2 (exam-level):** 50% of questions — matches expected SET/NWSSEE difficulty.
- **Difficulty 3 (stretch):** 25% of questions — above exam level, for strong candidates.

## 7. User Interface Specification

### 7.1 App Shell (index.html)

On load, the app shows a **landing/home screen** with:
- App title: "11+ Maths Vault"
- Tagline: "Nonsuch-style maths practice for the walk and the desk"
- Two large, visually distinct buttons/cards:
  - **Walk Mode** — icon suggestion: footsteps or a path. Brief description: "Mental maths on the move. Parent reads, child answers."
  - **Desk Mode** — icon suggestion: pencil or notebook. Brief description: "Written problems with paper. Type your final answer."
- A small **Stats** link/icon in the header (see §7.5).
- A small **Settings** gear icon (see §7.6).

### 7.2 Walk Mode UI

#### 7.2.1 Filter Bar (top of screen)
- **Topic dropdown:** "All Topics" (default) or any single topic.
- **Difficulty dropdown:** "All" (default), "1 — Warm-up", "2 — Exam-level", "3 — Stretch".
- **Shuffle button:** Randomises the order of the filtered question set.

#### 7.2.2 Question Card (main area)
A single, full-width card dominating the screen. Designed for a parent holding a phone in one hand while walking.

**Card front (question visible, answer hidden):**
- **Topic tag** at top (e.g. "Ratio & Proportion") — small, muted, so parent can contextualise.
- **Difficulty indicator** — 1/2/3 dots or stars.
- **Question number** — e.g. "Q14 of 31" (within current filtered set).
- **Question text** — large font (minimum 18px equivalent on mobile). This is the primary content the parent reads aloud.
- **Options A–E** — listed vertically, large tap targets, clearly labelled A through E. The parent reads these out.
- **"Show Answer" button** — prominent, centred below options. The parent taps this after the child answers verbally.

**Card back (after "Show Answer" tapped):**
- **Correct answer highlighted** — the correct option (e.g. "D — 912") shown in green/success colour, bold.
- **Explanation** — step-by-step solution text. Scrollable if long.
- **Pitfall box** (if `pitfall` is not null) — a visually distinct callout (e.g. amber/warning background) showing the common error. Parent can read this as a teaching moment.
- **"Next Question" button** — advances to next question in the set.

**Quick-result buttons (shown alongside "Show Answer"):**
Before advancing, the parent marks the outcome:
- **✓ Got it** (green) — child answered correctly.
- **✗ Missed** (red) — child answered incorrectly.
- **~ Discussed** (grey/neutral) — they talked through it together, no clear right/wrong.

These feed into the progress tracker (§7.5).

#### 7.2.3 Walk Mode Navigation
- **Swipe left** or **"Next" button** → next question.
- **Swipe right** or **"Back" button** → previous question (to revisit).
- **No auto-advance.** The parent controls the pace.

#### 7.2.4 Optional Challenge Timer
- Toggled via a small clock icon in the corner.
- When ON: a countdown from `time_target_seconds` appears on the question card. Purely visual — it does not auto-advance or penalise. Just adds light pressure for speed practice.
- Default: OFF.

### 7.3 Desk Mode UI

#### 7.3.1 Filter Bar (top of screen)
Same as Walk Mode: Topic dropdown, Difficulty dropdown, Shuffle button.

Additionally:
- **Set size selector:** "Quick 5" / "Standard 10" / "Full 20" / "All" — determines how many questions in the session. Default: "Standard 10".

#### 7.3.2 Question Card (main area)
One question per screen. Designed for a child sitting at a desk, so slightly more compact than Walk Mode.

**Question display:**
- **Topic tag** at top.
- **Difficulty indicator.**
- **Question number** — e.g. "Q3 of 10".
- **Question text** — clear, readable font. Generous line spacing.
- **Unit hint** (if `unit` is not null) — shown next to the answer input, e.g. "Answer in £" or "Answer in cm".
- **Answer input field** — a single text input. Placeholder text: "Type your final answer". Large, prominent.
- **Submit button** — "Check Answer".

**After submission:**
- **Correct:** The input border turns green. A brief "Correct!" message with a tick icon.
- **Incorrect:** The input border turns red. Shows "Not quite — the answer is [answer]".
- In both cases, the **explanation** expands below.
- **Pitfall box** (if applicable) — same amber callout as Walk Mode.
- **"Next Question" button** appears.

#### 7.3.3 Desk Mode Timer
- A small timer in the top-right corner.
- **Counts UP from 0:00** (not down) — the child can self-monitor without anxiety.
- Shows the `time_target_seconds` as a subtle reference: e.g. "Target: 2:00" in muted text.
- Pauses when the answer is submitted (so review time isn't counted).

#### 7.3.4 Session Summary (End of Set)
When all questions in the set are answered, show a summary screen:

- **Score:** e.g. "7 / 10 correct (70%)"
- **Time:** Total time and average per question.
- **By topic:** Mini breakdown — e.g. "Fractions: 2/2 ✓ | Ratio: 1/3 | Geometry: 2/2 ✓ …"
- **Pitfalls triggered:** List any pitfall messages from questions the child got wrong. This is the highest-value part of the summary — it shows patterns in errors.
- **"Try Again" button** — re-do the same set (questions reshuffled).
- **"New Set" button** — return to filter bar.
- **"Review Mistakes" button** — shows only the questions answered incorrectly, with explanations.

### 7.4 Bookmarking

Both modes:
- A **star/bookmark icon** on each question card.
- Tapping it toggles the question as bookmarked.
- Bookmarked questions are saved to `localStorage`.
- A **"Bookmarked" filter option** appears in the filter bar (in both modes) to review starred questions.

### 7.5 Stats / Progress Screen

Accessible from the header. Shows:

- **Overall accuracy:** Total questions attempted, total correct, overall %.
- **By mode:** Walk Mode accuracy vs Desk Mode accuracy.
- **By topic:** A simple bar chart or table showing accuracy % per topic. Topics below 60% are highlighted as "Needs work".
- **By difficulty:** Accuracy at each difficulty level.
- **Weak spots:** The 2–3 subtopics with the lowest accuracy, presented as actionable suggestions: "You're finding speed–distance–time tricky — try 5 more Measures questions."
- **Streak:** Number of consecutive days with at least one session (motivational).
- **Reset button:** Clears all progress data (with confirmation dialog).

All data stored in `localStorage`.

### 7.6 Settings Screen

Minimal:
- **Walk Mode timer default:** ON / OFF.
- **Desk Mode set size default:** Quick 5 / Standard 10 / Full 20.
- **Reset progress** (with confirmation).

### 7.7 Responsive Design Requirements

| Breakpoint | Primary Use | Layout Notes |
|---|---|---|
| Mobile (< 640px) | Walk Mode on parent's phone | Single column. Large text. Large tap targets. Question card fills viewport. |
| Tablet (640–1024px) | Desk Mode on family tablet | Comfortable reading width. Answer input is prominent. |
| Desktop (> 1024px) | Desk Mode on laptop/desktop | Centred content column (max-width ~700px). Stats can use wider layout. |

## 8. Visual Design Direction

### 8.1 Aesthetic
- **Tone:** Friendly, confident, focused — not childish but approachable for a 10-year-old.
- **Colour scheme:** Use a warm, high-contrast palette. Suggestion: deep navy/charcoal background for the app shell with bright, distinct accent colours for each mode:
  - Walk Mode: warm amber/orange tones (energy, movement).
  - Desk Mode: cool teal/blue tones (focus, calm).
  - Correct: green. Incorrect: soft red. Pitfall: amber.
- **Typography:** A clean, highly legible sans-serif for question text (readability is paramount — children with varying reading levels will use this). A slightly more characterful font for headings/mode titles.
- **Icons:** Simple, recognisable. Footsteps for Walk, pencil for Desk, star for bookmark, chart for stats.
- **No illustrations or images in questions** — all questions are text-only (matching the exam format and keeping the app lightweight).

### 8.2 Key UI Principles
1. **One question per screen.** Never show multiple questions simultaneously.
2. **Answer is always hidden until explicitly revealed** (Walk Mode) or submitted (Desk Mode).
3. **Pitfall callouts are visually distinct** from explanations — they're the most valuable teaching element.
4. **Minimal chrome.** The question text should dominate the screen, especially in Walk Mode.
5. **No distracting animations.** Subtle transitions only (card flip, fade-in of explanation). The child should focus on maths, not UI effects.

## 9. Technical Architecture

### 9.1 Stack
- **Vanilla HTML5, CSS3, JavaScript (ES6+).** No frameworks, no build tools, no transpilation.
- **Single `index.html`** entry point.
- **CSS in `css/style.css`** — all styling in one file. Use CSS custom properties for theming.
- **JS in `js/app.js`** — all application logic and embedded question data.
- **`data/questions.json`** — reference copy of the full question dataset (same data embedded in `app.js` for zero-dependency usage).
- **No external API calls.** Everything runs client-side.
- **Hosting:** GitHub Pages (static files only).

### 9.2 Project Structure

```
11PlusMathsVault/
├── index.html              # App shell, all markup
├── css/
│   └── style.css           # All styling (CSS custom properties for theming)
├── js/
│   └── app.js              # App logic + embedded QUESTIONS array
├── data/
│   └── questions.json      # Full question dataset (reference/sync copy)
├── SPEC.md                 # This specification
├── QUESTION_GUIDELINES.md  # Guidelines for writing new questions (see §11)
├── TESTING.md              # Test plan and validation criteria (see §12)
└── README.md               # Project overview and getting started
```

### 9.3 State Management

All state is held in memory during a session and persisted to `localStorage`:

```javascript
// localStorage keys
"mathsvault_progress"    // JSON object: { [questionId]: { attempted: int, correct: int, lastResult: "correct"|"incorrect"|"discussed", lastAttempted: ISO_date } }
"mathsvault_bookmarks"   // JSON array: [questionId, questionId, ...]
"mathsvault_settings"    // JSON object: { walkTimer: bool, deskSetSize: int }
"mathsvault_streak"      // JSON object: { lastSessionDate: ISO_date, currentStreak: int }
```

### 9.4 URL Routing (Hash-Based)

Simple hash routing, no history API needed:

| Hash | Screen |
|---|---|
| `#/` or empty | Home / mode selection |
| `#/walk` | Walk Mode (with current filters) |
| `#/desk` | Desk Mode (with current filters) |
| `#/stats` | Stats / progress screen |
| `#/settings` | Settings |

## 10. Sample Questions (20 Exemplars)

These 20 questions demonstrate the expected style, difficulty range, and data format across all 7 topics and both modes. The full 210-question bank should follow these patterns.

### Walk Mode Examples (10 questions)

```json
[
  {
    "id": 1,
    "mode": "walk",
    "topic": "number_operations",
    "subtopic": "multiplication_strategies",
    "stage": "SET",
    "difficulty": 2,
    "question": "Work out 38 × 24.",
    "options": ["812", "872", "892", "912", "962"],
    "answer": "912",
    "answer_index": 3,
    "answer_display": "D",
    "explanation": "38 × 24: break it into 38 × 20 = 760, plus 38 × 4 = 152. Total: 760 + 152 = 912. Check: 40 × 24 = 960, minus 2 × 24 = 48, gives 960 − 48 = 912. ✓",
    "pitfall": "Option A (812) matches a common slip of calculating 38 × 21 instead of 38 × 24. Option E (962) is close to 40 × 24 = 960 — an estimation error.",
    "unit": null,
    "answer_alt": null,
    "time_target_seconds": 60
  },
  {
    "id": 2,
    "mode": "walk",
    "topic": "fractions",
    "subtopic": "multiply_and_simplify",
    "stage": "SET",
    "difficulty": 2,
    "question": "What is 5/10 × 3/12 in its simplest form?",
    "options": ["1/10", "1/8", "3/6", "5/4", "15/120"],
    "answer": "1/8",
    "answer_index": 1,
    "answer_display": "B",
    "explanation": "5/10 × 3/12 = 15/120. Simplify: 15/120 ÷ 15/15 = 1/8. Shortcut: cancel before multiplying — 5/10 = 1/2, and 3/12 = 1/4, so 1/2 × 1/4 = 1/8.",
    "pitfall": "Option E (15/120) is correct but not simplified — the question asks for simplest form. Always check if you can cancel.",
    "unit": null,
    "answer_alt": null,
    "time_target_seconds": 60
  },
  {
    "id": 3,
    "mode": "walk",
    "topic": "ratio",
    "subtopic": "sharing_in_a_ratio",
    "stage": "SET",
    "difficulty": 2,
    "question": "A class raises £84 for charity. They split it between two charities in the ratio 5:2. How much goes to the second charity?",
    "options": ["£12", "£24", "£28", "£60", "£72"],
    "answer": "£24",
    "answer_index": 1,
    "answer_display": "B",
    "explanation": "Total parts = 5 + 2 = 7. One part = £84 ÷ 7 = £12. Second charity gets 2 parts = 2 × £12 = £24.",
    "pitfall": "Option D (£60) is the first charity's share — make sure you read which charity the question asks about. Ratio direction matters.",
    "unit": "£",
    "answer_alt": null,
    "time_target_seconds": 60
  },
  {
    "id": 4,
    "mode": "walk",
    "topic": "geometry",
    "subtopic": "angles_in_triangle",
    "stage": "SET",
    "difficulty": 1,
    "question": "In a triangle, two angles are 35° and 70°. What is the third angle?",
    "options": ["75°", "85°", "95°", "105°", "115°"],
    "answer": "75°",
    "answer_index": 0,
    "answer_display": "A",
    "explanation": "Angles in a triangle add up to 180°. Third angle = 180 − 35 − 70 = 75°.",
    "pitfall": null,
    "unit": "°",
    "answer_alt": null,
    "time_target_seconds": 45
  },
  {
    "id": 5,
    "mode": "walk",
    "topic": "decimals",
    "subtopic": "ordering_decimals",
    "stage": "SET",
    "difficulty": 1,
    "question": "Which of these is the largest? 0.09, 0.9, 0.19, 0.091, 0.85",
    "options": ["0.09", "0.9", "0.19", "0.091", "0.85"],
    "answer": "0.9",
    "answer_index": 1,
    "answer_display": "B",
    "explanation": "Compare tenths first: 0.9 = 0.900 is the largest. 0.85 = 0.850 is next. Then 0.19, 0.091, 0.09.",
    "pitfall": "Children often think 0.19 > 0.9 because 19 > 9. But 0.9 = 0.90, which is bigger than 0.19. Write them all to the same number of decimal places to compare.",
    "unit": null,
    "answer_alt": null,
    "time_target_seconds": 45
  },
  {
    "id": 6,
    "mode": "walk",
    "topic": "measures",
    "subtopic": "unit_conversion",
    "stage": "SET",
    "difficulty": 1,
    "question": "How many grams are in 3.25 kilograms?",
    "options": ["32.5", "325", "3250", "32500", "3025"],
    "answer": "3250",
    "answer_index": 2,
    "answer_display": "C",
    "explanation": "1 kg = 1000 g, so 3.25 × 1000 = 3250 g.",
    "pitfall": "Option B (325) comes from multiplying by 100 instead of 1000. Option E (3025) comes from thinking 0.25 kg = 25 g instead of 250 g.",
    "unit": "g",
    "answer_alt": null,
    "time_target_seconds": 45
  },
  {
    "id": 7,
    "mode": "walk",
    "topic": "algebra",
    "subtopic": "consecutive_numbers",
    "stage": "SET",
    "difficulty": 2,
    "question": "Three consecutive whole numbers add up to 87. What is the largest of the three?",
    "options": ["28", "29", "30", "31", "32"],
    "answer": "30",
    "answer_index": 2,
    "answer_display": "C",
    "explanation": "Three consecutive numbers: the middle one is the average. 87 ÷ 3 = 29. So the numbers are 28, 29, 30. The largest is 30.",
    "pitfall": "If you just divide 87 ÷ 3 = 29 and stop, you've found the middle number, not the largest. Read the question carefully.",
    "unit": null,
    "answer_alt": null,
    "time_target_seconds": 60
  },
  {
    "id": 8,
    "mode": "walk",
    "topic": "number_operations",
    "subtopic": "estimation_and_checking",
    "stage": "SET",
    "difficulty": 2,
    "question": "Without calculating exactly, which of these is closest to 49 × 21?",
    "options": ["800", "900", "1000", "1100", "1200"],
    "answer": "1000",
    "answer_index": 2,
    "answer_display": "C",
    "explanation": "50 × 20 = 1000. The actual answer is 49 × 21 = 1029, so 1000 is closest.",
    "pitfall": null,
    "unit": null,
    "answer_alt": null,
    "time_target_seconds": 30
  },
  {
    "id": 9,
    "mode": "walk",
    "topic": "fractions",
    "subtopic": "fraction_of_amount",
    "stage": "SET",
    "difficulty": 2,
    "question": "What is 3/8 of 240?",
    "options": ["30", "60", "80", "90", "120"],
    "answer": "90",
    "answer_index": 3,
    "answer_display": "D",
    "explanation": "1/8 of 240 = 240 ÷ 8 = 30. So 3/8 = 3 × 30 = 90.",
    "pitfall": "Option E (120) is 1/2 of 240 — if you mix up 3/8 and 4/8. Option C (80) is 1/3 of 240 — wrong fraction entirely.",
    "unit": null,
    "answer_alt": null,
    "time_target_seconds": 45
  },
  {
    "id": 10,
    "mode": "walk",
    "topic": "geometry",
    "subtopic": "perimeter_reasoning",
    "stage": "SET",
    "difficulty": 3,
    "question": "A rectangle is 12 cm by 7 cm. A 4 cm × 2 cm rectangle is cut out of one corner, making an L-shape. What is the perimeter of the L-shape?",
    "options": ["26 cm", "34 cm", "38 cm", "42 cm", "50 cm"],
    "answer": "38 cm",
    "answer_index": 2,
    "answer_display": "C",
    "explanation": "Cutting a rectangle from a corner removes two edges (4 cm and 2 cm) but adds two new edges of the same lengths back on the inside. The perimeter stays exactly the same as the original rectangle: 2 × (12 + 7) = 38 cm.",
    "pitfall": "Many children add the cut edges ON TOP of the original perimeter (getting 38 + 4 + 2 = 44 or similar). The key insight: for a corner cut-out, perimeter is unchanged.",
    "unit": "cm",
    "answer_alt": null,
    "time_target_seconds": 90
  }
]
```

### Desk Mode Examples (10 questions)

```json
[
  {
    "id": 121,
    "mode": "desk",
    "topic": "decimals",
    "subtopic": "money_multiplication",
    "stage": "NWSSEE",
    "difficulty": 2,
    "question": "A cinema ticket costs £7.85. How much do 9 tickets cost? Give your answer in pounds.",
    "options": null,
    "answer": "70.65",
    "answer_index": null,
    "answer_display": null,
    "explanation": "Method 1: 7.85 × 9 = 7.85 × (10 − 1) = 78.50 − 7.85 = 70.65.\nMethod 2: 7 × 9 = 63, 0.85 × 9 = 7.65, total = 63 + 7.65 = 70.65.\nCheck: 9 tickets at roughly £8 each would be £72, so £70.65 is sensible. ✓",
    "pitfall": "Decimal point misplacement — the most common error flagged in official NWSSEE commentary. Writing £7.065 or £706.5 means the decimal point has shifted. Always estimate first to check your answer makes sense.",
    "unit": "£",
    "answer_alt": ["£70.65"],
    "time_target_seconds": 120
  },
  {
    "id": 122,
    "mode": "desk",
    "topic": "measures",
    "subtopic": "speed_distance_time",
    "stage": "NWSSEE",
    "difficulty": 2,
    "question": "Two cyclists start 30 km apart and ride towards each other. One rides at 18 km/h, the other at 12 km/h. How many minutes until they meet?",
    "options": null,
    "answer": "60",
    "answer_index": null,
    "answer_display": null,
    "explanation": "Closing speed = 18 + 12 = 30 km/h (they're moving towards each other, so speeds add). Time = distance ÷ speed = 30 ÷ 30 = 1 hour = 60 minutes.",
    "pitfall": "Common errors: using only one cyclist's speed (30 ÷ 18), or forgetting to convert hours to minutes when the question asks for minutes.",
    "unit": "minutes",
    "answer_alt": ["60 minutes", "60 mins"],
    "time_target_seconds": 150
  },
  {
    "id": 123,
    "mode": "desk",
    "topic": "geometry",
    "subtopic": "compound_area",
    "stage": "NWSSEE",
    "difficulty": 2,
    "question": "An L-shaped room is made from two rectangles. The overall shape is 10 m long and 6 m wide, with a 4 m × 3 m rectangle removed from one corner. What is the area of the L-shaped room in square metres?",
    "options": null,
    "answer": "48",
    "answer_index": null,
    "answer_display": null,
    "explanation": "Full rectangle area = 10 × 6 = 60 m². Removed rectangle = 4 × 3 = 12 m². L-shape area = 60 − 12 = 48 m².",
    "pitfall": "Some children try to split the L into two rectangles and add — this works too but is easier to get wrong. The subtraction method (full rectangle minus cut-out) is more reliable.",
    "unit": "m²",
    "answer_alt": ["48 m²", "48m²"],
    "time_target_seconds": 120
  },
  {
    "id": 124,
    "mode": "desk",
    "topic": "fractions",
    "subtopic": "equivalent_fractions_odd_one_out",
    "stage": "NWSSEE",
    "difficulty": 2,
    "question": "Four of these fractions are equivalent. Which is the odd one out? 2/5, 6/15, 8/20, 10/24, 14/35. Write the odd one out as a fraction.",
    "options": null,
    "answer": "10/24",
    "answer_index": null,
    "answer_display": null,
    "explanation": "2/5 = 6/15 (×3) = 8/20 (×4) = 14/35 (×7). But 10/24 simplifies to 5/12, which is not equal to 2/5. So 10/24 is the odd one out.",
    "pitfall": "Check every fraction — don't stop at the first one that looks different. 10/24 looks like it could be 2/5 × 5/5 but it isn't. Always simplify to check.",
    "unit": null,
    "answer_alt": ["10/24"],
    "time_target_seconds": 150
  },
  {
    "id": 125,
    "mode": "desk",
    "topic": "ratio",
    "subtopic": "ratio_area_volume",
    "stage": "NWSSEE",
    "difficulty": 3,
    "question": "A box has a square base with sides 6 cm and a height of 10 cm. A second box also has a square base, with sides 3 cm and a height of 10 cm. What is the ratio of the volume of the large box to the volume of the small box? Give your answer in its simplest form.",
    "options": null,
    "answer": "4:1",
    "answer_index": null,
    "answer_display": null,
    "explanation": "Large box volume = 6 × 6 × 10 = 360 cm³. Small box volume = 3 × 3 × 10 = 90 cm³. Ratio = 360:90 = 4:1 (divide both by 90).",
    "pitfall": "Children often think halving the side halves the volume — but it actually quarters the volume (because area scales as the square of the side). 2:1 is the most common wrong answer here.",
    "unit": null,
    "answer_alt": ["4 : 1", "4 to 1"],
    "time_target_seconds": 180
  },
  {
    "id": 126,
    "mode": "desk",
    "topic": "number_operations",
    "subtopic": "bodmas_brackets",
    "stage": "NWSSEE",
    "difficulty": 2,
    "question": "Work out: 5 + 3 × (12 − 4) ÷ 2",
    "options": null,
    "answer": "17",
    "answer_index": null,
    "answer_display": null,
    "explanation": "BODMAS: Brackets first: 12 − 4 = 8. Then multiplication: 3 × 8 = 24. Then division: 24 ÷ 2 = 12. Then addition: 5 + 12 = 17.",
    "pitfall": "If you work left to right without BODMAS, you might get (5 + 3) × (12 − 4) ÷ 2 = 8 × 8 ÷ 2 = 32. The order of operations matters.",
    "unit": null,
    "answer_alt": null,
    "time_target_seconds": 90
  },
  {
    "id": 127,
    "mode": "desk",
    "topic": "algebra",
    "subtopic": "consecutive_odd_numbers",
    "stage": "NWSSEE",
    "difficulty": 3,
    "question": "Five consecutive odd numbers have a sum of 275. What is the smallest of the five numbers?",
    "options": null,
    "answer": "51",
    "answer_index": null,
    "answer_display": null,
    "explanation": "The middle (3rd) number is the average: 275 ÷ 5 = 55. Consecutive odd numbers differ by 2, so the five numbers are: 51, 53, 55, 57, 59. The smallest is 51. Check: 51 + 53 + 55 + 57 + 59 = 275. ✓",
    "pitfall": "Consecutive ODD numbers differ by 2, not 1. If you use differences of 1, you get 53, 54, 55, 56, 57 — which aren't all odd.",
    "unit": null,
    "answer_alt": null,
    "time_target_seconds": 150
  },
  {
    "id": 128,
    "mode": "desk",
    "topic": "decimals",
    "subtopic": "exchange_rate",
    "stage": "NWSSEE",
    "difficulty": 2,
    "question": "The exchange rate is £1 = €1.15. Aisha changes £60 into euros. How many euros does she get?",
    "options": null,
    "answer": "69",
    "answer_index": null,
    "answer_display": null,
    "explanation": "60 × 1.15 = 60 × 1 + 60 × 0.15 = 60 + 9 = 69 euros.",
    "pitfall": "Some children divide instead of multiply. If £1 buys MORE than 1 euro, then £60 should give MORE than 60 euros. Use this sense-check to confirm you're doing the right operation.",
    "unit": "€",
    "answer_alt": ["€69", "69.00"],
    "time_target_seconds": 120
  },
  {
    "id": 129,
    "mode": "desk",
    "topic": "measures",
    "subtopic": "multi_step_unit_conversion",
    "stage": "NWSSEE",
    "difficulty": 2,
    "question": "A recipe uses 750 g of flour. Priya makes 3 batches. How many kilograms of flour does she use in total?",
    "options": null,
    "answer": "2.25",
    "answer_index": null,
    "answer_display": null,
    "explanation": "3 batches = 3 × 750 = 2250 g. Convert to kg: 2250 ÷ 1000 = 2.25 kg.",
    "pitfall": "Forgetting to convert grams to kilograms — giving 2250 as the answer when the question asks for kg. Always check the unit the question asks for.",
    "unit": "kg",
    "answer_alt": ["2.25 kg", "2.250"],
    "time_target_seconds": 90
  },
  {
    "id": 130,
    "mode": "desk",
    "topic": "ratio",
    "subtopic": "ratio_with_total",
    "stage": "NWSSEE",
    "difficulty": 1,
    "question": "Red and blue beads are in the ratio 3:5. There are 40 beads in total. How many blue beads are there?",
    "options": null,
    "answer": "25",
    "answer_index": null,
    "answer_display": null,
    "explanation": "Total parts = 3 + 5 = 8. One part = 40 ÷ 8 = 5. Blue beads = 5 parts = 5 × 5 = 25.",
    "pitfall": "Giving the number of red beads (15) instead of blue. Always re-read which quantity the question asks for after you've done the calculation.",
    "unit": null,
    "answer_alt": null,
    "time_target_seconds": 90
  }
]
```

## 11. Question Writing Guidelines

When creating the full 210-question bank, follow these rules:

### 11.1 General Rules
1. **All questions must be original.** Do not copy from any published exam paper, textbook, or website.
2. **All questions must be solvable using KS2 knowledge only.** No secondary-school content (e.g. no Pythagoras, no algebra with powers, no trigonometry).
3. **Every Walk Mode question must be solvable in the head** — no long multiplication beyond 2-digit × 1-digit, no complex written methods. If you need paper, it belongs in Desk Mode.
4. **Every Desk Mode question should require at least 2 steps.** Single-step calculations belong in Walk Mode.
5. **Pitfall-first design:** Before writing the question, decide which common error it targets. Then write the question (and MCQ distractors) to expose that error. Reference official NWSSEE/SET commentary pitfalls where possible.
6. **Questions must be self-contained.** No references to images, diagrams, or external materials. Describe shapes in words.
7. **Vary the question phrasing.** Don't always use "Work out…" — use "What is…", "How many…", "Find…", "Calculate…", "Which of these…" etc.

### 11.2 Walk Mode MCQ Rules
1. Exactly 5 options (A–E), matching SET format.
2. One and only one correct answer.
3. At least 2 distractors should correspond to common errors (not random numbers).
4. Options should be in numerical order where possible (ascending or descending).
5. The correct answer should be evenly distributed across positions A–E across the full question bank.

### 11.3 Desk Mode Answer Rules
1. The `answer` field must be the simplest/most natural form of the answer.
2. If the answer is a fraction, it must be in simplest form (and the question must say "in simplest form" or "in its simplest form").
3. If the answer requires a unit, the `unit` field must be set and the question must specify the unit ("Give your answer in cm").
4. The `answer_alt` array should capture all reasonable formats a child might type.

### 11.4 Explanation Style
1. Written for a Year 5/6 child — clear, step-by-step, no jargon.
2. Include at least one alternative method or shortcut where applicable.
3. End with a sense-check where possible ("Check: £70.65 is close to £72, which is 9 × £8 ✓").
4. Maximum ~100 words per explanation.

## 12. Testing & Validation Plan

### 12.1 Data Integrity Tests

Run these checks against `questions.json` programmatically:

| # | Test | Expected |
|---|---|---|
| D1 | Total question count | Exactly 210 |
| D2 | Walk Mode count | Exactly 120 |
| D3 | Desk Mode count | Exactly 90 |
| D4 | All IDs unique | No duplicates |
| D5 | Walk Mode IDs range | 1–120 |
| D6 | Desk Mode IDs range | 121–210 |
| D7 | All required fields present | Every question has: id, mode, topic, subtopic, stage, difficulty, question, options, answer, answer_index, answer_display, explanation, time_target_seconds |
| D8 | `mode` values | Only `"walk"` or `"desk"` |
| D9 | `topic` values | Only the 7 enum values from §6.1 |
| D10 | `stage` values | Only `"SET"` or `"NWSSEE"` |
| D11 | `difficulty` values | Only 1, 2, or 3 |
| D12 | Walk Mode: `options` is array of 5 strings | No nulls, exactly 5 items |
| D13 | Walk Mode: `answer` is in `options` | `options[answer_index] === answer` |
| D14 | Walk Mode: `answer_index` is 0–4 | Valid index |
| D15 | Walk Mode: `answer_display` is A–E | Matches `answer_index` (0→A, 1→B, etc.) |
| D16 | Desk Mode: `options` is null | Not an array |
| D17 | Desk Mode: `answer_index` is null | Not a number |
| D18 | Desk Mode: `answer_display` is null | Not a string |
| D19 | Topic distribution | Within ±2 of targets in §6.2 |
| D20 | Difficulty distribution per topic | Roughly 25/50/25 split (±10%) |
| D21 | `time_target_seconds` range | Walk: 30–90. Desk: 60–300. |
| D22 | `answer_display` distribution (Walk Mode) | A–E each used 20–28 times (roughly even) |
| D23 | `explanation` length | 20–150 words per explanation |
| D24 | No duplicate questions | No two questions have identical `question` text |

### 12.2 UI / Functional Tests

| # | Test | Steps | Expected Result |
|---|---|---|---|
| F1 | Home screen loads | Open index.html | Shows app title, Walk Mode and Desk Mode buttons, Stats link |
| F2 | Walk Mode entry | Click Walk Mode button | Shows filter bar + first question card with options A–E + "Show Answer" button |
| F3 | Walk Mode answer reveal | Tap "Show Answer" | Correct answer highlighted. Explanation shown. Pitfall box shown (if applicable). Quick-result buttons (✓/✗/~) appear. |
| F4 | Walk Mode navigation | Tap "Next" | Advances to next question. Previous answer state is not visible. |
| F5 | Walk Mode topic filter | Select "Fractions" from dropdown | Only fractions questions shown. Question counter updates (e.g. "Q1 of 20"). |
| F6 | Walk Mode difficulty filter | Select "3 — Stretch" | Only difficulty 3 questions shown. |
| F7 | Walk Mode shuffle | Tap Shuffle | Question order randomised. First question changes. |
| F8 | Desk Mode entry | Click Desk Mode button | Shows filter bar + set size selector + first question with answer input field |
| F9 | Desk Mode correct answer | Type correct answer, click "Check Answer" | Green border, "Correct!" message, explanation shown. |
| F10 | Desk Mode incorrect answer | Type wrong answer, click "Check Answer" | Red border, shows correct answer, explanation shown. |
| F11 | Desk Mode answer validation | Type "70.65" when answer is "70.65" | Correct. |
| F12 | Desk Mode answer validation (with unit) | Type "£70.65" when answer is "70.65" and unit is "£" | Correct (unit stripped). |
| F13 | Desk Mode answer validation (trailing zero) | Type "70.650" when answer is "70.65" | Correct. |
| F14 | Desk Mode session summary | Complete a "Quick 5" set | Shows score, time, topic breakdown, pitfalls triggered, "Try Again" / "New Set" / "Review Mistakes" buttons. |
| F15 | Desk Mode "Review Mistakes" | Click "Review Mistakes" after a set | Shows only incorrectly answered questions with explanations. |
| F16 | Bookmark toggle | Tap star icon on a question | Star fills/unfills. Question appears/disappears from "Bookmarked" filter. |
| F17 | Stats screen | Navigate to Stats | Shows overall accuracy, by mode, by topic, weak spots, streak. |
| F18 | Progress persistence | Answer 5 questions, close browser, reopen | Stats and bookmarks are preserved. |
| F19 | Settings | Open Settings | Walk timer toggle and desk set size defaults are shown and functional. |
| F20 | Reset progress | Settings → Reset → Confirm | All localStorage data cleared. Stats show zero. |

### 12.3 Responsive Tests

| # | Test | Viewport | Expected |
|---|---|---|---|
| R1 | Walk Mode mobile | 375 × 667 (iPhone SE) | Question card fills viewport. Text is ≥18px. Options have large tap targets. No horizontal scroll. |
| R2 | Walk Mode mobile landscape | 667 × 375 | Usable, scrollable. No layout breakage. |
| R3 | Desk Mode tablet | 768 × 1024 (iPad) | Comfortable reading width. Answer input is prominent. |
| R4 | Desk Mode desktop | 1440 × 900 | Content centred, max-width ~700px. Stats can use wider layout. |
| R5 | Home screen mobile | 375 × 667 | Both mode buttons visible without scrolling. |

### 12.4 Mathematical Correctness Tests

For every question in the bank, verify:

| # | Test |
|---|---|
| M1 | The `answer` is mathematically correct for the given `question`. |
| M2 | The `explanation` arrives at the same answer through valid working. |
| M3 | For Walk Mode: no other option is also a correct answer. |
| M4 | For Desk Mode: all entries in `answer_alt` are mathematically equivalent to `answer`. |
| M5 | The `pitfall` describes a genuinely common error (not an implausible mistake). |
| M6 | The `difficulty` rating is appropriate (1 = solvable by an average Y5, 3 = challenging for a strong Y6). |
| M7 | Walk Mode questions are genuinely solvable without paper. |

### 12.5 Validation Script

A standalone validation script (`validate.js`) should be created that:
1. Loads `data/questions.json`.
2. Runs all D1–D24 data integrity checks.
3. Outputs PASS/FAIL for each check with details of any failures.
4. Can be run via `node validate.js` with no dependencies.

```javascript
// Example structure for validate.js
const questions = require('./data/questions.json');

function runTests(questions) {
  const results = [];

  // D1: Total count
  results.push({
    id: 'D1',
    name: 'Total question count',
    pass: questions.length === 210,
    detail: `Found ${questions.length}, expected 210`
  });

  // D2: Walk Mode count
  const walkCount = questions.filter(q => q.mode === 'walk').length;
  results.push({
    id: 'D2',
    name: 'Walk Mode count',
    pass: walkCount === 120,
    detail: `Found ${walkCount}, expected 120`
  });

  // ... (all other tests)

  return results;
}

const results = runTests(questions);
results.forEach(r => {
  console.log(`${r.pass ? 'PASS' : 'FAIL'} [${r.id}] ${r.name} — ${r.detail}`);
});

const failures = results.filter(r => !r.pass);
if (failures.length > 0) {
  console.log(`\n${failures.length} test(s) FAILED.`);
  process.exit(1);
} else {
  console.log(`\nAll ${results.length} tests PASSED.`);
}
```

## 13. Out of Scope (Explicitly Not Included)

To keep the project lightweight and aligned with VocabVault's philosophy:

- **No backend / server.** Everything is client-side.
- **No user accounts or authentication.** Progress is device-local only.
- **No AI-generated questions at runtime.** All 210 questions are pre-authored and static.
- **No images or diagrams.** Questions are text-only.
- **No sound or audio.** The parent reads Walk Mode questions aloud.
- **No leaderboards or multiplayer.** This is a personal practice tool.
- **No English questions.** This app covers maths only (English is handled separately).
- **No print/export feature** (may be added later).

## 14. Future Enhancements (Post-V1)

Not in scope for initial build, but designed to be easily added:

1. **More questions:** The data schema supports unlimited additions. Aim for 500+ eventually.
2. **Spaced repetition:** Prioritise questions the child has previously got wrong.
3. **Timed mock test mode:** A fixed set of 25 questions in 25 minutes, mimicking SET conditions.
4. **Parent dashboard:** More detailed analytics (time trends, topic improvement over weeks).
5. **Print worksheets:** Generate a printable PDF of selected questions for offline practice.
6. **Share progress:** Export stats as an image or text summary to share with a tutor.

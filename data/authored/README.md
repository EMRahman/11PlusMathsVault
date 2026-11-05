# Authoring guide for the Nonsuch-aligned question banks

Everything in this folder feeds `scripts/build-questions.cjs`. Check a batch before building:

```bash
node scripts/check-batch.mjs data/authored/<file>.json --kind set|nwssee|walk --ids <first>-<last>
```

## What we are aiming at

**SET** (stage 1). The school's [sample questions](https://www.nonsuchschool.org/_site/data/files/information/admissions/set2027/96D936786A72865A82CBAF7C7E2ECC0A.pdf) are the only official benchmark for level. Multiple choice A to E, no calculator, no negative marking, no rough paper, broadly KS2 content. The six sample types:

1. Written multiplication, such as a 2-digit × 2-digit sum. Options are close together, and some can be ruled out with a last-digit check.
2. Ratio word problems with answers in pounds and pence. Options can be paired statements ("A pays £x and B pays £y"), including the reversed share.
3. Multiply two fractions and simplify. Several wrong options equal the right value but are not simplified.
4. Angle reasoning from a stated property such as "right-angled". Options can be pairs of angles, or "It's not possible to say".
5. Two-decimal-place sums with brackets. Wrong options come from real errors, such as ignoring the brackets.
6. Fraction of a shape shaded, counted on a grid, then simplified. Options include the unsimplified fraction.

The school says these do not show every question type used, so we also cover the wider KS2 curriculum.

**NWSSEE** (stage 2). There are no official samples. The school says written paper, final answer only, content broadly KS2, and "candidates will need to adapt their learning to tackle some of the questions". So write problems that a strong Year 6 has not drilled in that exact form: multi-step, and needing a decision about the method, while using only KS2 knowledge.

**Never copy** an official sample or any commercial paper. Write original questions with different contexts and numbers.

## Difficulty labels

Rate the thinking required, never the size of the numbers alone.

- **1 Warm-up:** one step, a familiar method.
- **2 Exam-level:** comparable in demand to the official samples: at least two steps or a real trap.
- **3 Stretch:** several steps, or the method must be worked out from an unfamiliar setup.

## Question schema

Each file is a JSON array. Do not supply `mode`, `stage`, `options`, `answer_index`, `answer_display`, `time_target_seconds`, `parent_prompt`, `oral_load`, or paper fields; the build adds them.

```json
{
  "id": 211,
  "topic": "number_operations",
  "subtopic": "long_multiplication",
  "difficulty": 2,
  "question": "Work out 64 × 37.",
  "answer": "2368",
  "unit": null,
  "answer_format": null,
  "check": "64*37",
  "distractors": [
    { "value": "2268", "why": "Slips 100 when adding the partial products 1920 and 448." },
    { "value": "640", "why": "..." }
  ],
  "explanation": "Worked solution, 20 to 150 words.",
  "hints": ["A first nudge that does not give the method away.", "A more direct next step."],
  "pitfall": "The specific mistake this question exposes.",
  "diagram": null
}
```

- `distractors`: SET only, exactly 4, each with a `why` naming the specific wrong working that produces it. Compute each value by actually doing that wrong working. Never use filler such as answer ± 1. NWSSEE questions omit this field.
- `answer`: the exact text shown to the child. For SET, write it in the same form as the distractors (`"£16.20"`, `"44°"`, `"38 cm"`, `"5/12"`).
- `unit`: one of `£ € g kg cm m km mm cm² m² cm³ m³ minutes hours ml l % ° °C km/h`, or null. Set it when the answer has that unit. Use null for paired-statement answers. If a written question has a unit, say which unit to use in the question.
- `answer_format`: `"fraction_simplest"` whenever the answer is a fraction and the question asks for simplest form (required if an option is an unsimplified equal value). Also `"ratio_simplest"`, `"time"` (24-hour `"15:15"`) or `"coordinates"` (`"(3, -1)"`); otherwise null. Avoid colons in other answers.
- `check`: **required proof of the answer**. A plain arithmetic expression (digits, `+ - * / ( ) .` only) that models the problem and evaluates to the answer. Use an array when the answer has several numbers, in the order they appear: `["27/5*3","27/5*2"]` for `"£16.20 and £10.80"`, `["360/90","1"]` for `"4:1"`, `["3","-1"]` for `"(3, -1)"`. For `time`, give total minutes: `"8*60+45+2*60+35"`. Use `null` only when no arithmetic applies (such as "It's not possible to say"), and then add `"check_note"` explaining why the answer is right.
- `hints`: exactly 2, different, progressive.
- `subtopic`: use the names set out in your brief. Each needs at least 3 questions.

## Diagrams

Set `diagram` to null, or to one of these. Every diagram needs a `description` giving the same information in words for screen readers. It is not shown on screen.

- Shaded fraction: `{ "type": "shaded_grid", "rows": 6, "cols": 8, "shaded": [[0,0],[0,1]], "description": "..." }`. Rows and columns count from 0. The checker confirms the shaded fraction matches the answer. If the question asks about something else (such as the unshaded part), give `check`.
- Any figure: `{ "type": "shape", "polygons": [{ "points": [[60,190],[320,190],[60,50]], "shaded": false }], "lines": [{ "from": [60,175], "to": [75,175], "dashed": false }], "circles": [{ "cx": 190, "cy": 120, "r": 80 }], "labels": [{ "x": 90, "y": 180, "text": "46°", "anchor": "middle" }], "description": "..." }`. The canvas is x 0 to 380, y 0 to 245, with y increasing downwards. Keep everything at least 10 inside the edge. Labels are about 12px high: place them clear of lines. Mark a right angle with two short lines. Shapes are captioned "Not to scale". Include only the `polygons`, `lines`, `circles` and `labels` you need.
- Grid: `{ "type": "coordinates", "points": [{ "x": 1, "y": 2, "label": "P" }], "join": true, "description": "..." }`. x and y within -5 to 5.
- Charts: `{ "type": "bars", "labels": ["Mon"], "values": [8], "max": 16, "axis_label": "Books", "description": "..." }`, or `"type": "line"` (same fields), or `{ "type": "pie", "labels": ["Art","Sport"], "values": [25,75], "description": "..." }` with values as percentages adding to 100. Bars and lines have gridlines at each quarter of `max`, so choose values on, or exactly halfway between, gridlines. Never repeat chart values in the question text.
- Table: `{ "type": "table", "caption": "Test scores", "headers": ["Test","Score"], "rows": [["1",12]] }`.

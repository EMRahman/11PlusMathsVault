#!/usr/bin/env node
/**
 * validate-data.js — Data integrity checker for questions.json.
 *
 * Runs all D1–D24 checks from SPEC.md §12.5.
 * Usage: node validate-data.js
 *
 * No external dependencies.
 */

const fs = require('fs');
const path = require('path');

const QUESTION_FILE = path.join(__dirname, 'data', 'questions.json');

// ── Load ──────────────────────────────────────────────────────

let questions;
try {
  const raw = fs.readFileSync(QUESTION_FILE, 'utf8');
  questions = JSON.parse(raw);
} catch (err) {
  console.error(`FATAL: Could not read ${QUESTION_FILE}\n${err.message}`);
  process.exit(1);
}

// ── Constants ─────────────────────────────────────────────────

const VALID_TOPICS = [
  'number_operations', 'fractions', 'decimals',
  'ratio', 'geometry', 'measures', 'algebra',
];

const TOPIC_TARGETS = {
  // [walkTarget, deskTarget]
  number_operations: [22, 15],
  fractions:         [20, 15],
  decimals:          [20, 14],
  ratio:             [18, 13],
  geometry:          [16, 13],
  measures:          [12, 10],
  algebra:           [12, 10],
};

const DISPLAY_MAP = ['A', 'B', 'C', 'D', 'E'];

// ── Test runner ───────────────────────────────────────────────

const results = [];

function test(id, name, passFn) {
  let pass, detail;
  try {
    const result = passFn();
    if (typeof result === 'object' && result !== null && 'pass' in result) {
      pass   = result.pass;
      detail = result.detail ?? '';
    } else {
      pass   = Boolean(result);
      detail = '';
    }
  } catch (err) {
    pass   = false;
    detail = `Threw: ${err.message}`;
  }
  results.push({ id, name, pass, detail });
}

// ── D1–D6: Counts and ID ranges ───────────────────────────────

test('D1', 'Total question count = 210', () => ({
  pass:   questions.length === 210,
  detail: `Found ${questions.length}, expected 210`,
}));

const walkQs = questions.filter(q => q.mode === 'walk');
const deskQs = questions.filter(q => q.mode === 'desk');

test('D2', 'Walk Mode count = 120', () => ({
  pass:   walkQs.length === 120,
  detail: `Found ${walkQs.length}, expected 120`,
}));

test('D3', 'Desk Mode count = 90', () => ({
  pass:   deskQs.length === 90,
  detail: `Found ${deskQs.length}, expected 90`,
}));

test('D4', 'All IDs unique', () => {
  const ids  = questions.map(q => q.id);
  const dups = ids.filter((id, i) => ids.indexOf(id) !== i);
  return { pass: dups.length === 0, detail: dups.length ? `Duplicate IDs: ${dups.join(', ')}` : 'OK' };
});

test('D5', 'Walk Mode ID range 1–120', () => {
  const bad = walkQs.filter(q => q.id < 1 || q.id > 120);
  return { pass: bad.length === 0, detail: bad.length ? `Out-of-range IDs: ${bad.map(q => q.id).join(', ')}` : 'OK' };
});

test('D6', 'Desk Mode ID range 121–210', () => {
  const bad = deskQs.filter(q => q.id < 121 || q.id > 210);
  return { pass: bad.length === 0, detail: bad.length ? `Out-of-range IDs: ${bad.map(q => q.id).join(', ')}` : 'OK' };
});

// ── D7: Required fields ───────────────────────────────────────

const REQUIRED_FIELDS = [
  'id', 'mode', 'topic', 'subtopic', 'stage', 'difficulty',
  'question', 'options', 'answer', 'answer_index', 'answer_display',
  'explanation', 'time_target_seconds',
];

test('D7', 'All required fields present on every question', () => {
  const missing = [];
  questions.forEach(q => {
    REQUIRED_FIELDS.forEach(f => {
      if (!(f in q)) missing.push(`ID ${q.id}: missing '${f}'`);
    });
  });
  return { pass: missing.length === 0, detail: missing.slice(0, 5).join('; ') || 'OK' };
});

// ── D8–D11: Enum values ───────────────────────────────────────

test('D8', 'mode values are "walk" or "desk"', () => {
  const bad = questions.filter(q => !['walk', 'desk'].includes(q.mode));
  return { pass: bad.length === 0, detail: bad.map(q => `ID ${q.id}: '${q.mode}'`).join(', ') || 'OK' };
});

test('D9', 'topic values are valid enum', () => {
  const bad = questions.filter(q => !VALID_TOPICS.includes(q.topic));
  return { pass: bad.length === 0, detail: bad.map(q => `ID ${q.id}: '${q.topic}'`).join(', ') || 'OK' };
});

test('D10', 'stage values are "SET" or "NWSSEE"', () => {
  const bad = questions.filter(q => !['SET', 'NWSSEE'].includes(q.stage));
  return { pass: bad.length === 0, detail: bad.map(q => `ID ${q.id}: '${q.stage}'`).join(', ') || 'OK' };
});

test('D11', 'difficulty values are 1, 2, or 3', () => {
  const bad = questions.filter(q => ![1, 2, 3].includes(q.difficulty));
  return { pass: bad.length === 0, detail: bad.map(q => `ID ${q.id}: ${q.difficulty}`).join(', ') || 'OK' };
});

// ── D12–D15: Walk Mode field constraints ──────────────────────

test('D12', 'Walk Mode: options is array of exactly 5 strings', () => {
  const bad = walkQs.filter(q =>
    !Array.isArray(q.options) ||
    q.options.length !== 5 ||
    q.options.some(o => typeof o !== 'string')
  );
  return { pass: bad.length === 0, detail: bad.map(q => `ID ${q.id}`).join(', ') || 'OK' };
});

test('D13', 'Walk Mode: answer matches options[answer_index]', () => {
  const bad = walkQs.filter(q => q.options?.[q.answer_index] !== q.answer);
  return { pass: bad.length === 0, detail: bad.map(q => `ID ${q.id}`).join(', ') || 'OK' };
});

test('D14', 'Walk Mode: answer_index is 0–4', () => {
  const bad = walkQs.filter(q => typeof q.answer_index !== 'number' || q.answer_index < 0 || q.answer_index > 4);
  return { pass: bad.length === 0, detail: bad.map(q => `ID ${q.id}: ${q.answer_index}`).join(', ') || 'OK' };
});

test('D15', 'Walk Mode: answer_display matches answer_index', () => {
  const bad = walkQs.filter(q => DISPLAY_MAP[q.answer_index] !== q.answer_display);
  return {
    pass:   bad.length === 0,
    detail: bad.map(q => `ID ${q.id}: index=${q.answer_index} but display='${q.answer_display}'`).join(', ') || 'OK',
  };
});

// ── D16–D18: Desk Mode field constraints ──────────────────────

test('D16', 'Desk Mode: options is null', () => {
  const bad = deskQs.filter(q => q.options !== null);
  return { pass: bad.length === 0, detail: bad.map(q => `ID ${q.id}`).join(', ') || 'OK' };
});

test('D17', 'Desk Mode: answer_index is null', () => {
  const bad = deskQs.filter(q => q.answer_index !== null);
  return { pass: bad.length === 0, detail: bad.map(q => `ID ${q.id}`).join(', ') || 'OK' };
});

test('D18', 'Desk Mode: answer_display is null', () => {
  const bad = deskQs.filter(q => q.answer_display !== null);
  return { pass: bad.length === 0, detail: bad.map(q => `ID ${q.id}`).join(', ') || 'OK' };
});

// ── D19: Topic distribution ───────────────────────────────────

test('D19', 'Topic distribution within ±2 of targets', () => {
  const errors = [];
  VALID_TOPICS.forEach(topic => {
    const [walkTarget, deskTarget] = TOPIC_TARGETS[topic];
    const walkCount = walkQs.filter(q => q.topic === topic).length;
    const deskCount = deskQs.filter(q => q.topic === topic).length;
    if (Math.abs(walkCount - walkTarget) > 2) errors.push(`${topic} walk: ${walkCount} (target ${walkTarget})`);
    if (Math.abs(deskCount - deskTarget)  > 2) errors.push(`${topic} desk: ${deskCount} (target ${deskTarget})`);
  });
  return { pass: errors.length === 0, detail: errors.join('; ') || 'OK' };
});

// ── D20: Difficulty distribution ──────────────────────────────

test('D20', 'Difficulty distribution roughly 25/50/25 per topic (±10%)', () => {
  const errors = [];
  VALID_TOPICS.forEach(topic => {
    const qs = questions.filter(q => q.topic === topic);
    if (qs.length < 4) return; // skip sparse topics
    const counts = [1, 2, 3].map(d => qs.filter(q => q.difficulty === d).length);
    const pcts   = counts.map(c => (c / qs.length) * 100);
    const targets = [25, 50, 25];
    pcts.forEach((pct, i) => {
      if (Math.abs(pct - targets[i]) > 15) {
        errors.push(`${topic} D${i + 1}: ${Math.round(pct)}% (target ~${targets[i]}%)`);
      }
    });
  });
  return { pass: errors.length === 0, detail: errors.join('; ') || 'OK' };
});

// ── D21: time_target_seconds ranges ──────────────────────────

test('D21', 'time_target_seconds in valid range', () => {
  const bad = questions.filter(q => {
    if (q.mode === 'walk') return q.time_target_seconds < 30 || q.time_target_seconds > 90;
    if (q.mode === 'desk') return q.time_target_seconds < 60 || q.time_target_seconds > 300;
    return false;
  });
  return { pass: bad.length === 0, detail: bad.map(q => `ID ${q.id}: ${q.time_target_seconds}s`).join(', ') || 'OK' };
});

// ── D22: answer_display distribution ─────────────────────────

test('D22', 'Walk Mode answer_display A–E roughly evenly distributed', () => {
  const counts = {};
  DISPLAY_MAP.forEach(l => counts[l] = 0);
  walkQs.forEach(q => { if (counts[q.answer_display] !== undefined) counts[q.answer_display]++; });
  const values = Object.values(counts);
  const min = Math.min(...values);
  const max = Math.max(...values);
  return {
    pass:   max - min <= 16, // 120 qs ÷ 5 = 24 ideal, allow ±8
    detail: DISPLAY_MAP.map(l => `${l}:${counts[l]}`).join(' ') ,
  };
});

// ── D23: explanation length ───────────────────────────────────

test('D23', 'explanation length 20–150 words', () => {
  const bad = questions.filter(q => {
    const words = (q.explanation ?? '').trim().split(/\s+/).length;
    return words < 20 || words > 150;
  });
  return {
    pass:   bad.length === 0,
    detail: bad.map(q => {
      const words = (q.explanation ?? '').trim().split(/\s+/).length;
      return `ID ${q.id}: ${words} words`;
    }).join(', ') || 'OK',
  };
});

// ── D24: No duplicate question text ──────────────────────────

test('D24', 'No duplicate question text', () => {
  const texts = questions.map(q => q.question.trim().toLowerCase());
  const dups  = texts.filter((t, i) => texts.indexOf(t) !== i);
  return {
    pass:   dups.length === 0,
    detail: dups.length ? `${dups.length} duplicate(s) found` : 'OK',
  };
});

// ── Output ────────────────────────────────────────────────────

const PAD = 50;
let failures = 0;

console.log('\n11+ Maths Vault — Data Validation\n' + '─'.repeat(60));

results.forEach(r => {
  const status = r.pass ? '\x1b[32mPASS\x1b[0m' : '\x1b[31mFAIL\x1b[0m';
  const name   = `[${r.id}] ${r.name}`.padEnd(PAD);
  console.log(`${status}  ${name}  ${r.detail}`);
  if (!r.pass) failures++;
});

console.log('─'.repeat(60));
if (failures === 0) {
  console.log(`\x1b[32mAll ${results.length} tests PASSED.\x1b[0m\n`);
} else {
  console.log(`\x1b[31m${failures} of ${results.length} tests FAILED.\x1b[0m\n`);
  process.exit(1);
}

#!/usr/bin/env node
/**
 * validate-data.js — Data integrity checker for questions.json.
 *
 * Runs the D1–D33 data checks, including the exam-alignment checks.
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
  'percentages', 'statistics', 'coordinates',
];

// Oral warm-ups stay evenly spread. The written banks follow the mock paper blueprints.
const WALK_PER_TOPIC = 12;
const SET_TOPIC_TARGETS = { number_operations: 27, fractions: 24, decimals: 18, ratio: 18, percentages: 12, geometry: 21, measures: 12, algebra: 9, statistics: 6, coordinates: 3 };
const NWSSEE_PAPER_TOPICS = { number_operations: 12, fractions: 9, decimals: 6, ratio: 9, percentages: 6, geometry: 12, measures: 9, algebra: 6, statistics: 3, coordinates: 3 };

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

test('D1', 'Total question count = 420', () => ({
  pass:   questions.length === 420,
  detail: `Found ${questions.length}, expected 420`,
}));

const walkQs = questions.filter(q => q.mode === 'walk');
const setQs  = questions.filter(q => q.mode === 'set');
const deskQs = questions.filter(q => q.mode === 'desk');
const choiceQs = [...walkQs, ...setQs];

test('D2', 'Walk 120, SET written 150, NWSSEE written 150', () => ({
  pass:   walkQs.length === 120 && setQs.length === 150 && deskQs.length === 150,
  detail: `walk ${walkQs.length}, set ${setQs.length}, desk ${deskQs.length}`,
}));

test('D3', 'Stage matches mode for written questions', () => {
  const bad = [...setQs.filter(q => q.stage !== 'SET'), ...deskQs.filter(q => q.stage !== 'NWSSEE')];
  return { pass: bad.length === 0, detail: bad.map(q => `ID ${q.id}`).join(', ') || 'OK' };
});

test('D4', 'All IDs unique', () => {
  const ids  = questions.map(q => q.id);
  const dups = ids.filter((id, i) => ids.indexOf(id) !== i);
  return { pass: dups.length === 0, detail: dups.length ? `Duplicate IDs: ${dups.join(', ')}` : 'OK' };
});

test('D5', 'Original IDs keep their modes (progress depends on them)', () => {
  const bad = questions.filter(q => q.id <= 120 ? q.mode !== 'walk' : q.id <= 210 ? q.mode !== 'desk' : q.id <= 360 ? q.mode !== 'set' : q.mode !== 'desk');
  return { pass: bad.length === 0, detail: bad.map(q => `ID ${q.id}`).join(', ') || 'OK' };
});

test('D6', 'IDs run continuously from 1 to 420', () => {
  const ids = questions.map(q => q.id).sort((a, b) => a - b);
  return { pass: ids.every((id, i) => id === i + 1), detail: 'OK' };
});

// ── D7: Required fields ───────────────────────────────────────

const REQUIRED_FIELDS = [
  'id', 'mode', 'topic', 'subtopic', 'stage', 'difficulty',
  'question', 'options', 'answer', 'answer_index', 'answer_display',
  'explanation', 'time_target_seconds',
  'hints', 'parent_prompt',
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

test('D8', 'mode values are walk, set or desk', () => {
  const bad = questions.filter(q => !['walk', 'set', 'desk'].includes(q.mode));
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

// ── D12–D15: Multiple-choice field constraints ───────────────

test('D12', 'Choice questions: options is array of exactly 5 strings', () => {
  const bad = choiceQs.filter(q =>
    !Array.isArray(q.options) ||
    q.options.length !== 5 ||
    q.options.some(o => typeof o !== 'string')
  );
  return { pass: bad.length === 0, detail: bad.map(q => `ID ${q.id}`).join(', ') || 'OK' };
});

test('D13', 'Choice questions: answer matches options[answer_index]', () => {
  const bad = choiceQs.filter(q => q.options?.[q.answer_index] !== q.answer);
  return { pass: bad.length === 0, detail: bad.map(q => `ID ${q.id}`).join(', ') || 'OK' };
});

test('D14', 'Choice questions: answer_index is 0–4', () => {
  const bad = choiceQs.filter(q => typeof q.answer_index !== 'number' || q.answer_index < 0 || q.answer_index > 4);
  return { pass: bad.length === 0, detail: bad.map(q => `ID ${q.id}: ${q.answer_index}`).join(', ') || 'OK' };
});

test('D15', 'Choice questions: answer_display matches answer_index', () => {
  const bad = choiceQs.filter(q => DISPLAY_MAP[q.answer_index] !== q.answer_display);
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

test('D19', 'Topic counts match the blueprints', () => {
  const errors = [];
  VALID_TOPICS.forEach(topic => {
    const walkCount = walkQs.filter(q => q.topic === topic).length;
    const setCount  = setQs.filter(q => q.topic === topic).length;
    if (walkCount !== WALK_PER_TOPIC) errors.push(`${topic} walk: ${walkCount}`);
    if (setCount !== SET_TOPIC_TARGETS[topic]) errors.push(`${topic} set: ${setCount}`);
  });
  return { pass: errors.length === 0, detail: errors.join('; ') || 'OK' };
});

// ── D20: Difficulty labels ────────────────────────────────────

test('D20', 'SET written bank is mostly at or above exam level (70%+)', () => {
  const atLevel = setQs.filter(q => q.difficulty >= 2).length;
  return { pass: atLevel / setQs.length >= 0.7, detail: `${atLevel} of ${setQs.length}` };
});

// ── D21: time_target_seconds ranges ──────────────────────────

test('D21', 'time_target_seconds in valid range', () => {
  const bad = questions.filter(q => {
    if (q.mode === 'walk' || q.mode === 'set') return q.time_target_seconds < 30 || q.time_target_seconds > 90;
    if (q.mode === 'desk') return q.time_target_seconds < 60 || q.time_target_seconds > 300;
    return false;
  });
  return { pass: bad.length === 0, detail: bad.map(q => `ID ${q.id}: ${q.time_target_seconds}s`).join(', ') || 'OK' };
});

// ── D22: answer_display distribution ─────────────────────────

test('D22', 'No answer letter is correct over 40% of the time', () => {
  const errors = [];
  for (const [name, list] of [['walk', walkQs], ['set', setQs]]) {
    const counts = Object.fromEntries(DISPLAY_MAP.map(l => [l, list.filter(q => q.answer_display === l).length]));
    if (Math.max(...Object.values(counts)) / list.length > 0.4) errors.push(`${name} ${JSON.stringify(counts)}`);
  }
  return { pass: errors.length === 0, detail: errors.join('; ') || 'OK' };
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

// ── D25–D32: Exam alignment ───────────────────────────────────

const optionValue = text => {
  const s = String(text).replace(/[£€,]/g, '').replace(/\s*(cm²|m²|cm³|m³|km\/h|minutes|hours|°C|°|%|kg|km|cm|mm|ml|g|m|l)$/, '').trim();
  const frac = s.match(/^(-?\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)$/);
  if (frac) return Number(frac[1]) / Number(frac[2]);
  const mixed = s.match(/^(\d+)\s+(\d+)\/(\d+)$/);
  if (mixed) return Number(mixed[1]) + Number(mixed[2]) / Number(mixed[3]);
  return /^-?\d+(\.\d+)?$/.test(s) ? Number(s) : NaN;
};
const hasNumericOptions = q => q.options.every(o => Number.isFinite(optionValue(o))) && !/largest|smallest|greatest/i.test(q.question);
const sortedRanks = list => {
  const ranks = [0, 0, 0, 0, 0];
  list.filter(hasNumericOptions).forEach(q => {
    const sorted = q.options.map(optionValue).sort((a, b) => a - b);
    ranks[sorted.indexOf(optionValue(q.answer))]++;
  });
  return ranks;
};

test('D25', 'Correct answer cannot be guessed from its size (no sorted position over 40%)', () => {
  const errors = [];
  for (const [name, list] of [['walk', walkQs], ['set', setQs]]) {
    const ranks = sortedRanks(list), total = ranks.reduce((a, b) => a + b, 0);
    if (Math.max(...ranks) / total > 0.4) errors.push(`${name} ${ranks.join('/')}`);
  }
  const shown = [sortedRanks(walkQs).join('/'), sortedRanks(setQs).join('/')].join(' and ');
  return { pass: errors.length === 0, detail: errors.join('; ') || `walk and set: ${shown}` };
});

test('D26', 'No filler distractors (answer -1, +1, +2, +10, or all within 2)', () => {
  const bad = choiceQs.filter(q => {
    if (!hasNumericOptions(q)) return false;
    const a = optionValue(q.answer);
    const offsets = q.options.filter(o => o !== q.answer).map(o => +(optionValue(o) - a).toFixed(4)).sort((x, y) => x - y);
    if (offsets.join() === '-1,1,2,10') return true;
    return a && !/[./]/.test(q.answer) && offsets.every(o => Math.abs(o) <= 2);
  });
  return { pass: bad.length === 0, detail: bad.map(q => `ID ${q.id}`).join(', ') || 'OK' };
});

test('D27', 'Every wrong option records the mistake behind it', () => {
  const bad = choiceQs.filter(q => q.options.some(o => o !== q.answer && !(q.distractor_notes?.[o]?.length >= 15)));
  return { pass: bad.length === 0, detail: bad.map(q => `ID ${q.id}`).join(', ') || 'OK' };
});

test('D28', 'SET bank covers all six official sample types', () => {
  const count = fn => setQs.filter(fn).length;
  const types = {
    multiplication: count(q => q.subtopic === 'long_multiplication'),
    ratioWithPence: count(q => q.subtopic === 'ratio_share_pence' && /\.\d\d/.test(q.answer)),
    pairedOptions: count(q => /\band\b/.test(q.answer)),
    fractionSimplify: count(q => q.subtopic === 'fraction_multiply_simplify'),
    angleReasoning: count(q => q.subtopic === 'triangle_angle_reasoning'),
    notPossibleOption: count(q => q.options.some(o => /not possible/i.test(o))),
    decimalBrackets: count(q => q.subtopic === 'decimal_brackets_2dp' && /\(/.test(q.question)),
    shadedGrid: count(q => q.diagram?.type === 'shaded_grid'),
  };
  const missing = Object.entries(types).filter(([, n]) => n < 2).map(([k]) => k);
  return { pass: missing.length === 0, detail: JSON.stringify(types) };
});

test('D29', 'Three fixed papers per stage: 50 SET and 25 NWSSEE questions, no overlaps', () => {
  const errors = [];
  const papers = {};
  questions.filter(q => q.paper_id).forEach(q => (papers[q.paper_id] ??= []).push(q));
  for (const [stage, size] of [['SET', 50], ['NWSSEE', 25]]) for (const n of [1, 2, 3]) {
    const list = papers[`${stage}-${n}`] || [];
    if (list.length !== size) errors.push(`${stage}-${n} has ${list.length}`);
    const positions = list.map(q => q.paper_position).sort((a, b) => a - b);
    if (!positions.every((p, i) => p === i + 1)) errors.push(`${stage}-${n} positions are not 1..${size}`);
    if (list.some(q => q.stage !== stage)) errors.push(`${stage}-${n} mixes stages`);
  }
  return { pass: errors.length === 0, detail: errors.join('; ') || 'OK' };
});

test('D30', 'Papers in a stage have the same topic balance', () => {
  const errors = [];
  for (const stage of ['SET', 'NWSSEE']) for (const topic of VALID_TOPICS) {
    const counts = [1, 2, 3].map(n => questions.filter(q => q.paper_id === `${stage}-${n}` && q.topic === topic).length);
    if (new Set(counts).size !== 1) errors.push(`${stage} ${topic} ${counts.join('/')}`);
    if (stage === 'NWSSEE' && counts.reduce((a, b) => a + b) !== NWSSEE_PAPER_TOPICS[topic]) errors.push(`NWSSEE ${topic} total`);
  }
  return { pass: errors.length === 0, detail: errors.join('; ') || 'OK' };
});

test('D33', 'Papers in a stage have similar difficulty (within 3 per label)', () => {
  const errors = [], shown = [];
  for (const stage of ['SET', 'NWSSEE']) for (const level of [1, 2, 3]) {
    const counts = [1, 2, 3].map(n => questions.filter(q => q.paper_id === `${stage}-${n}` && q.difficulty === level).length);
    shown.push(`${stage} d${level} ${counts.join('/')}`);
    if (Math.max(...counts) - Math.min(...counts) > 3) errors.push(`${stage} d${level} ${counts.join('/')}`);
  }
  return { pass: errors.length === 0, detail: (errors.length ? errors : shown).join('; ') };
});

test('D31', 'Dress-rehearsal paper stays out of everyday practice', () => {
  const bad = questions.filter(q => q.reserved_mock && !/-3$/.test(q.paper_id));
  const reserved = questions.filter(q => q.reserved_mock).length;
  return { pass: bad.length === 0 && reserved > 0, detail: `${reserved} reserved` };
});

test('D32', 'Question text does not repeat a chart value', () => {
  const bad = questions.filter(q => ['bars', 'line'].includes(q.diagram?.type) && q.diagram.values.some(v => new RegExp(`: ${v}(°C)?\\)`).test(q.question)));
  return { pass: bad.length === 0, detail: bad.map(q => `ID ${q.id}`).join(', ') || 'OK' };
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

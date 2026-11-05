#!/usr/bin/env node
// Validates one authored batch: schema, proof of every answer, distractor quality and diagrams.
// Usage: node scripts/check-batch.mjs data/authored/<file>.json --kind set|nwssee|walk --ids 211-255
import fs from 'node:fs';
import { checkAnswer } from '../js/validate.js';
import { diagram } from '../js/content.js';

const args = process.argv.slice(2);
const flag = name => { const i = args.indexOf('--' + name); return i >= 0 ? args[i + 1] : null; };
const file = args[0], kind = flag('kind'), [first, last] = (flag('ids') || '0-0').split('-').map(Number);
const errors = [];
const fail = (id, message) => errors.push(`Q${id}: ${message}`);
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const TOPICS = ['number_operations', 'fractions', 'decimals', 'ratio', 'percentages', 'geometry', 'measures', 'algebra', 'statistics', 'coordinates'];
const UNITS = ['£', '€', 'g', 'kg', 'cm', 'm', 'km', 'mm', 'cm²', 'm²', 'cm³', 'm³', 'minutes', 'hours', 'ml', 'l', '%', '°', '°C', 'km/h'];
const FORMATS = [null, 'fraction_simplest', 'ratio_simplest', 'time', 'coordinates'];
const BANK = JSON.parse(fs.readFileSync(new URL('../data/questions.json', import.meta.url)));
const OLD_SUBTOPICS = new Set(BANK.filter(q => q.id <= 210).map(q => q.subtopic));

const evaluate = expr => {
  if (!/^[\d\s.+\-*/()]+$/.test(expr)) throw new Error(`"${expr}" may use only digits and + - * / ( ) .`);
  return Function(`"use strict";return (${expr})`)();
};
const close = (a, b) => Math.abs(a - b) < 1e-9;
const value = text => {
  const s = String(text).replace(/[£€,]/g, '').replace(/\s*(cm²|m²|cm³|m³|km\/h|minutes|hours|°C|°|%|kg|km|cm|mm|ml|g|m|l)$/, '').trim();
  const fraction = s.match(/^(-?\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)$/);
  if (fraction) return Number(fraction[1]) / Number(fraction[2]);
  const mixed = s.match(/^(\d+)\s+(\d+)\/(\d+)$/);
  if (mixed) return Number(mixed[1]) + Number(mixed[2]) / Number(mixed[3]);
  return /^-?\d+(\.\d+)?$/.test(s) ? Number(s) : NaN;
};

function proveAnswer(q) {
  if (q.check === null || q.check === undefined) {
    if (q.diagram?.type === 'shaded_grid') {
      const { shaded, rows, cols } = q.diagram;
      if (!close(shaded.length / (rows * cols), value(q.answer))) fail(q.id, `grid shades ${shaded.length}/${rows * cols}, which does not equal the answer ${q.answer}`);
      return;
    }
    if (!q.check_note || q.check_note.length < 15) fail(q.id, 'check is null, so check_note must explain why the answer is right');
    return;
  }
  const parts = Array.isArray(q.check) ? q.check : [q.check];
  let results;
  try { results = parts.map(evaluate); } catch (err) { fail(q.id, err.message); return; }
  if (q.answer_format === 'time') {
    const [h, m] = q.answer.split(':').map(Number);
    if (!close(results[0] % 1440, h * 60 + m)) fail(q.id, `check gives ${results[0]} minutes but the answer is ${q.answer}`);
    return;
  }
  if (parts.length === 1) {
    if (!close(results[0], value(q.answer))) fail(q.id, `check ${parts[0]} = ${results[0]}, but the answer is ${q.answer}`);
    return;
  }
  const found = String(q.answer).replace(/,(?=\d{3})/g, '').match(/-?\d+(?:\.\d+)?/g)?.map(Number) || [];
  results.forEach((result, i) => {
    if (found[i] === undefined || !close(result, found[i])) fail(q.id, `check[${i}] = ${result}, but number ${i + 1} in "${q.answer}" is ${found[i]}`);
  });
}

function checkDiagram(q) {
  const d = q.diagram;
  if (d === null || d === undefined) return;
  if (d.type !== 'table' && !d.description) fail(q.id, 'diagram needs a description');
  if (!['shaded_grid', 'shape', 'coordinates', 'bars', 'line', 'pie', 'table', 'rectangle', 'triangle', 'l_shape'].includes(d.type)) { fail(q.id, `unknown diagram type ${d.type}`); return; }
  if (/undefined|NaN/.test(diagram(d))) fail(q.id, 'diagram renders undefined or NaN; check its fields');
  if (d.type === 'shape') {
    const inside = ([x, y]) => x >= 10 && x <= 370 && y >= 10 && y <= 235;
    const pts = [...(d.polygons || []).flatMap(s => s.points), ...(d.lines || []).flatMap(s => [s.from, s.to]), ...(d.labels || []).map(s => [s.x, s.y])];
    if (!pts.length && !(d.circles || []).length) fail(q.id, 'shape diagram is empty');
    if (pts.some(p => !inside(p))) fail(q.id, 'shape coordinates must stay within x 10-370, y 10-235');
    if ((d.circles || []).some(c => c.cx - c.r < 10 || c.cx + c.r > 370 || c.cy - c.r < 10 || c.cy + c.r > 235)) fail(q.id, 'circle runs off the canvas');
  }
  if (d.type === 'shaded_grid') {
    if (d.shaded.some(([r, c]) => r < 0 || c < 0 || r >= d.rows || c >= d.cols)) fail(q.id, 'shaded cell outside the grid');
    if (new Set(d.shaded.map(String)).size !== d.shaded.length) fail(q.id, 'duplicate shaded cell');
  }
  if (d.type === 'coordinates' && d.points.some(p => Math.abs(p.x) > 5 || Math.abs(p.y) > 5)) fail(q.id, 'coordinates must be within -5 to 5');
  if (d.type === 'pie' && d.values.reduce((a, b) => a + b) !== 100) fail(q.id, 'pie values must add to 100');
  if (['bars', 'line'].includes(d.type)) {
    if (d.labels.length !== d.values.length) fail(q.id, 'labels and values must match');
    if (d.values.some(v => (v / (d.max / 8)) % 1 !== 0)) fail(q.id, 'chart values must sit on, or halfway between, gridlines');
  }
}

function checkDistractorShape(id, distractors) {
  if (!Array.isArray(distractors) || distractors.length !== 4) { fail(id, 'needs exactly 4 distractors'); return false; }
  let ok = true;
  distractors.forEach(d => {
    if (typeof d.value !== 'string' || typeof d.why !== 'string' || d.why.length < 15) { fail(id, `distractor ${JSON.stringify(d)} needs a string value and a specific why`); ok = false; }
  });
  return ok;
}
function checkFiller(id, answer, options) {
  const a = value(answer), offsets = options.map(o => value(o) - a).sort((x, y) => x - y);
  if (!offsets.every(o => Number.isFinite(o))) return;
  if (offsets.map(o => +o.toFixed(4)).join() === '-1,1,2,10') fail(id, 'filler pattern -1,+1,+2,+10; use real mistakes');
  if (a && offsets.every(o => Math.abs(o) <= 2) && !/[./]/.test(String(answer))) fail(id, 'all wrong answers are within 2 of the answer; use real mistakes');
}
function reportRanks(items) {
  const numeric = items.filter(q => [q.answer, ...q.distractors.map(d => d.value)].every(o => Number.isFinite(value(o))) && !/largest|smallest|greatest/i.test(q.question));
  const ranks = [0, 0, 0, 0, 0];
  for (const q of numeric) {
    const sorted = [q.answer, ...q.distractors.map(d => d.value)].map(value).sort((a, b) => a - b);
    ranks[sorted.indexOf(value(q.answer))]++;
  }
  const worst = Math.max(...ranks) / Math.max(1, numeric.length);
  console.log(`Correct answer position when options are sorted (1 = smallest): ${ranks.join(' / ')} across ${numeric.length} numeric questions`);
  if (numeric.length >= 10 && worst > 0.4) fail('batch', `the correct answer sits at one sorted position in ${Math.round(worst * 100)}% of questions; vary whether mistakes land above or below the answer so it is at most 40%`);
}

if (kind === 'walk') {
  const ids = data.map(q => q.id);
  for (let id = first; id <= last; id++) if (!ids.includes(id)) fail(id, 'missing');
  const items = [];
  for (const item of data) {
    const q = BANK.find(x => x.id === item.id);
    if (!q) { fail(item.id, 'no such question'); continue; }
    if (!checkDistractorShape(item.id, item.distractors)) continue;
    const options = item.distractors.map(d => d.value);
    if (new Set([q.answer, ...options]).size !== 5) fail(item.id, 'options must be 5 different values');
    options.forEach(o => { if (checkAnswer(o, q)) fail(item.id, `distractor ${o} would be marked correct`); });
    checkFiller(item.id, q.answer, options);
    items.push({ ...q, distractors: item.distractors });
  }
  reportRanks(items);
} else {
  const ids = data.map(q => q.id);
  if (new Set(ids).size !== ids.length) errors.push('Duplicate IDs in batch');
  for (let id = first; id <= last; id++) if (!ids.includes(id)) fail(id, 'missing');
  const subtopics = {};
  for (const q of data) {
    if (q.id < first || q.id > last) fail(q.id, `outside the ID range ${first}-${last}`);
    if (!TOPICS.includes(q.topic)) fail(q.id, `bad topic ${q.topic}`);
    if (![1, 2, 3].includes(q.difficulty)) fail(q.id, 'difficulty must be 1, 2 or 3');
    if (!/^[a-z0-9_]+$/.test(q.subtopic || '')) fail(q.id, 'bad subtopic');
    if (OLD_SUBTOPICS.has(q.subtopic)) fail(q.id, `subtopic ${q.subtopic} is used by the old bank; use a name from your brief`);
    subtopics[q.subtopic] = (subtopics[q.subtopic] || 0) + 1;
    if (typeof q.question !== 'string' || q.question.length < 8) fail(q.id, 'question missing');
    if (typeof q.answer !== 'string' || !q.answer) { fail(q.id, 'answer must be a non-empty string'); continue; }
    if (q.unit !== null && !UNITS.includes(q.unit)) fail(q.id, `bad unit ${q.unit}`);
    if (!FORMATS.includes(q.answer_format ?? null)) fail(q.id, `bad answer_format ${q.answer_format}`);
    const words = (q.explanation || '').trim().split(/\s+/).length;
    if (words < 20 || words > 150) fail(q.id, `explanation is ${words} words; needs 20-150`);
    if (!Array.isArray(q.hints) || q.hints.length !== 2 || q.hints[0] === q.hints[1]) fail(q.id, 'needs 2 different hints');
    if (typeof q.pitfall !== 'string' || q.pitfall.length < 10) fail(q.id, 'pitfall missing');
    if (/93\.45|train set|42 ?[x×] ?18|six eighths/i.test(q.question)) fail(q.id, 'too close to an official sample');
    proveAnswer(q);
    checkDiagram(q);
    const graded = { ...q, unit: q.unit ?? null };
    if (!checkAnswer(q.answer, graded)) fail(q.id, `the marking code rejects its own answer "${q.answer}"`);
    if (kind === 'set') {
      if (!checkDistractorShape(q.id, q.distractors)) continue;
      const options = q.distractors.map(d => d.value);
      if (new Set([q.answer, ...options]).size !== 5) fail(q.id, 'options must be 5 different values');
      options.forEach(o => { if (checkAnswer(o, graded)) fail(q.id, `distractor "${o}" would be marked correct; set answer_format or change it`); });
      checkFiller(q.id, q.answer, options);
    } else if (q.distractors) fail(q.id, 'NWSSEE questions must not have distractors');
  }
  for (const [name, count] of Object.entries(subtopics)) if (count < 3) errors.push(`Subtopic ${name} has ${count} question(s); needs at least 3`);
  const texts = data.map(q => String(q.question).trim().toLowerCase());
  texts.forEach((t, i) => { if (texts.indexOf(t) !== i) fail(data[i].id, 'duplicate question text'); });
  const tally = key => Object.entries(data.reduce((m, q) => (m[q[key]] = (m[q[key]] || 0) + 1, m), {})).map(([k, v]) => `${k}:${v}`).join(' ');
  console.log(`Questions: ${data.length}\nTopics: ${tally('topic')}\nSubtopics: ${tally('subtopic')}\nDifficulty: ${tally('difficulty')}`);
  if (kind === 'set') reportRanks(data.filter(q => Array.isArray(q.distractors) && q.distractors.length === 4));
}
if (errors.length) { console.log(`\nFAILED with ${errors.length} problem(s):\n` + errors.join('\n')); process.exit(1); }
console.log('\nBatch passed.');

/**
 * validate.js — Answer validation for Desk Mode.
 *
 * Strategy: normalise both the user's input and the stored answer
 * to a canonical form, then compare. Check answer_alt the same way.
 *
 * Normalisation rules (§5.3):
 *  1. Trim whitespace
 *  2. Lowercase
 *  3. Strip currency/unit symbols
 *  4. Normalise ratio spacing  "4 : 1" → "4:1"
 *  5. Normalise decimal trailing zeros  "70.650" → "70.65"
 */

// Units to strip — ordered longest first to avoid partial matches
const UNITS_TO_STRIP = [
  'minutes', 'mins', 'min',
  'hours', 'hrs', 'hr',
  'seconds', 'secs', 'sec',
  'km/h', 'mph',
  'cm²', 'm²', 'km²', 'mm²',
  'cm³', 'm³', 'km³', 'mm³',
  'km', 'cm', 'mm',
  'kg', 'mg',
  'ml', 'cl', 'dl',
  'm²', 'm³',
  '£', '€', '$',
  '°', '%',
  // NOTE: 'to' is intentionally NOT stripped here.
  // "4 to 1" ratio form is handled by the regex below after unit stripping.
  // bare 'm' last — must not strip 'm' from 'cm'
  ' m',
];

/**
 * Checks whether the user's input is a correct answer for the given question.
 *
 * @param {string} userInput  — raw string from the input element
 * @param {object} question   — the full question object
 * @returns {boolean}
 */
export function checkAnswer(userInput, question) {
  if (!userInput) return false;

  const normalised = _normalise(userInput);
  const canonical  = _normalise(question.answer);

  if (normalised === canonical) return true;

  if (Array.isArray(question.answer_alt)) {
    return question.answer_alt.some(alt => normalised === _normalise(alt));
  }

  return false;
}

// ── Internal ──────────────────────────────────────────────────

function _normalise(str) {
  if (typeof str !== 'string') str = String(str);

  let s = str.trim().toLowerCase();

  // Strip unit symbols
  for (const unit of UNITS_TO_STRIP) {
    const escaped = unit.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Match the unit with optional surrounding whitespace
    s = s.replace(new RegExp(`\\s*${escaped}\\s*`, 'g'), ' ');
  }

  // Collapse multiple spaces
  s = s.trim().replace(/\s+/g, ' ');

  // Normalise ratio spacing: "4 : 1" or "4 to 1" → "4:1"
  s = s.replace(/\s*:\s*/g, ':');
  s = s.replace(/(\d)\s+to\s+(\d)/g, '$1:$2');

  // Normalise decimal trailing zeros: "70.650" → "70.65", "2.250" → "2.25"
  // Only apply when the whole string is a plain decimal number
  if (/^-?\d+\.\d+$/.test(s)) {
    s = String(parseFloat(s));
  }

  return s.trim();
}

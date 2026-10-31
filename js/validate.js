// Compare exact rational values, while honouring requested fractions, ratios and units.
const unitAliases = {
  '£': ['£', 'pounds', 'pound', 'gbp'], '€': ['€', 'euros', 'euro'],
  'g': ['g', 'grams', 'gram'], 'kg': ['kg', 'kilograms', 'kilogram'],
  'cm': ['cm', 'centimetres', 'centimeters'], 'm': ['m', 'metres', 'meters'],
  'km': ['km', 'kilometres', 'kilometers'], 'mm': ['mm', 'millimetres', 'millimeters'],
  'cm²': ['cm²', 'cm2', 'square centimetres'], 'm²': ['m²', 'm2', 'square metres'],
  'cm³': ['cm³', 'cm3', 'cubic centimetres'], 'm³': ['m³', 'm3', 'cubic metres'],
  'minutes': ['minutes', 'minute', 'mins', 'min'], 'hours': ['hours', 'hour', 'hrs', 'hr'],
  'ml': ['ml', 'millilitres'], 'l': ['l', 'litres', 'liters'], '%': ['%', 'percent', 'per cent'],
  '°': ['°', 'degrees', 'degree'], '°C': ['°c', 'degrees celsius'],
};
const clean = value => String(value ?? '').trim().toLowerCase().replace(/−/g, '-');
function stripUnit(value, unit) {
  let s = clean(value);
  const aliases = unitAliases[unit] || (unit ? [clean(unit)] : []);
  for (const alias of [...aliases].sort((a,b)=>b.length-a.length)) {
    if (s.startsWith(alias) && ['£','€'].includes(alias)) return s.slice(alias.length).trim();
    if (s.endsWith(alias)) return s.slice(0,-alias.length).trim();
  }
  return s;
}
const gcd = (a,b) => b ? gcd(b,a%b) : a < 0n ? -a : a;
function rational(value) {
  const s = clean(value);
  if (s.length > 100) return null;
  if (/^-?\d+\s*\/\s*\d+$/.test(s)) {
    const [a,b] = s.split('/').map(v=>BigInt(v.trim()));
    return b ? [a,b] : null;
  }
  const mixed = s.match(/^(-?\d+)\s+(\d+)\/(\d+)$/);
  if (mixed) {
    const whole=BigInt(mixed[1]), a=BigInt(mixed[2]), b=BigInt(mixed[3]);
    return b && a < b ? [whole*b+(mixed[1].startsWith('-')?-a:a),b] : null;
  }
  if (!/^-?(?:\d+(?:\.\d*)?|\.\d+)$/.test(s)) return null;
  const places = s.includes('.') ? s.split('.')[1].length : 0;
  const digits = s.replace('.', '').replace(/^-$/, '0');
  return [BigInt(digits),10n**BigInt(places)];
}
function numberText(s) {
  return /^-?\d{1,3}(,\d{3})+(\.\d+)?$/.test(s) ? s.replace(/,/g,'') : s;
}
function coordinates(value) {
  const s = clean(value).replace(/^\(\s*(.*?)\s*\)$/, '$1');
  const pair = s.split(',').map(v=>v.trim());
  return pair.length === 2 && pair.every(v=>/^-?\d+$/.test(v)) ? pair.map(Number) : null;
}
function equivalent(a,b) {
  const x=rational(numberText(a)), y=rational(numberText(b));
  return x && y ? x[0]*y[1] === y[0]*x[1] : a === b;
}
export function checkAnswer(input, question) {
  if (!clean(input)) return false;
  const user = stripUnit(input,question.unit);
  const answer = stripUnit(question.answer,question.unit);
  if (question.answer_format === 'coordinates') {
    const a=coordinates(user), b=coordinates(answer);
    return Boolean(a && b && a.every((v,i)=>v===b[i]));
  }
  if (question.answer_format === 'time') {
    const normal = s => /^\d{1,2}:\d{2}$/.test(s) ? s.split(':').map(Number) : null;
    const a=normal(user), b=normal(answer);
    return Boolean(a && b && a[0] < 24 && a[1] < 60 && a.every((v,i)=>v===b[i]));
  }
  if (answer.includes(':')) {
    const ratio = s => s.replace(/\s+to\s+/g,':').split(':').map(v=>v.trim());
    const a=ratio(user), b=ratio(answer);
    if (a.length !== 2 || b.length !== 2 || !a.every(v=>/^\d+$/.test(v) && Number(v)>0)) return false;
    if (question.answer_format === 'ratio_simplest' || /simplest form/i.test(question.question)) return Number(a[0])===Number(b[0]) && Number(a[1])===Number(b[1]);
    return BigInt(a[0])*BigInt(b[1]) === BigInt(a[1])*BigInt(b[0]);
  }
  if (question.answer_format === 'fraction_simplest') {
    if (!/^-?\d+\s*\/\s*\d+$/.test(user)) return false;
    const a=rational(user);
    if (!a || gcd(...a) !== 1n) return false;
  }
  return equivalent(user,answer) || Boolean(question.answer_alt?.some(alt=>equivalent(user,stripUnit(alt,question.unit))));
}

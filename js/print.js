import { esc, questionBody, answerText } from './content.js';

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

function gridHtml(count) {
  const rows = Array.from({ length: count }, (_, i) => `<li class="print-grid-row"><span class="print-grid-num">${i + 1}</span>${LETTERS.map(l => `<span class="print-lozenge">${l}</span>`).join('')}</li>`).join('');
  return `<h1>11+ Maths Vault — Answer grid</h1><p>Name: ____________________ Date: ______________</p><p>Fill in one lozenge for each question. Use pencil. Choose only one answer per question.</p><ul class="print-grid">${rows}</ul>`;
}

export function printWorksheet(questions, { answers = false, multipleChoice, grid = false } = {}) {
  let sheet = document.getElementById('print-sheet');
  if (!sheet) { sheet = document.createElement('section'); sheet.id = 'print-sheet'; document.body.append(sheet); }
  const mc = multipleChoice ?? (questions.length > 0 && questions.every(q => q.mode === 'set' && q.options));
  const setCode = questions.map(q => q.id).join('-');
  if (grid) {
    sheet.innerHTML = `${gridHtml(questions.length)}<p class="print-set-code">Set: ${esc(setCode)}</p>`;
  } else {
    const note = answers ? '<p>Keep this sheet separate until you have finished the questions.</p>'
      : `<p>Name: ____________________ Date: ______________</p><p>${mc ? 'Mark your answers on the separate answer grid. No calculator.' : 'Show your working in the space provided. Only your final answer is marked. No calculator.'}</p>`;
    const body = q => answers
      ? `<p><strong>${mc && q.answer_display ? `${esc(q.answer_display)} — ` : ''}${esc(answerText(q))}</strong></p><p>${esc(q.explanation)}</p>${q.pitfall ? `<p>Watch out: ${esc(q.pitfall)}</p>` : ''}`
      : `${questionBody(q)}${mc && q.options ? `<ol class="print-options">${q.options.map((opt, n) => `<li>${LETTERS[n] ?? String.fromCharCode(65 + n)}. ${esc(opt)}</li>`).join('')}</ol><div class="working-space working-space--small"></div>` : `<div class="working-space"></div><p>Final answer: __________________ ${q.unit ? esc(q.unit) : ''}</p>`}`;
    sheet.innerHTML = `<h1>11+ Maths Vault — ${answers ? 'Answer sheet' : 'Practice worksheet'}</h1><p>${questions.length} original practice questions · ${mc ? 'Multiple choice' : 'Written answers'}</p><p class="print-set-code">Set: ${esc(setCode)}</p>${note}${questions.map((q, i) => `<article class="print-question"><h2>Question ${i + 1}</h2>${body(q)}</article>`).join('')}`;
  }
  document.body.classList.add('printing');
  window.addEventListener('afterprint', () => document.body.classList.remove('printing'), { once: true });
  window.print();
}

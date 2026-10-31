import { esc, questionBody, answerText } from './content.js';

export function printWorksheet(questions, { answers = false, multipleChoice = false } = {}) {
  let sheet = document.getElementById('print-sheet');
  if (!sheet) { sheet = document.createElement('section'); sheet.id = 'print-sheet'; document.body.append(sheet); }
  const setCode = questions.map(q => q.id).join('-');
  sheet.innerHTML = `<h1>11+ Maths Vault — ${answers ? 'Answer sheet' : 'Practice worksheet'}</h1><p>${questions.length} original practice questions · ${multipleChoice ? 'Multiple choice' : 'Written answers'}</p><p class="print-set-code">Set: ${esc(setCode)}</p>${answers ? '<p>Keep this sheet separate until you have finished the questions.</p>' : '<p>Name: ____________________ Date: ______________</p><p>Show your working in the space provided. Check the units in each final answer.</p>'}${questions.map((q, i) => `<article class="print-question"><h2>Question ${i + 1}</h2>${answers ? `<p><strong>${multipleChoice && q.answer_display ? q.answer_display + ' — ' : ''}${esc(answerText(q))}</strong></p><p>${esc(q.explanation)}</p>${q.pitfall ? `<p>Watch out: ${esc(q.pitfall)}</p>` : ''}` : `${questionBody(q)}${multipleChoice ? `<ol class="print-options">${q.options.map((opt, n) => `<li>${String.fromCharCode(65 + n)}. ${esc(opt)}</li>`).join('')}</ol>` : ''}<div class="working-space"></div><p>Final answer: __________________ ${esc(q.unit)}</p>`}</article>`).join('')}`;
  document.body.classList.add('printing');
  window.addEventListener('afterprint', () => document.body.classList.remove('printing'), { once: true });
  window.print();
}

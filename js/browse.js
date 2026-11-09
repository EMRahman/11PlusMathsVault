import { TOPICS, esc, difficulty, questionBody, answerText } from './content.js';

// Both practice modes open the same ordered list at the question the child selects.
export function showQuestionBrowser(container, questions, { onSelect, onBack, buttonClass, selectedId }) {
  container.innerHTML = `<section class="browse-list"><div class="browse-head"><h2>All questions</h2><button class="btn btn--secondary btn--sm" id="browse-back-btn">← Back</button></div><p class="muted">${questions.length} questions match your filters. Start at the beginning or open any question, then use Previous and Next to go through them one by one.</p>${questions.length ? `<button class="btn ${buttonClass}" id="browse-start-btn">Go through questions →</button>` : '<p class="empty-state">No questions match. Change your filters.</p>'}${questions.map((q, i) => `<details class="answer-review" ${q.id === selectedId ? 'open' : ''}><summary>${i + 1}. ${esc(TOPICS[q.topic])} ${difficulty(q.difficulty)} — ${esc(q.question.slice(0, 80))}${q.question.length > 80 ? '…' : ''}</summary>${questionBody(q)}${q.options ? `<ul class="browse-options">${q.options.map((option, n) => `<li>${String.fromCharCode(65 + n)}. ${esc(option)}</li>`).join('')}</ul>` : ''}<p><strong>Answer: ${esc(answerText(q))}</strong></p><div class="explanation-box">${esc(q.explanation)}</div><button class="btn ${buttonClass} btn--sm" data-practise="${i}">Practise from here</button></details>`).join('')}</section>`;
  container.querySelector('#browse-back-btn').onclick = onBack;
  const select = index => {
    onSelect(index);
    container.querySelector('.question-card')?.scrollIntoView({ block: 'start' });
  };
  const start = container.querySelector('#browse-start-btn');
  if (start) start.onclick = () => select(0);
  container.querySelectorAll('[data-practise]').forEach(button => {
    button.onclick = () => select(Number(button.dataset.practise));
  });
  if (selectedId != null) {
    const selected = container.querySelector(`[data-practise="${questions.findIndex(q => q.id === selectedId)}"]`);
    selected?.focus({ preventScroll: true });
    selected?.scrollIntoView({ block: 'nearest' });
  }
}

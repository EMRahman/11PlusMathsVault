import { checkAnswer } from './validate.js';
import { getProgress, getSettings, recordResult, isBookmarked, toggleBookmark, getBookmarks } from './state.js';
import { TOPICS, esc, shuffle, time, difficulty, questionBody, answerText } from './content.js';
import { followUp } from './practice.js';
import { printWorksheet } from './print.js';

let bank = [], questions = [], states = {}, index = 0, config = {}, timer;
let seconds = 0, deadline = 0, lastTick = 0, submitted = false;
const area = () => document.getElementById(config.container || 'desk-question-area');
const exam = () => config.kind?.startsWith('exam');
const current = () => states[questions[index]?.id] ??= { input: '', hints: 0, firstAnswer: null, finished: false, flagged: false };
const save = () => config.onSave?.(JSON.parse(JSON.stringify(states)), seconds);

export function dispose() {
  if (timer && config.kind === 'daily') save();
  clearInterval(timer); timer = null;
}
export function init(all) {
  dispose(); bank = all; config = { container: 'desk-question-area', kind: 'practice' }; submitted = false;
  document.getElementById('desk-setsize-filter').value = String(getSettings().deskSetSize);
  document.getElementById('desk-session-type').onchange = prompt;
  for (const id of ['desk-topic-filter', 'desk-difficulty-filter', 'desk-bookmark-filter', 'desk-setsize-filter', 'desk-exam-minutes']) document.getElementById(id).onchange = prompt;
  prompt();
}
function filtered() {
  const val = id => document.getElementById(id).value;
  const mode = val('desk-session-type') === 'exam-set' ? 'walk' : 'desk';
  const bookmarks = getBookmarks();
  const pool = bank.filter(q => q.mode === mode && (!val('desk-topic-filter') || q.topic === val('desk-topic-filter')) && (!val('desk-difficulty-filter') || q.difficulty === Number(val('desk-difficulty-filter'))) && (val('desk-bookmark-filter') !== 'bookmarked' || bookmarks.includes(q.id)));
  const size = val('desk-setsize-filter');
  return shuffle(pool).slice(0, size === 'all' ? pool.length : Number(size));
}
function prompt() {
  dispose();
  document.getElementById('desk-filter-bar').classList.remove('session-running');
  config = { container: 'desk-question-area', kind: document.getElementById('desk-session-type').value };
  const prepared = filtered(), count = prepared.length, examMode = exam();
  document.getElementById('desk-exam-duration').hidden = !examMode;
  area().innerHTML = `<div class="desk-start-prompt"><h2>${examMode ? 'Practise a paper at your own level' : 'Learn a method, then try it yourself'}</h2><p>${examMode ? 'Skip, flag and return to questions. Answers and explanations stay hidden until you submit or the timer ends.' : 'Use a hint when you need one. Try again before opening the worked solution, then practise the same skill with new numbers.'}</p><p class="muted">${count} questions match your selection. ${examMode ? 'These are original practice sets, not official exam papers.' : 'The timer is a guide; there is no time limit.'}</p><div class="action-row"><button id="desk-print-questions" class="btn btn--secondary" ${count ? '' : 'disabled'}>Print worksheet</button><button id="desk-print-answers" class="btn btn--secondary" ${count ? '' : 'disabled'}>Print answer sheet</button></div><p class="muted">Printing uses one fixed set. The question numbers match its separate answer sheet.</p></div>`;
  document.getElementById('desk-start-btn').onclick = () => startFromFilters(prepared);
  document.getElementById('desk-print-questions').onclick = () => printWorksheet(prepared, { multipleChoice: config.kind === 'exam-set' });
  document.getElementById('desk-print-answers').onclick = () => printWorksheet(prepared, { answers: true, multipleChoice: config.kind === 'exam-set' });
}
function startFromFilters(prepared) {
  const kind = document.getElementById('desk-session-type').value;
  mount(bank, { kind, container: 'desk-question-area', questions: prepared || filtered(), minutes: Number(document.getElementById('desk-exam-minutes').value) });
  document.getElementById('desk-filter-bar').classList.add('session-running');
}
export function mount(all, options) {
  dispose(); bank = all; config = options; questions = [...options.questions];
  states = structuredClone(options.saved || {}); seconds = options.savedSeconds || 0; submitted = false;
  index = questions.findIndex(q => !states[q.id]?.finished);
  if (!questions.length) { area().innerHTML = '<p class="empty-state">No questions match. Change your filters to build a set.</p>'; return; }
  if (index < 0) { index = 0; submitted = true; config.onComplete?.(); summary(); return; }
  deadline = Date.now() + (options.minutes || 45) * 60000; lastTick = Date.now();
  timer = setInterval(tick, 500);
  render();
}
function tick() {
  if (submitted) return;
  const now = Date.now();
  if (exam()) {
    seconds = Math.max(0, Math.ceil((deadline - now) / 1000));
    if (!seconds) { submitExam(true); return; }
  } else if (!current().finished) seconds += (now - lastTick) / 1000;
  lastTick = now;
  const el = area()?.querySelector('[data-session-clock]');
  if (el) el.textContent = time(exam() ? (deadline - now) / 1000 : seconds);
}
function render() {
  const q = questions[index], st = current(), qNumber = index + 1;
  const availableFollowUp = !exam() && config.kind !== 'daily' && st.finished ? followUp(q, bank, getProgress(), questions.filter(item => states[item.id]?.finished).map(item => item.id)) : null;
  const wrong = st.firstAnswer && !st.firstAnswer.correct && !st.finished;
  area().innerHTML = `<div class="session-meta"><span>Q${qNumber} of ${questions.length} · ${exam() ? 'Exam practice' : config.kind === 'daily' ? esc(config.reasons?.[q.id]) : 'Guided practice'}</span><span><span data-session-clock>${time(exam() ? (deadline - Date.now()) / 1000 : seconds)}</span> ${exam() ? 'left' : 'solving time'}</span></div>
    <article class="question-card question-card--desk" aria-label="Question ${qNumber}">
      <div class="card-meta"><span class="topic-tag">${esc(TOPICS[q.topic])}</span>${difficulty(q.difficulty)}<button class="bookmark-btn ${isBookmarked(q.id) ? 'bookmarked' : ''}" id="desk-bookmark-btn" aria-pressed="${isBookmarked(q.id)}" aria-label="Bookmark this question">★</button></div>
      ${questionBody(q)}
      <form id="desk-answer-form">
      ${config.kind === 'exam-set' ? `<fieldset class="exam-choices"><legend class="sr-only">Choose your answer</legend>${q.options.map((opt, i) => `<label class="exam-option"><input type="radio" name="exam-answer" value="${esc(opt)}" ${st.input === opt ? 'checked' : ''}><span>${String.fromCharCode(65 + i)}. ${esc(opt)}</span></label>`).join('')}</fieldset>` : `<label class="answer-label" for="desk-answer-input">Your final answer${q.unit ? ` (in ${esc(q.unit)})` : ''}</label><input type="text" class="answer-input" id="desk-answer-input" value="${esc(st.input)}" autocomplete="off" spellcheck="false" ${st.finished ? 'disabled' : ''} placeholder="Type your answer">`}
      ${!exam() && !st.finished ? `<p class="answer-status ${wrong ? 'incorrect' : ''}" role="status">${wrong ? 'Not quite yet. Try again, or use a hint to get started.' : ''}</p><div class="action-row"><button class="btn btn--primary-desk" type="submit" id="desk-check-btn">${wrong ? 'Try again' : 'Check answer'}</button><button class="btn btn--secondary" type="button" id="desk-hint-btn" ${st.hints >= q.hints.length ? 'disabled' : ''}>${st.hints ? 'Next hint' : 'Give me a hint'}</button><button class="text-button" type="button" id="desk-solution-btn">Show worked solution</button></div>` : ''}
      </form>
      ${!exam() && st.hints ? `<div class="hint-box" aria-live="polite"><strong>A step at a time</strong><ol>${q.hints.slice(0, st.hints).map(h => `<li>${esc(h)}</li>`).join('')}</ol><p class="muted">Answers using hints are tracked as supported practice.</p></div>` : ''}
      ${st.finished ? `<div class="desk-result-msg ${st.independentCorrect ? 'correct' : ''}" role="status">${st.independentCorrect ? '✓ Correct independently' : st.finalCorrect ? '✓ You got there — keep practising this skill' : `The answer is ${esc(answerText(q))}`}</div><div class="explanation-box">${esc(q.explanation)}</div>${q.pitfall ? `<div class="pitfall-box"><strong>Watch out:</strong> ${esc(q.pitfall)}</div>` : ''}<p class="parent-prompt">Explain it: ${esc(q.parent_prompt || 'How could you check that your answer makes sense?')}</p>${availableFollowUp ? '<button class="btn btn--secondary" id="desk-followup-btn">Try a similar question</button>' : ''}` : ''}
      ${exam() ? `<label class="flag-control"><input type="checkbox" id="desk-flag" ${st.flagged ? 'checked' : ''}> Flag to return to</label>` : ''}
      <div class="card-nav"><button class="btn btn--secondary" id="desk-prev-btn" ${index === 0 ? 'disabled' : ''}>← Back</button>${exam() || st.finished ? `<button class="btn btn--primary-desk" id="desk-next-btn">${index === questions.length - 1 ? exam() ? 'Review paper' : 'See results' : 'Next →'}</button>` : ''}</div>
    </article>
    ${exam() ? `<nav class="exam-nav" aria-label="Jump to a question">${questions.map((item, i) => `<button class="exam-number ${states[item.id]?.input ? 'answered' : ''} ${states[item.id]?.flagged ? 'flagged' : ''}" data-jump="${i}" aria-label="Question ${i + 1}${states[item.id]?.flagged ? ', flagged' : ''}${states[item.id]?.input ? ', answered' : ', unanswered'}" ${i === index ? 'aria-current="step"' : ''}>${i + 1}${states[item.id]?.flagged ? ' ⚑' : ''}</button>`).join('')}</nav><button class="btn btn--secondary btn--full" id="exam-review-btn">Review and submit paper</button>` : ''}`;
  bind(q, st, availableFollowUp);
}
function bind(q, st, nextQuestion) {
  const root = area(), input = root.querySelector('#desk-answer-input');
  if (input) input.oninput = () => { st.input = input.value; save(); };
  root.querySelectorAll('[name="exam-answer"]').forEach(el => el.onchange = () => { st.input = el.value; save(); });
  root.querySelector('#desk-answer-form').onsubmit = event => {
    event.preventDefault();
    if (exam() || st.finished) return;
    if (!st.input.trim()) { root.querySelector('.answer-status').textContent = 'Enter an answer, or choose a hint.'; input?.focus(); return; }
    const correct = checkAnswer(st.input, q);
    st.firstAnswer ??= { correct, assisted: st.hints > 0 };
    if (correct) finish(q, st, false);
    save(); render();
    if (!correct) area().querySelector('#desk-answer-input')?.focus();
  };
  const hint = root.querySelector('#desk-hint-btn');
  if (hint) hint.onclick = () => { st.hints = Math.min(st.hints + 1, q.hints.length); save(); render(); };
  const solution = root.querySelector('#desk-solution-btn');
  if (solution) solution.onclick = () => { finish(q, st, true); save(); render(); };
  root.querySelector('#desk-bookmark-btn').onclick = event => {
    const value = toggleBookmark(q.id); event.currentTarget.classList.toggle('bookmarked', value); event.currentTarget.setAttribute('aria-pressed', String(value));
  };
  root.querySelector('#desk-prev-btn').onclick = () => { index--; render(); };
  const next = root.querySelector('#desk-next-btn');
  if (next) next.onclick = () => {
    if (index < questions.length - 1) { index++; render(); }
    else if (exam()) reviewExam();
    else if (questions.every(item => states[item.id]?.finished)) { submitted = true; dispose(); config.onComplete?.(); save(); summary(); }
    else { index = questions.findIndex(item => !states[item.id]?.finished); render(); }
  };
  const similar = root.querySelector('#desk-followup-btn');
  if (similar) similar.onclick = () => {
    const existing = questions.findIndex(item => item.id === nextQuestion.id && !states[item.id]?.finished);
    if (existing >= 0) index = existing;
    else { questions.push(nextQuestion); states[nextQuestion.id] = undefined; index = questions.length - 1; }
    render();
  };
  const flag = root.querySelector('#desk-flag');
  if (flag) flag.onchange = () => { st.flagged = flag.checked; render(); };
  root.querySelectorAll('[data-jump]').forEach(el => el.onclick = () => { index = Number(el.dataset.jump); render(); });
  const review = root.querySelector('#exam-review-btn');
  if (review) review.onclick = reviewExam;
}
function finish(q, st, revealed) {
  if (st.finished) return;
  st.finished = true; st.finalCorrect = !revealed && checkAnswer(st.input, q);
  st.independentCorrect = Boolean(st.firstAnswer?.correct && !st.firstAnswer.assisted);
  if (questions.every(item => states[item.id]?.finished)) config.onComplete?.();
  recordResult(q.id, st.firstAnswer ? st.firstAnswer.correct ? 'correct' : 'incorrect' : 'assisted', { assisted: st.firstAnswer?.assisted ?? true, usedSupport: st.hints > 0 || revealed });
}
function reviewExam() {
  const unanswered = questions.filter(q => !states[q.id]?.input.trim()).length;
  const flagged = questions.filter(q => states[q.id]?.flagged).length;
  area().innerHTML = `<section class="question-card"><h2>Check your paper</h2><p>${questions.length - unanswered} answered · ${unanswered} unanswered · ${flagged} flagged</p><p><span data-session-clock>${time((deadline - Date.now()) / 1000)}</span> left. You can return to any question before submitting.</p><nav class="exam-nav" aria-label="Review questions">${questions.map((q, i) => `<button class="exam-number ${states[q.id]?.flagged ? 'flagged' : ''}" data-jump="${i}">${i + 1}${states[q.id]?.flagged ? ' ⚑' : ''}${states[q.id]?.input ? ' ✓' : ' —'}</button>`).join('')}</nav><button class="btn btn--primary-desk" id="exam-submit-btn">Submit paper${unanswered ? ` (${unanswered} unanswered)` : ''}</button><button class="btn btn--secondary" id="exam-return-btn">Return to paper</button></section>`;
  area().querySelectorAll('[data-jump]').forEach(el => el.onclick = () => { index = Number(el.dataset.jump); render(); });
  area().querySelector('#exam-return-btn').onclick = render;
  area().querySelector('#exam-submit-btn').onclick = () => submitExam(false);
}
function submitExam(expired) {
  if (submitted) return;
  submitted = true; dispose();
  for (const q of questions) {
    const st = states[q.id] ??= { input: '', flagged: false };
    st.finished = true; st.finalCorrect = st.independentCorrect = checkAnswer(st.input, q);
    recordResult(q.id, st.finalCorrect ? 'correct' : 'incorrect');
  }
  seconds = (config.minutes || 45) * 60 - Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
  config.expired = expired; summary();
}
function summary() {
  dispose();
  const correct = questions.filter(q => states[q.id]?.independentCorrect).length;
  const mistakes = questions.filter(q => !states[q.id]?.independentCorrect);
  area().innerHTML = `<section class="summary-screen"><div class="summary-hero"><h2>${config.kind === 'daily' ? 'Today’s practice' : 'Session complete'}</h2><div class="summary-score">${correct} / ${questions.length}</div><p>answered correctly on the first try, without hints</p><p>${time(seconds)} ${exam() ? 'paper time' : 'solving time'}${config.expired ? ' · Time is up; your paper was submitted.' : ''}</p></div><p class="muted">Supported work is useful practice. It is counted separately from independent accuracy.</p><div class="summary-actions">${config.kind !== 'daily' ? '<button class="btn btn--primary-desk" id="summary-new-set-btn">New set</button>' : '<a href="#/" class="btn btn--primary-desk">Home</a>'}${mistakes.length && config.kind !== 'daily' ? '<button class="btn btn--secondary" id="summary-review-btn">Practise missed skills</button>' : ''}<button class="btn btn--secondary" id="summary-print-btn">Print these questions</button><button class="btn btn--secondary" id="summary-answers-btn">Print answer sheet</button></div><h3>Review your answers</h3>${questions.map((q, i) => `<details class="answer-review"><summary>${i + 1}. ${esc(TOPICS[q.topic])} — ${states[q.id]?.independentCorrect ? '✓ Independent' : 'Keep practising'}</summary>${questionBody(q)}<p>Your answer: ${esc(states[q.id]?.input || 'Not answered')}</p><p><strong>Answer: ${esc(answerText(q))}</strong></p><div class="explanation-box">${esc(q.explanation)}</div>${q.pitfall ? `<p>Watch out: ${esc(q.pitfall)}</p>` : ''}</details>`).join('')}</section>`;
  const root = area(), newSet = root.querySelector('#summary-new-set-btn');
  if (newSet) newSet.onclick = prompt;
  const review = root.querySelector('#summary-review-btn');
  if (review) review.onclick = () => {
    const selected = mistakes.map(q => followUp(q, bank, getProgress(), questions.map(item => item.id)) || q);
    mount(bank, { kind: 'practice', container: config.container, questions: [...new Map(selected.map(q => [q.id, q])).values()] });
  };
  root.querySelector('#summary-print-btn').onclick = () => printWorksheet(questions, { multipleChoice: config.kind === 'exam-set' });
  root.querySelector('#summary-answers-btn').onclick = () => printWorksheet(questions, { answers: true, multipleChoice: config.kind === 'exam-set' });
}

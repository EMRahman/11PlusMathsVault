import { recordResult, getSettings, updateSettings, isBookmarked, toggleBookmark, getBookmarks } from './state.js';
import { TOPICS, esc, shuffle, time, difficulty } from './content.js';

let bank = [], questions = [], index = 0, answers = {}, timer, remaining = 0, timerOn = false;
const oralLabels = { short: 'Easy to follow aloud', steps: 'Hold a few steps in mind', visualise: 'Picture the shape or movement' };
const area = () => document.getElementById('walk-question-area');
export function dispose() {
  clearInterval(timer);
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
}
export function init(all) {
  dispose(); bank = all.filter(q => q.mode === 'walk'); timerOn = getSettings().walkTimer;
  for (const id of ['walk-topic-filter', 'walk-difficulty-filter', 'walk-bookmark-filter', 'walk-setsize-filter', 'walk-oral-filter']) document.getElementById(id).onchange = start;
  document.getElementById('walk-shuffle-btn').onclick = start;
  start();
}
function start() {
  dispose(); index = 0; answers = {};
  const val = id => document.getElementById(id).value;
  const bookmarked = getBookmarks();
  questions = shuffle(bank.filter(q => (!val('walk-topic-filter') || q.topic === val('walk-topic-filter')) && (!val('walk-difficulty-filter') || q.difficulty === Number(val('walk-difficulty-filter'))) && (val('walk-bookmark-filter') !== 'bookmarked' || bookmarked.includes(q.id)) && (!val('walk-oral-filter') || q.oral_load === val('walk-oral-filter')))).slice(0, Number(val('walk-setsize-filter')));
  render();
}
function render() {
  dispose();
  if (!questions.length) { area().innerHTML = '<div class="empty-state"><p>No questions match. Try another topic, difficulty or listening level.</p></div>'; return; }
  const q = questions[index];
  const st = answers[q.id] ??= { revealed: false, choice: -1, showChoices: false, result: null };
  st.deadline ??= Date.now() + q.time_target_seconds * 1000;
  remaining = Math.max(0, Math.ceil((st.deadline - Date.now()) / 1000));
  area().innerHTML = `<div class="session-meta"><span>Question ${index + 1} of ${questions.length}</span><button class="text-button" id="walk-finish-btn">Finish walk</button></div><article class="question-card question-card--walk" id="walk-card" aria-label="Question ${index + 1}">
    <div class="card-meta"><span class="topic-tag">${esc(TOPICS[q.topic])}</span>${difficulty(q.difficulty)}<span class="oral-tag">${oralLabels[q.oral_load]}</span></div>
    <div class="card-controls"><button class="timer-toggle-btn" id="walk-timer-toggle" aria-pressed="${timerOn}">${timerOn ? '<span id="walk-timer-count">' + time(remaining) + '</span>' : 'Show timer'}</button><button class="bookmark-btn ${isBookmarked(q.id) ? 'bookmarked' : ''}" id="walk-bookmark-btn" aria-label="Bookmark this question" aria-pressed="${isBookmarked(q.id)}">★</button></div>
    <p class="question-text">${esc(q.question)}</p>
    ${'speechSynthesis' in window ? '<button class="btn btn--secondary" id="walk-listen-btn" aria-pressed="false">Read question aloud</button>' : '<p class="muted">Read this question aloud to your child.</p>'}
    <div class="walk-choice-controls"><label><input type="checkbox" id="walk-recall-toggle" ${getSettings().walkRecall !== false ? 'checked' : ''}> Try without choices first</label>${getSettings().walkRecall !== false ? `<button class="text-button" id="walk-choices-btn" aria-expanded="${st.showChoices || st.revealed}">${st.showChoices || st.revealed ? 'Hide choices' : 'Show choices'}</button>` : ''}</div>
    <ul class="options-list" id="walk-options" ${!st.showChoices && getSettings().walkRecall !== false && !st.revealed ? 'hidden' : ''}>${q.options.map((opt, i) => `<li><button class="option-item ${st.choice === i ? 'option-item--selected' : ''} ${st.revealed && i === q.answer_index ? 'option-item--correct' : ''} ${st.revealed && st.choice === i && i !== q.answer_index ? 'option-item--wrong' : ''}" data-choice="${i}" aria-pressed="${st.choice === i}" ${st.revealed ? 'disabled' : ''}><span class="option-label">${String.fromCharCode(65 + i)}</span><span>${esc(opt)}</span></button></li>`).join('')}</ul>
    ${st.revealed ? `<div class="answer-reveal"><div class="correct-answer-banner">✓ ${q.answer_display} — ${esc(q.answer)}</div><div class="explanation-box">${esc(q.explanation)}</div>${q.pitfall ? `<div class="pitfall-box"><strong>Watch out:</strong> ${esc(q.pitfall)}</div>` : ''}<p class="parent-prompt">Ask together: ${esc(q.parent_prompt)}</p><div class="result-buttons"><button class="btn btn--correct" data-result="correct" ${st.result ? 'disabled' : ''}>✓ Got it</button><button class="btn btn--incorrect" data-result="incorrect" ${st.result ? 'disabled' : ''}>Try again later</button><button class="btn btn--secondary" data-result="discussed" ${st.result ? 'disabled' : ''}>Discussed together</button></div><p role="status">${st.result ? 'Saved. Ready for the next question.' : 'Mark how it went. Discussions are counted separately from accuracy.'}</p></div>` : '<button class="btn btn--primary btn--full" id="walk-show-answer-btn">Show answer</button>'}
    <div class="card-nav"><button class="btn btn--secondary" id="walk-prev-btn" ${index === 0 ? 'disabled' : ''}>← Back</button><button class="btn btn--primary" id="walk-next-btn">${index === questions.length - 1 ? 'Finish walk' : 'Next →'}</button></div></article>`;
  area().querySelectorAll('[data-choice]').forEach(el => el.onclick = () => { st.choice = Number(el.dataset.choice); render(); });
  const reveal = area().querySelector('#walk-show-answer-btn');
  if (reveal) reveal.onclick = () => { st.revealed = true; render(); };
  area().querySelectorAll('[data-result]').forEach(el => el.onclick = () => {
    if (st.result) return;
    st.result = el.dataset.result; recordResult(q.id, st.result); render();
  });
  area().querySelector('#walk-prev-btn').onclick = () => { index--; render(); };
  area().querySelector('#walk-next-btn').onclick = () => { if (index === questions.length - 1) summary(); else { index++; render(); } };
  area().querySelector('#walk-finish-btn').onclick = summary;
  area().querySelector('#walk-bookmark-btn').onclick = () => { toggleBookmark(q.id); render(); };
  area().querySelector('#walk-timer-toggle').onclick = () => { timerOn = !timerOn; updateSettings({ walkTimer: timerOn }); render(); };
  area().querySelector('#walk-recall-toggle').onchange = event => { updateSettings({ walkRecall: event.target.checked }); st.showChoices = false; render(); };
  const choicesButton = area().querySelector('#walk-choices-btn');
  if (choicesButton) {
    choicesButton.disabled = st.revealed;
    choicesButton.onclick = () => { st.showChoices = !st.showChoices; render(); };
  }
  const card = area().querySelector('#walk-card');
  let touch;
  card.addEventListener('touchstart', event => {
    if (!event.target.closest('button, input, label')) touch = event.touches[0];
    else touch = null;
  }, { passive: true });
  card.addEventListener('touchend', event => {
    if (!touch) return;
    const dx = event.changedTouches[0].clientX - touch.clientX;
    const dy = event.changedTouches[0].clientY - touch.clientY;
    if (Math.abs(dx) < 60 || Math.abs(dy) > Math.abs(dx)) return;
    if (dx > 0 && index > 0) { index--; render(); }
    else if (dx < 0) { if (index < questions.length - 1) { index++; render(); } else summary(); }
  }, { passive: true });
  const listen = area().querySelector('#walk-listen-btn');
  if (listen) listen.onclick = () => {
    if (window.speechSynthesis.speaking) { window.speechSynthesis.cancel(); listen.textContent = 'Read question aloud'; listen.setAttribute('aria-pressed', 'false'); return; }
    const utterance = new SpeechSynthesisUtterance(spoken(q.spoken_question || q.question));
    utterance.lang = 'en-GB'; utterance.rate = 0.85;
    listen.textContent = 'Stop reading'; listen.setAttribute('aria-pressed', 'true');
    utterance.onend = utterance.onerror = () => { listen.textContent = 'Read question aloud'; listen.setAttribute('aria-pressed', 'false'); };
    window.speechSynthesis.speak(utterance);
  };
  if (timerOn && !st.revealed) {
    timer = setInterval(() => {
      remaining = Math.max(0, Math.ceil((st.deadline - Date.now()) / 1000));
      const el = document.getElementById('walk-timer-count');
      if (el) el.textContent = remaining ? time(remaining) : 'Take your time';
      if (!remaining) clearInterval(timer);
    }, 1000);
  }
}
function summary() {
  dispose();
  const results = Object.values(answers);
  const count = result => results.filter(st => st.result === result).length;
  const marked = results.filter(st => st.result).length;
  area().innerHTML = `<section class="summary-screen"><h2>Walk complete</h2><p class="summary-score">${marked} questions practised</p><div class="walk-summary"><p>✓ ${count('correct')} answered independently</p><p>↻ ${count('incorrect')} to revisit</p><p>↔ ${count('discussed')} discussed together</p><p class="muted">${questions.length - marked} left unmarked</p></div><p>Talking through a method is useful practice. Missed and discussed skills will be included in future revision.</p><div class="action-row"><button class="btn btn--primary" id="walk-again-btn">Another short walk</button><a class="btn btn--secondary" href="#/">Home</a></div></section>`;
  area().querySelector('#walk-again-btn').onclick = start;
}
function spoken(text) {
  return text.replace(/(\d+)\/(\d+)/g, '$1 over $2').replace(/×/g, ' times ').replace(/÷/g, ' divided by ').replace(/−/g, ' minus ').replace(/²/g, ' squared ').replace(/³/g, ' cubed ').replace(/%/g, ' percent ').replace(/°/g, ' degrees ').replace(/£(\d+)\.(\d{2})/g, '$1 pounds and $2 pence').replace(/£/g, ' pounds ').replace(/\bcm\b/g, ' centimetres ').replace(/\bkg\b/g, ' kilograms ').replace(/\bkm\b/g, ' kilometres ');
}

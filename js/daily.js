import { getProgress, getDaily, saveDaily, localDate } from './state.js';
import { dailyPlan, practiceBank } from './practice.js';
import * as desk from './desk.js';

function today() { return localDate(); }
export function getPlan(questions) {
  let plan = getDaily();
  if (plan?.date !== today() || !plan.items?.every(item => questions.some(q => q.id === item.id))) {
    const result = dailyPlan(practiceBank(questions), getProgress());
    plan = { date: today(), items: result.items.map(item => ({ id: item.question.id, reason: item.reason })), seconds: result.seconds, answers: {}, completed: false };
    saveDaily(plan);
  }
  // Keep the day's plan and history, but don't restore an old answer onto a revised question.
  const revisions = Object.fromEntries(plan.items.map(item => [item.id, questions.find(q => q.id === item.id).content_revision || 1]));
  const changed = plan.items.filter(item => (plan.revisions?.[item.id] || 1) !== revisions[item.id]);
  if (changed.length) {
    for (const item of changed) delete (plan.answers || {})[item.id];
    plan.completed = false;
  }
  if (changed.length || !plan.revisions) {
    plan.revisions = revisions;
    plan.seconds = plan.items.reduce((sum, item) => sum + questions.find(q => q.id === item.id).time_target_seconds, 0);
    saveDaily(plan);
  }
  return plan;
}
export function home(questions) {
  const plan = getPlan(questions);
  const done = Object.values(plan.answers || {}).filter(answer => answer.finished).length;
  const el = document.getElementById('daily-home');
  el.innerHTML = `<div><p class="eyebrow">A little practice, every day</p><h2>${plan.completed ? 'Today’s practice is complete' : 'Today’s 10-minute practice'}</h2><p>${plan.completed ? 'Come back tomorrow for new questions and a review of earlier skills.' : 'A mix of new questions, skills to strengthen and spaced revision. Take the time you need.'}</p><p class="muted">${plan.items.length} questions · ${Math.ceil(plan.seconds / 60)} minutes of suggested solving time${done ? ` · ${done} finished` : ''}</p></div><a href="#/daily" class="btn btn--primary-desk">${plan.completed ? 'See today’s results' : done ? 'Continue practice' : 'Start today’s practice'} →</a>`;
  document.getElementById('bank-count').textContent = `${questions.length} original practice questions across 10 topics. Works offline after your first visit.`;
}
export function init(questions) {
  const plan = getPlan(questions);
  desk.mount(practiceBank(questions), {
    kind: 'daily', container: 'daily-question-area',
    questions: plan.items.map(item => questions.find(q => q.id === item.id)),
    reasons: Object.fromEntries(plan.items.map(item => [item.id, item.reason])),
    saved: plan.answers,
    savedSeconds: plan.elapsed || 0,
    onSave: (answers, elapsed) => { plan.answers = answers; plan.elapsed = elapsed; saveDaily(plan); },
    onComplete: () => { plan.completed = true; saveDaily(plan); },
  });
}
export function dispose() { desk.dispose(); }

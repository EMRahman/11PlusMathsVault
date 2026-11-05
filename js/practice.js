// Scheduling is deliberately transparent: due skills, new questions, then mixed revision.
export function skillKey(q) { return `${q.topic}:${q.subtopic}`; }

export function skillProgress(questions, progress) {
  const skills = {};
  for (const q of questions) {
    const e = progress[q.id];
    if (!e) continue;
    const key = skillKey(q);
    const s = skills[key] ??= { attempted: 0, correct: 0, supported: 0, lastAttempted: null, due: null };
    s.attempted += e.attempted || 0;
    s.correct += e.correct || 0;
    s.supported += e.supported || 0;
    if (e.lastAttempted >= (s.lastAttempted || '')) {
      s.lastAttempted = e.lastAttempted;
      s.due = e.nextReview || null;
      s.lastResult = e.lastResult;
    }
  }
  return skills;
}

export function dailyPlan(questions, progress, now = new Date(), budget = 600) {
  // Daily practice uses open answers, including mental questions without their choices.
  const skills = skillProgress(questions, progress);
  const today = now.toISOString();
  const lastSeen = q => progress[q.id]?.lastAttempted || '';
  const due = questions.filter(q => skills[skillKey(q)]?.due && skills[skillKey(q)].due <= today)
    .sort((a, b) => skills[skillKey(a)].due.localeCompare(skills[skillKey(b)].due) || lastSeen(a).localeCompare(lastSeen(b)));
  const weak = questions.filter(q => {
    const s = skills[skillKey(q)];
    return s && (['discussed', 'assisted', 'incorrect'].includes(s.lastResult) || (s.attempted > 0 && s.correct / s.attempted < 0.6));
  }).sort((a, b) => lastSeen(a).localeCompare(lastSeen(b)));
  const unseen = questions.filter(q => !progress[q.id]).sort((a, b) => a.difficulty - b.difficulty || a.id - b.id);
  const mixed = [...questions].sort((a, b) => lastSeen(a).localeCompare(lastSeen(b)) || a.id - b.id);
  const picked = [], used = new Set();
  let seconds = 0;
  function take(pool, count, reason) {
    const usedSkills = new Set();
    for (const q of pool) {
      if (!count) break;
      if (used.has(q.id) || usedSkills.has(skillKey(q)) || seconds + q.time_target_seconds > budget) continue;
      picked.push({ question: q, reason });
      used.add(q.id); usedSkills.add(skillKey(q));
      seconds += q.time_target_seconds; count--;
    }
  }
  take(due, 2, 'Due for review');
  take(weak, 2, 'Build confidence');
  take(unseen, 3, 'New question');
  take(mixed, 6, 'Mixed revision');
  return { items: picked, seconds };
}

export function followUp(q, questions, progress, excluded = []) {
  return questions.filter(other => other.id !== q.id && !excluded.includes(other.id) && skillKey(other) === skillKey(q))
    .sort((a, b) => (progress[a.id]?.lastAttempted || '').localeCompare(progress[b.id]?.lastAttempted || '') || Math.abs(a.difficulty - q.difficulty) - Math.abs(b.difficulty - q.difficulty))[0];
}

// Mock papers are fixed sets stored on the questions themselves (paper_id, paper_position).
export const PAPER_FORMAT = {
  // Question counts are planning estimates from tutoring sites. The schools publish only "40 to 50 minutes".
  SET: { questions: 50, secondsPerQuestion: 54 },
  NWSSEE: { questions: 25, secondsPerQuestion: 108 },
};
export function listPapers(questions) {
  const ids = [...new Set(questions.filter(q => q.paper_id).map(q => q.paper_id))];
  return ids.sort().map(id => ({ id, stage: id.split('-')[0], number: Number(id.split('-')[1]), reserved: questions.some(q => q.paper_id === id && q.reserved_mock) }));
}
export function paperQuestions(questions, paperId) {
  return questions.filter(q => q.paper_id === paperId).sort((a, b) => a.paper_position - b.paper_position);
}
// The final paper of each stage stays unseen for a dress rehearsal, so it is left out of everyday practice.
export function practiceBank(questions) { return questions.filter(q => !q.reserved_mock); }
// A timed set keeps exam pace whatever its length, rounded up to a whole minute.
export function pacedMinutes(count, stage) {
  return Math.max(1, Math.ceil(count * PAPER_FORMAT[stage].secondsPerQuestion / 60));
}

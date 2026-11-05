import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { checkAnswer } from '../js/validate.js';
import { dailyPlan, skillProgress, skillKey, followUp, listPapers, paperQuestions, practiceBank, pacedMinutes } from '../js/practice.js';
import { diagram, TOPICS, answerText } from '../js/content.js';
import { METHOD_NOTES } from '../js/method-notes.js';
import { getTutorial } from '../js/tutorials.js';
import { worksheetHtml } from '../js/print.js';
import { initState, recordResult, getProgress, getBookmarks, resetAll, getSettings, localDate } from '../js/state.js';
const questions = JSON.parse(fs.readFileSync(new URL('../data/questions.json', import.meta.url)));
const storage = new Map();
globalThis.localStorage = {
  getItem: key => storage.get(key) ?? null,
  setItem: (key,value) => storage.set(key,String(value)),
  removeItem: key => storage.delete(key),
};
const now = new Date('2026-10-30T12:00:00Z');

test('every answer is accepted; every MCQ has exactly one correct option', () => {
  for (const q of questions) {
    assert.equal(checkAnswer(q.answer,q),true,`Q${q.id} rejects its own answer`);
    if (q.options) {
      assert.equal(new Set(q.options).size,5,`Q${q.id} has duplicate options`);
      assert.equal(q.options.filter(opt=>checkAnswer(opt,q)).length,1,`Q${q.id} has ambiguous choices`);
    }
  }
});
test('grading accepts exact equivalent values and formatting without accepting rounded answers', () => {
  const q={answer:'1/2',unit:null};
  for (const value of ['0.5','.500','2/4','1/2']) assert.ok(checkAnswer(value,q));
  assert.ok(!checkAnswer('0.333333',{answer:'1/3'}));
  assert.ok(!checkAnswer('1/0',q));
  assert.ok(!checkAnswer('0/0',q));
  assert.ok(checkAnswer('3,250',{answer:'3250'}));
});
test('requested simplest fractions, ratios, coordinate order and time are honoured', () => {
  const fraction={answer:'1/2',answer_format:'fraction_simplest'};
  assert.ok(!checkAnswer('2/4',fraction)); assert.ok(!checkAnswer('0.5',fraction)); assert.ok(checkAnswer('1/2',fraction));
  const ratio={answer:'4:1',answer_format:'ratio_simplest'};
  assert.ok(checkAnswer('4 to 1',ratio)); assert.ok(!checkAnswer('8:2',ratio));
  const coordinates={answer:'(2, -3)',answer_format:'coordinates'};
  assert.ok(checkAnswer('2,-3',coordinates)); assert.ok(!checkAnswer('(-3, 2)',coordinates));
  const time={answer:'9:05',answer_format:'time'};
  assert.ok(checkAnswer('09:05',time)); assert.ok(checkAnswer('9.05',time)); assert.ok(!checkAnswer('905',time)); assert.ok(!checkAnswer('09:65',time)); assert.ok(!checkAnswer('9.65',time));
});
test('units do not conceal a place-value or conversion error', () => {
  const q={answer:'2.25',unit:'kg'};
  assert.ok(checkAnswer('2.250 kg',q)); assert.ok(!checkAnswer('2.25 g',q)); assert.ok(!checkAnswer('2250',q));
  assert.ok(checkAnswer('£70.650',{answer:'70.65',unit:'£'}));
  assert.ok(checkAnswer('8°C',{answer:'8',unit:'°C'}));
  assert.equal(answerText({answer:'£24',unit:'£'}),'£24');
});
test('generated conversion and duration questions accept answers with the requested units', () => {
  const cases = [
    { id: 75, answer: '2500', unit: 'g', forms: ['g', 'grams'], wrong: 'kg' },
    { id: 79, answer: '1750', unit: 'ml', forms: ['ml', 'millilitres'], wrong: 'l' },
    { id: 83, answer: '320', unit: 'cm', forms: ['cm', 'centimetres'], wrong: 'm' },
    { id: 76, answer: '35', unit: 'minutes', forms: ['minutes', 'mins'], wrong: 'hours' },
    { id: 80, answer: '45', unit: 'minutes', forms: ['minutes', 'min'], wrong: 'hours' },
    { id: 84, answer: '85', unit: 'minutes', forms: ['minutes', 'minute'], wrong: 'hours' },
  ];
  for (const { id, answer, unit, forms, wrong } of cases) {
    const q = questions.find(q => q.id === id);
    assert.equal(q.unit, unit, `Q${id} must declare the requested unit`);
    assert.ok(checkAnswer(answer, q), `Q${id} must still accept a bare answer`);
    for (const form of forms) assert.ok(checkAnswer(`${answer} ${form}`, q), `Q${id} must accept ${form}`);
    assert.ok(!checkAnswer(`${answer} ${wrong}`, q), `Q${id} must reject the same number in ${wrong}`);
    assert.ok(!checkAnswer(`${Number(answer) * 10} ${unit}`, q), `Q${id} must reject a wrong value`);
  }
});
test('rounding explanations teach the correct direction for both hundredths cases', () => {
  const down = questions.find(q => q.id === 38);
  assert.equal(down.question, 'Round 7.83 to one decimal place.');
  assert.equal(down.answer, '7.8');
  assert.match(down.explanation, /hundredths digit is 3/);
  assert.match(down.explanation, /less than 5/);
  assert.match(down.explanation, /keep the tenths digit unchanged/);
  assert.doesNotMatch(down.explanation, /increase the tenths digit/);
  const up = questions.find(q => q.id === 34);
  assert.equal(up.question, 'Round 4.67 to one decimal place.');
  assert.equal(up.answer, '4.7');
  assert.match(up.explanation, /hundredths digit is 7/);
  assert.match(up.explanation, /at least 5/);
  assert.match(up.explanation, /increase the tenths digit/);
});
test('every skill has a different question for transfer practice', () => {
  const everyday=practiceBank(questions);
  for (const q of everyday) {
    const other=followUp(q,everyday,{});
    assert.ok(other,`Q${q.id}: ${skillKey(q)} has no follow-up`);
    assert.notEqual(other.id,q.id);
    assert.equal(skillKey(other),skillKey(q));
  }
});
test('all topics have oral and written practice with progressive, question-specific hints', () => {
  for (const topic of Object.keys(TOPICS)) {
    assert.equal(questions.filter(q=>q.topic===topic&&q.mode==='walk').length,12);
    assert.ok(questions.filter(q=>q.topic===topic&&q.mode==='desk').length>=9);
    assert.ok(questions.filter(q=>q.topic===topic&&q.mode==='set').length>=3);
  }
  for (const q of questions) {
    assert.equal(q.hints.length,2); assert.notEqual(q.hints[0],q.hints[1]);
    assert.ok(q.parent_prompt);
    if(q.mode==='walk') assert.ok(['short','steps','visualise'].includes(q.oral_load));
    else assert.equal(q.oral_load,null);
  }
});
test('all diagrams have a textual equivalent, with no unsafe markup', () => {
  const types=new Set();
  for (const q of questions.filter(q=>q.diagram)) {
    types.add(q.diagram.type);
    const html=diagram(q.diagram);
    if(q.diagram.type==='table') assert.ok(html.includes('<caption>'));
    else { assert.ok(html.includes('role="img"')); assert.ok(html.includes('aria-label="'+html.match(/aria-label="([^"]+)"/)[1])); }
    assert.ok(!html.includes('undefined')); assert.ok(!html.includes('NaN'));
  }
  for (const type of ['bars','line','pie','table','coordinates','triangle','l_shape','rectangle','shaded_grid','shape']) assert.ok(types.has(type),type);
  assert.ok(diagram({type:'rectangle',description:'<script>',width:'<img>',height:'2'}).includes('&lt;script&gt;'));
});
test('daily plans fit the solving budget and contain no duplicate questions', () => {
  for (const progress of [{}, Object.fromEntries(questions.map(q=>[q.id,{attempted:1,correct:1,lastAttempted:now.toISOString(),nextReview:'2026-11-30T00:00:00Z'}]))]) {
    const plan=dailyPlan(questions,progress,now);
    assert.ok(plan.items.length>0); assert.ok(plan.seconds<=600); assert.ok(plan.seconds>0);
    assert.equal(new Set(plan.items.map(item=>item.question.id)).size,plan.items.length);
  }
});
test('due review uses a fresh variant and a later skill review supersedes the old due date', () => {
  const original=questions[0];
  const progress={ [original.id]:{attempted:1,correct:0,lastResult:'incorrect',lastAttempted:'2026-10-25T12:00:00Z',nextReview:'2026-10-26T12:00:00Z'} };
  const plan=dailyPlan(questions,progress,now);
  const review=plan.items.find(item=>item.reason==='Due for review' && skillKey(item.question)===skillKey(original));
  assert.ok(review); assert.notEqual(review.question.id,original.id);
  progress[review.question.id]={attempted:1,correct:1,lastResult:'correct',lastAttempted:now.toISOString(),nextReview:'2026-11-06T12:00:00Z'};
  assert.equal(skillProgress(questions,progress)[skillKey(original)].due,'2026-11-06T12:00:00Z');
});
test('discussions and hints count as practice without lowering independent accuracy', () => {
  storage.clear(); initState();
  recordResult(1,'correct',{now});
  recordResult(1,'discussed',{now});
  recordResult(1,'correct',{assisted:true,now});
  recordResult(1,'incorrect',{usedSupport:true,now});
  const e=getProgress()[1];
  assert.equal(e.attempted,2); assert.equal(e.correct,1); assert.equal(e.discussed,1); assert.equal(e.supported,2);
});
test('review intervals grow after independent success and reset after difficulty', () => {
  storage.clear(); initState();
  recordResult(1,'correct',{now});
  assert.equal(getProgress()[1].nextReview,'2026-11-02T12:00:00.000Z');
  recordResult(1,'correct',{now});
  assert.equal(getProgress()[1].nextReview,'2026-11-06T12:00:00.000Z');
  recordResult(1,'incorrect',{now});
  assert.equal(getProgress()[1].nextReview,'2026-10-31T12:00:00.000Z');
});
test('upgrading preserves progress, bookmarks and preferences, and removes a known legacy discussion from accuracy', () => {
  storage.clear();
  localStorage.setItem('mathsvault_schema_version','1');
  localStorage.setItem('mathsvault_progress',JSON.stringify({1:{attempted:3,correct:2,lastResult:'discussed'}}));
  localStorage.setItem('mathsvault_bookmarks','[1,121]');
  localStorage.setItem('mathsvault_settings','{"deskSetSize":5}');
  initState();
  assert.equal(getProgress()[1].attempted,2); assert.equal(getProgress()[1].correct,2);
  assert.deepEqual(getBookmarks(),[1,121]); assert.equal(getSettings().deskSetSize,5);
  localStorage.setItem('some-other-app','keep'); resetAll();
  assert.equal(localStorage.getItem('some-other-app'),'keep');
});
test('method cards all have reasoning and conditions of use', () => {
  const source=fs.readFileSync(new URL('../js/hacks.js',import.meta.url),'utf8');
  const methodIds=[...source.matchAll(/        id: '([^']+)'/g)].map(m=>m[1]);
  for(const id of methodIds) assert.ok(METHOD_NOTES[id]?.every(note=>note.length>20),id);
});
test('offline cache includes every runtime module and all shell files exist', () => {
  const source=fs.readFileSync(new URL('../sw.js',import.meta.url),'utf8');
  const cached=[...source.matchAll(/'\.\/([^']+)'/g)].map(m=>m[1]);
  const modules=fs.readdirSync(new URL('../js',import.meta.url)).filter(f=>f.endsWith('.js'));
  for (const module of modules) assert.ok(cached.includes('js/'+module),module);
  for (const file of cached) assert.ok(fs.existsSync(new URL('../'+file,import.meta.url)),file);
});
test('the daily date follows the user’s local calendar', () => {
  assert.equal(localDate(new Date(2026,9,30,0,1)),'2026-10-30');
});

test('chart questions agree with the plotted data and percentage totals', () => {
  for (const q of questions.filter(q=>q.id<=210 && ['bars','line','pie'].includes(q.diagram?.type))) {
    const d=q.diagram;
    assert.equal(d.labels.length,d.values.length);
    if(d.type==='bars') assert.equal(Number(q.answer),d.values[2]-d.values[0],`Q${q.id}`);
    if(d.type==='line') assert.equal(Number(q.answer),d.values[2]-d.values[3],`Q${q.id}`);
    if(d.type==='pie') {
      assert.equal(d.values.reduce((a,b)=>a+b),100);
      const total=Number(q.question.match(/of (\d+) pupils/)[1]);
      assert.equal(Number(q.answer)*100,total*d.values[0],`Q${q.id}`);
    }
  }
});

test('reflection and rectangle answers agree with the coordinates in their diagrams', () => {
  for (const q of questions.filter(q=>q.diagram?.type==='coordinates')) {
    const pts=q.diagram.points;
    assert.ok(pts.every(p=>Math.abs(p.x)<=5 && Math.abs(p.y)<=5));
    const actual=String(q.answer).match(/-?\d+/g)?.map(Number);
    if(q.subtopic==='reflection') assert.deepEqual(actual,[-pts[0].x,pts[0].y]);
    if(q.subtopic==='rectangle_coordinates') assert.deepEqual(actual,[pts[0].x,pts[2].y]);
  }
});

test('bank generation is deterministic and preserves the original IDs', async () => {
  const { execFileSync }=await import('node:child_process');
  const before=fs.readFileSync(new URL('../data/questions.json',import.meta.url),'utf8');
  execFileSync(process.execPath,['scripts/build-questions.cjs','--check'],{cwd:new URL('..',import.meta.url)});
  assert.equal(fs.readFileSync(new URL('../data/questions.json',import.meta.url),'utf8'),before);
  for(const id of [1,2,3,4,5,6,7,8,9,10,121,122,123,124,125,126,127,128,129,130]) assert.ok(questions.some(q=>q.id===id));
});

test('tutorial guidance matches the specific question variant across modes', () => {
  const qXReflect = questions.find(q => q.id === 110);
  const qYReflect = questions.find(q => q.id === 203);
  const tX = getTutorial(qXReflect);
  const tY = getTutorial(qYReflect);
  assert.ok(tX.concept.includes('x-axis') && tX.steps[2].includes('y → −y'));
  assert.ok(tY.concept.includes('y-axis') && tY.steps[2].includes('x → −x'));

  const qConsec3 = questions.find(q => q.id === 7);
  const qConsec5 = questions.find(q => q.id === 127);
  const t3 = getTutorial(qConsec3);
  const t5 = getTutorial(qConsec5);
  assert.ok(t3.concept.includes('Three') && t3.steps[0].includes('÷ 3'));
  assert.ok(t5.concept.includes('Five') && t5.steps[0].includes('÷ 5'));

  const qRemFrac = questions.find(q => q.id === 139);
  const qDirFrac = questions.find(q => q.id === 9);
  assert.ok(getTutorial(qRemFrac).concept.includes('Remainder'));
  assert.ok(getTutorial(qDirFrac).concept.includes('Unitary Method'));
});

test('chart data is hidden from sighted readers but available to assistive technology', () => {
  const q=questions.find(q=>q.id===194);
  const html=diagram(q.diagram);
  assert.ok(!html.includes('<figcaption>'));
  assert.ok(!html.includes('<title>'));
  assert.match(html,/aria-label="Books borrowed: Monday 8/);
  assert.doesNotMatch(q.question,/Monday: 8/);
  assert.match(diagram({type:'rectangle',description:'x',width:'1',height:'2'}),/Not to scale/);
});
test('shaded grids draw exactly the requested cells, and shapes render their parts', () => {
  const html=diagram({type:'shaded_grid',rows:2,cols:3,shaded:[[0,0],[1,2]],description:'x'});
  assert.equal(html.match(/<rect/g).length,6);
  assert.equal(html.match(/grid-cell--shaded/g).length,2);
  for(const q of questions.filter(q=>q.diagram?.type==='shaded_grid'&&q.answer_format==='fraction_simplest')) {
    const [a,b]=q.answer.split('/').map(Number);
    assert.ok(Math.abs(q.diagram.shaded.length/(q.diagram.rows*q.diagram.cols)-a/b)<1e-9,`Q${q.id}`);
  }
  const shape=diagram({type:'shape',polygons:[{points:[[20,20],[50,20],[20,50]],shaded:true}],lines:[{from:[1,1],to:[2,2],dashed:true}],circles:[{cx:50,cy:50,r:20}],labels:[{x:5,y:5,text:'<b>'}],description:'x'});
  assert.ok(shape.includes('shape-filled')&&shape.includes('<line')&&shape.includes('<circle')&&shape.includes('&lt;b&gt;'));
});
test('money answers always show two decimal places', () => {
  assert.equal(answerText({answer:'27.6',unit:'£'}),'£27.60');
  assert.equal(answerText({answer:'70.65',unit:'£'}),'£70.65');
  assert.equal(answerText({answer:'12',unit:'£'}),'£12');
  assert.equal(answerText(questions.find(q=>q.id===147)),'£27.60');
  assert.match(questions.find(q=>q.id===147).explanation,/£27\.60/);
});
test('mock papers are fixed, ordered, complete and timed at exam pace', () => {
  const papers=listPapers(questions);
  assert.deepEqual(papers.map(p=>p.id),['NWSSEE-1','NWSSEE-2','NWSSEE-3','SET-1','SET-2','SET-3']);
  for(const paper of papers) {
    const list=paperQuestions(questions,paper.id);
    assert.equal(list.length,paper.stage==='SET'?50:25);
    assert.deepEqual(list.map(q=>q.paper_position),list.map((_,i)=>i+1));
    assert.equal(paper.reserved,paper.number===3);
  }
  assert.ok(paperQuestions(questions,'SET-1').every(q=>q.mode==='set'));
  assert.ok(paperQuestions(questions,'NWSSEE-1').every(q=>q.mode==='desk'));
  assert.equal(pacedMinutes(50,'SET'),45); assert.equal(pacedMinutes(25,'NWSSEE'),45);
  assert.equal(pacedMinutes(10,'SET'),9); assert.equal(pacedMinutes(10,'NWSSEE'),18);
});
test('the dress-rehearsal paper never appears in everyday practice', () => {
  const everyday=practiceBank(questions);
  assert.ok(everyday.every(q=>!q.reserved_mock));
  assert.ok(everyday.length<questions.length);
  const plan=dailyPlan(everyday,{},now);
  assert.ok(plan.items.every(item=>!item.question.reserved_mock));
});
test('original question IDs keep their question text, so saved progress stays meaningful', () => {
  assert.equal(questions.find(q=>q.id===1).question,'Work out 38 × 24.');
  assert.equal(questions.find(q=>q.id===121).mode,'desk');
  assert.equal(questions.find(q=>q.id===78).question.includes('1 kilogram of flour'),true);
});
test('authored question sources contain the proof fields only at authoring time', () => {
  for(const q of questions) { assert.ok(!('check' in q)); assert.ok(!('distractors' in q)); assert.ok(!('check_note' in q)); }
});
test('difficulty labels reflect demand, not the position of a question in its family', () => {
  const rate=id=>questions.find(q=>q.id===id).difficulty;
  assert.ok(rate(19)<rate(1),'36 × 5 must rate below 38 × 24');
  assert.equal(rate(185),rate(127),'the same five-consecutive-odd method rates the same');
});

test('shaded grid cells keep fixed colours, so shaded cells are dark in both themes', () => {
  const css=fs.readFileSync(new URL('../css/style.css',import.meta.url),'utf8');
  assert.match(css,/\.grid-cell \{ fill: #fff;/);
  assert.match(css,/\.grid-cell--shaded \{ fill: #111;/);
});
test('an answer written with a unit outside the unit list is still accepted through answer_alt', () => {
  const q=questions.find(q=>q.id===404);
  for (const form of ['40','40 seconds','40 s','40s']) assert.ok(checkAnswer(form,q),form);
  assert.ok(!checkAnswer('41',q));
});
test('new bank stays within KS2 wording: no median, no decimal divisors', () => {
  for (const q of questions.filter(q=>q.id>210)) {
    assert.doesNotMatch(q.question,/\b(median|mode of|pythagoras)\b/i,`Q${q.id}`);
    assert.doesNotMatch(q.question,/÷ 0\.\d/,`Q${q.id}`);
  }
});

test('tutorial guidance does not contradict the new question types', () => {
  const tutorialFor = id => getTutorial(questions.find(q => q.id === id));
  for (const id of [251, 292, 338, 339, 340, 341, 393, 394, 395]) assert.equal(tutorialFor(id), null, `Q${id} should have no tutorial`);
  assert.match(tutorialFor(311).steps.join(' '), /perimeter/i);
  assert.match(tutorialFor(299).steps.join(' '), /isosceles/i);
  assert.match(tutorialFor(301).steps.join(' '), /cannot be decided/);
  assert.match(tutorialFor(307).steps.join(' '), /360°/);
  assert.doesNotMatch(tutorialFor(211).steps.join(' '), /\b15\b|\b25\b/);
});

test('Walk Mode mistake notes describe working that gives the chosen value', () => {
  const note = (id, value) => questions.find(q => q.id === id).distractor_notes[value];
  assert.match(note(105, '18'), /\(16 \+ 20\) ÷ 2 = 18/);
  assert.match(note(103, '18'), /7 \+ 11 = 18/);
  assert.match(note(59, '80'), /4\/5 is 80%/);
  assert.match(note(49, '8'), /5 \+ 3 = 8/);
});

test('mixed worksheets keep the options on multiple-choice questions only', () => {
  const choice = questions.find(q => q.id === 342), written = questions.find(q => q.id === 121);
  const sheet = worksheetHtml([choice, written]);
  assert.equal(sheet.match(/print-options/g).length, 1);
  for (const opt of choice.options) assert.ok(sheet.includes(opt));
  assert.equal(sheet.match(/Final answer:/g).length, 1);
  assert.match(sheet, /Multiple choice and written answers/);
  assert.doesNotMatch(sheet, /separate answer grid/);
  assert.match(worksheetHtml([choice, written], { answers: true }), new RegExp(`<strong>${choice.answer_display} — `));
  assert.match(worksheetHtml([choice]), /separate answer grid/);
  assert.match(worksheetHtml([written]), /Written answers/);
});

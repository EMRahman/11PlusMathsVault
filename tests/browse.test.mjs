import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as desk from '../js/desk.js';
import * as walk from '../js/walk.js';
import { getProgress, resetAll } from '../js/state.js';

// A small DOM adapter runs the actual render functions and click/input handlers in Node.
// Canvas drawing and browser layout are stubbed; question navigation and storage are real.
class Element {
  constructor(attributes = {}) {
    this.attributes = attributes;
    this.dataset = Object.fromEntries(Object.entries(attributes).filter(([key])=>key.startsWith('data-')).map(([key,value])=>[key.slice(5),value]));
    this.value = attributes.value || '';
    this.disabled = Object.hasOwn(attributes,'disabled');
    this.checked = Object.hasOwn(attributes,'checked');
    this.hidden = Object.hasOwn(attributes,'hidden');
    this.style = {};
    const classes=new Set((attributes.class || '').split(' '));
    this.classList={add:value=>classes.add(value),remove:value=>classes.delete(value),contains:value=>classes.has(value),toggle:(value,force)=>{const enabled=force??!classes.has(value);if(enabled)classes.add(value);else classes.delete(value);return enabled;}};
    this.innerHTML='';
    this.strokeCount=0;
  }
  set innerHTML(value) { this.html=value; this.nodes=null; }
  get innerHTML() { return this.html; }
  elements() {
    return this.nodes ??= [...this.html.matchAll(/<([a-z][\w-]*)\b([^>]*)>/gi)].map(match=>{
      const attrs=Object.fromEntries([...match[2].matchAll(/([\w-]+)(?:="([^"]*)")?/g)].map(a=>[a[1],a[2]??'']));
      const element=new Element(attrs); element.tag=match[1]; return element;
    });
  }
  querySelectorAll(selector) {
    return this.elements().filter(element=>selector.split(',').some(raw=>{
      const s=raw.trim();
      if(s.startsWith('#'))return element.attributes.id===s.slice(1);
      if(s.startsWith('.'))return (element.attributes.class || '').split(' ').includes(s.slice(1));
      if(s.startsWith('[')) {
        const [,key,value]=s.match(/^\[([\w-]+)(?:="([^"]*)")?\]/)||[];
        return Object.hasOwn(element.attributes,key)&&(value==null||element.attributes[key]===value)&&(!s.endsWith(':checked')||element.checked);
      }
      return element.tag===s;
    }));
  }
  querySelector(selector) { return this.querySelectorAll(selector)[0] || null; }
  click() { if(!this.disabled)this.onclick?.({target:this,currentTarget:this,preventDefault(){}}); }
  setAttribute(key,value) { this.attributes[key]=String(value); }
  addEventListener() {}
  focus() {}
  scrollIntoView() {}
  setPointerCapture() {}
  getBoundingClientRect() { return {left:0,top:0,width:300,height:280}; }
  getContext() { return this.context ??= {clearRect(){},setTransform(){},beginPath(){},lineTo(){},moveTo(){},stroke:()=>this.strokeCount++}; }
}
const storage=new Map();
globalThis.localStorage={getItem:key=>storage.get(key)??null,setItem:(key,value)=>storage.set(key,String(value)),removeItem:key=>storage.delete(key)};
globalThis.window={devicePixelRatio:1};
globalThis.getComputedStyle=()=>({color:'#111'});
globalThis.ResizeObserver=class { observe(){} disconnect(){} };
globalThis.setInterval=()=>1;
globalThis.clearInterval=()=>{};
const bank=JSON.parse(fs.readFileSync(new URL('../data/questions.json',import.meta.url)));
let elements;
function setup(mode) {
  resetAll(); elements=new Map();
  const ids=mode==='desk'
    ? ['desk-question-area','desk-setsize-filter','desk-session-type','desk-topic-filter','desk-difficulty-filter','desk-bookmark-filter','desk-exam-minutes','desk-mock-paper','desk-filter-bar','desk-exam-duration','desk-start-btn']
    : ['walk-question-area','walk-topic-filter','walk-difficulty-filter','walk-bookmark-filter','walk-setsize-filter','walk-oral-filter','walk-shuffle-btn','walk-browse-btn'];
  for(const id of ids)elements.set(id,new Element({id}));
  elements.get(`${mode}-setsize-filter`).value='5';
  if(mode==='desk')elements.get('desk-session-type').value='practice';
  globalThis.document={getElementById:id=>elements.get(id)||elements.get(`${mode}-question-area`).querySelector('#'+id)};
}
const root=mode=>elements.get(`${mode}-question-area`);
const click=(mode,id)=>{const button=root(mode).querySelector(id);assert.ok(button,`${id} is present`);button.click();};

test('the larger eraser shows its footprint without drawing on hover and clears after touch',()=>{
  setup('desk'); desk.init(bank);
  click('desk','#desk-browse-btn'); click('desk','#browse-start-btn');
  const pad=root('desk').querySelector('#workpad');
  const outline=root('desk').querySelector('#workpad-eraser-outline');
  assert.ok(outline.hidden);
  click('desk','#wp-eraser');
  assert.ok(pad.classList.contains('is-erasing'));
  pad.onpointermove({pointerId:1,pointerType:'mouse',clientX:150,clientY:140});
  assert.equal(outline.hidden,false);
  assert.equal(outline.style.left,'50%');
  assert.equal(outline.style.top,'50%');
  assert.equal(pad.strokeCount,0,'hover must not erase');
  pad.onpointerdown({pointerId:1,pointerType:'touch',clientX:150,clientY:140});
  assert.equal(pad.context.lineWidth,32);
  pad.onpointerup({pointerId:1,pointerType:'touch'});
  assert.ok(outline.hidden,'a lifted finger must not leave an outline');
  pad.onpointermove({pointerId:2,pointerType:'mouse',clientX:30,clientY:28});
  pad.onpointerleave();
  assert.ok(outline.hidden);
  click('desk','#wp-pen');
  pad.onpointermove({pointerId:2,pointerType:'mouse',clientX:30,clientY:28});
  assert.ok(outline.hidden);
  assert.equal(pad.classList.contains('is-erasing'),false);
  desk.dispose();
});

test('Desk browsing keeps the whole filtered list, selected start, answers and working',()=>{
  setup('desk'); desk.init(bank);
  click('desk','#desk-browse-btn');
  const list=bank.filter(q=>q.mode==='desk'&&!q.reserved_mock);
  const select=root('desk').querySelector('[data-practise="1"]');
  select.click();
  assert.match(root('desk').innerHTML,new RegExp(`Q2 of ${list.length}`));
  const input=root('desk').querySelector('#desk-answer-input');
  input.value='unfinished work'; input.oninput();
  const pad=root('desk').querySelector('#workpad');
  pad.onpointerdown({pointerId:1,clientX:20,clientY:20});
  pad.onpointerup({pointerId:1});
  click('desk','#desk-next-btn');
  assert.match(root('desk').innerHTML,new RegExp(`Q3 of ${list.length}`));
  click('desk','#desk-prev-btn');
  assert.equal(root('desk').querySelector('#desk-answer-input').value,'unfinished work');
  assert.ok(root('desk').querySelector('#workpad').strokeCount>0,'working is redrawn');
  assert.deepEqual(getProgress(),{},'moving between unanswered questions does not record errors');
  click('desk','#desk-all-questions-btn');
  root('desk').querySelector('[data-practise="1"]').click();
  assert.equal(root('desk').querySelector('#desk-answer-input').value,'unfinished work');
  assert.ok(root('desk').querySelector('#workpad').strokeCount>0,'working survives returning to the list');
  click('desk','#desk-prev-btn');
  assert.ok(root('desk').querySelector('#desk-prev-btn').disabled);
  click('desk','#desk-all-questions-btn');
  root('desk').querySelector(`[data-practise="${list.length-1}"]`).click();
  assert.ok(root('desk').querySelector('#desk-next-btn').disabled);
  assert.match(root('desk').innerHTML,/Last question/);
  desk.dispose();
});

test('SET browsing preserves choices and counts a completed question only once',()=>{
  setup('desk'); elements.get('desk-session-type').value='practice-set';
  elements.get('desk-topic-filter').value='fractions';
  desk.init(bank); click('desk','#desk-browse-btn'); click('desk','#browse-start-btn');
  const list=bank.filter(q=>q.mode==='set'&&q.topic==='fractions'&&!q.reserved_mock);
  assert.match(root('desk').innerHTML,new RegExp(`Q1 of ${list.length}`));
  const option=root('desk').querySelectorAll('[name="exam-answer"]').find(el=>el.value===list[0].answer);
  option.onchange();
  click('desk','#desk-next-btn'); click('desk','#desk-prev-btn');
  assert.ok(root('desk').querySelectorAll('[name="exam-answer"]').find(el=>el.value===list[0].answer).checked);
  root('desk').querySelector('#desk-answer-form').onsubmit({preventDefault(){}});
  assert.equal(getProgress()[list[0].id].attempted,1);
  click('desk','#desk-next-btn'); click('desk','#desk-prev-btn');
  assert.equal(getProgress()[list[0].id].attempted,1);
  assert.match(root('desk').innerHTML,/Correct independently/);
  desk.dispose();
});

test('Walk browsing ignores set size, retains revealed answers and respects list boundaries',()=>{
  setup('walk'); elements.get('walk-topic-filter').value='fractions';
  walk.init(bank); elements.get('walk-browse-btn').click();
  const list=bank.filter(q=>q.mode==='walk'&&q.topic==='fractions');
  root('walk').querySelector('[data-practise="1"]').click();
  assert.match(root('walk').innerHTML,new RegExp(`Question 2 of ${list.length}`));
  click('walk','#walk-show-answer-btn');
  root('walk').querySelector('[data-result="correct"]').click();
  click('walk','#walk-next-btn'); click('walk','#walk-prev-btn');
  assert.ok(root('walk').querySelector('[data-result="correct"]').disabled);
  assert.equal(getProgress()[list[1].id].attempted,1);
  click('walk','#walk-finish-btn');
  root('walk').querySelector('[data-practise="1"]').click();
  assert.ok(root('walk').querySelector('[data-result="correct"]').disabled);
  click('walk','#walk-finish-btn'); click('walk','#browse-start-btn');
  assert.ok(root('walk').querySelector('#walk-prev-btn').disabled);
  click('walk','#walk-finish-btn');
  root('walk').querySelector(`[data-practise="${list.length-1}"]`).click();
  assert.ok(root('walk').querySelector('#walk-next-btn').disabled);
  assert.equal(Object.keys(getProgress()).length,1,'skipped questions do not count as attempted');
  walk.dispose();
});

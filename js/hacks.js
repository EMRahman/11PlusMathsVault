/**
 * hacks.js — Common 11+ maths hacks and quick quiz.
 *
 * Provides a focused revision page for high-value mental maths shortcuts.
 */

const HACKS = [
  {
    id: 'percent-swap',
    title: 'Swap percentages: a% of b = b% of a',
    rule: 'If one direction looks awkward, swap it. 8% of 75 is the same as 75% of 8.',
    example: '8% of 75 = 75% of 8 = 6.',
  },
  {
    id: 'ten-one-percent',
    title: 'Find 10% and 1% first',
    rule: '10% means divide by 10. 1% means divide by 100. Build other percentages from these anchors.',
    example: '17% of 200 = 10% + 7% = 20 + 14 = 34.',
  },
  {
    id: 'quarter-percent',
    title: 'Know the friendly percentages',
    rule: '50% is half, 25% is a quarter, 75% is three quarters, 20% is a fifth, and 12.5% is an eighth.',
    example: '12.5% of 64 = 1/8 of 64 = 8.',
  },
  {
    id: 'near-ten',
    title: 'Multiply near 10, 100, or 1000',
    rule: 'Round to a friendly number, multiply, then adjust for the extra or missing amount.',
    example: '98 × 7 = 100 × 7 − 2 × 7 = 700 − 14 = 686.',
  },
  {
    id: 'eleven-times',
    title: 'Multiply a 2-digit number by 11',
    rule: 'For ab × 11, keep the outside digits and put their sum in the middle. Carry if the sum is 10 or more.',
    example: '43 × 11 = 473 because 4 + 3 = 7. 68 × 11 = 748 because 6 + 8 = 14.',
  },
  {
    id: 'difference-squares',
    title: 'Use difference of squares',
    rule: 'Numbers equally spaced around a middle number can be multiplied with n² − gap².',
    example: '19 × 21 = 20² − 1² = 400 − 1 = 399.',
  },
  {
    id: 'divide-fractions',
    title: 'Divide fractions by flipping the second fraction',
    rule: 'Keep the first fraction, change divide to multiply, then flip the second fraction.',
    example: '3/4 ÷ 1/2 = 3/4 × 2/1 = 6/4 = 1 1/2.',
  },
  {
    id: 'ratio-total-parts',
    title: 'Ratio sharing: add the parts first',
    rule: 'Add the ratio parts, divide the total by that number, then multiply by the part you need.',
    example: '£72 in the ratio 5:4 has 9 parts, so 1 part = £8 and the 5-part share is £40.',
  },
  {
    id: 'average-total',
    title: 'Average shortcut: total = average × number',
    rule: 'If you know the average and how many values there are, multiply to find the total.',
    example: 'An average of 14 over 6 scores means the total is 14 × 6 = 84.',
  },
  {
    id: 'casting-nines',
    title: 'Check arithmetic with digit sums',
    rule: 'For multiplication, compare digit sums to catch many slips. It is a check, not a full proof.',
    example: '37 × 24: digit sums 1 and 6, product check 6. 888 has digit sum 6, so it passes the check.',
  },
];

const QUIZ = [
  {
    question: 'Use the swap trick: what is 4% of 75?',
    options: ['2', '3', '4', '6'],
    answer: '3',
    explanation: '4% of 75 = 75% of 4 = 3.',
  },
  {
    question: 'What is 17% of 200?',
    options: ['27', '34', '37', '44'],
    answer: '34',
    explanation: '10% is 20 and 7% is 14, so 17% is 34.',
  },
  {
    question: 'What is 12.5% of 64?',
    options: ['6', '8', '12', '16'],
    answer: '8',
    explanation: '12.5% is one eighth, and 64 ÷ 8 = 8.',
  },
  {
    question: 'Work out 98 × 7 using the near-100 hack.',
    options: ['676', '686', '696', '706'],
    answer: '686',
    explanation: '100 × 7 = 700, then subtract 2 × 7 = 14, giving 686.',
  },
  {
    question: 'What is 43 × 11?',
    options: ['433', '463', '473', '483'],
    answer: '473',
    explanation: 'Place 4 + 3 = 7 between 4 and 3, giving 473.',
  },
  {
    question: 'Use difference of squares: what is 19 × 21?',
    options: ['389', '399', '409', '419'],
    answer: '399',
    explanation: '19 and 21 sit around 20, so 20² − 1² = 399.',
  },
  {
    question: 'What is 3/4 ÷ 1/2?',
    options: ['3/8', '3/4', '1 1/2', '2'],
    answer: '1 1/2',
    explanation: '3/4 ÷ 1/2 = 3/4 × 2/1 = 6/4 = 1 1/2.',
  },
  {
    question: '£72 is shared in the ratio 5:4. What is the larger share?',
    options: ['£32', '£36', '£40', '£45'],
    answer: '£40',
    explanation: 'There are 9 parts. One part is £8, so 5 parts is £40.',
  },
  {
    question: 'The average of 6 scores is 14. What is the total?',
    options: ['20', '70', '84', '90'],
    answer: '84',
    explanation: 'Total = average × number = 14 × 6 = 84.',
  },
  {
    question: 'For 37 × 24, the digit-sum check should match which digit sum?',
    options: ['3', '4', '6', '8'],
    answer: '6',
    explanation: '37 has digit sum 1 and 24 has digit sum 6. 1 × 6 gives a check digit of 6.',
  },
];

let _answers = new Map();
let _submitted = false;

export function init() {
  _answers = new Map();
  _submitted = false;
  _render();
}

function _render() {
  const area = document.getElementById('hacks-content');
  if (!area) return;

  area.innerHTML = `
    <section class="hacks-hero" aria-labelledby="hacks-title">
      <p class="hacks-kicker">Speed tricks for 11+</p>
      <h2 id="hacks-title">Common maths hacks</h2>
      <p>Learn the shortcuts, then try one quiz question for each hack. These are meant to save seconds after you understand the method.</p>
    </section>

    <section class="hacks-grid" aria-label="Common 11 plus maths hacks">
      ${HACKS.map((hack, index) => `
        <article class="hack-card">
          <div class="hack-card__number">${index + 1}</div>
          <div class="hack-card__body">
            <h3>${hack.title}</h3>
            <p>${hack.rule}</p>
            <div class="hack-example"><strong>Example:</strong> ${hack.example}</div>
          </div>
        </article>
      `).join('')}
    </section>

    <section class="hack-quiz" aria-labelledby="hack-quiz-title">
      <div class="hack-quiz__header">
        <div>
          <p class="hacks-kicker">Quiz</p>
          <h2 id="hack-quiz-title">Test every hack</h2>
        </div>
        <button id="hack-reset-btn" class="btn btn--secondary" type="button">Reset quiz</button>
      </div>
      <div class="hack-quiz__questions">
        ${QUIZ.map((item, index) => _renderQuizQuestion(item, index)).join('')}
      </div>
      <button id="hack-submit-btn" class="btn btn--primary btn--full" type="button">Check my answers</button>
      <div id="hack-quiz-result" class="hack-quiz__result" aria-live="polite"></div>
    </section>
  `;

  _bindQuiz(area);
}

function _renderQuizQuestion(item, index) {
  return `
    <fieldset class="hack-quiz-card" data-question-index="${index}">
      <legend>${index + 1}. ${item.question}</legend>
      <div class="hack-quiz-options">
        ${item.options.map(option => `
          <label class="hack-quiz-option">
            <input type="radio" name="hack-question-${index}" value="${option}">
            <span>${option}</span>
          </label>
        `).join('')}
      </div>
      <p class="hack-quiz-feedback" hidden></p>
    </fieldset>
  `;
}

function _bindQuiz(area) {
  area.querySelectorAll('input[type="radio"]').forEach(input => {
    input.addEventListener('change', () => {
      _answers.set(input.name, input.value);
      if (_submitted) _markQuestion(input.closest('.hack-quiz-card'));
    });
  });

  area.querySelector('#hack-submit-btn')?.addEventListener('click', () => {
    _submitted = true;
    area.querySelectorAll('.hack-quiz-card').forEach(card => _markQuestion(card));
    _renderScore(area);
  });

  area.querySelector('#hack-reset-btn')?.addEventListener('click', () => {
    _answers.clear();
    _submitted = false;
    area.querySelectorAll('input[type="radio"]').forEach(input => { input.checked = false; });
    area.querySelectorAll('.hack-quiz-card').forEach(card => {
      card.classList.remove('correct', 'incorrect');
      const feedback = card.querySelector('.hack-quiz-feedback');
      if (feedback) {
        feedback.hidden = true;
        feedback.textContent = '';
      }
    });
    const result = area.querySelector('#hack-quiz-result');
    if (result) result.textContent = '';
  });
}

function _markQuestion(card) {
  if (!card) return;
  const index = Number(card.dataset.questionIndex);
  const item = QUIZ[index];
  const checked = card.querySelector('input[type="radio"]:checked');
  const feedback = card.querySelector('.hack-quiz-feedback');

  card.classList.remove('correct', 'incorrect');

  if (!checked) {
    card.classList.add('incorrect');
    if (feedback) {
      feedback.hidden = false;
      feedback.textContent = `Not answered yet. Correct answer: ${item.answer}. ${item.explanation}`;
    }
    return;
  }

  const isCorrect = checked.value === item.answer;
  card.classList.add(isCorrect ? 'correct' : 'incorrect');
  if (feedback) {
    feedback.hidden = false;
    feedback.textContent = isCorrect
      ? `Correct. ${item.explanation}`
      : `Not quite. Correct answer: ${item.answer}. ${item.explanation}`;
  }
}

function _renderScore(area) {
  const score = QUIZ.reduce((total, item, index) => {
    const selected = area.querySelector(`input[name="hack-question-${index}"]:checked`);
    return total + (selected?.value === item.answer ? 1 : 0);
  }, 0);

  const result = area.querySelector('#hack-quiz-result');
  if (result) {
    result.textContent = `Score: ${score}/${QUIZ.length}. ${score === QUIZ.length ? 'Brilliant — every shortcut is ready!' : 'Review the highlighted cards, then reset and try again.'}`;
  }
}

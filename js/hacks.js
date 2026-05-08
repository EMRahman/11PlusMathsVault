/**
 * hacks.js — Common 11+ maths hacks, organised by topic, plus a quick quiz.
 *
 * Each entry in HACK_SECTIONS groups the most-talked-about shortcuts for a
 * single topic area. The quiz spans every section so practice covers all of
 * them rather than a single corner of mental arithmetic.
 */

const HACK_SECTIONS = [
  {
    id: 'number-arithmetic',
    title: 'Number & Arithmetic',
    intro: 'High-frequency mental arithmetic shortcuts that show up in nearly every SET paper.',
    hacks: [
      {
        id: 'eleven-times',
        title: 'Multiply a 2-digit number by 11',
        rule: 'For ab × 11, keep the outside digits and put their sum in the middle. Carry the 1 if the middle sum reaches 10 or more.',
        example: '43 × 11 = 4(4+3)3 = 473. 78 × 11 = 7(15)8 → carry → 858.',
      },
      {
        id: 'times-five',
        title: '× 5 = halve, then × 10',
        rule: 'Halving a number and adding a zero is faster than multiplying by 5 directly.',
        example: '48 × 5 = 24 × 10 = 240.',
      },
      {
        id: 'times-nine',
        title: '× 9 = × 10 minus the number',
        rule: 'Multiply by 10 first, then subtract the original number.',
        example: '9 × 17 = 170 − 17 = 153.',
      },
      {
        id: 'times-25',
        title: '× 25, × 50, × 250 by switching to ÷ then × 100',
        rule: '× 25 means ÷ 4 then × 100. × 50 means ÷ 2 then × 100. × 250 means ÷ 4 then × 1000.',
        example: '36 × 25 = 36 ÷ 4 × 100 = 9 × 100 = 900.',
      },
      {
        id: 'doubling-halving',
        title: 'Double one, halve the other',
        rule: 'When multiplying, doubling one factor and halving the other gives the same answer but easier numbers.',
        example: '25 × 16 = 50 × 8 = 100 × 4 = 400.',
      },
      {
        id: 'square-fives',
        title: 'Square any number ending in 5',
        rule: 'Take the digits before the 5, multiply by (themselves + 1), then stick 25 on the end.',
        example: '35² = (3 × 4) | 25 = 1225. 65² = (6 × 7) | 25 = 4225.',
      },
      {
        id: 'difference-squares',
        title: 'Difference of two squares for near-equal products',
        rule: 'a × b around a middle m with gap g equals m² − g². Useful when both numbers are close to the same friendly number.',
        example: '49 × 51 = 50² − 1² = 2499. 98 × 102 = 100² − 4 = 9996.',
      },
      {
        id: 'near-ten',
        title: 'Round and adjust',
        rule: 'Round to a friendly number, multiply, then add or subtract the difference.',
        example: '98 × 7 = 100 × 7 − 2 × 7 = 700 − 14 = 686.',
      },
      {
        id: 'add-round-adjust',
        title: 'Round-and-adjust for addition',
        rule: 'Round both numbers up to the nearest 10, add, then subtract whatever you added on.',
        example: '644 + 238 → 650 + 240 − 6 − 2 = 890 − 8 = 882.',
      },
    ],
  },
  {
    id: 'divisibility-rules',
    title: 'Divisibility Rules',
    intro: 'Knowing these stops you doing long division when the question only needs a quick yes/no.',
    hacks: [
      {
        id: 'div-2-5-10',
        title: 'Divisibility by 2, 5 and 10',
        rule: '2: ends in 0, 2, 4, 6, 8. 5: ends in 0 or 5. 10: ends in 0.',
        example: '3,486 is divisible by 2; 1,235 is divisible by 5; 7,420 is divisible by 10.',
      },
      {
        id: 'div-3-9',
        title: 'Divisibility by 3 and 9',
        rule: 'Add the digits. If the sum divides by 3, the number divides by 3. Same rule for 9.',
        example: '4,752 → 4+7+5+2 = 18 → divisible by both 3 and 9.',
      },
      {
        id: 'div-4-8',
        title: 'Divisibility by 4 and 8',
        rule: '4: last two digits are divisible by 4. 8: last three digits are divisible by 8.',
        example: '7,316 → last two = 16 → divisible by 4. 9,128 → last three = 128 = 8 × 16 → divisible by 8.',
      },
      {
        id: 'div-6-12',
        title: 'Divisibility by 6 and 12',
        rule: '6: passes the rule for 2 AND the rule for 3. 12: passes the rule for 3 AND the rule for 4.',
        example: '4,752 ends in 2 (so ÷2) and digit sum 18 (so ÷3) → divisible by 6.',
      },
      {
        id: 'div-11',
        title: 'Divisibility by 11',
        rule: 'Take the alternating sum of the digits. If the result is 0 or a multiple of 11, the number is divisible by 11.',
        example: '2,728 → (2+2) − (7+8) = −11 → divisible by 11.',
      },
      {
        id: 'div-7',
        title: 'Divisibility by 7 (stretch)',
        rule: 'Double the last digit and subtract from the rest. Repeat until you get a small number — if that is divisible by 7, so was the original.',
        example: '203 → 20 − (2 × 3) = 14 → divisible by 7.',
      },
    ],
  },
  {
    id: 'fractions',
    title: 'Fractions',
    intro: 'The single biggest source of marks at 11+. Cancelling and converting fast wins time.',
    hacks: [
      {
        id: 'cancel-before',
        title: 'Cancel before you multiply',
        rule: 'Simplify across the numerator and denominator before multiplying — the numbers stay tiny.',
        example: '5/10 × 3/12 → 1/2 × 1/4 = 1/8.',
      },
      {
        id: 'butterfly-add',
        title: 'Butterfly method (cross-multiply to add)',
        rule: 'For a/b + c/d, the answer is (ad + bc) / bd. Same approach for subtraction.',
        example: '2/3 + 1/4 = (2×4 + 3×1) / 12 = 11/12.',
      },
      {
        id: 'compare-fractions',
        title: 'Compare fractions by cross-multiplying',
        rule: 'Cross-multiply the two fractions. The bigger product sits over the bigger fraction.',
        example: '3/7 vs 4/9 → 3×9 = 27 and 4×7 = 28 → 4/9 is larger.',
      },
      {
        id: 'divide-fractions',
        title: 'Divide fractions: keep, change, flip',
        rule: 'Keep the first fraction, change ÷ to ×, flip the second.',
        example: '3/4 ÷ 1/2 = 3/4 × 2/1 = 6/4 = 1 1/2.',
      },
      {
        id: 'fraction-of',
        title: '"Of" means multiply',
        rule: 'To find a fraction of an amount, divide by the denominator first, then multiply by the numerator.',
        example: '3/8 of 240 → 240 ÷ 8 = 30 → 30 × 3 = 90.',
      },
      {
        id: 'fraction-decimal-conversions',
        title: 'Memorise the friendly conversions',
        rule: 'Knowing 1/8, 1/4, 1/3, 1/2, 5/8, 3/4, 7/8 as decimals and percentages saves working in nearly every paper.',
        example: '1/8 = 0.125 = 12.5%. 5/8 = 0.625 = 62.5%. 3/4 = 0.75 = 75%.',
      },
    ],
  },
  {
    id: 'percentages',
    title: 'Percentages',
    intro: 'Anchor everything to 10% and 1%, then build up. The swap trick saves a third of the time on awkward percentages.',
    hacks: [
      {
        id: 'ten-one-percent',
        title: 'Anchor on 10% and 1%',
        rule: '10% means ÷ 10. 1% means ÷ 100. Build everything else from these anchors.',
        example: '17% of 200 = 10% (20) + 7 × 1% (14) = 34.',
      },
      {
        id: 'friendly-percents',
        title: 'Know the friendly percentages',
        rule: '50% = ½, 25% = ¼, 75% = ¾, 20% = ⅕, 12.5% = ⅛.',
        example: '12.5% of 64 = ⅛ of 64 = 8.',
      },
      {
        id: 'percent-swap',
        title: 'Swap a% of b = b% of a',
        rule: 'If one direction looks awkward, swap the percentage and the number — the answer is identical.',
        example: '8% of 75 = 75% of 8 = 6.',
      },
      {
        id: 'percent-multiplier',
        title: 'Use multipliers for increase/decrease',
        rule: '+20% means × 1.2. −15% means × 0.85. Two changes multiply: × 0.9 × 0.8 = × 0.72.',
        example: 'A £40 jumper with 25% off costs 40 × 0.75 = £30.',
      },
      {
        id: 'reverse-percent',
        title: 'Reverse percentages (find the original)',
        rule: 'If a price after a % change is given, divide by the multiplier to get back to the original.',
        example: '£48 after 20% off → original = 48 ÷ 0.8 = £60.',
      },
    ],
  },
  {
    id: 'ratio-proportion',
    title: 'Ratio & Proportion',
    intro: 'One of the highest-yield 11+ topics. Almost every Nonsuch-style paper has at least two ratio problems.',
    hacks: [
      {
        id: 'ratio-total-parts',
        title: 'Find one part first',
        rule: 'Add the parts, divide the total by that number to get one part, then multiply by the share you need.',
        example: '£56 in 3:5 → 8 parts → 1 part = £7 → shares are £21 and £35.',
      },
      {
        id: 'ratio-as-fraction',
        title: 'Ratio ↔ fraction',
        rule: 'A ratio of a:b means a/(a+b) and b/(a+b) of the total.',
        example: '3:5 of 40 → blue is 5/8 × 40 = 25, red is 3/8 × 40 = 15.',
      },
      {
        id: 'unitary',
        title: 'Unitary method (per one)',
        rule: 'Find what one unit costs or weighs first, then scale to whatever the question wants.',
        example: 'If 4 pens cost £3, one pen costs 75p, so 9 pens cost £6.75.',
      },
      {
        id: 'best-value',
        title: 'Best-value comparison',
        rule: 'Divide price by quantity for each option. Smallest price-per-unit wins.',
        example: '£3 for 500 g (0.6p/g) beats £5 for 750 g (0.67p/g).',
      },
    ],
  },
  {
    id: 'speed-distance-time',
    title: 'Speed, Distance & Time',
    intro: 'Almost guaranteed to appear in NWSSEE Stage 2. Unit conversions are where most marks are dropped.',
    hacks: [
      {
        id: 'sdt-triangle',
        title: 'D = S × T triangle',
        rule: 'Cover the quantity you want: D = S × T, S = D ÷ T, T = D ÷ S.',
        example: '60 km at 40 km/h takes 60 ÷ 40 = 1.5 hours.',
      },
      {
        id: 'sdt-unit-convert',
        title: 'Convert units before plugging in',
        rule: 'Get speed and time into matching units first. km/h to m/s = × 5/18. m/s to km/h = × 18/5.',
        example: '54 km/h = 54 × 5 ÷ 18 = 15 m/s.',
      },
      {
        id: 'sdt-average-speed',
        title: 'Average speed for equal-distance legs',
        rule: 'For two legs with equal distance, average speed = 2ab / (a + b), not the simple mean of a and b.',
        example: '40 km/h there and 60 km/h back → average = 2 × 40 × 60 / 100 = 48 km/h.',
      },
      {
        id: 'sdt-time-arithmetic',
        title: '24-hour clock & duration',
        rule: 'Count up to the next whole hour first, then add on. Avoids messy borrow-from-60 subtractions.',
        example: '14:42 to 17:15 → 18 mins to 15:00, then 2 hrs 15 mins → 2 hrs 33 mins.',
      },
    ],
  },
  {
    id: 'algebra-sequences',
    title: 'Algebra, Sequences & Function Machines',
    intro: 'GL papers nearly always test sequences. Working backwards through a function machine is the most reliable method.',
    hacks: [
      {
        id: 'nth-term-linear',
        title: 'nth term of a linear sequence',
        rule: 'Take the common difference × n, then add the term that comes before the first one (term 0).',
        example: '4, 7, 10, 13, … → difference is 3, term 0 is 1, so nth term = 3n + 1.',
      },
      {
        id: 'function-backwards',
        title: 'Function machine: invert in reverse order',
        rule: 'To go from output to input, undo each step in reverse order using inverse operations.',
        example: '(× 3, then + 4) → output 22 → undo: (− 4) = 18, (÷ 3) = 6.',
      },
      {
        id: 'balance-method',
        title: 'Balance method for equations',
        rule: 'Whatever you do to one side of the equation, do to the other. Use inverse operations to undo each step.',
        example: '3x + 5 = 20 → subtract 5 → 3x = 15 → divide by 3 → x = 5.',
      },
      {
        id: 'consecutive-numbers',
        title: 'Consecutive numbers: middle = mean',
        rule: 'For an odd count of consecutive numbers, the middle one is the average. For odd-numbered evens or odds, gaps are 2.',
        example: 'Three consecutive numbers sum to 87 → middle = 29 → numbers are 28, 29, 30.',
      },
      {
        id: 'trial-improvement',
        title: 'Trial-and-improve on multiple choice',
        rule: 'When the choices are given, plug each option back into the question — often faster than solving from scratch.',
        example: 'Which n gives 4n + 3 = 23? Try 5 → 23 ✓.',
      },
    ],
  },
  {
    id: 'geometry-measures',
    title: 'Geometry & Measures',
    intro: 'Memorise the angle facts and area formulas — there is no time to derive them in the exam.',
    hacks: [
      {
        id: 'angle-facts',
        title: 'Core angle facts',
        rule: 'Straight line = 180°, around a point = 360°, triangle = 180°, quadrilateral = 360°. Vertically opposite angles are equal.',
        example: 'Two angles of 70° and 80° on a straight line → third = 180 − 150 = 30°.',
      },
      {
        id: 'parallel-lines',
        title: 'Parallel-line angle rules',
        rule: 'Alternate (Z-shape) and corresponding (F-shape) angles are equal. Co-interior (C-shape) sum to 180°.',
        example: 'If one alternate angle is 65°, the other is also 65°.',
      },
      {
        id: 'polygon-angles',
        title: 'Polygon angle sums',
        rule: 'Interior angles sum to (n − 2) × 180°. For a regular polygon, divide by n for each interior angle.',
        example: 'Pentagon (n = 5): sum = 540°. Regular pentagon: each angle = 108°.',
      },
      {
        id: 'area-formulas',
        title: 'Area shortcuts',
        rule: 'Triangle = ½ × base × height. Trapezium = ½ × (a + b) × h. Circle = πr². Circumference = πd.',
        example: 'Trapezium with parallel sides 6 and 10, height 4 → ½ × 16 × 4 = 32.',
      },
      {
        id: 'volume-cuboid',
        title: 'Volume and surface area',
        rule: 'Cuboid volume = l × w × h. Cube surface area = 6 × side². Cylinder volume = πr²h.',
        example: 'A 3 × 4 × 5 cuboid has volume 60 cm³ and surface area 2(12 + 15 + 20) = 94 cm².',
      },
      {
        id: 'l-shape-perimeter',
        title: 'L-shape from a corner cut: perimeter is unchanged',
        rule: 'Cutting a rectangle out of a corner removes two edges but adds two equal-length edges back, so the outline length stays the same.',
        example: '12 × 7 with a 4 × 2 corner cut still has perimeter 2 × (12 + 7) = 38 cm.',
      },
      {
        id: 'pythagoras-stretch',
        title: 'Recognise Pythagorean triples (stretch)',
        rule: 'For top schools, spotting 3-4-5, 5-12-13 and their multiples avoids long calculation.',
        example: 'A right-angled triangle with legs 6 and 8 has hypotenuse 10 (a doubled 3-4-5).',
      },
    ],
  },
  {
    id: 'hcf-lcm-primes',
    title: 'HCF, LCM & Primes',
    intro: 'Prime factor diagrams turn factor questions into a fixed recipe.',
    hacks: [
      {
        id: 'prime-venn',
        title: 'Venn-diagram method',
        rule: 'Write the prime factors of each number. The intersection multiplied gives the HCF; the whole Venn multiplied gives the LCM.',
        example: '12 = 2×2×3, 18 = 2×3×3 → shared 2 and 3 → HCF = 6, LCM = 36.',
      },
      {
        id: 'hcf-lcm-product',
        title: 'HCF × LCM = product',
        rule: 'For any two numbers, HCF × LCM equals the product of the two numbers. Useful for back-solving.',
        example: 'If HCF(a, b) = 6 and a × b = 432, then LCM = 432 ÷ 6 = 72.',
      },
      {
        id: 'memorise-squares',
        title: 'Memorise squares to 15² and cubes to 5³',
        rule: 'Spotting square and cube numbers immediately speeds up factorisation, area and root questions.',
        example: '169 = 13². 125 = 5³.',
      },
      {
        id: 'prime-test',
        title: 'Prime check up to √n',
        rule: 'A number is prime if no prime up to its square root divides it. For numbers under 200, that means trying 2, 3, 5, 7, 11, 13.',
        example: '143 → 11 × 13 = 143, so it is not prime.',
      },
    ],
  },
  {
    id: 'averages-data',
    title: 'Averages & Data',
    intro: 'Combined-mean and missing-value questions both rely on the same total = mean × count idea.',
    hacks: [
      {
        id: 'average-total',
        title: 'Total = mean × count',
        rule: 'Multiplying the mean by the number of values gives the total — useful for missing-value problems.',
        example: 'A mean of 14 over 6 scores → total = 84. If 5 scores sum to 70, the missing one is 14.',
      },
      {
        id: 'combined-mean',
        title: 'Combined mean: weight by group size',
        rule: 'When two groups have different sizes, never just average the means. Use total ÷ overall count.',
        example: '20 boys mean 60, 30 girls mean 70 → total = 1200 + 2100 = 3300 ÷ 50 = 66.',
      },
      {
        id: 'median-position',
        title: 'Median position formula',
        rule: 'For n values in order, median is at position (n + 1) / 2. For even n, average the two middle values.',
        example: '8 values → middle positions 4 and 5. 9 values → middle position 5.',
      },
      {
        id: 'range-shift',
        title: 'Range is unchanged by adding a constant',
        rule: 'If every value goes up (or down) by the same amount, the range stays the same. Mean shifts; range does not.',
        example: 'Each score gains 5 marks → mean +5, range unchanged.',
      },
      {
        id: 'casting-nines',
        title: 'Digit-sum check (casting out nines)',
        rule: 'Compare digit sums on each side of a multiplication. A mismatch flags an error; a match is not a guarantee.',
        example: '37 × 24 = 888 → 1 × 6 = 6 and 888 → 24 → 6. Check passes.',
      },
    ],
  },
  {
    id: 'problem-solving',
    title: 'Problem-Solving & Exam Strategy',
    intro: 'These are the meta-hacks that parents and tutors talk about most. They lift accuracy without learning new maths.',
    hacks: [
      {
        id: 'bar-model',
        title: 'Bar models (Singapore method)',
        rule: 'Draw rectangles for each quantity. Lining them up exposes the unknown for ratio, fraction-of and "more than" word problems.',
        example: '"Ali has 3 times as many sweets as Ben. Together they have 32." Bar with 4 equal parts → each = 8.',
      },
      {
        id: 'work-backwards',
        title: 'Work backwards from the final state',
        rule: 'When the question gives the result and asks for the start, undo each step in reverse using inverse operations.',
        example: '"After spending half her money and then £2, Mia has £4." Reverse: + 2 = 6, × 2 = £12 to start.',
      },
      {
        id: 'keyword-translate',
        title: 'Translate the keywords',
        rule: '"Of" = ×, "per" = ÷, "more than" = +, "difference" = −, "product" = ×, "sum" = +, "is" = equals.',
        example: '"3 more than twice n" → 2n + 3.',
      },
      {
        id: 'estimate-first',
        title: 'Estimate before calculating',
        rule: 'Round numbers and do a quick mental estimate. If your final answer disagrees with the estimate, check the calculation.',
        example: '49 × 21 ≈ 50 × 20 = 1000, so an answer of 129 must be wrong.',
      },
      {
        id: 'pacing',
        title: '60 seconds per question, then move on',
        rule: 'On SET and most CEM-style papers, never let one question eat your time. Flag and skip, return at the end.',
        example: 'A 50-question paper in 50 minutes = 1 minute per question, with no exceptions.',
      },
      {
        id: 'multi-step-decompose',
        title: 'Decompose multi-step problems on paper',
        rule: 'Before calculating, jot down the sub-quantities you actually need. Most lost marks come from solving the wrong sub-step.',
        example: '"Total cost after 15% discount" → write down (full price), then (discount), then (total).',
      },
      {
        id: 'sense-check',
        title: 'Sense-check the units and the question',
        rule: 'Re-read the question after solving: did it ask for kg or g? Blue beads or red beads? Time in minutes or hours?',
        example: 'A ratio question asks for blue beads, not red — make sure you give the right share.',
      },
    ],
  },
];

const QUIZ = [
  {
    sectionId: 'number-arithmetic',
    question: 'Use the difference of squares: 19 × 21 = ?',
    options: ['389', '399', '409', '419'],
    answer: '399',
    explanation: '19 and 21 sit equally around 20, so 20² − 1² = 400 − 1 = 399.',
  },
  {
    sectionId: 'number-arithmetic',
    question: 'What is 43 × 11?',
    options: ['433', '463', '473', '483'],
    answer: '473',
    explanation: 'Place 4 + 3 = 7 between 4 and 3, giving 473.',
  },
  {
    sectionId: 'divisibility-rules',
    question: 'Which of these is divisible by 11?',
    options: ['2,727', '2,728', '2,829', '3,003'],
    answer: '2,728',
    explanation: 'For 2,728: (2+2) − (7+8) = −11, which is a multiple of 11.',
  },
  {
    sectionId: 'divisibility-rules',
    question: 'Which is divisible by 4 but NOT by 8?',
    options: ['1,012', '1,024', '2,048', '2,000'],
    answer: '1,012',
    explanation: 'Last two digits 12 → ÷4. Last three digits 012 = 12, not a multiple of 8.',
  },
  {
    sectionId: 'fractions',
    question: 'Cancel before multiplying: 6/9 × 3/8 = ?',
    options: ['1/4', '1/3', '2/9', '3/8'],
    answer: '1/4',
    explanation: '6/9 = 2/3 and 3/8 stays. 2/3 × 3/8 → cancel 3 → 2/8 = 1/4.',
  },
  {
    sectionId: 'fractions',
    question: 'Which is larger: 5/9 or 6/11?',
    options: ['5/9', '6/11', 'Equal', 'Cannot tell'],
    answer: '5/9',
    explanation: 'Cross-multiply: 5×11 = 55 and 6×9 = 54. 55 > 54, so 5/9 is larger.',
  },
  {
    sectionId: 'percentages',
    question: 'Use the swap trick: 4% of 75 = ?',
    options: ['2', '3', '4', '6'],
    answer: '3',
    explanation: '4% of 75 = 75% of 4 = 3.',
  },
  {
    sectionId: 'percentages',
    question: 'A coat costs £48 after 20% off. What was the original price?',
    options: ['£56', '£58', '£60', '£64'],
    answer: '£60',
    explanation: 'Reverse percentage: 48 ÷ 0.8 = 60.',
  },
  {
    sectionId: 'ratio-proportion',
    question: '£72 is shared in the ratio 5:4. What is the larger share?',
    options: ['£32', '£36', '£40', '£45'],
    answer: '£40',
    explanation: '9 parts → one part = £8 → 5 parts = £40.',
  },
  {
    sectionId: 'speed-distance-time',
    question: 'A cyclist travels 45 km at 18 km/h. How long does the trip take?',
    options: ['2 hours', '2 hours 15 mins', '2 hours 30 mins', '3 hours'],
    answer: '2 hours 30 mins',
    explanation: 'T = D ÷ S = 45 ÷ 18 = 2.5 hours = 2 hours 30 mins.',
  },
  {
    sectionId: 'algebra-sequences',
    question: 'What is the nth term of 4, 7, 10, 13, … ?',
    options: ['n + 3', '3n', '3n + 1', '4n − 1'],
    answer: '3n + 1',
    explanation: 'Common difference is 3, term before the first is 1, so nth term = 3n + 1.',
  },
  {
    sectionId: 'algebra-sequences',
    question: 'Three consecutive whole numbers sum to 99. What is the largest?',
    options: ['32', '33', '34', '35'],
    answer: '34',
    explanation: 'Middle = 99 ÷ 3 = 33. Numbers are 32, 33, 34. Largest is 34.',
  },
  {
    sectionId: 'geometry-measures',
    question: 'What is the interior angle of a regular hexagon?',
    options: ['100°', '108°', '120°', '135°'],
    answer: '120°',
    explanation: '(6 − 2) × 180 = 720°. Divide by 6 → 120° each.',
  },
  {
    sectionId: 'hcf-lcm-primes',
    question: 'HCF of 24 and 36 (using the Venn method)?',
    options: ['6', '8', '12', '18'],
    answer: '12',
    explanation: '24 = 2×2×2×3, 36 = 2×2×3×3. Shared: 2×2×3 = 12.',
  },
  {
    sectionId: 'averages-data',
    question: 'Five scores have a mean of 14. Four of them are 12, 15, 10 and 16. What is the missing score?',
    options: ['13', '15', '17', '19'],
    answer: '17',
    explanation: 'Total = 14 × 5 = 70. Known sum = 53. Missing = 70 − 53 = 17.',
  },
  {
    sectionId: 'problem-solving',
    question: 'After spending half her money, then £2 more, Mia has £4 left. How much did she start with?',
    options: ['£8', '£10', '£12', '£14'],
    answer: '£12',
    explanation: 'Work backwards: 4 + 2 = 6 → that was half → start = £12.',
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

  const totalHacks = HACK_SECTIONS.reduce((n, s) => n + s.hacks.length, 0);

  area.innerHTML = `
    <section class="hacks-hero" aria-labelledby="hacks-title">
      <p class="hacks-kicker">Speed tricks for 11+</p>
      <h2 id="hacks-title">Common maths hacks</h2>
      <p>${totalHacks} hacks across ${HACK_SECTIONS.length} topic areas — the shortcuts most often discussed by tutors and parents. Learn the rule, look at the example, then test yourself in the quiz below.</p>
      <nav class="hack-toc" aria-label="Hack sections">
        ${HACK_SECTIONS.map(s => `<button type="button" class="hack-toc__link" data-target="hack-section-${s.id}">${s.title}</button>`).join('')}
      </nav>
    </section>

    ${HACK_SECTIONS.map(_renderSection).join('')}

    <section class="hack-quiz" aria-labelledby="hack-quiz-title">
      <div class="hack-quiz__header">
        <div>
          <p class="hacks-kicker">Quiz</p>
          <h2 id="hack-quiz-title">Test every section</h2>
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

function _renderSection(section) {
  return `
    <section class="hack-section" id="hack-section-${section.id}" aria-labelledby="hack-section-title-${section.id}">
      <header class="hack-section__header">
        <h3 id="hack-section-title-${section.id}" class="hack-section__title">${section.title}</h3>
        <p class="hack-section__intro">${section.intro}</p>
      </header>
      <div class="hacks-grid">
        ${section.hacks.map((hack, index) => `
          <article class="hack-card" id="hack-${hack.id}">
            <div class="hack-card__number">${index + 1}</div>
            <div class="hack-card__body">
              <h4>${hack.title}</h4>
              <p>${hack.rule}</p>
              <div class="hack-example"><strong>Example:</strong> ${hack.example}</div>
            </div>
          </article>
        `).join('')}
      </div>
    </section>
  `;
}

function _renderQuizQuestion(item, index) {
  const section = HACK_SECTIONS.find(s => s.id === item.sectionId);
  const sectionTitle = section ? section.title : '';
  return `
    <fieldset class="hack-quiz-card" data-question-index="${index}">
      <legend>
        <span class="hack-quiz-card__section">${sectionTitle}</span>
        ${index + 1}. ${item.question}
      </legend>
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
  area.querySelectorAll('.hack-toc__link').forEach(link => {
    link.addEventListener('click', () => {
      const target = document.getElementById(link.dataset.target);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

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

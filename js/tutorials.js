// Curated public tutorial websites, step-by-step strategies, and YouTube video lessons for each skill.
// Supports dynamic variant adaptation so shared skills match the specific question variant (e.g. in daily practice).

export const TUTORIALS = {
  "order_operations": {
    "concept": "Order of operations (BIDMAS or BODMAS)",
    "steps": [
      "Work out anything in brackets first.",
      "Next, do any multiplication and division, working from left to right.",
      "Last, do any addition and subtraction, working from left to right."
    ],
    "check": "Check that you did every multiplication and division before any adding or taking away.",
    "webTitle": "Corbettmaths Primary — Order of operations practice questions",
    "webUrl": "https://corbettmathsprimary.com/2018/07/17/order-of-operations-questions/",
    "videoTitle": "Math Antics \u2014 Order Of Operations",
    "videoUrl": "https://www.youtube.com/watch?v=dAgfnK528RA",
    "videoId": "dAgfnK528RA"
  },
  "multi_step_cost": {
    "concept": "Working out how many are left",
    "steps": [
      "Find how many there are to start with: number of packs × number in each pack.",
      "Find how many are given out: number of groups × number each group gets.",
      "Take the number given out away from the starting number."
    ],
    "check": "Add the number left to the number given out. You should get the starting number.",
    "webTitle": "Corbettmaths Primary — Multiplication practice questions",
    "webUrl": "https://corbettmathsprimary.com/2018/07/21/multiplication-questions/",
    "videoTitle": "Math Antics \u2014 Multi-Digit Multiplication",
    "videoUrl": "https://www.youtube.com/watch?v=FJ5qLWP3Fqo",
    "videoId": "FJ5qLWP3Fqo"
  },
  "multiplication_strategies": {
    "concept": "Multiplying by splitting numbers up",
    "steps": [
      "Split one number into easier parts, such as tens and ones (27 = 20 + 7).",
      "Multiply the other number by each part.",
      "Add the answers together. To multiply by 5, you can multiply by 10 and then halve."
    ],
    "check": "Estimate first by rounding to the nearest ten. Your answer should be close to the estimate.",
    "webTitle": "Corbettmaths Primary — Multiplication practice questions",
    "webUrl": "https://corbettmathsprimary.com/2018/07/21/multiplication-questions/",
    "videoTitle": "Math Antics \u2014 Multi-Digit Multiplication Pt 2",
    "videoUrl": "https://www.youtube.com/watch?v=RVYwunbpMHA",
    "videoId": "RVYwunbpMHA"
  },
  "fraction_equivalence": {
    "concept": "Equivalent fractions and simplifying",
    "steps": [
      "To simplify, divide the numerator and denominator by the same number, using the biggest number that goes into both.",
      "To find a missing number, work out what the denominator was multiplied by.",
      "Multiply the numerator by the same number."
    ],
    "check": "Equivalent fractions are the same size, so both should simplify to the same fraction.",
    "webTitle": "Corbettmaths Primary — Equivalent fractions practice questions",
    "webUrl": "https://corbettmathsprimary.com/2018/07/24/equivalent-fractions-and-simplifying-fractions-questions/",
    "videoTitle": "Corbettmaths — Equivalent Fractions",
    "videoUrl": "https://www.youtube.com/watch?v=2Gbe6J0JzHE",
    "videoId": "2Gbe6J0JzHE"
  },
  "fraction_of_amount": {
    "concept": "A fraction of what is left",
    "steps": [
      "Find the first fraction of the total: divide by the denominator, then multiply by the numerator.",
      "Work out how many are left: the total take away that first group.",
      "Find the second fraction of what is left, not of the whole total."
    ],
    "check": "Add up all the groups. They should make the starting total.",
    "webTitle": "Corbettmaths Primary — Fractions of amounts practice questions",
    "webUrl": "https://corbettmathsprimary.com/2018/07/17/fractions-of-amounts-questions/",
    "videoTitle": "Math Antics \u2014 Fractions are Parts of Things",
    "videoUrl": "https://www.youtube.com/watch?v=CA9XLJpQp3c",
    "videoId": "CA9XLJpQp3c"
  },
  "fraction_multiplication": {
    "concept": "Multiplying fractions (cancel first)",
    "steps": [
      "Look for a numerator and a denominator that can both be divided by the same number.",
      "Divide them both by that number (this is called cancelling) before you multiply.",
      "Multiply the numerators together and the denominators together, then simplify if you can."
    ],
    "check": "Multiplying two fractions that are less than 1 gives an answer smaller than both of them.",
    "webTitle": "Corbettmaths Primary — Multiplying fractions practice questions",
    "webUrl": "https://corbettmathsprimary.com/2018/07/18/multiplying-fractions-questions/",
    "videoTitle": "Math Antics \u2014 Multiplying Fractions",
    "videoUrl": "https://www.youtube.com/watch?v=qmfXyR7Z6Lk",
    "videoId": "qmfXyR7Z6Lk"
  },
  "fraction_addition": {
    "concept": "Adding fractions",
    "steps": [
      "Check the denominators are the same. If they are not, change the fractions so that they are.",
      "Add the numerators and keep the denominator the same.",
      "Simplify your answer if you can."
    ],
    "check": "Never add the denominators: 1/4 + 1/4 is 2/4, not 2/8.",
    "webTitle": "Corbettmaths Primary — Adding fractions practice questions",
    "webUrl": "https://corbettmathsprimary.com/2018/07/16/adding-fractions-1-questions/",
    "videoTitle": "Math Antics \u2014 Adding and Subtracting Fractions",
    "videoUrl": "https://www.youtube.com/watch?v=52ZlXsFJULI",
    "videoId": "52ZlXsFJULI"
  },
  "fraction_percent": {
    "concept": "Changing fractions into percentages",
    "steps": [
      "Per cent means ‘out of 100’.",
      "Make the denominator 100 by multiplying the numerator and denominator by the same number: 7/20 = 35/100 = 35%.",
      "If you can’t make 100, divide the numerator by the denominator, then multiply by 100."
    ],
    "check": "A fraction less than 1 must give a percentage less than 100%.",
    "webTitle": "Corbettmaths Primary — Fractions, decimals and percentages practice questions",
    "webUrl": "https://corbettmathsprimary.com/2018/07/24/fractions-decimals-and-percentages-questions/",
    "videoTitle": "Math Antics \u2014 Fractions and Decimals",
    "videoUrl": "https://www.youtube.com/watch?v=do_IbHId2Os",
    "videoId": "do_IbHId2Os"
  },
  "money_multiplication": {
    "concept": "Multiplying amounts of money",
    "steps": [
      "Multiply the pounds and the pence separately, then add them together.",
      "Or round up to whole pounds and take away the extra: £4.95 × 6 = £5 × 6 − 5p × 6 = £30 − 30p = £29.70.",
      "Money answers have two digits after the decimal point."
    ],
    "check": "Estimate using whole pounds to check the decimal point is in the right place.",
    "webTitle": "Corbettmaths Primary — Multiplying decimals practice questions",
    "webUrl": "https://corbettmathsprimary.com/2018/07/20/multiplying-decimals-questions/",
    "videoTitle": "Math Antics \u2014 Decimal Arithmetic",
    "videoUrl": "https://www.youtube.com/watch?v=kwh4SD1ToFc",
    "videoId": "kwh4SD1ToFc"
  },
  "exchange_rate": {
    "concept": "Exchange rates: multiply or divide?",
    "steps": [
      "Read the rate, for example £1 = 1.20 euros.",
      "Pounds to the other money: multiply by the rate. Back to pounds: divide by the rate.",
      "Split awkward rates into parts: × 1.15 is the whole amount, plus 10%, plus 5%."
    ],
    "check": "If £1 buys more than 1 euro, you should end up with more euros than pounds.",
    "webTitle": "Corbettmaths Primary — Ratio and proportion practice questions",
    "webUrl": "https://corbettmathsprimary.com/2018/07/31/proportion-questions/",
    "videoTitle": "Corbettmaths Primary — Proportion",
    "videoUrl": "https://www.youtube.com/watch?v=bg283xTWtxc",
    "videoId": "bg283xTWtxc"
  },
  "money_change": {
    "concept": "Working out change by counting up",
    "steps": [
      "Work out the total cost: number of items × price of one.",
      "Write the money handed over with pence too, for example £10.00.",
      "Count up from the total cost to the money handed over. That is the change."
    ],
    "check": "Add the change to the total cost. You should get the money handed over.",
    "webTitle": "Corbettmaths Primary — Money practice questions",
    "webUrl": "https://corbettmathsprimary.com/2018/07/24/money-questions/",
    "videoTitle": "Math Antics \u2014 Decimal Arithmetic",
    "videoUrl": "https://www.youtube.com/watch?v=kwh4SD1ToFc",
    "videoId": "kwh4SD1ToFc"
  },
  "decimal_ordering": {
    "concept": "Ordering decimals using place value",
    "steps": [
      "Add zeros to the end so every number has the same number of decimal places (0.3 becomes 0.300).",
      "Compare the tenths first, then the hundredths, then the thousandths.",
      "More digits after the point does not mean a bigger number: 0.3 is bigger than 0.29."
    ],
    "check": "With three decimal places each, compare them like whole numbers: 0.300 is 300 thousandths.",
    "webTitle": "Corbettmaths Primary — Ordering decimals practice questions",
    "webUrl": "https://corbettmathsprimary.com/2018/07/16/ordering-decimals-questions/",
    "videoTitle": "Math Antics \u2014 Decimal Place Value",
    "videoUrl": "https://www.youtube.com/watch?v=kwh4SD1ToFc",
    "videoId": "kwh4SD1ToFc"
  },
  "decimal_addition": {
    "concept": "Adding decimals: line up the points",
    "steps": [
      "Write the numbers in columns with the decimal points lined up.",
      "Fill any gaps with zeros so tenths sit under tenths and hundredths under hundredths.",
      "Add from the right, carrying into the next column when you need to."
    ],
    "check": "Take the second number away from your answer. You should get the first number.",
    "webTitle": "Corbettmaths Primary — Adding decimals practice questions",
    "webUrl": "https://corbettmathsprimary.com/2018/07/15/adding-decimals-questions/",
    "videoTitle": "Math Antics \u2014 Decimal Arithmetic",
    "videoUrl": "https://www.youtube.com/watch?v=kwh4SD1ToFc",
    "videoId": "kwh4SD1ToFc"
  },
  "decimal_scaling": {
    "concept": "Multiplying decimals by 10, 100 and 1000",
    "steps": [
      "Multiplying by 10 moves every digit one place to the left. Multiplying by 100 moves them two places.",
      "Don’t just add zeros to the end of a decimal: 2.5 × 10 is 25, not 2.50.",
      "Check the place value of the first digit of your answer."
    ],
    "check": "Divide your answer by the same number. You should get back to the number you started with.",
    "webTitle": "Corbettmaths Primary — Multiplying and dividing by 10, 100 and 1000 practice questions",
    "webUrl": "https://corbettmathsprimary.com/2018/07/24/multiplying-and-dividing-by-10-100-1000-questions/",
    "videoTitle": "Math Antics \u2014 Decimal Arithmetic",
    "videoUrl": "https://www.youtube.com/watch?v=kwh4SD1ToFc",
    "videoId": "kwh4SD1ToFc"
  },
  "rounding": {
    "concept": "Rounding to one decimal place",
    "steps": [
      "Look at the hundredths digit, just to the right of the tenths. This is the decider.",
      "If the decider is 5 or more, round the tenths digit up by 1 (a 9 rolls over into the next column).",
      "If the decider is 4 or less, keep the tenths digit the same."
    ],
    "check": "Your answer should have exactly one digit after the decimal point.",
    "webTitle": "Corbettmaths Primary — Rounding practice questions",
    "webUrl": "https://corbettmathsprimary.com/2018/07/31/rounding-questions/",
    "videoTitle": "Math Antics \u2014 Rounding",
    "videoUrl": "https://www.youtube.com/watch?v=fd-E18EqSVk",
    "videoId": "fd-E18EqSVk"
  },
  "ratio_sharing": {
    "concept": "Sharing in a ratio (bar model)",
    "steps": [
      "Add the numbers in the ratio to find the total number of parts.",
      "Divide the amount by the total number of parts to find one part.",
      "Multiply one part by the number of parts the question asks about."
    ],
    "check": "Work out both shares and add them. They should make the amount you started with.",
    "webTitle": "Corbettmaths Primary — Ratio and proportion practice questions",
    "webUrl": "https://corbettmathsprimary.com/2018/07/31/proportion-questions/",
    "videoTitle": "Math Antics \u2014 Ratios And Rates",
    "videoUrl": "https://www.youtube.com/watch?v=RQ2nYUBVvqI",
    "videoId": "RQ2nYUBVvqI"
  },
  "volume_ratio": {
    "concept": "Comparing the volumes of two boxes",
    "steps": [
      "Volume = area of the base × height, and both boxes are the same height.",
      "So you only need to compare the base areas: side × side for each square base.",
      "Write the two areas as a ratio and simplify it."
    ],
    "check": "Work out both full volumes (length × width × height). They should simplify to the same ratio.",
    "webTitle": "Corbettmaths Primary — Volume of cuboids practice questions",
    "webUrl": "https://corbettmathsprimary.com/2018/07/20/volume-questions/",
    "videoTitle": "Math Antics \u2014 Volume",
    "videoUrl": "https://www.youtube.com/watch?v=qJwecTgce6c",
    "videoId": "qJwecTgce6c"
  },
  "unitary_method": {
    "concept": "Find the cost of one, then scale up",
    "steps": [
      "Find the cost of one item: total cost ÷ number of items.",
      "Keep the exact amount, including any pence.",
      "Multiply the cost of one item by the number you need."
    ],
    "check": "More items should cost more, and fewer items should cost less.",
    "webTitle": "Corbettmaths Primary — Ratio and proportion practice questions",
    "webUrl": "https://corbettmathsprimary.com/2018/07/31/proportion-questions/",
    "videoTitle": "Corbettmaths Primary — Proportion",
    "videoUrl": "https://www.youtube.com/watch?v=bg283xTWtxc",
    "videoId": "bg283xTWtxc"
  },
  "scaling_recipe": {
    "concept": "Scaling a recipe up or down",
    "steps": [
      "Find the amount for one person: amount ÷ number of people.",
      "Multiply by the new number of people.",
      "Keep the same units all the way through."
    ],
    "check": "If the number of people doubles, the amount should double too.",
    "webTitle": "Corbettmaths Primary — Ratio and proportion practice questions",
    "webUrl": "https://corbettmathsprimary.com/2018/07/31/proportion-questions/",
    "videoTitle": "Corbettmaths — Recipes",
    "videoUrl": "https://www.youtube.com/watch?v=HpbJA9HxuTk",
    "videoId": "HpbJA9HxuTk"
  },
  "ratio_difference": {
    "concept": "Ratio problems when you know the difference",
    "steps": [
      "Find the difference between the two numbers in the ratio. That many parts make up the difference.",
      "Divide the difference in the question by that number of parts to find one part.",
      "Multiply one part by the number of parts the question asks about."
    ],
    "check": "Divide by the difference in parts, not by the total number of parts.",
    "webTitle": "Corbettmaths Primary — Ratio and proportion practice questions",
    "webUrl": "https://corbettmathsprimary.com/2018/07/31/proportion-questions/",
    "videoTitle": "Math Antics \u2014 Ratios And Rates",
    "videoUrl": "https://www.youtube.com/watch?v=RQ2nYUBVvqI",
    "videoId": "RQ2nYUBVvqI"
  },
  "percent_discount": {
    "concept": "Working out a sale price",
    "steps": [
      "The original price is 100%.",
      "Find the discount using 10% and 5%: 10% is ÷ 10, and 5% is half of that.",
      "Take the discount away from the original price."
    ],
    "check": "Check another way: 15% off means you pay 85% of the price.",
    "webTitle": "Corbettmaths Primary — Percentages of amounts practice questions",
    "webUrl": "https://corbettmathsprimary.com/2018/07/18/percentages-of-amounts-questions/",
    "videoTitle": "Math Antics \u2014 What Are Percentages?",
    "videoUrl": "https://www.youtube.com/watch?v=WYWPuG-8U5Q",
    "videoId": "WYWPuG-8U5Q"
  },
  "percent_of_amount": {
    "concept": "Building percentages from 10%, 5% and 1%",
    "steps": [
      "Split the percentage into easy pieces, for example 35% = 10% + 10% + 10% + 5%.",
      "Find 10% by dividing by 10. Halve it for 5%. Divide by 100 for 1%.",
      "Add the pieces together."
    ],
    "check": "Compare with 50%, which is half. A percentage below 50% should give less than half the amount.",
    "webTitle": "Corbettmaths Primary — Percentages of amounts practice questions",
    "webUrl": "https://corbettmathsprimary.com/2018/07/18/percentages-of-amounts-questions/",
    "videoTitle": "Math Antics \u2014 Finding A Percent Of A Number",
    "videoUrl": "https://www.youtube.com/watch?v=rR95Cbcjzus",
    "videoId": "rR95Cbcjzus"
  },
  "percent_increase": {
    "concept": "Increasing an amount by a percentage",
    "steps": [
      "Work out the increase using pieces such as 10%, 5% and 1%.",
      "Add the increase to the starting amount. This is the step people often forget.",
      "Your new amount should be bigger than the starting amount."
    ],
    "check": "If the question asks for the new amount, don’t give just the increase.",
    "webTitle": "Corbettmaths Primary — Percentages of amounts practice questions",
    "webUrl": "https://corbettmathsprimary.com/2018/07/18/percentages-of-amounts-questions/",
    "videoTitle": "Corbettmaths — Increasing & Decreasing by a Percentage",
    "videoUrl": "https://www.youtube.com/watch?v=tUtgC7ZrsRc",
    "videoId": "tUtgC7ZrsRc"
  },
  "compound_area": {
    "concept": "Area of an L-shape",
    "steps": [
      "Find the area of the whole rectangle around the shape: length × width.",
      "Find the area of the missing corner: its length × its width.",
      "Take the missing corner away from the whole rectangle."
    ],
    "check": "Check another way: cut the L-shape into two rectangles and add their areas.",
    "webTitle": "Corbettmaths Primary — Area of rectangles practice questions",
    "webUrl": "https://corbettmathsprimary.com/2018/05/31/area-of-rectangles-questions/",
    "videoTitle": "Math Antics \u2014 Area (Composite Shapes)",
    "videoUrl": "https://www.youtube.com/watch?v=xCdxURXMdFY",
    "videoId": "xCdxURXMdFY"
  },
  "triangle_area": {
    "concept": "Area of a triangle",
    "steps": [
      "Find the base and the height. The height meets the base at a right angle.",
      "Area = base × height ÷ 2.",
      "Halve whichever number is even first to keep the sum easy."
    ],
    "check": "Never use the sloping side as the height.",
    "webTitle": "Corbettmaths Primary — Area of a triangle practice questions",
    "webUrl": "https://corbettmathsprimary.com/2018/07/15/area-of-a-triangle-questions/",
    "videoTitle": "Corbettmaths — Area of a Triangle",
    "videoUrl": "https://www.youtube.com/watch?v=6WsQH1cAYMM",
    "videoId": "6WsQH1cAYMM"
  },
  "perimeter": {
    "concept": "Perimeter: the distance all the way round",
    "steps": [
      "A rectangle has two equal lengths and two equal widths.",
      "Add one length and one width, then double it: 2 × (length + width).",
      "Give your answer in the same unit as the sides."
    ],
    "check": "Add all four sides one at a time: length + width + length + width.",
    "webTitle": "Corbettmaths Primary — Perimeter practice questions",
    "webUrl": "https://corbettmathsprimary.com/2018/07/17/perimeter-questions/",
    "videoTitle": "Math Antics \u2014 Perimeter",
    "videoUrl": "https://www.youtube.com/watch?v=AAY1bsazcgM",
    "videoId": "AAY1bsazcgM"
  },
  "triangle_angles": {
    "concept": "Angles in a triangle add up to 180°",
    "steps": [
      "The three angles inside any triangle add up to 180°.",
      "Add the two angles you know.",
      "Take that total away from 180°."
    ],
    "check": "Add all three angles. They should make exactly 180°.",
    "webTitle": "Corbettmaths Primary — Angles in a triangle practice questions",
    "webUrl": "https://corbettmathsprimary.com/2018/05/31/angles-in-a-triangle-questions/",
    "videoTitle": "Math Antics \u2014 Triangles",
    "videoUrl": "https://www.youtube.com/watch?v=mLeNaZcy-hE",
    "videoId": "mLeNaZcy-hE"
  },
  "rectangle_area": {
    "concept": "Area of a rectangle",
    "steps": [
      "Area of a rectangle = length × width.",
      "Area is measured in square units, such as cm² or m².",
      "Don’t mix it up with perimeter, which is the distance around the edge."
    ],
    "check": "Area tells you how many unit squares (such as 1 cm squares) would cover the shape.",
    "webTitle": "Corbettmaths Primary — Area of rectangles practice questions",
    "webUrl": "https://corbettmathsprimary.com/2018/05/31/area-of-rectangles-questions/",
    "videoTitle": "Math Antics \u2014 Area",
    "videoUrl": "https://www.youtube.com/watch?v=xCdxURXMdFY",
    "videoId": "xCdxURXMdFY"
  },
  "angles_on_line": {
    "concept": "Angles on a straight line add up to 180°",
    "steps": [
      "Angles on a straight line add up to 180°.",
      "Take the angle you know away from 180°.",
      "If one angle is acute (less than 90°), the other must be obtuse (more than 90°)."
    ],
    "check": "Add the two angles. They should make 180°, a half turn.",
    "webTitle": "Corbettmaths Primary — Angle facts practice questions",
    "webUrl": "https://corbettmathsprimary.com/2018/07/19/angles-questions/",
    "videoTitle": "Math Antics \u2014 Angle Basics",
    "videoUrl": "https://www.youtube.com/watch?v=DGKwdHMiqCg",
    "videoId": "DGKwdHMiqCg"
  },
  "speed_distance_time": {
    "concept": "Moving towards each other: add the speeds",
    "steps": [
      "When two things move towards each other, add their speeds. This is how fast the gap between them closes.",
      "Time in hours = distance ÷ the two speeds added together.",
      "To change hours into minutes, multiply by 60."
    ],
    "check": "Multiply the added speeds by your time in hours. You should get the starting distance.",
    "webTitle": "Corbettmaths — Speed, distance and time practice questions",
    "webUrl": "https://corbettmaths.com/2018/04/04/speed/",
    "videoTitle": "Corbettmaths — Speed, Distance, Time",
    "videoUrl": "https://www.youtube.com/watch?v=dHVK7IeLGT8",
    "videoId": "dHVK7IeLGT8"
  },
  "unit_conversion": {
    "concept": "Changing grams into kilograms",
    "steps": [
      "Work out the total in grams first: number of batches × grams in each batch.",
      "Change grams to kilograms by dividing by 1000: the digits move three places to the right.",
      "Your answer may need a decimal, for example 4600 g = 4.6 kg."
    ],
    "check": "1 kg = 1000 g, so the number of kilograms is 1000 times smaller than the number of grams.",
    "webTitle": "Corbettmaths Primary — Converting units practice questions",
    "webUrl": "https://corbettmathsprimary.com/2018/07/31/units-questions/",
    "videoTitle": "Changing Between Units of Measurement (Primary Lesson)",
    "videoUrl": "https://www.youtube.com/watch?v=XEdjr-Yru7U",
    "videoId": "XEdjr-Yru7U"
  },
  "time_duration": {
    "concept": "Adding time on the 24-hour clock",
    "steps": [
      "Add the whole hours of the journey to the start time first.",
      "Then add the minutes. When you pass 60 minutes, that makes another hour.",
      "Write the answer on the 24-hour clock, like 09:05 or 17:40."
    ],
    "check": "Count back from your answer by the journey time. You should reach the start time.",
    "webTitle": "Corbettmaths Primary — Time practice questions",
    "webUrl": "https://corbettmathsprimary.com/2018/07/31/time-questions/"
  },
  "mass_difference": {
    "concept": "Subtracting masses in kg and g",
    "steps": [
      "Change kilograms into grams first: multiply by 1000.",
      "Take away the grams that were used.",
      "Never take grams away from kilograms without changing the units first."
    ],
    "check": "Add what is left to what was used. You should get the starting amount.",
    "webTitle": "Corbettmaths Primary — Converting units practice questions",
    "webUrl": "https://corbettmathsprimary.com/2018/07/31/units-questions/",
    "videoTitle": "Changing Between Units of Measurement (Primary Lesson)",
    "videoUrl": "https://www.youtube.com/watch?v=XEdjr-Yru7U",
    "videoId": "XEdjr-Yru7U"
  },
  "consecutive_numbers": {
    "concept": "Consecutive numbers: start from the middle",
    "steps": [
      "The middle (3rd) number is the total ÷ 5.",
      "Consecutive odd numbers go up in 2s: middle − 4, middle − 2, middle, middle + 2, middle + 4.",
      "The smallest number is two steps below the middle: middle − 4."
    ],
    "check": "Add your five numbers. They should make the total in the question.",
    "videoTitle": "Math Antics \u2014 Mean, Median and Mode",
    "videoUrl": "https://www.youtube.com/watch?v=B1HEzNTGeZ4",
    "videoId": "B1HEzNTGeZ4"
  },
  "simple_equations": {
    "concept": "Working backwards to find the number",
    "steps": [
      "Start with the result and undo the last step first: undo + 7 by taking away 7.",
      "Then undo the step before it: undo × 4 by dividing by 4.",
      "What is left is the number you started with."
    ],
    "check": "Put your answer through the steps in the question. You should get the result.",
    "webTitle": "Corbettmaths Primary — Think of a number practice questions",
    "webUrl": "https://corbettmathsprimary.com/2018/07/24/think-of-a-number-questions/",
    "videoTitle": "Math Antics \u2014 Solving Basic Equations Pt 1",
    "videoUrl": "https://www.youtube.com/watch?v=l3XzepN03KQ",
    "videoId": "l3XzepN03KQ"
  },
  "number_sequences": {
    "concept": "Finding a term further along a sequence",
    "steps": [
      "Find the gap between neighbouring terms.",
      "Count the jumps: getting from the 1st term to the 10th term takes 9 jumps.",
      "The term you want = first term + number of jumps × gap."
    ],
    "check": "Test your working on the 2nd and 3rd terms. It should give the numbers in the question.",
    "webTitle": "Corbettmaths Primary — Sequences practice questions",
    "webUrl": "https://corbettmathsprimary.com/2018/07/31/sequences-questions/",
    "videoTitle": "Corbettmaths — The nth Term",
    "videoUrl": "https://www.youtube.com/watch?v=qnVVTBAfNu4",
    "videoId": "qnVVTBAfNu4"
  },
  "function_machines": {
    "concept": "Function machines: follow the steps in order",
    "steps": [
      "Do the steps in the order the machine gives them.",
      "Here, multiply the number that goes in first, then add.",
      "Don’t swap the order: multiplying first and adding first give different answers."
    ],
    "check": "Work backwards from your answer: take away, then divide. You should get the number that went in.",
    "webTitle": "Corbettmaths — Function machines practice questions",
    "webUrl": "https://corbettmaths.com/2022/06/15/function-machines-practice-questions/",
    "videoTitle": "Math Antics \u2014 What Is Algebra?",
    "videoUrl": "https://www.youtube.com/watch?v=NybHckSEQBI",
    "videoId": "NybHckSEQBI"
  },
  "missing_mean": {
    "concept": "Finding a missing number from the mean",
    "steps": [
      "Total of all the numbers = mean × how many numbers there are.",
      "Add the numbers you know.",
      "Take that away from the total to find the missing number."
    ],
    "check": "Add all the numbers, including yours, and divide by how many there are. You should get the mean.",
    "webTitle": "Corbettmaths Primary — The mean practice questions",
    "webUrl": "https://corbettmathsprimary.com/2018/07/17/the-mean-questions/",
    "videoTitle": "Math Antics \u2014 Mean, Median and Mode",
    "videoUrl": "https://www.youtube.com/watch?v=B1HEzNTGeZ4",
    "videoId": "B1HEzNTGeZ4"
  },
  "data_comparison": {
    "concept": "Reading and comparing bar charts",
    "steps": [
      "Check the scale: work out what each line on the axis is worth.",
      "Read the heights of the two bars you need.",
      "Take the smaller number away from the bigger one."
    ],
    "check": "‘How many more’ means find the difference by taking away, not by adding.",
    "webTitle": "Corbettmaths Primary — Bar charts practice questions",
    "webUrl": "https://corbettmathsprimary.com/2018/06/01/bar-chart-questions/",
    "videoTitle": "Corbettmaths — Reading Bar Charts",
    "videoUrl": "https://www.youtube.com/watch?v=3e1SIAPan8E",
    "videoId": "3e1SIAPan8E"
  },
  "line_graphs": {
    "concept": "Reading changes on a line graph",
    "steps": [
      "Find the two times on the horizontal axis.",
      "Go straight up from each time to the line, then across to read the value on the vertical axis.",
      "Take the smaller reading away from the bigger one to find how much it changed."
    ],
    "check": "Say whether the line went up or down, and by how much.",
    "webTitle": "Corbettmaths Primary — Line graphs practice questions",
    "webUrl": "https://corbettmathsprimary.com/2018/07/19/line-graphs-questions/",
    "videoTitle": "Corbettmaths — Line Graphs",
    "videoUrl": "https://www.youtube.com/watch?v=E1fYceXHIr4",
    "videoId": "E1fYceXHIr4"
  },
  "pie_charts": {
    "concept": "Using a pie chart to find how many",
    "steps": [
      "Find the percentage for the part you need.",
      "Change it into a fraction, for example 25% = 1/4.",
      "Find that fraction of the total number."
    ],
    "check": "All the parts of the pie chart should add up to the total.",
    "webTitle": "Corbettmaths Primary — Pie charts practice questions",
    "webUrl": "https://corbettmathsprimary.com/2018/07/31/pie-charts-questions/",
    "videoTitle": "Corbettmaths Primary — Reading Pie Charts",
    "videoUrl": "https://www.youtube.com/watch?v=Ruc9n6ho3l4",
    "videoId": "Ruc9n6ho3l4"
  },
  "range": {
    "concept": "The range: largest take away smallest",
    "steps": [
      "Find the largest number.",
      "Find the smallest number.",
      "Range = largest − smallest."
    ],
    "check": "The range shows how spread out the numbers are. It is a difference, not an average.",
    "videoTitle": "Math Antics \u2014 Mean, Median and Mode",
    "videoUrl": "https://www.youtube.com/watch?v=B1HEzNTGeZ4",
    "videoId": "B1HEzNTGeZ4"
  },
  "translation": {
    "concept": "Moving a point on a grid",
    "steps": [
      "Start with the point’s coordinates (x, y).",
      "Moving right adds to x, and moving left takes away from x.",
      "Moving up adds to y, and moving down takes away from y.",
      "Write the new point as (x, y)."
    ],
    "check": "Count the moves on the grid to check you went the right way.",
    "webTitle": "Corbettmaths Primary — Translations practice questions",
    "webUrl": "https://corbettmathsprimary.com/2018/07/16/translations-questions/",
    "videoTitle": "Corbettmaths Primary — Translations",
    "videoUrl": "https://www.youtube.com/watch?v=8Dtz5fBe7_Q",
    "videoId": "8Dtz5fBe7_Q"
  },
  "reflection": {
    "concept": "Reflecting a point in an axis",
    "steps": [
      "The y-axis is the vertical line through 0. It is the mirror line.",
      "The point does not move up or down, so the y-coordinate stays the same.",
      "The point flips to the other side of the axis, so the x-coordinate changes sign: 5 becomes −5 (x → −x).",
      "Write the new point as (−x, y)."
    ],
    "check": "The point and its reflection are the same distance from the y-axis.",
    "webTitle": "Corbettmaths Primary — Reflections practice questions",
    "webUrl": "https://corbettmathsprimary.com/2018/07/31/reflections-questions/",
    "videoTitle": "Corbettmaths Primary — Reflections",
    "videoUrl": "https://www.youtube.com/watch?v=LJtKs8SClSI",
    "videoId": "LJtKs8SClSI"
  },
  "rectangle_coordinates": {
    "concept": "Finding the missing corner of a rectangle",
    "steps": [
      "The sides follow the grid lines, so each side goes straight across or straight up and down.",
      "Corners joined by a side going across have the same y-coordinate. Corners joined by a side going up and down have the same x-coordinate.",
      "D is joined to both A and C, so it shares one coordinate with A and the other with C.",
      "Write D as (x, y)."
    ],
    "check": "Opposite sides of a rectangle are equal: AB should match DC, and BC should match AD.",
    "webTitle": "Corbettmaths Primary — Coordinates practice questions",
    "webUrl": "https://corbettmathsprimary.com/2018/07/16/coordinates-questions/",
    "videoTitle": "Corbettmaths Primary — Coordinates",
    "videoUrl": "https://www.youtube.com/watch?v=6eX4PZJjofI",
    "videoId": "6eX4PZJjofI"
  },
  "coordinate_distance": {
    "concept": "Distance between two points on a grid",
    "steps": [
      "If the y-coordinates are the same, the points are on the same horizontal line.",
      "Distance = larger x − smaller x.",
      "If one number is negative, count to 0 first, then on from 0."
    ],
    "check": "A distance is never negative.",
    "webTitle": "Corbettmaths Primary — Coordinates practice questions",
    "webUrl": "https://corbettmathsprimary.com/2018/07/16/coordinates-questions/",
    "videoTitle": "Corbettmaths Primary — Coordinates",
    "videoUrl": "https://www.youtube.com/watch?v=6eX4PZJjofI",
    "videoId": "6eX4PZJjofI"
  },
  "coordinate_position": {
    "concept": "Moving a point up or down a grid",
    "steps": [
      "Moving down makes the y-coordinate smaller: take away the number of squares.",
      "The x-coordinate stays the same.",
      "Keep counting below 0 into negative numbers if you need to."
    ],
    "check": "Count back up by the same number of squares. You should reach the starting y-coordinate.",
    "webTitle": "Corbettmaths Primary — Coordinates practice questions",
    "webUrl": "https://corbettmathsprimary.com/2018/07/16/coordinates-questions/",
    "videoTitle": "Corbettmaths Primary — Coordinates",
    "videoUrl": "https://www.youtube.com/watch?v=6eX4PZJjofI",
    "videoId": "6eX4PZJjofI"
  },
  "factors": {
    "concept": "Finding factors in pairs",
    "steps": [
      "A factor goes into a number exactly, with no remainder.",
      "List the factor pairs in order, starting with 1 × the number.",
      "For an even number, the biggest factor smaller than the number is half of it."
    ],
    "check": "Multiply your factor by its partner in the pair. You should get the original number.",
    "webTitle": "Corbettmaths Primary — Factors practice questions",
    "webUrl": "https://corbettmathsprimary.com/2018/07/20/factors-questions/",
    "videoTitle": "Corbettmaths — Factors",
    "videoUrl": "https://www.youtube.com/watch?v=YkbMTSqE1vM",
    "videoId": "YkbMTSqE1vM"
  },
  "estimation": {
    "concept": "Estimating by rounding to the nearest ten",
    "steps": [
      "Round to the nearest ten: if the ones digit is 5 or more, round up; if it is 4 or less, round down.",
      "Multiply using the rounded numbers.",
      "Your estimate should be a round number that is easy to work with."
    ],
    "check": "Check you rounded to the nearest ten, as the question asks, before multiplying.",
    "webTitle": "Corbettmaths Primary — Rounding practice questions",
    "webUrl": "https://corbettmathsprimary.com/2018/07/31/rounding-questions/",
    "videoTitle": "Math Antics \u2014 Rounding and Estimation",
    "videoUrl": "https://www.youtube.com/watch?v=fd-E18EqSVk",
    "videoId": "fd-E18EqSVk"
  },
  "combinatorics_and_digits": {
    "concept": "Counting digits, matches and Roman numerals",
    "steps": [
      "Counting digits: split the numbers into 1-digit (1–9), 2-digit (10–99) and 3-digit (100 and up) groups.",
      "Everyone plays everyone once: multiply the number of players by one less than that number, then halve, so no match is counted twice.",
      "Roman numerals: a smaller letter before a bigger one means take it away (CM = 900, XC = 90, XL = 40, IV = 4)."
    ],
    "check": "To count the numbers from one number to another, including both ends, work out last − first + 1."
  },
  "combined_rates_fractions": {
    "concept": "Taps and workers working together",
    "steps": [
      "Work out the fraction of the job each one does in one minute (or one hour): a tap that takes 10 minutes fills 1/10 of the tank each minute.",
      "Add the fractions for things working together. Take away the fraction for anything working against them, such as a drain.",
      "For the whole job, find how long it takes for these amounts to make 1 whole. For what is left, take the part done away from 1."
    ],
    "check": "Two taps together fill faster than either tap alone. With a drain open, filling takes longer than with the tap alone.",
    "webTitle": "Corbettmaths Primary — Adding fractions practice questions",
    "webUrl": "https://corbettmathsprimary.com/2018/07/16/adding-fractions-2-questions/",
    "videoTitle": "Math Antics \u2014 Adding and Subtracting Fractions",
    "videoUrl": "https://www.youtube.com/watch?v=52ZlXsFJULI",
    "videoId": "52ZlXsFJULI"
  },
  "simultaneous_cost_problems": {
    "concept": "Comparing two orders to find one price",
    "steps": [
      "Compare the two orders. If one item appears the same number of times in both, the difference in cost comes from the other item.",
      "If no item matches yet, double (or multiply) one whole order so that one item does.",
      "Once you know one price, put it back into the simpler order to find the other price, or the weight of the empty box."
    ],
    "check": "Put both answers back into both orders. Each total should come out right."
  },
  "inverse_proportion_rates": {
    "concept": "More workers, less time (inverse proportion)",
    "steps": [
      "Multiply the number of workers (or machines, horses or gear teeth) by the time (or turns). This gives the total amount of work.",
      "If some of the job or food has already been used up, take that part away first.",
      "Divide what is left by the new number of workers (or eaters)."
    ],
    "check": "More workers sharing the same job should take less time, not more.",
    "videoTitle": "Corbettmaths Primary — Proportion",
    "videoUrl": "https://www.youtube.com/watch?v=bg283xTWtxc",
    "videoId": "bg283xTWtxc"
  },
  "venn_percentage_overlap": {
    "concept": "Venn diagrams: both, only and neither",
    "steps": [
      "Take the ‘neither’ group away from the whole (100% or the total) to find everyone in at least one group.",
      "Add the two groups together. Anyone in both groups has now been counted twice.",
      "The extra above ‘at least one group’ is the ‘both’ group. For one group ‘only’, take ‘both’ away from that group."
    ],
    "check": "Check that ‘A only’ + ‘both’ + ‘B only’ + ‘neither’ makes the whole total."
  },
  "surface_area_and_painted_cubes": {
    "concept": "Surface area, painted cubes and areas of shapes",
    "steps": [
      "Surface area of a cuboid: find the areas of the top, the front and one end, add them, then double (there are two of each).",
      "Painted cube cut into small cubes: the 8 corner cubes have 3 painted faces. Each of the 12 edges has (side − 2) cubes with 2 painted faces. Each of the 6 faces has (side − 2) × (side − 2) cubes with 1 painted face.",
      "Parallelogram: base × perpendicular height. Trapezium: add the two parallel sides, multiply by the height, then halve."
    ],
    "check": "All the groups should add up to the number of small cubes. For a 5 × 5 × 5 cube: 8 + 36 + 54 + 27 unpainted inside = 125.",
    "videoTitle": "Math Antics \u2014 Area (Composite Shapes)",
    "videoUrl": "https://www.youtube.com/watch?v=xCdxURXMdFY",
    "videoId": "xCdxURXMdFY"
  },
  "clock_angles_and_miles": {
    "concept": "Clock angles, bearings and miles to kilometres",
    "steps": [
      "Clock angles: the hour marks are 30° apart. The minute hand turns 6° each minute, and the hour hand turns half a degree each minute.",
      "Bearings are measured clockwise from North (000°). Add clockwise turns and take away anticlockwise turns.",
      "Miles and kilometres: 5 miles = 8 km. To change km into miles, divide by 8, then multiply by 5."
    ],
    "check": "A mile is longer than a kilometre, so the same distance is a smaller number in miles than in km."
  },
  "simultaneous_unknowns_puzzles": {
    "concept": "Finding two unknowns from two clues",
    "steps": [
      "Write each clue as a short statement, for example 2 apples + 1 pear = 50p.",
      "Add or take away two statements (doubling one first if needed) so that one unknown disappears.",
      "Quiz puzzles: find the score if every answer were right. Each wrong answer loses the points for a right answer plus the penalty, so divide the points missing by that amount."
    ],
    "check": "Put your answers back into every clue in the question. They should all work.",
    "videoTitle": "Math Antics \u2014 Solving Basic Equations Pt 1",
    "videoUrl": "https://www.youtube.com/watch?v=l3XzepN03KQ",
    "videoId": "l3XzepN03KQ"
  },
  "combined_mean_and_probability": {
    "concept": "Combined means, pie-chart angles and probability",
    "steps": [
      "Combined mean: find each group’s total (mean × number in the group), add the totals, then divide by the number of people altogether.",
      "Pie charts: a sector’s share of the whole is its angle ÷ 360°. Multiply that fraction by the total.",
      "Probability = number of ways it can happen ÷ total number of outcomes. If items are added, change both numbers, then simplify."
    ],
    "check": "A combined mean is closer to the mean of the bigger group.",
    "videoTitle": "Math Antics \u2014 Mean, Median and Mode",
    "videoUrl": "https://www.youtube.com/watch?v=B1HEzNTGeZ4",
    "videoId": "B1HEzNTGeZ4"
  },
  "mirror_lines_and_rotation": {
    "concept": "Reflections and rotations on a grid",
    "steps": [
      "Vertical mirror line (like x = 2): y stays the same. Count how far the point is from the line, then go the same distance past it.",
      "Horizontal mirror line (like y = 3): x stays the same. Count up or down to the line, then the same distance past it.",
      "A quarter turn (90°) clockwise about (0, 0) moves (x, y) to (y, −x). A half turn about M: go from the point to M, then the same again past M."
    ],
    "check": "For a reflection or a half turn, the mirror line or centre sits halfway between the start and the image.",
    "webTitle": "Corbettmaths Primary — Reflections practice questions",
    "webUrl": "https://corbettmathsprimary.com/2018/07/31/reflections-questions/",
    "videoTitle": "Corbettmaths Primary — Reflections",
    "videoUrl": "https://www.youtube.com/watch?v=LJtKs8SClSI",
    "videoId": "LJtKs8SClSI"
  },
  "work_rate_fractions_set": {
    "concept": "Fractions: working together and probability",
    "steps": [
      "Taps or machines together: add the fraction each one does in a minute (or an hour), using a common denominator.",
      "Probability after adding items: change both the number of ways it can happen and the total, then simplify.",
      "Re-read the question: does it ask for the part done, the part left, or NOT a colour?"
    ],
    "check": "Make sure every fraction is in its simplest form.",
    "webTitle": "Corbettmaths Primary — Adding fractions practice questions",
    "webUrl": "https://corbettmathsprimary.com/2018/07/16/adding-fractions-2-questions/",
    "videoTitle": "Math Antics \u2014 Adding and Subtracting Fractions",
    "videoUrl": "https://www.youtube.com/watch?v=52ZlXsFJULI",
    "videoId": "52ZlXsFJULI"
  }
};

/**
 * Returns tailored tutorial guidance for a question.
 * Selects variant-specific strategies when a subtopic spans multiple question styles
 * (e.g., x-axis vs y-axis reflection, 3 vs 5 consecutive numbers, remainder vs direct fractions).
 *
 * @param {Object|string} qOrSubtopic - Full question object or subtopic string
 * @returns {Object|null}
 */
// New subtopics that reuse an existing tutorial's links. Add one only if its guidance suits every question in the subtopic.
const TUTORIAL_ALIASES = {
  long_multiplication: 'multiplication_strategies',
  brackets_order_operations: 'order_operations',
  decimal_brackets_2dp: 'order_operations',
  fraction_multiply_simplify: 'fraction_multiplication',
  ratio_share_pence: 'ratio_sharing',
  ratio_given_difference: 'ratio_difference',
  triangle_angle_reasoning: 'triangle_angles',
  angle_facts_combined: 'angles_on_line',
  area_perimeter_compound: 'compound_area',
  percent_of_amount_harder: 'percent_of_amount',
  roman_numerals_and_combinatorics: 'combinatorics_and_digits',
  elimination_money_set: 'simultaneous_cost_problems',
  inverse_proportion_set: 'inverse_proportion_rates',
  venn_overlap_set: 'venn_percentage_overlap',
  trapezium_parallelogram_cuboid_set: 'surface_area_and_painted_cubes',
  bearings_clocks_miles_set: 'clock_angles_and_miles',
  paired_equations_set: 'simultaneous_unknowns_puzzles',
  probability_and_combined_mean_set: 'combined_mean_and_probability',
  offset_reflection_rotation_set: 'mirror_lines_and_rotation',
};
// Replaces the aliased wording where the subtopic is wider than the original tutorial.
const TUTORIAL_OVERRIDES = {
  long_multiplication: {
    concept: 'Long multiplication',
    steps: [
      'Split the second number into tens and ones.',
      'Multiply the first number by each part, carrying carefully.',
      'Add these answers together.'
    ],
    check: 'Estimate by rounding both numbers. Also, multiply the last digits of the two numbers: your answer should end in the same digit.'
  },
  triangle_angle_reasoning: {
    concept: 'Reasoning about angles in a triangle',
    steps: [
      'The three angles in any triangle add up to 180°.',
      'Turn each fact into an angle: right-angled means one angle is 90°, and isosceles means two angles are equal.',
      'Take the angles you know away from 180°, then share what is left between the unknown angles as the question says.',
      'If the facts allow more than one answer, the answer cannot be decided.'
    ],
    check: 'Add all three angles. They should make exactly 180°.'
  },
  angle_facts_combined: {
    concept: 'Combining angle facts',
    steps: [
      'Decide which fact helps: angles on a straight line make 180°, angles around a point make 360°, and the angles in a triangle make 180°.',
      'When two straight lines cross, the opposite angles are equal.',
      'Find one missing angle at a time, and use it in the next step.'
    ],
    check: 'Add the angles in each group. They should make the right total for that fact.'
  },
  area_perimeter_compound: {
    concept: 'Area and perimeter of compound shapes',
    steps: [
      'Decide whether the question asks for area (the space inside) or perimeter (the distance around the edge).',
      'For area, split the shape into rectangles, or take the part you do not need away from the full rectangle.',
      'For perimeter, work out any missing side lengths, then add every outside edge.'
    ],
    check: 'Area is in square units and perimeter is not. Work out the area a second way, or trace the edge again to check you counted every side.'
  },
};
export function getTutorial(qOrSubtopic) {
  if (!qOrSubtopic) return null;
  // Revised problems have their own worked solutions; legacy tutorials omit their extra steps.
  if (typeof qOrSubtopic === 'object' && qOrSubtopic.content_revision >= 2) return null;
  const q = typeof qOrSubtopic === 'object' ? qOrSubtopic : { subtopic: qOrSubtopic };
  const sub = TUTORIAL_ALIASES[q.subtopic] || q.subtopic;
  const base = TUTORIALS[sub];
  if (!base) return null;

  const result = { ...base };
  const text = q.question || '';
  const mode = q.mode || 'desk';

  // 1. Reflection variants: x-axis (walk) vs y-axis (desk)
  if (sub === 'reflection') {
    if (text.includes('x-axis') || mode === 'walk') {
      result.concept = 'Reflecting in the x-axis (a horizontal mirror line)';
      result.steps = [
        'The x-axis is the horizontal line through 0. It is the mirror line.',
        'The point does not move left or right, so the x-coordinate stays the same.',
        'The point flips to the other side of the axis, so the y-coordinate changes sign: 5 becomes −5 (y → −y).',
        'Write the new point as (x, −y).'
      ];
      result.check = 'A point above the x-axis ends up the same distance below it.';
    } else {
      result.concept = 'Reflecting in the y-axis (a vertical mirror line)';
      result.steps = [
        'The y-axis is the vertical line through 0. It is the mirror line.',
        'The point does not move up or down, so the y-coordinate stays the same.',
        'The point flips to the other side of the axis, so the x-coordinate changes sign: 5 becomes −5 (x → −x).',
        'Write the new point as (−x, y).'
      ];
      result.check = 'The point and its reflection are the same distance from the y-axis.';
    }
  }

  // 2. Consecutive numbers variants: 3 consecutive numbers (walk) vs 5 consecutive odd numbers (desk)
  if (sub === 'consecutive_numbers') {
    if (text.includes('Three') || text.includes('three') || mode === 'walk') {
      result.concept = 'Three consecutive numbers: start from the middle';
      result.steps = [
        'The middle number is the total ÷ 3.',
        'Consecutive whole numbers go up in 1s, so the numbers are one less than the middle, the middle, and one more than the middle.',
        'The largest number is the middle number + 1.'
      ];
      result.check = 'Add your three numbers. They should make the total in the question.';
    } else {
      result.concept = 'Five consecutive odd numbers: start from the middle';
      result.steps = [
        'The middle (3rd) number is the total ÷ 5.',
        'Consecutive odd numbers go up in 2s: middle − 4, middle − 2, middle, middle + 2, middle + 4.',
        'The smallest number is two steps below the middle: middle − 4.'
      ];
      result.check = 'Add your five numbers. They should make the total in the question.';
    }
  }

  // 3. Fraction of amount variants: remainder multi-step (desk) vs direct fraction of amount (walk)
  if (sub === 'fraction_of_amount') {
    if (text.includes('not blue') || text.includes('remainder') || mode === 'desk') {
      result.concept = 'A fraction of what is left';
      result.steps = [
        'Find the first fraction of the total: divide by the denominator, then multiply by the numerator.',
        'Work out how many are left: the total take away that first group.',
        'Find the second fraction of what is left, not of the whole total.'
      ];
      result.check = 'Add up all the groups. They should make the starting total.';
    } else {
      result.concept = 'Finding a fraction of an amount';
      result.steps = [
        'Divide the amount by the denominator to find one equal part.',
        'Multiply one part by the numerator.',
        'If the fraction is less than 1, your answer must be smaller than the amount you started with.'
      ];
      result.check = 'Work backwards: divide your answer by the numerator, then multiply by the denominator. You should get the starting amount.';
    }
  }

  // 4. Number sequences variants: next term (walk) vs nth term rule (desk)
  if (sub === 'number_sequences') {
    if (text.includes('comes next') || mode === 'walk') {
      result.concept = 'Finding the next term in a sequence';
      result.steps = [
        'Find the gap between neighbouring terms: second term − first term.',
        'Check the gap is the same all the way along.',
        'Add the gap to the last term to find the next one.'
      ];
      result.check = 'Take the gap away from your answer. You should get the last term in the question.';
    } else {
      result.concept = 'Finding a term further along a sequence';
      result.steps = [
        'Find the gap between neighbouring terms.',
        'Count the jumps: getting from the 1st term to the 10th term takes 9 jumps.',
        'The term you want = first term + number of jumps × gap.'
      ];
      result.check = 'Test your working on the 2nd and 3rd terms. It should give the numbers in the question.';
    }
  }

  // 5. Perimeter variants: boundary with gate deduction (desk) vs L-shaped corner cutout (walk)
  if (sub === 'perimeter') {
    if (text.includes('gate')) {
      result.concept = 'Perimeter with a gap for a gate';
      result.steps = [
        'Find the whole perimeter of the rectangle: 2 × (length + width).',
        'The gate fills part of the edge, so take its width away: fencing = perimeter − gate.',
        'Give your answer in metres.'
      ];
      result.check = 'Add the gate back on to your answer. You should get the whole perimeter.';
    } else if (text.includes('L-shape') || text.includes('corner') || text.includes('cut out')) {
      result.concept = 'Perimeter of an L-shape';
      result.steps = [
        'When a rectangle is cut out of a corner, the two new inside edges are the same length as the two outside edges that were removed.',
        'So cutting out a corner does not change the perimeter.',
        'Find the perimeter of the full rectangle: 2 × (length + width).'
      ];
      result.check = 'Add all 6 edges of the L-shape one at a time. You should get the same answer.';
    }
  }

  // 6. Speed, distance, time variants: closing speed (desk) vs minute conversions vs steady distance (walk)
  if (sub === 'speed_distance_time') {
    if (text.includes('towards each other') || text.includes('apart')) {
      result.concept = 'Moving towards each other: add the speeds';
      result.steps = [
        'When two things move towards each other, add their speeds. This is how fast the gap between them closes.',
        'Time in hours = distance ÷ the two speeds added together.',
        'To change hours into minutes, multiply by 60.'
      ];
      result.check = 'Multiply the added speeds by your time in hours. You should get the starting distance.';
    } else if (text.includes('minutes') && mode === 'desk') {
      result.concept = 'Speed, distance and time in minutes';
      result.steps = [
        'Time in hours = distance ÷ speed.',
        'Change hours into minutes by multiplying by 60.',
        'Check: speed × time in hours should give the distance.'
      ];
      result.check = 'Your answer is in minutes, so it should be 60 times the number of hours.';
    } else {
      result.concept = 'Distance at a steady speed';
      result.steps = [
        'Distance = speed × time.',
        'Multiply the distance covered each hour by the number of hours.',
        'The speed is per hour and the time is in hours, so you don’t need to change any units.'
      ];
      result.check = 'Divide your distance by the number of hours. You should get the speed.';
    }
  }

  // 7. Fraction equivalence variants: odd one out (desk) vs missing numerator
  if (sub === 'fraction_equivalence') {
    if (text.includes('odd one out')) {
      result.concept = 'Simplifying fractions to find the odd one out';
      result.steps = [
        'Simplify each fraction: divide the numerator and denominator by the biggest number that goes into both.',
        'Four of the fractions will simplify to the same fraction.',
        'The one that simplifies to something different is the odd one out.'
      ];
      result.check = 'Check that the other four really do all simplify to the same fraction.';
    } else {
      result.concept = 'Finding an equivalent fraction';
      result.steps = [
        'Work out what the denominator was multiplied by: new denominator ÷ old denominator.',
        'Multiply the numerator by the same number.',
        'Both fractions should show the same amount.'
      ];
      result.check = 'Simplify your new fraction. You should get back to the fraction you started with.';
    }
  }

  // 8. Translation variants: 2D vector move (desk) vs single-axis move (walk)
  if (sub === 'translation') {
    if (text.includes('down') || text.includes('up')) {
      result.concept = 'Moving a point across and up or down';
      result.steps = [
        'Start with the point’s coordinates (x, y).',
        'Moving right adds to x, and moving left takes away from x.',
        'Moving up adds to y, and moving down takes away from y.',
        'Write the new point as (x, y).'
      ];
      result.check = 'Count the moves on the grid to check you went the right way.';
    } else {
      result.concept = 'Moving a point left or right';
      result.steps = [
        'Moving left or right changes only the x-coordinate.',
        'Moving right adds to x, and moving left takes away from x.',
        'Write the new x-coordinate.'
      ];
      result.check = 'Count along the x-axis to check, going through 0 if you need to.';
    }
  }

  // 9. Missing mean variants: 5-score table (desk) vs 3-score mental (walk)
  if (sub === 'missing_mean') {
    if (text.includes('five') || text.includes('Five') || mode === 'desk') {
      result.concept = 'Finding a missing score from the mean of 5';
      result.steps = [
        'Total of all 5 scores = mean × 5.',
        'Add the 4 scores you know from the table.',
        'Missing score = total − the 4 scores you know.'
      ];
      result.check = 'Add all 5 scores and divide by 5. You should get the mean.';
    } else {
      result.concept = 'Finding a missing score from the mean of 3';
      result.steps = [
        'Total of all 3 scores = mean × 3.',
        'Add the 2 scores you know.',
        'Missing score = total − the 2 scores you know.'
      ];
      result.check = 'Add all 3 scores and divide by 3. You should get the mean.';
    }
  }

  // 10. Data comparison variants: bar chart readings (desk) vs survey counts (walk)
  if (sub === 'data_comparison') {
    if (text.includes('bar chart') || mode === 'desk') {
      result.concept = 'Reading and comparing bar charts';
      result.steps = [
        'Check the scale: work out what each line on the axis is worth.',
        'Read the heights of the two bars you need.',
        'Take the smaller number away from the bigger one.'
      ];
      result.check = '‘How many more’ means find the difference by taking away, not by adding.';
    } else {
      result.concept = 'Comparing two survey counts';
      result.steps = [
        'Find the number for each group.',
        'Take the smaller number away from the bigger one.',
        '‘How many more’ always asks for the difference.'
      ];
      result.check = 'Add your answer to the smaller number. You should get the bigger number.';
    }
  }

  // 11. Unit conversion variants: multi-batch mass (desk) vs direct metric conversions (walk)
  if (sub === 'unit_conversion') {
    if (text.includes('batch') || text.includes('batches')) {
      result.concept = 'Total mass in grams, then in kilograms';
      result.steps = [
        'Work out the total in grams first: number of batches × grams in each batch.',
        'Change grams to kilograms by dividing by 1000: the digits move three places to the right.',
        'Your answer may need a decimal, for example 4600 g = 4.6 kg.'
      ];
      result.check = '1 kg = 1000 g, so the number of kilograms is 1000 times smaller than the number of grams.';
    } else {
      result.concept = 'Converting metric units';
      result.steps = [
        'Find the link between the units: 1 kg = 1000 g, 1 litre = 1000 ml, 1 m = 100 cm.',
        'Changing to a smaller unit gives a bigger number, so multiply.',
        'Changing to a bigger unit gives a smaller number, so divide.'
      ];
      result.check = 'Ask yourself: should there be more or fewer of the new unit?';
    }
  }

  // 12. Time duration variants: 24-hr arrival calculation (desk) vs elapsed minutes (walk)
  if (sub === 'time_duration') {
    if (text.includes('arrive') || text.includes('24-hour')) {
      result.concept = 'Working out an arrival time (24-hour clock)';
      result.steps = [
        'Add the whole hours of the journey to the start time first.',
        'Then add the minutes. When you pass 60 minutes, that makes another hour.',
        'Write the answer on the 24-hour clock, like 09:05 or 17:40.'
      ];
      result.check = 'Count back from your answer by the journey time. You should reach the start time.';
    } else {
      result.concept = 'Counting minutes across the hour';
      result.steps = [
        'Count on from the start time to the next o’clock: 60 − the start minutes.',
        'Then add any whole hours, and the minutes after the last o’clock.',
        'Remember: an hour has 60 minutes, not 100.'
      ];
      result.check = 'Add your minutes to the start time. You should reach the end time.';
    }
  }

  // 13. Offset reflections, combined reflection + translation, and 90° / 180° rotations
  if (sub === 'mirror_lines_and_rotation') {
    // The linked worksheet covers reflections only, so rotations go without it.
    if (text.includes('90°') || text.includes('180°')) { delete result.webTitle; delete result.webUrl; }
    if (text.includes('90°')) {
      result.concept = 'Turning a point 90° about (0, 0)';
      result.steps = [
        'Describe the point as steps from (0, 0): how far right or left, and how far up or down.',
        'Turn each step a quarter turn clockwise: right becomes down, and up becomes right.',
        'So (x, y) becomes (y, −x).'
      ];
      result.check = 'The new point should be the same distance from (0, 0), a quarter turn (90°) clockwise from the old one.';
    } else if (text.includes('180°')) {
      result.concept = 'A half turn (180°) about a point';
      result.steps = [
        'Count the steps across and up or down from the point to the centre M.',
        'From M, make exactly the same steps again in the same direction.',
        'Write where you land as (x, y).'
      ];
      result.check = 'The centre M sits halfway between the point and its image.';
    } else if (text.includes('translate')) {
      result.concept = 'Reflecting, then moving a point';
      result.steps = [
        'Reflect first. For a horizontal mirror line (like y = 3), x stays the same: count to the line, then the same distance past it.',
        'Check the point and its reflection are the same distance from the mirror line.',
        'Then move the reflected point as the question says.'
      ];
      result.check = 'Check each part on its own: the mirror line should sit halfway between the start and the reflected point. Then check the move.';
    } else {
      result.concept = 'Reflecting in a mirror line that is not an axis';
      result.steps = [
        'Is the mirror line vertical (like x = 2) or horizontal (like y = 3)?',
        'Count how many squares the point is from the mirror line.',
        'Go the same number of squares past the line, on the other side.'
      ];
      result.check = 'The mirror line sits halfway between the point and its reflection.';
    }
  }

  return { ...result, ...TUTORIAL_OVERRIDES[q.subtopic] };
}

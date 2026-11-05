// Curated public tutorial websites, step-by-step strategies, and YouTube video lessons for each skill.
// Supports dynamic variant adaptation so shared skills match the specific question variant (e.g. in daily practice).

export const TUTORIALS = {
  "order_operations": {
    "concept": "Hierarchical Operator Precedence (BODMAS / BIDMAS)",
    "steps": [
      "Evaluate Brackets first: solve expressions inside ( ) before anything else.",
      "Execute Division and Multiplication working strictly from left to right (they have equal priority).",
      "Execute Addition and Subtraction working strictly from left to right (they have equal priority)."
    ],
    "check": "Work the operations backwards or check intermediate values on scrap paper.",
    "webTitle": "Corbettmaths Primary \u2014 Order of Operations",
    "webUrl": "https://corbettmathsprimary.com/content/",
    "videoTitle": "Math Antics \u2014 Order Of Operations",
    "videoUrl": "https://www.youtube.com/watch?v=dAgfnK528RA",
    "videoId": "dAgfnK528RA"
  },
  "multi_step_cost": {
    "concept": "Inventory Tracking & Inflow/Outflow Bookkeeping",
    "steps": [
      "Calculate Initial Total Inventory: (Number of packs) \u00d7 (Items per pack).",
      "Calculate Total Items Distributed: (Number of recipients) \u00d7 (Items per recipient).",
      "Subtract Outflow from Inflow to determine Remaining stock."
    ],
    "check": "Sum the remaining items and distributed items; the result must equal the initial count.",
    "webTitle": "Corbettmaths Primary — Practice Questions",
    "webUrl": "https://corbettmathsprimary.com/content/",
    "videoTitle": "Math Antics \u2014 Multi-Digit Multiplication",
    "videoUrl": "https://www.youtube.com/watch?v=FJ5qLWP3Fqo",
    "videoId": "FJ5qLWP3Fqo"
  },
  "multiplication_strategies": {
    "concept": "Area Models, Factoring and Distributive Decomposition",
    "steps": [
      "Identify friendly factors: split 15 into 10 + 5, or decompose 25 as (100 \u00f7 4).",
      "Decompose the two-digit multiplier and multiply partial products.",
      "Recombine partial products cleanly on paper."
    ],
    "check": "Estimate by rounding factors to the nearest ten to verify order of magnitude.",
    "webTitle": "Corbettmaths Primary \u2014 Multiplication Strategies",
    "webUrl": "https://corbettmathsprimary.com/content/",
    "videoTitle": "Math Antics \u2014 Multi-Digit Multiplication Pt 2",
    "videoUrl": "https://www.youtube.com/watch?v=RVYwunbpMHA",
    "videoId": "RVYwunbpMHA"
  },
  "fraction_equivalence": {
    "concept": "Proportional Invariance & Simplification to Lowest Terms",
    "steps": [
      "Divide numerator and denominator by their Highest Common Factor (HCF) to find simplest form.",
      "For missing numerators: determine scale factor between denominators (d_new \u00f7 d_orig).",
      "Multiply the numerator by the exact same scale factor."
    ],
    "check": "Cross-multiply numerator and denominator (a \u00d7 d = b \u00d7 c) to confirm equality.",
    "webTitle": "Corbettmaths Primary \u2014 Equivalent Fractions",
    "webUrl": "https://corbettmathsprimary.com/content/",
    "videoTitle": "Corbettmaths — Equivalent Fractions",
    "videoUrl": "https://www.youtube.com/watch?v=2Gbe6J0JzHE",
    "videoId": "2Gbe6J0JzHE"
  },
  "fraction_of_amount": {
    "concept": "Remainder Fractioning & Sequential Partitioning",
    "steps": [
      "Calculate the primary group: divide total by denominator and multiply by numerator.",
      "CRITICAL: Find the remainder (Total \u2212 Primary Group).",
      "Apply the second fraction strictly to the remainder, not the original total."
    ],
    "check": "Add all groups together; their sum must equal the original whole.",
    "webTitle": "Corbettmaths Primary \u2014 Fractions of Amounts",
    "webUrl": "https://corbettmathsprimary.com/content/",
    "videoTitle": "Math Antics \u2014 Fractions are Parts of Things",
    "videoUrl": "https://www.youtube.com/watch?v=CA9XLJpQp3c",
    "videoId": "CA9XLJpQp3c"
  },
  "fraction_multiplication": {
    "concept": "Cross-Simplification & Dimension Scaling",
    "steps": [
      "Inspect numerators and denominators diagonally for shared prime factors.",
      "Cancel common factors before multiplying across.",
      "Multiply remaining numerators and remaining denominators; simplify if necessary."
    ],
    "check": "The product of two proper fractions must be smaller than either factor.",
    "webTitle": "Corbettmaths Primary \u2014 Multiplying Fractions",
    "webUrl": "https://corbettmathsprimary.com/content/",
    "videoTitle": "Math Antics \u2014 Multiplying Fractions",
    "videoUrl": "https://www.youtube.com/watch?v=qmfXyR7Z6Lk",
    "videoId": "qmfXyR7Z6Lk"
  },
  "fraction_addition": {
    "concept": "Common Denominators and Unit Fractions",
    "steps": [
      "Ensure fractions have a common denominator before adding.",
      "Add only the numerators; keep the denominator unchanged.",
      "Simplify the resulting fraction to simplest form or convert to a mixed number."
    ],
    "check": "Never add denominators together.",
    "webTitle": "Corbettmaths Primary \u2014 Adding Fractions",
    "webUrl": "https://corbettmathsprimary.com/content/",
    "videoTitle": "Math Antics \u2014 Adding and Subtracting Fractions",
    "videoUrl": "https://www.youtube.com/watch?v=52ZlXsFJULI",
    "videoId": "52ZlXsFJULI"
  },
  "fraction_percent": {
    "concept": "Fraction to Percentage Conversions",
    "steps": [
      "Scale the denominator to 100 if possible (e.g. 2/5 = 40/100 = 40%).",
      "Alternatively, divide numerator by denominator and multiply by 100.",
      "Verify common benchmark equivalents (1/2 = 50%, 1/4 = 25%, 3/4 = 75%)."
    ],
    "check": "A fraction less than 1 must produce a percentage below 100%.",
    "webTitle": "Corbettmaths Primary \u2014 Fractions to Percentages",
    "webUrl": "https://corbettmathsprimary.com/content/",
    "videoTitle": "Math Antics \u2014 Fractions and Decimals",
    "videoUrl": "https://www.youtube.com/watch?v=do_IbHId2Os",
    "videoId": "do_IbHId2Os"
  },
  "money_multiplication": {
    "concept": "Decimal Money Multiplication & Whole-Unit Compensation",
    "steps": [
      "Method A: Multiply whole pounds and pence separately, then sum them.",
      "Method B (Near-Pound): Round up to whole pounds (e.g. \u00a38.00 \u00d7 9 = \u00a372.00) and subtract the excess (15p \u00d7 9 = \u00a31.35) to get \u00a370.65.",
      "Verify the decimal point position: two decimal places for currency."
    ],
    "check": "Estimate with whole pounds to confirm the decimal point is placed correctly.",
    "webTitle": "Corbettmaths Primary \u2014 Multiplying Decimals",
    "webUrl": "https://corbettmathsprimary.com/content/",
    "videoTitle": "Math Antics \u2014 Decimal Arithmetic",
    "videoUrl": "https://www.youtube.com/watch?v=kwh4SD1ToFc",
    "videoId": "kwh4SD1ToFc"
  },
  "exchange_rate": {
    "concept": "Proportional Currency Scaling & Directional Reasoning",
    "steps": [
      "Check the rate rule: \u00a31 = r foreign units.",
      "Determine direction: \u00a3 to foreign = Multiply by r; foreign to \u00a3 = Divide by r.",
      "Split decimals mentally (e.g. \u00d7 1.15 = 100% + 10% + 5%)."
    ],
    "check": "If 1 pound buys more than 1 euro, you must finish with more euros than pounds.",
    "webTitle": "Corbettmaths Primary — Practice Questions",
    "webUrl": "https://corbettmathsprimary.com/content/",
    "videoTitle": "Corbettmaths Primary — Proportion",
    "videoUrl": "https://www.youtube.com/watch?v=bg283xTWtxc",
    "videoId": "bg283xTWtxc"
  },
  "money_change": {
    "concept": "Multi-Item Expenditure & Complementary Subtraction",
    "steps": [
      "Calculate total purchase cost: (number of items) \u00d7 (unit price).",
      "Format cash tendered with two decimal places (\u00a320.00 or \u00a330.00).",
      "Subtract using counting-up complementary addition across zero."
    ],
    "check": "Add final change to total cost; the sum must equal the cash note handed over.",
    "webTitle": "Corbettmaths Primary — Practice Questions",
    "webUrl": "https://corbettmathsprimary.com/content/",
    "videoTitle": "Math Antics \u2014 Decimal Arithmetic",
    "videoUrl": "https://www.youtube.com/watch?v=kwh4SD1ToFc",
    "videoId": "kwh4SD1ToFc"
  },
  "decimal_ordering": {
    "concept": "Place Value Comparison (Tenths, Hundredths, Thousandths)",
    "steps": [
      "Pad numbers with trailing zeros so they all have the same number of decimal places.",
      "Compare digits column by column from left to right starting with tenths.",
      "Remember: more digits after the point does not automatically mean a larger number."
    ],
    "check": "Read as whole numbers of thousandths (e.g. 0.700 vs 0.650).",
    "webTitle": "Corbettmaths Primary \u2014 Ordering Decimals",
    "webUrl": "https://corbettmathsprimary.com/content/",
    "videoTitle": "Math Antics \u2014 Decimal Place Value",
    "videoUrl": "https://www.youtube.com/watch?v=kwh4SD1ToFc",
    "videoId": "kwh4SD1ToFc"
  },
  "decimal_addition": {
    "concept": "Place Value Alignment in Decimal Addition",
    "steps": [
      "Line up the decimal points vertically.",
      "Add trailing zeros so columns align (tenths under tenths, hundredths under hundredths).",
      "Add columns from right to left, carrying into the next column as needed."
    ],
    "check": "Subtract the second number from the sum to recover the first number.",
    "webTitle": "Corbettmaths Primary \u2014 Adding Decimals",
    "webUrl": "https://corbettmathsprimary.com/content/",
    "videoTitle": "Math Antics \u2014 Decimal Arithmetic",
    "videoUrl": "https://www.youtube.com/watch?v=kwh4SD1ToFc",
    "videoId": "kwh4SD1ToFc"
  },
  "decimal_scaling": {
    "concept": "Powers of 10 Place-Value Shifts",
    "steps": [
      "Multiplying by 10 shifts digits 1 column left; by 100 shifts 2 columns left.",
      "Never just \"add zeros\" to a decimal number.",
      "Check the place value of the leading digit."
    ],
    "check": "Divide the result by 100 to verify you recover the original number.",
    "webTitle": "Corbettmaths Primary \u2014 Multiplying by 10, 100, 1000",
    "webUrl": "https://corbettmathsprimary.com/content/",
    "videoTitle": "Math Antics \u2014 Decimal Arithmetic",
    "videoUrl": "https://www.youtube.com/watch?v=kwh4SD1ToFc",
    "videoId": "kwh4SD1ToFc"
  },
  "rounding": {
    "concept": "Rounding to 1 Decimal Place (Tenths)",
    "steps": [
      "Look at the decider digit in the hundredths column (one place to the right).",
      "If the decider is 5 or greater, round the tenths digit up by 1 (carrying if 9).",
      "If the decider is less than 5, leave the tenths digit unchanged."
    ],
    "check": "Confirm the rounded number has exactly one digit after the decimal point.",
    "webTitle": "Corbettmaths Primary \u2014 Rounding Decimals",
    "webUrl": "https://corbettmathsprimary.com/content/",
    "videoTitle": "Math Antics \u2014 Rounding",
    "videoUrl": "https://www.youtube.com/watch?v=fd-E18EqSVk",
    "videoId": "fd-E18EqSVk"
  },
  "ratio_sharing": {
    "concept": "The Bar Model Total-Parts Protocol",
    "steps": [
      "Sum the ratio parts: A + B = Total Parts.",
      "Calculate the unitary value of 1 part: Total Amount \u00f7 Total Parts.",
      "Multiply the 1-part value by the requested share part count."
    ],
    "check": "Calculate both shares and sum them; their total must equal the original amount.",
    "webTitle": "Corbettmaths Primary \u2014 Ratio: Sharing",
    "webUrl": "https://corbettmathsprimary.com/content/",
    "videoTitle": "Math Antics \u2014 Ratios And Rates",
    "videoUrl": "https://www.youtube.com/watch?v=RQ2nYUBVvqI",
    "videoId": "RQ2nYUBVvqI"
  },
  "volume_ratio": {
    "concept": "Dimensional Scaling & 2D-to-3D Area-Volume Proportionality",
    "steps": [
      "Notice that when height is equal, Volume = (Base Area) \u00d7 h.",
      "Calculate base areas: side^2 for each square base.",
      "Simplify the area ratio: a^2 : b^2 to lowest terms."
    ],
    "check": "Calculate the full volumes explicitly (l \u00d7 w \u00d7 h) to confirm the simplified ratio.",
    "webTitle": "Corbettmaths Primary \u2014 Volume of a Cuboid",
    "webUrl": "https://corbettmathsprimary.com/content/",
    "videoTitle": "Math Antics \u2014 Volume",
    "videoUrl": "https://www.youtube.com/watch?v=qJwecTgce6c",
    "videoId": "qJwecTgce6c"
  },
  "unitary_method": {
    "concept": "Rate Isolation & Scaled Proportion",
    "steps": [
      "Isolate the cost of 1 single item: (Batch Cost) \u00f7 (Batch Count).",
      "Keep the exact decimal or fraction rate.",
      "Multiply the single unit cost by the new target count."
    ],
    "check": "Compare scaling factors (e.g. 15 items is 2.5 times 6 items; multiply cost by 2.5).",
    "webTitle": "Corbettmaths Primary \u2014 Proportion: Unitary Method",
    "webUrl": "https://corbettmathsprimary.com/content/",
    "videoTitle": "Corbettmaths Primary — Proportion",
    "videoUrl": "https://www.youtube.com/watch?v=bg283xTWtxc",
    "videoId": "bg283xTWtxc"
  },
  "scaling_recipe": {
    "concept": "Direct Proportion in Recipes",
    "steps": [
      "Find the amount needed for 1 person: (Total ingredient) \u00f7 (Original people).",
      "Multiply the 1-person amount by the target number of people.",
      "Maintain consistent units throughout."
    ],
    "check": "If people double, ingredient amounts must double.",
    "webTitle": "Corbettmaths Primary \u2014 Recipes & Scaling",
    "webUrl": "https://corbettmathsprimary.com/content/",
    "videoTitle": "Corbettmaths — Recipes",
    "videoUrl": "https://www.youtube.com/watch?v=HpbJA9HxuTk",
    "videoId": "HpbJA9HxuTk"
  },
  "ratio_difference": {
    "concept": "Ratio Sharing with a Given Difference",
    "steps": [
      "Find the difference in ratio parts: |b \u2212 a| parts.",
      "Divide the given quantity difference by the part difference to find 1 part.",
      "Multiply 1 part by the requested category's parts."
    ],
    "check": "Never divide the difference by the sum of parts.",
    "webTitle": "Corbettmaths Primary \u2014 Ratio: Given Difference",
    "webUrl": "https://corbettmathsprimary.com/content/",
    "videoTitle": "Math Antics \u2014 Ratios And Rates",
    "videoUrl": "https://www.youtube.com/watch?v=RQ2nYUBVvqI",
    "videoId": "RQ2nYUBVvqI"
  },
  "percent_discount": {
    "concept": "Percentage Deduction & Complementary Sale Multipliers",
    "steps": [
      "Identify the original price (100%).",
      "Calculate the discount amount using 10% and 5% building blocks.",
      "Subtract the discount from the original price to find the final sale price."
    ],
    "check": "Alternatively multiply directly by the complement (e.g. 15% off = 85% paid).",
    "webTitle": "Corbettmaths Primary \u2014 Percentage Increase/Decrease",
    "webUrl": "https://corbettmathsprimary.com/content/",
    "videoTitle": "Math Antics \u2014 What Are Percentages?",
    "videoUrl": "https://www.youtube.com/watch?v=WYWPuG-8U5Q",
    "videoId": "WYWPuG-8U5Q"
  },
  "percent_of_amount": {
    "concept": "Benchmark Component Assembly (10%, 5%, 1%)",
    "steps": [
      "Deconstruct the percentage into pieces: e.g. 35% = 3 \u00d7 10% + 5%.",
      "Find 10% by dividing by 10; halve that to find 5%.",
      "Sum the components cleanly on scrap paper."
    ],
    "check": "Compare your result against 50% (half of the total) to verify sensibility.",
    "webTitle": "Corbettmaths Primary \u2014 Percentages of Amounts",
    "webUrl": "https://corbettmathsprimary.com/content/",
    "videoTitle": "Math Antics \u2014 Finding A Percent Of A Number",
    "videoUrl": "https://www.youtube.com/watch?v=rR95Cbcjzus",
    "videoId": "rR95Cbcjzus"
  },
  "percent_increase": {
    "concept": "Additive Proportional Growth",
    "steps": [
      "Calculate the increase amount using benchmark percentage blocks.",
      "CRITICAL: Add the increase to the original starting total.",
      "Confirm the new total is greater than the starting amount."
    ],
    "check": "Never submit just the increase amount when the question asks for the new total.",
    "webTitle": "Corbettmaths Primary \u2014 Percentage Increase/Decrease",
    "webUrl": "https://corbettmathsprimary.com/content/",
    "videoTitle": "Corbettmaths — Increasing & Decreasing by a Percentage",
    "videoUrl": "https://www.youtube.com/watch?v=tUtgC7ZrsRc",
    "videoId": "tUtgC7ZrsRc"
  },
  "compound_area": {
    "concept": "Subtractive Rectilinear Geometry (Bounding Box Subtraction)",
    "steps": [
      "Calculate the area of the full enclosing rectangle: Length \u00d7 Width.",
      "Calculate the area of the missing corner cut-out: Cut Length \u00d7 Cut Width.",
      "Subtract the cut-out area from the enclosing rectangle area."
    ],
    "check": "Verify by vertically slicing the L-shape into two rectangles and summing their areas.",
    "webTitle": "Corbettmaths Primary \u2014 Area of Compound Shapes",
    "webUrl": "https://corbettmathsprimary.com/content/",
    "videoTitle": "Math Antics \u2014 Area (Composite Shapes)",
    "videoUrl": "https://www.youtube.com/watch?v=xCdxURXMdFY",
    "videoId": "xCdxURXMdFY"
  },
  "triangle_area": {
    "concept": "Half-Rectangle Mensuration & Perpendicular Height",
    "steps": [
      "Identify the base and perpendicular height (forming a 90\u00b0 right angle).",
      "Use formula: Area = (base \u00d7 height) \u00f7 2.",
      "Halve the even dimension before multiplying to keep arithmetic small."
    ],
    "check": "Never use the sloping side as the height.",
    "webTitle": "Corbettmaths Primary \u2014 Area of a Triangle",
    "webUrl": "https://corbettmathsprimary.com/content/",
    "videoTitle": "Corbettmaths — Area of a Triangle",
    "videoUrl": "https://www.youtube.com/watch?v=6WsQH1cAYMM",
    "videoId": "6WsQH1cAYMM"
  },
  "perimeter": {
    "concept": "Boundary Distance with Real-World Deductions",
    "steps": [
      "Calculate the complete rectangular perimeter: 2 \u00d7 (Length + Width).",
      "Deduct the width of any gate or opening that does not require fencing.",
      "State the answer with the correct unit of length (metres)."
    ],
    "check": "Add the gate width back to your answer; the sum must equal the complete perimeter.",
    "webTitle": "Corbettmaths Primary \u2014 Perimeter",
    "webUrl": "https://corbettmathsprimary.com/content/",
    "videoTitle": "Math Antics \u2014 Perimeter",
    "videoUrl": "https://www.youtube.com/watch?v=AAY1bsazcgM",
    "videoId": "AAY1bsazcgM"
  },
  "triangle_angles": {
    "concept": "Interior Angle Sum of a Triangle (180\u00b0)",
    "steps": [
      "Remember that all three angles inside any triangle sum to 180\u00b0.",
      "Add the two known angles.",
      "Subtract that sum from 180\u00b0 to find the third angle."
    ],
    "check": "Add all three angles together; their sum must equal exactly 180\u00b0.",
    "webTitle": "Corbettmaths Primary \u2014 Angles in Triangles",
    "webUrl": "https://corbettmathsprimary.com/content/",
    "videoTitle": "Math Antics \u2014 Triangles",
    "videoUrl": "https://www.youtube.com/watch?v=mLeNaZcy-hE",
    "videoId": "mLeNaZcy-hE"
  },
  "rectangle_area": {
    "concept": "Rectangular Area by Multiplication",
    "steps": [
      "Multiply Length by Width: Area = l \u00d7 w.",
      "Use square units (cm\u00b2 or m\u00b2).",
      "Do not confuse with perimeter (distance around the outside)."
    ],
    "check": "Area measures surface coverage in unit squares.",
    "webTitle": "Corbettmaths Primary \u2014 Area of a Rectangle",
    "webUrl": "https://corbettmathsprimary.com/content/",
    "videoTitle": "Math Antics \u2014 Area",
    "videoUrl": "https://www.youtube.com/watch?v=xCdxURXMdFY",
    "videoId": "xCdxURXMdFY"
  },
  "angles_on_line": {
    "concept": "Angles on a Straight Line (180\u00b0 Half Turn)",
    "steps": [
      "Angles that meet on a straight line add up to 180\u00b0.",
      "Subtract the known angle from 180\u00b0 to find the missing angle.",
      "Ensure the answer matches an acute or obtuse angle visually."
    ],
    "check": "Sum the angles; they must form a half turn of 180\u00b0.",
    "webTitle": "Corbettmaths Primary \u2014 Angles on a Straight Line",
    "webUrl": "https://corbettmathsprimary.com/content/",
    "videoTitle": "Math Antics \u2014 Angle Basics",
    "videoUrl": "https://www.youtube.com/watch?v=DGKwdHMiqCg",
    "videoId": "DGKwdHMiqCg"
  },
  "speed_distance_time": {
    "concept": "Rate-Distance-Time Triangle & Closing Speeds",
    "steps": [
      "For two objects moving towards each other: Closing Speed = Speed 1 + Speed 2.",
      "Calculate time in hours: Time = Distance \u00f7 Closing Speed.",
      "Convert hours to minutes by multiplying by 60."
    ],
    "check": "Multiply closing speed by time in hours to confirm the total starting gap.",
    "webTitle": "Corbettmaths \u2014 Speed, Distance, Time",
    "webUrl": "https://corbettmaths.com/2016/01/01/speed-distance-time/",
    "videoTitle": "Corbettmaths — Speed, Distance, Time",
    "videoUrl": "https://www.youtube.com/watch?v=dHVK7IeLGT8",
    "videoId": "dHVK7IeLGT8"
  },
  "unit_conversion": {
    "concept": "Metric Place-Value Scaling (Grams to Kilograms)",
    "steps": [
      "Calculate total mass in grams first: (Batches) \u00d7 (Grams per batch).",
      "Convert grams to kilograms by dividing by 1,000 (shift decimal point 3 places left).",
      "Check if the answer requires a decimal (e.g. 2,250 g = 2.25 kg)."
    ],
    "check": "1 kg = 1,000 g. A kilogram number must always be 1,000 times smaller than the gram number.",
    "webTitle": "Corbettmaths Primary \u2014 Units: Metric",
    "webUrl": "https://corbettmathsprimary.com/content/",
    "videoTitle": "Changing Between Units of Measurement (Primary Lesson)",
    "videoUrl": "https://www.youtube.com/watch?v=XEdjr-Yru7U",
    "videoId": "XEdjr-Yru7U"
  },
  "time_duration": {
    "concept": "Base-60 Chronological Bridging & 24-Hour Clock",
    "steps": [
      "Add full hours first to advance the base hour.",
      "Add remaining minutes, bridging to the next hour (regrouping each 60 minutes as 1 hour).",
      "Write the arrival time in standard 24-hour clock format (HH:MM)."
    ],
    "check": "Count backwards from arrival time by the journey duration to verify departure time.",
    "webTitle": "Corbettmaths Primary \u2014 Time Calculations",
    "webUrl": "https://corbettmathsprimary.com/content/"
  },
  "mass_difference": {
    "concept": "Mixed Unit Mass Subtraction",
    "steps": [
      "Convert kilograms to grams first by multiplying by 1,000.",
      "Subtract the grams used from the total grams.",
      "Never subtract grams directly from kilograms."
    ],
    "check": "Add the remaining grams to the used grams; the sum must equal the starting mass.",
    "webTitle": "Corbettmaths Primary — Practice Questions",
    "webUrl": "https://corbettmathsprimary.com/content/",
    "videoTitle": "Changing Between Units of Measurement (Primary Lesson)",
    "videoUrl": "https://www.youtube.com/watch?v=XEdjr-Yru7U",
    "videoId": "XEdjr-Yru7U"
  },
  "consecutive_numbers": {
    "concept": "Mean-Symmetry of Uniformly Spaced Integers",
    "steps": [
      "For 5 consecutive numbers, the middle (3rd) number equals the mean: Sum \u00f7 5.",
      "Consecutive odd numbers differ by 2 (e.g. m\u22124, m\u22122, m, m+2, m+4).",
      "The smallest number is two steps below the middle: Middle \u2212 4."
    ],
    "check": "List all 5 numbers and sum them; their total must equal the prompt value.",
    "webTitle": "Corbettmaths Primary — Practice Questions",
    "webUrl": "https://corbettmathsprimary.com/content/",
    "videoTitle": "Math Antics \u2014 Mean, Median and Mode",
    "videoUrl": "https://www.youtube.com/watch?v=B1HEzNTGeZ4",
    "videoId": "B1HEzNTGeZ4"
  },
  "simple_equations": {
    "concept": "Backtracking Function Machines (Inverse Operations)",
    "steps": [
      "Identify the last operation performed and undo it first (e.g. undo +7 by subtracting 7).",
      "Undo the first operation (e.g. undo \u00d74 by dividing by 4).",
      "Isolate the original starting number."
    ],
    "check": "Substitute the answer back into the forward calculation to verify.",
    "webTitle": "Corbettmaths Primary \u2014 Forming and Solving Equations",
    "webUrl": "https://corbettmathsprimary.com/content/",
    "videoTitle": "Math Antics \u2014 Solving Basic Equations Pt 1",
    "videoUrl": "https://www.youtube.com/watch?v=l3XzepN03KQ",
    "videoId": "l3XzepN03KQ"
  },
  "number_sequences": {
    "concept": "Linear Arithmetic Sequences (nth Term Rule)",
    "steps": [
      "Find the common difference d between consecutive terms.",
      "Count the jumps: from term 1 to term n, there are exactly (n \u2212 1) jumps.",
      "Calculate: Target Term = Term 1 + (n \u2212 1) \u00d7 d."
    ],
    "check": "Check with the nth term formula (dn + c) against the first 3 terms.",
    "webTitle": "Corbettmaths Primary \u2014 Sequences",
    "webUrl": "https://corbettmathsprimary.com/content/",
    "videoTitle": "Corbettmaths — The nth Term",
    "videoUrl": "https://www.youtube.com/watch?v=qnVVTBAfNu4",
    "videoId": "qnVVTBAfNu4"
  },
  "function_machines": {
    "concept": "Sequential Machine Operations",
    "steps": [
      "Apply operations in their exact left-to-right order.",
      "Multiply the input first, then add the constant.",
      "Do not reverse the order of operations for forward machine problems."
    ],
    "check": "Trace backwards using inverse operations to recover the input.",
    "webTitle": "Corbettmaths Primary \u2014 Function Machines",
    "webUrl": "https://corbettmathsprimary.com/content/",
    "videoTitle": "Math Antics \u2014 What Is Algebra?",
    "videoUrl": "https://www.youtube.com/watch?v=NybHckSEQBI",
    "videoId": "NybHckSEQBI"
  },
  "missing_mean": {
    "concept": "Target Sum Reconstruction from Mean Averages",
    "steps": [
      "Calculate required total sum: Mean \u00d7 Count.",
      "Sum all known values provided in the table.",
      "Subtract the known sum from the target total to find the missing value."
    ],
    "check": "Add the missing value to the known scores and divide by Count; it must equal the Mean.",
    "webTitle": "Corbettmaths Primary \u2014 The Mean Average",
    "webUrl": "https://corbettmathsprimary.com/content/",
    "videoTitle": "Math Antics \u2014 Mean, Median and Mode",
    "videoUrl": "https://www.youtube.com/watch?v=B1HEzNTGeZ4",
    "videoId": "B1HEzNTGeZ4"
  },
  "data_comparison": {
    "concept": "Comparative Bar Chart Metric Reading",
    "steps": [
      "Calibrate the vertical axis: determine the value of each grid line interval.",
      "Read the exact bar heights for both requested categories.",
      "Subtract the smaller count from the larger count."
    ],
    "check": "Confirm the question asks for a difference, not a combined total.",
    "webTitle": "Corbettmaths Primary \u2014 Bar Charts",
    "webUrl": "https://corbettmathsprimary.com/content/",
    "videoTitle": "Corbettmaths — Reading Bar Charts",
    "videoUrl": "https://www.youtube.com/watch?v=3e1SIAPan8E",
    "videoId": "3e1SIAPan8E"
  },
  "line_graphs": {
    "concept": "Continuous Coordinate Trends & Rate-of-Change Drop",
    "steps": [
      "Locate the two target timestamps on the horizontal axis.",
      "Trace vertically to read the temperature on the vertical axis scale.",
      "Subtract the later value from the earlier value to determine the fall."
    ],
    "check": "A fall in temperature is a positive magnitude of decrease.",
    "webTitle": "Corbettmaths Primary \u2014 Line Graphs",
    "webUrl": "https://corbettmathsprimary.com/content/",
    "videoTitle": "Corbettmaths — Line Graphs",
    "videoUrl": "https://www.youtube.com/watch?v=E1fYceXHIr4",
    "videoId": "E1fYceXHIr4"
  },
  "pie_charts": {
    "concept": "Proportional Sector Population Allocation",
    "steps": [
      "Read the sector percentage associated with the requested category.",
      "Convert the percentage to a fraction or decimal multiplier.",
      "Multiply the sector fraction by the total student population."
    ],
    "check": "Calculate the remaining sector; both groups must add to the total population.",
    "webTitle": "Corbettmaths Primary \u2014 Pie Charts",
    "webUrl": "https://corbettmathsprimary.com/content/",
    "videoTitle": "Corbettmaths Primary — Reading Pie Charts",
    "videoUrl": "https://www.youtube.com/watch?v=Ruc9n6ho3l4",
    "videoId": "Ruc9n6ho3l4"
  },
  "range": {
    "concept": "Statistical Spread (Maximum \u2212 Minimum)",
    "steps": [
      "Identify the largest number in the data set.",
      "Identify the smallest number in the data set.",
      "Subtract: Range = Largest \u2212 Smallest."
    ],
    "check": "Range is a difference, not an average.",
    "webTitle": "Corbettmaths Primary \u2014 The Range",
    "webUrl": "https://corbettmathsprimary.com/content/",
    "videoTitle": "Math Antics \u2014 Mean, Median and Mode",
    "videoUrl": "https://www.youtube.com/watch?v=B1HEzNTGeZ4",
    "videoId": "B1HEzNTGeZ4"
  },
  "translation": {
    "concept": "Vector Translation on the Cartesian Coordinate Plane",
    "steps": [
      "Read the starting point (x, y).",
      "Adjust x for horizontal movement: right = +dx, left = \u2212dx.",
      "Adjust y for vertical movement: up = +dy, down = \u2212dy.",
      "Write the new coordinate as (x_new, y_new)."
    ],
    "check": "Re-plot the point visually to verify direction on the grid.",
    "webTitle": "Corbettmaths Primary \u2014 Translations",
    "webUrl": "https://corbettmathsprimary.com/content/",
    "videoTitle": "Corbettmaths Primary — Translations",
    "videoUrl": "https://www.youtube.com/watch?v=8Dtz5fBe7_Q",
    "videoId": "8Dtz5fBe7_Q"
  },
  "reflection": {
    "concept": "Orthogonal Axis Reflection & Sign Inversion",
    "steps": [
      "Identify the mirror line (the y-axis is the vertical line x = 0).",
      "Vertical distance stays identical: y_new = y.",
      "Horizontal distance flips to the opposite side: x_new = \u2212x.",
      "Write the reflected coordinate as (\u2212x, y)."
    ],
    "check": "The original and reflected points must be equal distances from the mirror axis.",
    "webTitle": "Corbettmaths Primary \u2014 Reflections",
    "webUrl": "https://corbettmathsprimary.com/content/",
    "videoTitle": "Corbettmaths Primary — Reflections",
    "videoUrl": "https://www.youtube.com/watch?v=LJtKs8SClSI",
    "videoId": "LJtKs8SClSI"
  },
  "rectangle_coordinates": {
    "concept": "Axis-Aligned Rectangle Geometry & Vertex Matching",
    "steps": [
      "Note that rectangle edges follow grid lines.",
      "Corner A and Corner B share a horizontal line (same y-coordinate).",
      "Corner B and Corner C share a vertical line (same x-coordinate).",
      "Corner D must share the x-coordinate of A and the y-coordinate of C: (x_A, y_C)."
    ],
    "check": "Check that side lengths |AB| = |DC| and |BC| = |AD|.",
    "webTitle": "Corbettmaths Primary \u2014 Coordinates & 2D Shapes",
    "webUrl": "https://corbettmathsprimary.com/content/",
    "videoTitle": "Corbettmaths Primary — Coordinates",
    "videoUrl": "https://www.youtube.com/watch?v=6eX4PZJjofI",
    "videoId": "6eX4PZJjofI"
  },
  "coordinate_distance": {
    "concept": "Horizontal / Vertical Distance on Grid",
    "steps": [
      "When y-coordinates are equal, the points lie on the same horizontal line.",
      "Distance = (larger x) \u2212 (smaller x).",
      "Count across zero carefully when one coordinate is negative."
    ],
    "check": "Distance is always positive.",
    "webTitle": "Corbettmaths Primary \u2014 Coordinates",
    "webUrl": "https://corbettmathsprimary.com/content/",
    "videoTitle": "Corbettmaths Primary — Coordinates",
    "videoUrl": "https://www.youtube.com/watch?v=6eX4PZJjofI",
    "videoId": "6eX4PZJjofI"
  },
  "coordinate_position": {
    "concept": "Vertical Displacement on Grid",
    "steps": [
      "Moving down decreases the y-coordinate: y_new = y \u2212 move.",
      "The horizontal x-coordinate remains unchanged.",
      "Count below zero into negative territory if the move crosses the axis."
    ],
    "check": "Add the move back to y_new to recover the starting y-coordinate.",
    "webTitle": "Corbettmaths Primary \u2014 Coordinates",
    "webUrl": "https://corbettmathsprimary.com/content/",
    "videoTitle": "Corbettmaths Primary — Coordinates",
    "videoUrl": "https://www.youtube.com/watch?v=6eX4PZJjofI",
    "videoId": "6eX4PZJjofI"
  },
  "factors": {
    "concept": "Factor Finding and Proper Factors",
    "steps": [
      "A factor divides a number with zero remainder.",
      "The largest proper factor of an even number is half that number (N \u00f7 2).",
      "List factor pairs systematically starting from 1."
    ],
    "check": "Multiply the factor by its pair to verify it equals the original number.",
    "webTitle": "Corbettmaths Primary \u2014 Factors",
    "webUrl": "https://corbettmathsprimary.com/content/",
    "videoTitle": "Corbettmaths — Factors",
    "videoUrl": "https://www.youtube.com/watch?v=YkbMTSqE1vM",
    "videoId": "YkbMTSqE1vM"
  },
  "estimation": {
    "concept": "Rounding to Friendly Tens for Fast Estimation",
    "steps": [
      "Round the number to the nearest ten (units digit 5-9 rounds up; 0-4 rounds down).",
      "Multiply the rounded number by the multiplier.",
      "State the estimated answer."
    ],
    "check": "Confirm the rounded calculation matches the requested rounding place.",
    "webTitle": "Corbettmaths Primary \u2014 Estimation",
    "webUrl": "https://corbettmathsprimary.com/content/",
    "videoTitle": "Math Antics \u2014 Rounding and Estimation",
    "videoUrl": "https://www.youtube.com/watch?v=fd-E18EqSVk",
    "videoId": "fd-E18EqSVk"
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
// New subtopics that use the same method as an existing tutorial. Only variant-free tutorials are aliased.
const TUTORIAL_ALIASES = {
  long_multiplication: 'multiplication_strategies',
  brackets_order_operations: 'order_operations',
  decimal_brackets_2dp: 'order_operations',
  decimal_money_problems: 'money_multiplication',
  fraction_multiply_simplify: 'fraction_multiplication',
  ratio_share_pence: 'ratio_sharing',
  ratio_given_difference: 'ratio_difference',
  proportion_best_buy: 'unitary_method',
  triangle_angle_reasoning: 'triangle_angles',
  angle_facts_combined: 'angles_on_line',
  area_perimeter_compound: 'compound_area',
  area_reasoning: 'compound_area',
  percent_of_amount_harder: 'percent_of_amount',
  percent_change_problems: 'percent_increase',
};
export function getTutorial(qOrSubtopic) {
  if (!qOrSubtopic) return null;
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
      result.concept = 'Reflection in the x-axis (Horizontal Mirror Line)';
      result.steps = [
        'Identify the mirror line: the x-axis is the horizontal line y = 0.',
        'Horizontal position is unchanged: the x-coordinate stays exactly the same.',
        'Vertical position reflects across the axis: the y-coordinate changes sign (y → −y).',
        'Write the reflected coordinate: (x, −y).'
      ];
      result.check = 'A point above the x-axis reflects to the same distance below the x-axis.';
    } else {
      result.concept = 'Reflection in the y-axis (Vertical Mirror Line)';
      result.steps = [
        'Identify the mirror line: the y-axis is the vertical line x = 0.',
        'Vertical position is unchanged: the y-coordinate stays exactly the same.',
        'Horizontal position reflects across the axis: the x-coordinate changes sign (x → −x).',
        'Write the reflected coordinate: (−x, y).'
      ];
      result.check = 'The original and reflected points must be equal distances from the y-axis.';
    }
  }

  // 2. Consecutive numbers variants: 3 consecutive numbers (walk) vs 5 consecutive odd numbers (desk)
  if (sub === 'consecutive_numbers') {
    if (text.includes('Three') || text.includes('three') || mode === 'walk') {
      result.concept = 'Three Consecutive Whole Numbers';
      result.steps = [
        'Find the middle number by dividing the sum by 3: Middle = Sum ÷ 3.',
        'Consecutive whole numbers have a step size of 1: (Middle − 1), Middle, (Middle + 1).',
        'To find the largest number, add 1 to the middle: Largest = Middle + 1.'
      ];
      result.check = 'Add the three numbers (Middle − 1) + Middle + (Middle + 1) to verify they equal the given sum.';
    } else {
      result.concept = 'Five Consecutive Odd Numbers';
      result.steps = [
        'Find the middle (3rd) number by dividing the sum by 5: Middle = Sum ÷ 5.',
        'Consecutive odd numbers have a step size of 2: (Middle − 4), (Middle − 2), Middle, (Middle + 2), (Middle + 4).',
        'To find the smallest number, subtract two steps of 2: Smallest = Middle − 4.'
      ];
      result.check = 'Sum all 5 odd numbers; the total must match the prompt value.';
    }
  }

  // 3. Fraction of amount variants: remainder multi-step (desk) vs direct fraction of amount (walk)
  if (sub === 'fraction_of_amount') {
    if (text.includes('not blue') || text.includes('remainder') || mode === 'desk') {
      result.concept = 'Remainder Fractioning & Sequential Partitioning';
      result.steps = [
        'Calculate the primary group: divide total by denominator and multiply by numerator.',
        'CRITICAL STEP: Calculate the non-matching remainder (Total − Primary Group).',
        'Apply the second fraction strictly to the remainder, not the original total.'
      ];
      result.check = 'Sum all parts to verify they equal the starting whole.';
    } else {
      result.concept = 'Fraction of an Amount (Unitary Method)';
      result.steps = [
        'Divide the whole amount by the denominator to find the value of 1 equal part.',
        'Multiply the value of 1 part by the numerator to find the requested share.',
        'For a proper fraction, the answer must be smaller than the starting total.'
      ];
      result.check = 'Check by dividing your answer by the numerator, then multiplying by the denominator.';
    }
  }

  // 4. Number sequences variants: next term (walk) vs nth term rule (desk)
  if (sub === 'number_sequences') {
    if (text.includes('comes next') || mode === 'walk') {
      result.concept = 'Term-to-Term Sequence Rule';
      result.steps = [
        'Find the difference between consecutive terms: Difference = Term 2 − Term 1.',
        'Verify the same difference applies across all given terms.',
        'Add the difference to the last given term to find the next term.'
      ];
      result.check = 'Subtract the common difference from your answer to recover the previous term.';
    } else {
      result.concept = 'Linear Arithmetic Sequences (nth Term Rule)';
      result.steps = [
        'Find the common difference d between consecutive terms.',
        'Count the jumps: from term 1 to term n, there are exactly (n − 1) jumps.',
        'Calculate: Target Term = Term 1 + (n − 1) × d.'
      ];
      result.check = 'Verify with the linear nth term formula against the first three terms.';
    }
  }

  // 5. Perimeter variants: boundary with gate deduction (desk) vs L-shaped corner cutout (walk)
  if (sub === 'perimeter') {
    if (text.includes('gate')) {
      result.concept = 'Boundary Distance with Gate Deductions';
      result.steps = [
        'Calculate the complete rectangular perimeter: 2 × (Length + Width).',
        'Deduct the width of the gate that replaces fencing: Fence = Perimeter − Gate.',
        'State the answer in metres.'
      ];
      result.check = 'Add the gate width back to your answer; the sum must equal the complete perimeter.';
    } else if (text.includes('L-shape') || text.includes('corner') || text.includes('cut out')) {
      result.concept = 'Perimeter of an L-Shaped Cutout';
      result.steps = [
        'When a rectangular corner is cut out, the two new inside edges equal the two outside edges removed.',
        'Therefore, cutting out a rectangular corner leaves the total perimeter unchanged.',
        'Calculate the perimeter of the original full rectangle: 2 × (Length + Width).'
      ];
      result.check = 'Trace all 6 edges around the shape to verify their sum equals 2 × (Length + Width).';
    }
  }

  // 6. Speed, distance, time variants: closing speed (desk) vs minute conversions vs steady distance (walk)
  if (sub === 'speed_distance_time') {
    if (text.includes('towards each other') || text.includes('apart')) {
      result.concept = 'Rate-Distance-Time Triangle & Closing Speeds';
      result.steps = [
        'For two objects moving towards each other: Closing Speed = Speed 1 + Speed 2.',
        'Calculate travel time in hours: Time = Distance ÷ Closing Speed.',
        'Convert hours to minutes by multiplying by 60.'
      ];
      result.check = 'Multiply closing speed by time in hours to confirm the starting gap is covered.';
    } else if (text.includes('minutes') && mode === 'desk') {
      result.concept = 'Speed, Distance, Time & Minute Conversions';
      result.steps = [
        'Use the relationship: Time in hours = Distance ÷ Speed.',
        'Convert hours into minutes by multiplying by 60: Minutes = Hours × 60.',
        'Check that speed multiplied by time in hours gives the original distance.'
      ];
      result.check = 'Divide distance by speed to verify the hours, then convert to minutes.';
    } else {
      result.concept = 'Distance at Constant Speed';
      result.steps = [
        'Use the formula: Distance = Speed × Time.',
        'Multiply the speed (km/h) by the elapsed hours.',
        'No unit conversion is needed when speed and time use compatible units.'
      ];
      result.check = 'Divide distance by time to verify it equals the speed.';
    }
  }

  // 7. Fraction equivalence variants: odd one out (desk) vs missing numerator
  if (sub === 'fraction_equivalence') {
    if (text.includes('odd one out')) {
      result.concept = 'Simplifying Fractions to Identify the Odd One Out';
      result.steps = [
        'Simplify each fraction to lowest terms by dividing numerator and denominator by their HCF.',
        'Compare all simplified forms; four will simplify to the same fraction (2/5).',
        'The fraction that simplifies to a different value is the odd one out.'
      ];
      result.check = 'Check each fraction: 6/15 = 2/5, 8/20 = 2/5, 14/35 = 2/5, but 10/24 = 5/12.';
    } else {
      result.concept = 'Equivalent Fractions & Scale Factors';
      result.steps = [
        'Find the scale factor between denominators: Factor = New Denominator ÷ Original Denominator.',
        'Multiply the numerator by the exact same scale factor.',
        'Confirm both fractions represent the exact same proportion.'
      ];
      result.check = 'Cross-multiply numerator and denominator (a × d = b × c) to confirm equality.';
    }
  }

  // 8. Translation variants: 2D vector move (desk) vs single-axis move (walk)
  if (sub === 'translation') {
    if (text.includes('down') || text.includes('up')) {
      result.concept = 'Two-Dimensional Vector Translation (x ± dx, y ± dy)';
      result.steps = [
        'Read the starting coordinates (x, y).',
        'Adjust x for horizontal movement: right = +dx, left = −dx.',
        'Adjust y for vertical movement: up = +dy, down = −dy.',
        'Write the new coordinate as (x_new, y_new).'
      ];
      result.check = 'Re-plot the point visually to verify direction on the grid.';
    } else {
      result.concept = 'Single-Axis Coordinate Shift';
      result.steps = [
        'A horizontal move changes only the x-coordinate; y remains unchanged.',
        'Moving right adds to x; moving left subtracts from x.',
        'Write the new coordinate.'
      ];
      result.check = 'Check that the non-moving coordinate is untouched.';
    }
  }

  // 9. Missing mean variants: 5-score table (desk) vs 3-score mental (walk)
  if (sub === 'missing_mean') {
    if (text.includes('five') || text.includes('Five') || mode === 'desk') {
      result.concept = 'Reconstructing Missing Value from Mean of 5 Scores';
      result.steps = [
        'Calculate total sum needed for all 5 scores: Target Total = Mean × 5.',
        'Sum the 4 known scores in the table.',
        'Subtract the known sum from the target total: Missing Score = Target Total − Known Sum.'
      ];
      result.check = 'Add all 5 scores together and divide by 5; the result must equal the given mean.';
    } else {
      result.concept = 'Finding a Missing Value from the Mean of 3 Scores';
      result.steps = [
        'Calculate total sum of all 3 scores: Target Total = Mean × 3.',
        'Add the 2 known scores together.',
        'Subtract the sum of the 2 known scores from the target total.'
      ];
      result.check = 'Sum all 3 scores and divide by 3 to verify the mean.';
    }
  }

  // 10. Data comparison variants: bar chart readings (desk) vs survey counts (walk)
  if (sub === 'data_comparison') {
    if (text.includes('bar chart') || mode === 'desk') {
      result.concept = 'Reading and Comparing Bar Chart Heights';
      result.steps = [
        'Calibrate the vertical axis: check what each grid line represents.',
        'Read the bar heights for both requested categories.',
        'Subtract the smaller value from the larger value to find the difference.'
      ];
      result.check = 'Confirm the prompt asks "how many more", which requires subtraction, not addition.';
    } else {
      result.concept = 'Comparing Two Survey Counts';
      result.steps = [
        'Identify the counts for both groups.',
        'Subtract the smaller group from the larger group: Difference = Group 1 − Group 2.',
        '"How many more" always asks for the difference between counts.'
      ];
      result.check = 'Add the difference to the smaller count; it must equal the larger count.';
    }
  }

  // 11. Unit conversion variants: multi-batch mass (desk) vs direct metric conversions (walk)
  if (sub === 'unit_conversion') {
    if (text.includes('batch') || text.includes('batches')) {
      result.concept = 'Multi-Batch Mass Scaling & Gram-to-Kilogram Conversion';
      result.steps = [
        'Calculate the total mass in grams first: Total Grams = Batches × Grams per Batch.',
        'Convert grams to kilograms by dividing by 1,000 (shift decimal point 3 places left).',
        'Ensure the answer is expressed in kilograms with required decimal places.'
      ];
      result.check = '1 kg = 1,000 g. A kilogram number must always be 1,000 times smaller than the gram number.';
    } else {
      result.concept = 'Metric Unit Scaling (Grams, Metres, Litres)';
      result.steps = [
        'Identify the metric conversion factor (1 kg = 1,000 g; 1 L = 1,000 ml; 1 m = 100 cm).',
        'Converting to smaller units makes the count larger: multiply by the conversion factor.',
        'Converting to larger units makes the count smaller: divide by the conversion factor.'
      ];
      result.check = 'Ask: should there be more or fewer of the new unit?';
    }
  }

  // 12. Time duration variants: 24-hr arrival calculation (desk) vs elapsed minutes (walk)
  if (sub === 'time_duration') {
    if (text.includes('arrive') || text.includes('24-hour')) {
      result.concept = '24-Hour Clock Arrival Time Calculation';
      result.steps = [
        'Add full journey hours to departure time first.',
        'Add remaining minutes, bridging through the 60-minute hour boundary as needed.',
        'Format in standard 24-hour time notation (HH:MM).'
      ];
      result.check = 'Count backwards from the arrival time by the duration to verify the departure time.';
    } else {
      result.concept = 'Calculating Elapsed Minutes Across an Hour Boundary';
      result.steps = [
        'Bridge to the next full hour: count minutes from start time to the next hour (60 − starting minutes).',
        'Add the minutes after the full hour.',
        'Remember: an hour has 60 minutes, not 100.'
      ];
      result.check = 'Add elapsed minutes to the start time to confirm the end time.';
    }
  }

  return result;
}

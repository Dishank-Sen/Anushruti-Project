export type SubjectName = 'Maths' | 'Science';
export const SUBJECT_ORDER: SubjectName[] = ['Maths', 'Science'];
export const SUBJECT_META: Record<
  SubjectName,
  { icon: string; blurb: string }
> = {
  Maths: { icon: '🔢', blurb: 'Numbers, shapes and counting.' },
  Science: { icon: '🔬', blurb: 'Plants, animals and our world.' },
};
export const CHAPTER_ORDER = [
  'Mango Treat',
  'Plants and Animals',
  'Shapes and Patterns',
  'Addition',
  'Water and Weather',
];
export function subjectChapterOrder(subject: SubjectName): string[] {
  const present = new Set(
    lessons
      .filter((l) => l.grade === 1 && l.subject === subject)
      .map((l) => l.chapter)
      .filter((c): c is string => Boolean(c)),
  );
  return CHAPTER_ORDER.filter((c) => present.has(c));
}
export type Lesson = {
  id: string;
  grade: number;
  subject: SubjectName;
  /** Short chapter label, added to the card and open lesson heading. */
  chapter?: string;
  title: string;
  description: string;
  minutes: number;
  science?: {
    topic: 'Biology' | 'Space' | 'Our world' | 'Our body';
    activity:
      | 'grow'
      | 'cycle'
      | 'space'
      | 'day'
      | 'food'
      | 'living'
      | 'body'
      | 'weather'
      | 'guided'
      | 'match';
    image: keyof typeof scienceImages;
  };
  matching?: {
    prompt: string;
    bins: { id: string; label: string; symbol: string }[];
    cards: {
      id: string;
      label: string;
      symbol: string;
      bin: string;
      explanation: string;
    }[];
  };
  curriculum?: { label: string; page: number };
  guided?: {
    symbol: string;
    prompt: string;
    options: string[];
    answer: number;
    explanation: string;
  }[];
  steps: { visual: string; title: string; text: string }[];
  question: { prompt: string; options: string[]; answer: number; hint: string };
};
export const lessons: Lesson[] = [
  // ----- Class 1 · Maths · Chapter 3 "Mango Treat" (site title "Mango Tree") -----
  {
    id: 'mango-treat-story',
    grade: 1,
    subject: 'Maths',
    chapter: 'Mango Treat',
    title: 'The mango treat',
    description: 'Count the birds as they join around the mango.',
    minutes: 5,
    steps: [
      {
        visual: '🐿️ 🥭',
        title: 'One squirrel',
        text: 'A squirrel is eating a mango. The birds are watching.',
      },
      {
        visual: '🐦 + 🐦 = 2',
        title: 'One bird joins',
        text: 'One bird joins the squirrel. Now 2 of them share the mango.',
      },
      {
        visual: '🐦 🐦 🐦 = 3',
        title: 'One more bird',
        text: 'One more bird comes. Now 3 of them are eating the mango.',
      },
      {
        visual: '+ 🐦 = 5',
        title: 'Up to five',
        text: 'Two more birds join. Now 5 of them are eating the mango.',
      },
      {
        visual: '🐦 🐦 🐦 🐦 🐦 🐦 🐦 🐦 🐦 = 9',
        title: 'Nine friends',
        text: 'More birds join one by one. At the end, 9 birds and animals ate the mango.',
      },
    ],
    question: {
      prompt: 'At the end, how many birds and animals ate the mango?',
      options: ['5', '9', '3'],
      answer: 1,
      hint: 'As animals joined one by one, the count went up to 9.',
    },
  },
  {
    id: 'mango-one-more',
    grade: 1,
    subject: 'Maths',
    chapter: 'Mango Treat',
    title: 'One more',
    description: 'See what happens when one more joins.',
    minutes: 5,
    steps: [
      {
        visual: '🐦  = 1',
        title: 'One bird',
        text: 'One bird is eating the mango.',
      },
      {
        visual: '+ 🐦 = 2',
        title: 'Add one more',
        text: 'One more bird joins. One, then one more, makes 2.',
      },
      {
        visual: '🐦 🐦 + 🐦 = 3',
        title: 'Two, then one more',
        text: '2 birds, and one more joins. Now there are 3.',
      },
      {
        visual: '🐦 🐦 🐦 🐦 + 🐦 = 5',
        title: 'One more than four',
        text: '4 birds, and one more joins. One more than 4 is 5.',
      },
      {
        visual: '1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9',
        title: 'One more means the next number',
        text: 'One more than a number is the next number in the count.',
      },
    ],
    question: {
      prompt: 'One more than 5 is…',
      options: ['4', '6', '8'],
      answer: 1,
      hint: 'Say the numbers in order: 1, 2, 3, 4, 5, 6. After 5 comes 6.',
    },
  },
  {
    id: 'birds-and-fingers',
    grade: 1,
    subject: 'Maths',
    chapter: 'Mango Treat',
    title: 'Birds and fingers',
    description: 'Match a group of birds to the same number of fingers.',
    minutes: 5,
    steps: [
      {
        visual: '🐦 ✋',
        title: 'One bird, one finger',
        text: 'One bird is matched to one finger. They show the same number.',
      },
      {
        visual: '🐦 🐦 🐦 = ✋ ✋ ✋',
        title: 'Three birds, three fingers',
        text: 'Three birds are matched to three fingers.',
      },
      {
        visual: '🐦 🐦 🐦 🐦 🐦 = ✋ ✋ ✋ ✋ ✋',
        title: 'Five birds, five fingers',
        text: 'Five birds are matched to five fingers. The groups are equal.',
      },
      {
        visual: '🐦 🐦 🐦 🐦 🐦 🐦 6 🐦 🐦 🐦',
        title: 'Count the birds',
        text: 'Count the birds one by one. Match birds and fingers that are equal.',
      },
      {
        visual: '✋',
        title: 'Your turn to match',
        text: 'You can count birds, then show that many fingers.',
      },
    ],
    question: {
      prompt: 'Which number matches five birds?',
      options: ['🖐️ five fingers', '🖐️🖐️ two hands', '🖐️🖐️🖐️ three hands'],
      answer: 0,
      hint: 'One finger stands for one bird. Five birds need five fingers.',
    },
  },
  {
    id: 'fingers-and-dots',
    grade: 1,
    subject: 'Maths',
    chapter: 'Mango Treat',
    title: 'Fingers and dots',
    description: 'Match fingers to the same number of dots.',
    minutes: 5,
    steps: [
      {
        visual: '✋ ·',
        title: 'One finger, one dot',
        text: 'One finger is matched with one dot. They are the same number.',
      },
      {
        visual: '✋ ✋ ⌖ ⌖',
        title: 'Two fingers, two dots',
        text: 'Two fingers match two dots.',
      },
      {
        visual: '✋ ✋ ✋ · · ·',
        title: 'Three fingers, three dots',
        text: 'Three fingers match three dots.',
      },
      {
        visual: '4 ✋ ✋ ✋ ✋',
        title: 'Show four',
        text: 'Show 4 fingers. Then find the group with 4 dots.',
      },
      {
        visual: '✋ ✋ ✋ ✋ · · · ·',
        title: 'Count and match',
        text: 'Count the dots and match them to the same number of fingers.',
      },
    ],
    question: {
      prompt: 'All fingers up on one hand. How many fingers do you see?',
      options: ['5', '4', '6'],
      answer: 0,
      hint: 'One hand has five fingers.',
    },
  },
  {
    id: 'same-number-ways',
    grade: 1,
    subject: 'Maths',
    chapter: 'Mango Treat',
    title: 'Same number, different ways',
    description: 'Show one number in more than one way.',
    minutes: 6,
    steps: [
      {
        visual: '2 = 🐦 🐦 = · ·',
        title: 'Two as objects and dots',
        text: 'Two birds and two dots are both the number 2.',
      },
      {
        visual: '4 = ✋ ✋ ✋ ✋ = · · · ·',
        title: 'Four as fingers and dots',
        text: 'Four fingers and four dots are both the number 4.',
      },
      {
        visual: '7 = 🐦 × 7 = · × 7',
        title: 'Seven as any equal group',
        text: 'Seven birds, seven dots, or seven things are all the number 7.',
      },
      {
        visual: '✌️ + ✌️',
        title: 'Four using one hand',
        text: 'Show 2 fingers and 2 more fingers. Together they make 4.',
      },
      {
        visual: '6 as finger combos',
        title: 'Six in a new way',
        text: 'You can show 6 using fingers on one or two hands.',
      },
    ],
    question: {
      prompt: 'Which shows the number 4?',
      options: [
        '· · ·',
        '· · · ·',
        '✋ ✋ ✋',
      ],
      answer: 1,
      hint: 'Count the dots one by one. The group with 4 dots shows the number 4.',
    },
  },
  {
    id: 'count-and-group',
    grade: 1,
    subject: 'Maths',
    chapter: 'Mango Treat',
    title: 'More or less',
    description: 'Compare two groups and say which has more.',
    minutes: 5,
    steps: [
      {
        visual: '🍎 3 vs 🍌 5',
        title: 'More means a bigger group',
        text: 'Three apples and five bananas. The group with more is the bananas.',
      },
      {
        visual: '🍎 🍎 🍎',
        title: 'Count one by one',
        text: 'Count each apple: 1, 2, 3. This group has 3.',
      },
      {
        visual: '🍌 🍌 🍌 🍌 🍌',
        title: 'Count the bananas',
        text: 'Count each banana: 1, 2, 3, 4, 5. This group has 5.',
      },
      {
        visual: '5 > 3',
        title: 'The bigger number wins',
        text: 'Five bananas is more than three apples.',
      },
      {
        visual: '🍎 🍎 🍎 🍎 🍎 = 🍌 🍌 🍌 🍌 🍌',
        title: 'Equal groups',
        text: 'Five apples and five bananas are the same — equal.',
      },
    ],
    question: {
      prompt: 'Which group has more?',
      options: ['3 toys', '5 toys', 'both are the same'],
      answer: 1,
      hint: 'Five is a bigger number than three.',
    },
  },
  {
    id: 'numbers-one-to-nine',
    grade: 1,
    subject: 'Maths',
    chapter: 'Mango Treat',
    title: 'Recognise 1 to 9',
    description: 'Find groups of 1 to 9 and meet their numerals.',
    minutes: 6,
    steps: [
      {
        visual: '1 ☀️',
        title: 'One sun',
        text: 'There is 1 sun in the sky. The numeral 1 means one thing.',
      },
      {
        visual: '2 🐤 🐤',
        title: 'Two chicks',
        text: 'There are 2 chicks. The numeral 2 means two things.',
      },
      {
        visual: '3 🍃 🍃 🍃',
        title: 'Three leaves',
        text: 'There are 3 leaves. The numeral 3 means three things.',
      },
      {
        visual: '7 ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐',
        title: 'Seven stars',
        text: 'There are 7 stars. The numeral 7 means seven things.',
      },
      {
        visual: '9 🐦',
        title: 'Count to nine',
        text: 'From 1 to 9, each numeral stands for that many things.',
      },
    ],
    question: {
      prompt: 'Which numeral means seven things?',
      options: ['5', '7', '9'],
      answer: 1,
      hint: 'Count the stars: 1, 2, 3, 4, 5, 6, 7.',
    },
  },
  {
    id: 'count-and-match',
    grade: 1,
    subject: 'Maths',
    chapter: 'Mango Treat',
    title: 'Count and match',
    description: 'Count a group and match it to the right numeral.',
    minutes: 6,
    steps: [
      {
        visual: '🌸 🌸 🐘  2',
        title: 'Match flowers to two',
        text: 'Two flowers match the numeral 2.',
      },
      {
        visual: '🐘 × 5 = 5',
        title: 'Five elephants',
        text: 'Count the elephants one by one: 1, 2, 3, 4, 5.',
      },
      {
        visual: '🏠 × 7 = 7',
        title: 'Seven houses',
        text: 'Seven houses match the numeral 7.',
      },
      {
        visual: '🔴 🔴 🔴 🔴 🔴',
        title: 'Count the balls',
        text: 'Count the red balls: 1, 2, 3, 4, 5. Write 5.',
      },
      {
        visual: 'colour 5 flowers',
        title: 'Colour exactly five',
        text: 'Choose 5 flowers to colour. That is the number 5.',
      },
    ],
    question: {
      prompt: 'A group of 6 balls matches which numeral?',
      options: ['4', '6', '8'],
      answer: 1,
      hint: 'Count the balls: 1, 2, 3, 4, 5, 6. That is 6.',
    },
  },
  {
    id: 'number-order-1-9',
    grade: 1,
    subject: 'Maths',
    chapter: 'Mango Treat',
    title: 'Numbers in order',
    description: 'Put numbers 1 to 9 from the smallest to the biggest.',
    minutes: 6,
    steps: [
      {
        visual: '2 … 3 … 4',
        title: 'Count in order',
        text: 'After 2 comes 3, then 4. Counting walks forward one by one.',
      },
      {
        visual: '1 2 3 4 5',
        title: 'Smallest first',
        text: 'From the smallest: 1, 2, 3, 4, 5.',
      },
      {
        visual: '… 6 7 8 9',
        title: 'Up to nine',
        text: 'After 5 comes 6, 7, 8, 9. Nine is the biggest here.',
      },
      {
        visual: '3 1 2 → 1 2 3',
        title: 'The cat shuffled the numbers',
        text: 'A naughty cat shuffled the cards. Put them back from smallest to biggest.',
      },
      {
        visual: '1 2 3 4 5 6 7 8 9',
        title: 'All in a line',
        text: 'From the smallest to the biggest is 1, 2, 3, 4, 5, 6, 7, 8, 9.',
      },
    ],
    question: {
      prompt: 'Which number comes next after 4?',
      options: ['3', '5', '6'],
      answer: 1,
      hint: 'Count forward: 1, 2, 3, 4, then 5.',
    },
  },
  {
    id: 'missing-numbers',
    grade: 1,
    subject: 'Maths',
    chapter: 'Mango Treat',
    title: 'Fill the missing numbers',
    description: 'Complete the number counting line.',
    minutes: 6,
    steps: [
      {
        visual: '4 … 5 … 6',
        title: 'Find the pattern',
        text: 'The count goes up by one: 4, then 5, then 6.',
      },
      {
        visual: '?, 5, 6, ?, 8',
        title: 'Find the missing numbers',
        text: 'A cat walked over the numbers. Fill in the missing ones.',
      },
      {
        visual: '4, 5, 6, 7, 8',
        title: 'The filled line',
        text: 'Now the counting line is complete: 4, 5, 6, 7, 8.',
      },
      {
        visual: '?, 2, ?, 4, 5',
        title: 'Try this one',
        text: 'What comes before 2, and what is between 2 and 4?',
      },
      {
        visual: '1, 2, 3, 4, 5',
        title: 'Complete counting lines',
        text: 'Fill each gap so the count goes up by one each time.',
      },
    ],
    question: {
      prompt: 'What is the missing number? 2, 3, ?',
      options: ['4', '2', '5'],
      answer: 0,
      hint: 'Count forward: 1, 2, 3, 4.',
    },
  },
  {
    id: 'biggest-number',
    grade: 1,
    subject: 'Maths',
    chapter: 'Mango Treat',
    title: 'Colour the biggest number',
    description: 'Find the biggest number in a small group.',
    minutes: 4,
    steps: [
      {
        visual: '3, 6, 9',
        title: 'Compare three numbers',
        text: 'Which is the biggest? Say them aloud: 3, 6, 9.',
      },
      {
        visual: '6 vs 3',
        title: 'Six is bigger than three',
        text: 'Six comes after three in the count, so 6 is bigger.',
      },
      {
        visual: '9 vs 6',
        title: 'Nine is bigger than six',
        text: 'Nine comes after six, so 9 is the biggest of all.',
      },
      {
        visual: 'colour the biggest',
        title: 'Your turn to colour',
        text: 'Find the biggest number and colour it.',
      },
      {
        visual: '1, 9, 5',
        title: 'Which is biggest here?',
        text: 'Compare 1, 9 and 5. Nine is the biggest.',
      },
    ],
    question: {
      prompt: 'Which is the biggest number? 2, 7, 5',
      options: ['2', '7', '5'],
      answer: 1,
      hint: 'Seven is further in the counting line than 2 or 5.',
    },
  },
  {
    id: 'count-real-things',
    grade: 1,
    subject: 'Maths',
    chapter: 'Mango Treat',
    title: 'Count real things',
    description: 'Count boxes, jamuns and sheep in a picture.',
    minutes: 5,
    steps: [
      {
        visual: '🟨 🟦 🟨',
        title: 'Count the yellow boxes',
        text: 'Only count the yellow boxes: 1, 2.',
      },
      {
        visual: '🟨 🟨 🟨',
        title: 'Three yellow boxes',
        text: 'This picture has 3 yellow boxes.',
      },
      {
        visual: '🫐 🫐 🫐 🫐',
        title: 'Count the jamuns',
        text: 'Jamuns are dark fruits. Count them: 1, 2, 3, 4.',
      },
      {
        visual: '🐑 × 5',
        title: 'Count the sheep',
        text: 'Count the sheep in the hills: 1, 2, 3, 4, 5.',
      },
      {
        visual: 'count-write',
        title: 'Count and write',
        text: 'Count the things in the picture, then write the number.',
      },
    ],
    question: {
      prompt: 'How many ducks are in the pond? 🦆 🦆 🦆',
      options: ['2', '3', '5'],
      answer: 1,
      hint: 'Count each duck once: 1, 2, 3.',
    },
  },
  {
    id: 'combine-groups',
    grade: 1,
    subject: 'Maths',
    chapter: 'Mango Treat',
    title: 'Two groups make one total',
    description: 'Join two groups and count the total.',
    minutes: 5,
    steps: [
      {
        visual: '🍎 + 🍌',
        title: 'Start with two groups',
        text: 'Here is a group of apples and a group of bananas.',
      },
      {
        visual: '3 + 5 = 8',
        title: 'Eight fruits together',
        text: 'Three apples and five bananas make 8 fruits.',
      },
      {
        visual: '3 + 5 = 8',
        title: 'Another way to make 8',
        text: 'There can be two groups that make 8.',
      },
      {
        visual: '☂️ 4 + 3 = 7',
        title: 'Seven umbrellas',
        text: 'Four umbrellas and three umbrellas make 7 umbrellas.',
      },
      {
        visual: 'count all',
        title: 'Count both groups',
        text: 'Join the groups and count every object to find the total.',
      },
    ],
    question: {
      prompt: 'A group of 3 and a group of 4 make how many?',
      options: ['6', '7', '8'],
      answer: 1,
      hint: 'Count on from 3: 4, 5, 6, 7.',
    },
  },
  {
    id: 'number-card',
    grade: 1,
    subject: 'Maths',
    chapter: 'Mango Treat',
    title: 'Make a number card',
    description: 'Put the same number of objects on a number card.',
    minutes: 5,
    steps: [
      {
        visual: '5 = 🐦 🐦 🐦 🐦 🐦',
        title: 'A number and its objects',
        text: 'A number card says 5, so it holds 5 things.',
      },
      {
        visual: '3 = 🍎 🍎 🍎',
        title: 'Card three',
        text: 'The card says 3, so it holds exactly 3 objects.',
      },
      {
        visual: '8 = · · · · · · · ·',
        title: 'Card eight',
        text: 'The card says 8, so it holds exactly 8 dots.',
      },
      {
        visual: '1 … 9',
        title: 'Cards one to nine',
        text: 'Make cards from 1 to 9. Each card has the same number of objects as its numeral.',
      },
      {
        visual: 'make-your-own',
        title: 'Your own cards',
        text: 'Stick or draw objects to show each number on its card.',
      },
    ],
    question: {
      prompt: 'Which card shows the number 2?',
      options: ['🐦', '🐦 🐦', '🐦 🐦 🐦'],
      answer: 1,
      hint: 'The card for 2 holds exactly two things.',
    },
  },
  // ----- Existing lessons -----
  {
    id: 'fruit-salad',
    grade: 1,
    subject: 'Science',
    title: 'Build a fruit salad',
    description: 'Pick an ingredient, then choose where it belongs.',
    minutes: 5,
    science: { topic: 'Our world', activity: 'match', image: 'salad' },
    curriculum: { label: 'Food ingredients', page: 51 },
    matching: {
      prompt: 'Pick an ingredient, then choose where it belongs.',
      bins: [
        { id: 'bowl', label: 'Fruit bowl', symbol: '🥣' },
        { id: 'away', label: 'Not an ingredient', symbol: '↩' },
      ],
      cards: [
        {
          id: 'banana',
          label: 'Banana',
          symbol: '🍌',
          bin: 'bowl',
          explanation: 'Banana is a fruit that can go in a fruit salad.',
        },
        {
          id: 'apple',
          label: 'Apple pieces',
          symbol: '🍎',
          bin: 'bowl',
          explanation:
            'Apple pieces can go in the bowl. An adult cuts fruit safely.',
        },
        {
          id: 'spoon',
          label: 'Spoon',
          symbol: '🥄',
          bin: 'away',
          explanation:
            'A spoon is a tool for serving or eating, not a food ingredient.',
        },
        {
          id: 'grapes',
          label: 'Grapes',
          symbol: '🍇',
          bin: 'bowl',
          explanation:
            'Grapes are fruit. An adult prepares fruit safely for each child.',
        },
        {
          id: 'soap',
          label: 'Soap',
          symbol: '🧼',
          bin: 'away',
          explanation: 'Soap is for washing, never for eating.',
        },
      ],
    },
    steps: [
      {
        visual: '🍎 + 🍌',
        title: 'What is an ingredient?',
        text: 'An ingredient is a food used to make a dish.',
      },
      {
        visual: '🥣',
        title: 'Build a fruit bowl',
        text: 'A fruit salad can have banana, apple and grapes.',
      },
      {
        visual: '🧑‍🍳',
        title: 'Prepare with an adult',
        text: 'Choose foods that suit you. An adult washes and prepares fruit safely.',
      },
    ],
    question: {
      prompt: 'Which is a food ingredient?',
      options: ['Spoon', 'Banana', 'Soap'],
      answer: 1,
      hint: 'A banana is food. A spoon is a tool. Soap is not food.',
    },
  },
  {
    id: 'water-source-detective',
    grade: 1,
    subject: 'Science',
    title: 'Be a water detective',
    description: 'Match each clue to the water source.',
    minutes: 5,
    science: { topic: 'Our world', activity: 'match', image: 'well' },
    curriculum: { label: 'Recognising water sources', page: 54 },
    matching: {
      prompt: 'Match each clue to the water source.',
      bins: [
        { id: 'well', label: 'Well', symbol: '🕳️' },
        { id: 'tap', label: 'Tap', symbol: '🚰' },
        { id: 'lake', label: 'Lake', symbol: '🏞️' },
      ],
      cards: [
        {
          id: 'below',
          label: 'Water below the ground',
          symbol: '↓',
          bin: 'well',
          explanation:
            'A well reaches water below the ground. Stay away from open wells without an adult.',
        },
        {
          id: 'pipe',
          label: 'Water arrives through a pipe',
          symbol: '➰',
          bin: 'tap',
          explanation: 'A tap controls water supplied through pipes.',
        },
        {
          id: 'land',
          label: 'Water surrounded by land',
          symbol: '🌄',
          bin: 'lake',
          explanation: 'A lake is a body of water surrounded by land.',
        },
      ],
    },
    steps: [
      {
        visual: '🕳️',
        title: 'Below the ground',
        text: 'Wells reach underground water. We only explore wells in pictures here.',
      },
      {
        visual: '🚰',
        title: 'Through a pipe',
        text: 'A tap controls the flow of water carried through a pipe.',
      },
      {
        visual: '🏞️',
        title: 'In the landscape',
        text: 'Lakes hold water surrounded by land. Rivers flow across the land.',
      },
    ],
    question: {
      prompt: 'Which controls water from a pipe?',
      options: ['A tap', 'A tree', 'A stone'],
      answer: 0,
      hint: 'A tap controls the flow of water through a pipe.',
    },
  },
  {
    id: 'places-that-help',
    grade: 1,
    subject: 'Science',
    title: 'A place for each job',
    description: 'Match a task to a public place.',
    minutes: 5,
    science: { topic: 'Our world', activity: 'match', image: 'bank' },
    curriculum: { label: 'Public facilities and their uses', page: 57 },
    matching: {
      prompt: 'Match a task to a public place.',
      bins: [
        { id: 'bank', label: 'Bank', symbol: '🏦' },
        { id: 'station', label: 'Railway station', symbol: '🚉' },
        { id: 'library', label: 'Library', symbol: '📚' },
      ],
      cards: [
        {
          id: 'money',
          label: 'Keep money in an account',
          symbol: '🪙',
          bin: 'bank',
          explanation:
            'Banks offer services for saving and managing money. Adults help children use these services.',
        },
        {
          id: 'train',
          label: 'Board a passenger train',
          symbol: '🚆',
          bin: 'station',
          explanation:
            'People board trains at railway stations. Stay with a trusted adult.',
        },
        {
          id: 'book',
          label: 'Borrow a storybook',
          symbol: '📖',
          bin: 'library',
          explanation:
            'Libraries lend books. Return a borrowed book when it is due.',
        },
      ],
    },
    steps: [
      {
        visual: '🏦',
        title: 'Visit a bank',
        text: 'A bank offers money services such as savings accounts.',
      },
      {
        visual: '🚉',
        title: 'Visit a station',
        text: 'Railway stations help people travel by train.',
      },
      {
        visual: '📚',
        title: 'Visit a library',
        text: 'A library helps people find, read and borrow books.',
      },
    ],
    question: {
      prompt: 'Where can we borrow a book?',
      options: ['Bank', 'Railway platform', 'Library'],
      answer: 2,
      hint: 'Libraries lend books for people to read.',
    },
  },
  {
    id: 'transport-sort',
    grade: 1,
    subject: 'Science',
    title: 'Sort the travel fleet',
    description: 'Choose a vehicle, then its travel place.',
    minutes: 5,
    science: { topic: 'Our world', activity: 'match', image: 'ferry' },
    curriculum: { label: 'Land, water and air transport', page: 58 },
    matching: {
      prompt: 'Choose a vehicle, then its travel place.',
      bins: [
        { id: 'land', label: 'Land', symbol: '🛣️' },
        { id: 'water', label: 'Water', symbol: '🌊' },
        { id: 'air', label: 'Air', symbol: '☁️' },
      ],
      cards: [
        {
          id: 'bus',
          label: 'Bus',
          symbol: '🚌',
          bin: 'land',
          explanation: 'A bus travels on roads on land.',
        },
        {
          id: 'ferry',
          label: 'Ferry',
          symbol: '⛴️',
          bin: 'water',
          explanation: 'A ferry carries people or vehicles across water.',
        },
        {
          id: 'plane',
          label: 'Aeroplane',
          symbol: '✈️',
          bin: 'air',
          explanation: 'An aeroplane flies through the air.',
        },
        {
          id: 'train',
          label: 'Train',
          symbol: '🚆',
          bin: 'land',
          explanation: 'A train travels on tracks on land.',
        },
        {
          id: 'boat',
          label: 'Sailing boat',
          symbol: '⛵',
          bin: 'water',
          explanation: 'A sailing boat uses wind to move on water.',
        },
        {
          id: 'heli',
          label: 'Helicopter',
          symbol: '🚁',
          bin: 'air',
          explanation:
            'A helicopter flies through the air using turning rotors.',
        },
      ],
    },
    steps: [
      {
        visual: '🚌 🚆',
        title: 'Travel on land',
        text: 'Buses use roads and trains use tracks.',
      },
      {
        visual: '⛴️ ⛵',
        title: 'Travel on water',
        text: 'Ferries and sailing boats travel across water.',
      },
      {
        visual: '✈️ 🚁',
        title: 'Travel in the air',
        text: 'Aeroplanes and helicopters fly in the air.',
      },
    ],
    question: {
      prompt: 'Which pair travels on water?',
      options: [
        'Bus and train',
        'Ferry and sailing boat',
        'Aeroplane and helicopter',
      ],
      answer: 1,
      hint: 'Ferries and sailing boats travel on water.',
    },
  },
  {
    id: 'food-groups',
    grade: 1,
    subject: 'Science',
    title: 'A colourful food basket',
    description: 'Food types and ingredients. Look, choose and discover.',
    minutes: 5,
    science: { topic: 'Our world', activity: 'guided', image: 'food' },
    curriculum: { label: 'Food types and ingredients', page: 51 },
    guided: [
      {
        symbol: '🍌',
        prompt: 'Find a fruit.',
        options: ['Banana', 'Rice', 'Carrot'],
        answer: 0,
        explanation:
          'A banana is a fruit. Different foods help our bodies grow and stay active.',
      },
      {
        symbol: '🌾',
        prompt: 'Which is a grain?',
        options: ['Apple', 'Rice', 'Almond'],
        answer: 1,
        explanation:
          'Rice is a grain. Carrots are vegetables; almonds are nuts.',
      },
      {
        symbol: '🥕',
        prompt: 'Which ingredients could go in a fruit salad?',
        options: [
          'Stones and leaves',
          'Banana, apple and grapes',
          'Soap and water',
        ],
        answer: 1,
        explanation:
          'Ingredients are the foods used to make a dish. Banana, apple and grapes can be ingredients in a fruit salad. An adult helps prepare food safely.',
      },
    ],
    steps: [
      {
        visual: '🍌',
        title: 'Find a fruit.',
        text: 'A banana is a fruit. Different foods help our bodies grow and stay active.',
      },
      {
        visual: '🌾',
        title: 'Which is a grain?',
        text: 'Rice is a grain. Carrots are vegetables; almonds are nuts.',
      },
      {
        visual: '🥕',
        title: 'Which ingredients could go in a fruit salad?',
        text: 'Ingredients are the foods used to make a dish. Banana, apple and grapes can be ingredients in a fruit salad. An adult helps prepare food safely.',
      },
    ],
    question: {
      prompt: 'Which ingredients could go in a fruit salad?',
      options: [
        'Stones and leaves',
        'Banana, apple and grapes',
        'Soap and water',
      ],
      answer: 1,
      hint: 'Ingredients are the foods used to make a dish. Banana, apple and grapes can be ingredients in a fruit salad. An adult helps prepare food safely.',
    },
  },
  {
    id: 'food-storage',
    grade: 1,
    subject: 'Science',
    title: 'Keep food fresh',
    description: 'Storing food. Look, choose and discover.',
    minutes: 5,
    science: { topic: 'Our world', activity: 'guided', image: 'storage' },
    curriculum: { label: 'Storing food', page: 51 },
    guided: [
      {
        symbol: '🥣',
        prompt: 'After a meal, what should we do with food to keep?',
        options: [
          'Leave it open outside',
          'Ask an adult to store it safely',
          'Hide it under a bed',
        ],
        answer: 1,
        explanation:
          'An adult can choose a clean container and the right storage place.',
      },
      {
        symbol: '🫙',
        prompt: 'Pick a container for dry rice.',
        options: [
          'Clean, dry container with a lid',
          'Wet paper bag',
          'Dirty open tray',
        ],
        answer: 0,
        explanation: 'A clean, dry, covered container helps protect dry rice.',
      },
      {
        symbol: '❄️',
        prompt: 'Some cooked food needs to be kept cold. Who can help?',
        options: [
          'Ask a trusted adult',
          'Leave it in the sun',
          'Taste it to check if it is safe',
        ],
        answer: 0,
        explanation:
          'Ask an adult to put food away promptly. We do not taste food to test whether it is safe.',
      },
    ],
    steps: [
      {
        visual: '🥣',
        title: 'After a meal, what should we do with food to keep?',
        text: 'An adult can choose a clean container and the right storage place.',
      },
      {
        visual: '🫙',
        title: 'Pick a container for dry rice.',
        text: 'A clean, dry, covered container helps protect dry rice.',
      },
      {
        visual: '❄️',
        title: 'Some cooked food needs to be kept cold. Who can help?',
        text: 'Ask an adult to put food away promptly. We do not taste food to test whether it is safe.',
      },
    ],
    question: {
      prompt: 'Some cooked food needs to be kept cold. Who can help?',
      options: [
        'Ask a trusted adult',
        'Leave it in the sun',
        'Taste it to check if it is safe',
      ],
      answer: 0,
      hint: 'Ask an adult to put food away promptly. We do not taste food to test whether it is safe.',
    },
  },
  {
    id: 'clean-and-ready',
    grade: 1,
    subject: 'Science',
    title: 'Clean hands, tidy space',
    description:
      'Self-care and keeping things in place. Look, choose and discover.',
    minutes: 5,
    science: { topic: 'Our world', activity: 'guided', image: 'hygiene' },
    curriculum: { label: 'Self-care and keeping things in place', page: 52 },
    guided: [
      {
        symbol: '🧼',
        prompt: 'Before eating, choose a helpful habit.',
        options: [
          'Wash hands with soap and water',
          'Wipe hands on the floor',
          'Skip cleaning',
        ],
        answer: 0,
        explanation:
          'Clean hands before eating and after using the toilet. Ask for help when needed.',
      },
      {
        symbol: '📚',
        prompt: 'Where shall we put the books after reading?',
        options: [
          'In their place on the shelf',
          'Across the walkway',
          'Under a wet tap',
        ],
        answer: 0,
        explanation: 'Keeping things in their place makes them easier to find.',
      },
      {
        symbol: '🗑️',
        prompt: 'Where does a used wrapper belong?',
        options: [
          'On the playground',
          'In the correct waste bin',
          'In a plant pot',
        ],
        answer: 1,
        explanation: 'Use the right bin and keep shared spaces tidy.',
      },
    ],
    steps: [
      {
        visual: '🧼',
        title: 'Before eating, choose a helpful habit.',
        text: 'Clean hands before eating and after using the toilet. Ask for help when needed.',
      },
      {
        visual: '📚',
        title: 'Where shall we put the books after reading?',
        text: 'Keeping things in their place makes them easier to find.',
      },
      {
        visual: '🗑️',
        title: 'Where does a used wrapper belong?',
        text: 'Use the right bin and keep shared spaces tidy.',
      },
    ],
    question: {
      prompt: 'Where does a used wrapper belong?',
      options: [
        'On the playground',
        'In the correct waste bin',
        'In a plant pot',
      ],
      answer: 1,
      hint: 'Use the right bin and keep shared spaces tidy.',
    },
  },
  {
    id: 'water-sources',
    grade: 1,
    subject: 'Science',
    title: 'Where does water come from?',
    description:
      'Water sources: tap, well, pond, lake, river. Look, choose and discover.',
    minutes: 5,
    science: { topic: 'Our world', activity: 'guided', image: 'water' },
    curriculum: {
      label: 'Water sources: tap, well, pond, lake, river',
      page: 54,
    },
    guided: [
      {
        symbol: '🏞️',
        prompt: 'Which water source flows across the land?',
        options: ['River', 'Book', 'Chair'],
        answer: 0,
        explanation:
          'A river is flowing water. Ponds and lakes are bodies of water surrounded by land.',
      },
      {
        symbol: '🚰',
        prompt: 'Which brings water through a pipe?',
        options: ['Tap', 'Tree branch', 'Pencil'],
        answer: 0,
        explanation:
          'Taps supply water carried through pipes. Wells reach water below the ground.',
      },
      {
        symbol: '🥤',
        prompt:
          'Water looks clear. Is that enough to know it is safe to drink?',
        options: [
          'Yes, always',
          'No—ask an adult for safe drinking water',
          'Taste any water to check',
        ],
        answer: 1,
        explanation:
          'Clear water is not always safe to drink. Use drinking water provided by a trusted adult.',
      },
    ],
    steps: [
      {
        visual: '🏞️',
        title: 'Which water source flows across the land?',
        text: 'A river is flowing water. Ponds and lakes are bodies of water surrounded by land.',
      },
      {
        visual: '🚰',
        title: 'Which brings water through a pipe?',
        text: 'Taps supply water carried through pipes. Wells reach water below the ground.',
      },
      {
        visual: '🥤',
        title: 'Water looks clear. Is that enough to know it is safe to drink?',
        text: 'Clear water is not always safe to drink. Use drinking water provided by a trusted adult.',
      },
    ],
    question: {
      prompt: 'Water looks clear. Is that enough to know it is safe to drink?',
      options: [
        'Yes, always',
        'No—ask an adult for safe drinking water',
        'Taste any water to check',
      ],
      answer: 1,
      hint: 'Clear water is not always safe to drink. Use drinking water provided by a trusted adult.',
    },
  },
  {
    id: 'wild-domestic',
    grade: 1,
    subject: 'Science',
    title: 'Meet our animal neighbours',
    description: 'Wild and domestic animals. Look, choose and discover.',
    minutes: 5,
    science: { topic: 'Our world', activity: 'guided', image: 'animals' },
    curriculum: { label: 'Wild and domestic animals', page: 55 },
    guided: [
      {
        symbol: '🐄',
        prompt: 'Which animal has been domesticated by people?',
        options: ['Cow', 'Tiger', 'Wild deer'],
        answer: 0,
        explanation: 'Cows are domestic animals. Many are cared for on farms.',
      },
      {
        symbol: '🐅',
        prompt: 'Which is a wild animal?',
        options: ['Pet dog', 'Tiger', 'Farm goat'],
        answer: 1,
        explanation: 'A tiger is a wild animal, even if one lives in a zoo.',
      },
      {
        symbol: '🦌',
        prompt: 'You see a wild animal. What helps keep everyone safe?',
        options: [
          'Chase it',
          'Keep a safe distance with an adult',
          'Feed it by hand',
        ],
        answer: 1,
        explanation:
          'Observe from a safe distance. Do not chase, touch or feed wild animals.',
      },
    ],
    steps: [
      {
        visual: '🐄',
        title: 'Which animal has been domesticated by people?',
        text: 'Cows are domestic animals. Many are cared for on farms.',
      },
      {
        visual: '🐅',
        title: 'Which is a wild animal?',
        text: 'A tiger is a wild animal, even if one lives in a zoo.',
      },
      {
        visual: '🦌',
        title: 'You see a wild animal. What helps keep everyone safe?',
        text: 'Observe from a safe distance. Do not chase, touch or feed wild animals.',
      },
    ],
    question: {
      prompt: 'You see a wild animal. What helps keep everyone safe?',
      options: [
        'Chase it',
        'Keep a safe distance with an adult',
        'Feed it by hand',
      ],
      answer: 1,
      hint: 'Observe from a safe distance. Do not chase, touch or feed wild animals.',
    },
  },
  {
    id: 'shelter-materials',
    grade: 1,
    subject: 'Science',
    title: 'Build a little shelter',
    description: 'Materials used for shelter. Look, choose and discover.',
    minutes: 5,
    science: { topic: 'Our world', activity: 'guided', image: 'shelter' },
    curriculum: { label: 'Materials used for shelter', page: 55 },
    guided: [
      {
        symbol: '🧱',
        prompt: 'What can builders use to make a wall?',
        options: ['Bricks', 'Soap bubbles', 'Loose paper scraps'],
        answer: 0,
        explanation:
          'Bricks are one building material. Homes can also use stone, mud, wood and other materials.',
      },
      {
        symbol: '🏠',
        prompt: 'Which part helps keep rain out from above?',
        options: ['Roof', 'Doormat', 'Spoon'],
        answer: 0,
        explanation:
          'A roof covers a shelter. Walls and roofs work together to protect the space.',
      },
      {
        symbol: '🪵',
        prompt: 'Why do homes use different materials?',
        options: [
          'Every place is exactly the same',
          'Local materials and weather differ',
          'Only one kind of home is good',
        ],
        answer: 1,
        explanation:
          'Materials depend on the place, weather and people’s needs. Different homes matter equally.',
      },
    ],
    steps: [
      {
        visual: '🧱',
        title: 'What can builders use to make a wall?',
        text: 'Bricks are one building material. Homes can also use stone, mud, wood and other materials.',
      },
      {
        visual: '🏠',
        title: 'Which part helps keep rain out from above?',
        text: 'A roof covers a shelter. Walls and roofs work together to protect the space.',
      },
      {
        visual: '🪵',
        title: 'Why do homes use different materials?',
        text: 'Materials depend on the place, weather and people’s needs. Different homes matter equally.',
      },
    ],
    question: {
      prompt: 'Why do homes use different materials?',
      options: [
        'Every place is exactly the same',
        'Local materials and weather differ',
        'Only one kind of home is good',
      ],
      answer: 1,
      hint: 'Materials depend on the place, weather and people’s needs. Different homes matter equally.',
    },
  },
  {
    id: 'family-care',
    grade: 1,
    subject: 'Science',
    title: 'Small acts of kindness',
    description: 'Sharing and caring in families. Look, choose and discover.',
    minutes: 5,
    science: { topic: 'Our world', activity: 'guided', image: 'family' },
    curriculum: { label: 'Sharing and caring in families', page: 56 },
    guided: [
      {
        symbol: '🧩',
        prompt: 'Two people want the same puzzle. What could help?',
        options: [
          'Take turns or play together',
          'Hide all the pieces',
          'Push someone away',
        ],
        answer: 0,
        explanation:
          'Sharing and taking turns can help people enjoy time together.',
      },
      {
        symbol: '💛',
        prompt: 'Someone at home looks upset. What could you do?',
        options: [
          'Offer company or ask a trusted adult to help',
          'Laugh at them',
          'Force them to play',
        ],
        answer: 0,
        explanation:
          'We can show care with a kind gesture, a message or quiet company.',
      },
      {
        symbol: '🏡',
        prompt: 'Do all families look the same?',
        options: [
          'Yes',
          'No—families can be different',
          'Only one kind is a family',
        ],
        answer: 1,
        explanation:
          'Families and caregivers can be different. Care and respect belong in every home.',
      },
    ],
    steps: [
      {
        visual: '🧩',
        title: 'Two people want the same puzzle. What could help?',
        text: 'Sharing and taking turns can help people enjoy time together.',
      },
      {
        visual: '💛',
        title: 'Someone at home looks upset. What could you do?',
        text: 'We can show care with a kind gesture, a message or quiet company.',
      },
      {
        visual: '🏡',
        title: 'Do all families look the same?',
        text: 'Families and caregivers can be different. Care and respect belong in every home.',
      },
    ],
    question: {
      prompt: 'Do all families look the same?',
      options: [
        'Yes',
        'No—families can be different',
        'Only one kind is a family',
      ],
      answer: 1,
      hint: 'Families and caregivers can be different. Care and respect belong in every home.',
    },
  },
  {
    id: 'helpful-tools',
    grade: 1,
    subject: 'Science',
    title: 'Who uses this tool?',
    description: 'Tools used in occupations. Look, choose and discover.',
    minutes: 5,
    science: { topic: 'Our world', activity: 'guided', image: 'tools' },
    curriculum: { label: 'Tools used in occupations', page: 56 },
    guided: [
      {
        symbol: '🪡',
        prompt: 'Who might use a needle and thread at work?',
        options: ['Tailor', 'Bus driver', 'Gardener'],
        answer: 0,
        explanation:
          'A tailor uses tools to sew clothes. Sharp tools are for trained adults.',
      },
      {
        symbol: '🪴',
        prompt: 'Who might use a watering can?',
        options: ['Gardener', 'Dentist', 'Train driver'],
        answer: 0,
        explanation: 'A gardener uses tools to care for plants.',
      },
      {
        symbol: '🩺',
        prompt: 'Who might use a stethoscope?',
        options: ['Baker', 'Health worker', 'Painter'],
        answer: 1,
        explanation:
          'Health workers use tools to care for people. Every kind of helpful work deserves respect.',
      },
    ],
    steps: [
      {
        visual: '🪡',
        title: 'Who might use a needle and thread at work?',
        text: 'A tailor uses tools to sew clothes. Sharp tools are for trained adults.',
      },
      {
        visual: '🪴',
        title: 'Who might use a watering can?',
        text: 'A gardener uses tools to care for plants.',
      },
      {
        visual: '🩺',
        title: 'Who might use a stethoscope?',
        text: 'Health workers use tools to care for people. Every kind of helpful work deserves respect.',
      },
    ],
    question: {
      prompt: 'Who might use a stethoscope?',
      options: ['Baker', 'Health worker', 'Painter'],
      answer: 1,
      hint: 'Health workers use tools to care for people. Every kind of helpful work deserves respect.',
    },
  },
  {
    id: 'festival-stories',
    grade: 1,
    subject: 'Science',
    title: 'Stories we celebrate',
    description:
      'Stories and folk tales behind festivals. Look, choose and discover.',
    minutes: 5,
    science: { topic: 'Our world', activity: 'guided', image: 'festivals' },
    curriculum: { label: 'Stories and folk tales behind festivals', page: 56 },
    guided: [
      {
        symbol: '🪔',
        prompt:
          'In a story told by many families, Rama returns home at Diwali. What welcomes him?',
        options: ['Rows of lamps', 'A snowstorm', 'An empty school bag'],
        answer: 0,
        explanation:
          'Many families tell this Diwali story. Other communities celebrate for different reasons.',
      },
      {
        symbol: '🌼',
        prompt:
          'A Kerala story tells of King Mahabali visiting his people at Onam. What can welcome him?',
        options: [
          'A flower pattern called a pookalam',
          'A traffic light',
          'A raincoat',
        ],
        answer: 0,
        explanation:
          'Many people make flower patterns during Onam. Traditions vary between families.',
      },
      {
        symbol: '📖',
        prompt: 'A friend tells a different festival story. What can we do?',
        options: [
          'Say only our story matters',
          'Explore it respectfully',
          'Make fun of their family',
        ],
        answer: 1,
        explanation:
          'Stories and traditions differ. We can share, read or use pictures to learn from each other.',
      },
    ],
    steps: [
      {
        visual: '🪔',
        title:
          'In a story told by many families, Rama returns home at Diwali. What welcomes him?',
        text: 'Many families tell this Diwali story. Other communities celebrate for different reasons.',
      },
      {
        visual: '🌼',
        title:
          'A Kerala story tells of King Mahabali visiting his people at Onam. What can welcome him?',
        text: 'Many people make flower patterns during Onam. Traditions vary between families.',
      },
      {
        visual: '📖',
        title: 'A friend tells a different festival story. What can we do?',
        text: 'Stories and traditions differ. We can share, read or use pictures to learn from each other.',
      },
    ],
    question: {
      prompt: 'A friend tells a different festival story. What can we do?',
      options: [
        'Say only our story matters',
        'Explore it respectfully',
        'Make fun of their family',
      ],
      answer: 1,
      hint: 'Stories and traditions differ. We can share, read or use pictures to learn from each other.',
    },
  },
  {
    id: 'play-together',
    grade: 1,
    subject: 'Science',
    title: 'Games for everyone',
    description:
      'Game types and physical coordination. Look, choose and discover.',
    minutes: 5,
    science: { topic: 'Our world', activity: 'guided', image: 'games' },
    curriculum: { label: 'Game types and physical coordination', page: 51 },
    guided: [
      {
        symbol: '♟️',
        prompt: 'Which game can be played on a board indoors?',
        options: ['Chess', 'Flying a kite in an open field', 'Swimming'],
        answer: 0,
        explanation:
          'Chess is a board game. Some games are played indoors, some outdoors, and some in either place.',
      },
      {
        symbol: '🤝',
        prompt: 'How can we include a friend in a game?',
        options: [
          'Agree on accessible rules together',
          'Always leave them out',
          'Hide the instructions',
        ],
        answer: 0,
        explanation:
          'Use visible signals and adapt movements or equipment so everyone can join.',
      },
      {
        symbol: '🧘',
        prompt: 'Someone needs a break. What is a kind choice?',
        options: [
          'Let them rest or choose another role',
          'Make them keep going',
          'Tell them breaks are wrong',
        ],
        answer: 0,
        explanation:
          'Play can build coordination at your own pace. Rest and different ways of playing are welcome.',
      },
    ],
    steps: [
      {
        visual: '♟️',
        title: 'Which game can be played on a board indoors?',
        text: 'Chess is a board game. Some games are played indoors, some outdoors, and some in either place.',
      },
      {
        visual: '🤝',
        title: 'How can we include a friend in a game?',
        text: 'Use visible signals and adapt movements or equipment so everyone can join.',
      },
      {
        visual: '🧘',
        title: 'Someone needs a break. What is a kind choice?',
        text: 'Play can build coordination at your own pace. Rest and different ways of playing are welcome.',
      },
    ],
    question: {
      prompt: 'Someone needs a break. What is a kind choice?',
      options: [
        'Let them rest or choose another role',
        'Make them keep going',
        'Tell them breaks are wrong',
      ],
      answer: 0,
      hint: 'Play can build coordination at your own pace. Rest and different ways of playing are welcome.',
    },
  },
  {
    id: 'public-places',
    grade: 1,
    subject: 'Science',
    title: 'Explore our neighbourhood',
    description: 'Public facilities. Look, choose and discover.',
    minutes: 5,
    science: { topic: 'Our world', activity: 'guided', image: 'facilities' },
    curriculum: { label: 'Public facilities', page: 57 },
    guided: [
      {
        symbol: '📚',
        prompt: 'Where can we borrow books?',
        options: ['Library', 'Bus stop', 'Bank'],
        answer: 0,
        explanation: 'Libraries help people find and borrow books.',
      },
      {
        symbol: '🚏',
        prompt: 'Where do we wait safely for a bus with an adult?',
        options: ['Bus stop', 'Middle of the road', 'Hospital bed'],
        answer: 0,
        explanation:
          'Bus stops are places to wait for buses. Railway stations serve trains.',
      },
      {
        symbol: '🏥',
        prompt: 'Where can health workers care for someone who is unwell?',
        options: ['Hospital', 'Playground slide', 'Book shelf'],
        answer: 0,
        explanation:
          'Hospitals provide healthcare. Banks provide money services; police stations are places for police services.',
      },
    ],
    steps: [
      {
        visual: '📚',
        title: 'Where can we borrow books?',
        text: 'Libraries help people find and borrow books.',
      },
      {
        visual: '🚏',
        title: 'Where do we wait safely for a bus with an adult?',
        text: 'Bus stops are places to wait for buses. Railway stations serve trains.',
      },
      {
        visual: '🏥',
        title: 'Where can health workers care for someone who is unwell?',
        text: 'Hospitals provide healthcare. Banks provide money services; police stations are places for police services.',
      },
    ],
    question: {
      prompt: 'Where can health workers care for someone who is unwell?',
      options: ['Hospital', 'Playground slide', 'Book shelf'],
      answer: 0,
      hint: 'Hospitals provide healthcare. Banks provide money services; police stations are places for police services.',
    },
  },
  {
    id: 'travel-modes',
    grade: 1,
    subject: 'Science',
    title: 'Land, water or air?',
    description: 'Modes of transport. Look, choose and discover.',
    minutes: 5,
    science: { topic: 'Our world', activity: 'guided', image: 'transport' },
    curriculum: { label: 'Modes of transport', page: 58 },
    guided: [
      {
        symbol: '🚆',
        prompt: 'Where does a train travel?',
        options: ['Land', 'Water', 'Air'],
        answer: 0,
        explanation: 'Trains travel on tracks on land.',
      },
      {
        symbol: '⛴️',
        prompt: 'Where does a ferry travel?',
        options: ['Air', 'Water', 'A bookshelf'],
        answer: 1,
        explanation: 'A ferry carries people or vehicles across water.',
      },
      {
        symbol: '✈️',
        prompt: 'Where does an aeroplane fly?',
        options: ['Under the soil', 'On a pond', 'Air'],
        answer: 2,
        explanation:
          'Aeroplanes fly through the air. Transport helps people and goods move between places.',
      },
    ],
    steps: [
      {
        visual: '🚆',
        title: 'Where does a train travel?',
        text: 'Trains travel on tracks on land.',
      },
      {
        visual: '⛴️',
        title: 'Where does a ferry travel?',
        text: 'A ferry carries people or vehicles across water.',
      },
      {
        visual: '✈️',
        title: 'Where does an aeroplane fly?',
        text: 'Aeroplanes fly through the air. Transport helps people and goods move between places.',
      },
    ],
    question: {
      prompt: 'Where does an aeroplane fly?',
      options: ['Under the soil', 'On a pond', 'Air'],
      answer: 2,
      hint: 'Aeroplanes fly through the air. Transport helps people and goods move between places.',
    },
  },
  {
    id: 'road-safety',
    grade: 1,
    subject: 'Science',
    title: 'A safer way across',
    description: 'Road safety. Look, choose and discover.',
    minutes: 5,
    science: { topic: 'Our world', activity: 'guided', image: 'road' },
    curriculum: { label: 'Road safety', page: 58 },
    guided: [
      {
        symbol: '🛣️',
        prompt: 'Before crossing a road, what should a young child do?',
        options: [
          'Go with a trusted adult',
          'Run ahead alone',
          'Look only at a phone',
        ],
        answer: 0,
        explanation: 'Cross with a trusted adult at a suitable crossing.',
      },
      {
        symbol: '👀',
        prompt: 'At a crossing, what should we do?',
        options: [
          'Stop and check all directions with the adult',
          'Assume every vehicle stops',
          'Follow a ball into the road',
        ],
        answer: 0,
        explanation:
          'Look for vehicles in all directions and follow the adult and pedestrian signals. Never rely on hearing traffic.',
      },
      {
        symbol: '🚶',
        prompt:
          'The pedestrian signal allows crossing. Is it time to run without checking?',
        options: [
          'Yes',
          'No—check with the adult that it is safe',
          'Close your eyes',
        ],
        answer: 1,
        explanation:
          'Even at a marked crossing, check with the adult and cross carefully when safe.',
      },
    ],
    steps: [
      {
        visual: '🛣️',
        title: 'Before crossing a road, what should a young child do?',
        text: 'Cross with a trusted adult at a suitable crossing.',
      },
      {
        visual: '👀',
        title: 'At a crossing, what should we do?',
        text: 'Look for vehicles in all directions and follow the adult and pedestrian signals. Never rely on hearing traffic.',
      },
      {
        visual: '🚶',
        title:
          'The pedestrian signal allows crossing. Is it time to run without checking?',
        text: 'Even at a marked crossing, check with the adult and cross carefully when safe.',
      },
    ],
    question: {
      prompt:
        'The pedestrian signal allows crossing. Is it time to run without checking?',
      options: [
        'Yes',
        'No—check with the adult that it is safe',
        'Close your eyes',
      ],
      answer: 1,
      hint: 'Even at a marked crossing, check with the adult and cross carefully when safe.',
    },
  },
  {
    id: 'home-appliances',
    grade: 1,
    subject: 'Science',
    title: 'Helpful machines at home',
    description: 'Home appliances. Look, choose and discover.',
    minutes: 5,
    science: { topic: 'Our world', activity: 'guided', image: 'appliances' },
    curriculum: { label: 'Home appliances', page: 58 },
    guided: [
      {
        symbol: '🌀',
        prompt: 'Which appliance moves air to help us feel cooler?',
        options: ['Fan', 'Book', 'Shoe'],
        answer: 0,
        explanation:
          'A fan moves air. Keep fingers and objects away from moving blades.',
      },
      {
        symbol: '❄️',
        prompt: 'Which appliance keeps some foods cold?',
        options: ['Refrigerator', 'Lamp', 'Chair'],
        answer: 0,
        explanation:
          'A refrigerator keeps food cold. An adult decides how food should be stored.',
      },
      {
        symbol: '🔌',
        prompt: 'You find a damaged wire. What should you do?',
        options: [
          'Touch it to check',
          'Stay away and tell a trusted adult',
          'Pour water on it',
        ],
        answer: 1,
        explanation:
          'Stay away from damaged wires and sockets. Adults handle electrical problems.',
      },
    ],
    steps: [
      {
        visual: '🌀',
        title: 'Which appliance moves air to help us feel cooler?',
        text: 'A fan moves air. Keep fingers and objects away from moving blades.',
      },
      {
        visual: '❄️',
        title: 'Which appliance keeps some foods cold?',
        text: 'A refrigerator keeps food cold. An adult decides how food should be stored.',
      },
      {
        visual: '🔌',
        title: 'You find a damaged wire. What should you do?',
        text: 'Stay away from damaged wires and sockets. Adults handle electrical problems.',
      },
    ],
    question: {
      prompt: 'You find a damaged wire. What should you do?',
      options: [
        'Touch it to check',
        'Stay away and tell a trusted adult',
        'Pour water on it',
      ],
      answer: 1,
      hint: 'Stay away from damaged wires and sockets. Adults handle electrical problems.',
    },
  },
  {
    id: 'body-boundaries',
    grade: 1,
    subject: 'Science',
    title: 'My body, my boundaries',
    description: 'Body safety and asking for help. Look, choose and discover.',
    minutes: 5,
    science: { topic: 'Our world', activity: 'guided', image: 'safety' },
    curriculum: { label: 'Body safety and asking for help', page: 59 },
    guided: [
      {
        symbol: '✋',
        prompt: 'You do not want a hug. What can you do?',
        options: [
          'Say, sign or show “no”',
          'You must accept it',
          'Keep it secret',
        ],
        answer: 0,
        explanation:
          'You can set a boundary. A wave or another greeting is okay too.',
      },
      {
        symbol: '💬',
        prompt:
          'A touch worries you, even from someone you know. What can help?',
        options: [
          'Tell a trusted adult using words, signs or pictures',
          'Keep a worrying secret',
          'Blame yourself',
        ],
        answer: 0,
        explanation:
          'Move to safety if you can and tell a trusted adult. It is not your fault.',
      },
      {
        symbol: '🤝',
        prompt: 'The first adult does not help. What can you do?',
        options: [
          'Give up',
          'Keep telling another trusted adult until someone helps',
          'Keep it secret forever',
        ],
        answer: 1,
        explanation:
          'You deserve help. You can use a communication card or point to show that you need support.',
      },
    ],
    steps: [
      {
        visual: '✋',
        title: 'You do not want a hug. What can you do?',
        text: 'You can set a boundary. A wave or another greeting is okay too.',
      },
      {
        visual: '💬',
        title:
          'A touch worries you, even from someone you know. What can help?',
        text: 'Move to safety if you can and tell a trusted adult. It is not your fault.',
      },
      {
        visual: '🤝',
        title: 'The first adult does not help. What can you do?',
        text: 'You deserve help. You can use a communication card or point to show that you need support.',
      },
    ],
    question: {
      prompt: 'The first adult does not help. What can you do?',
      options: [
        'Give up',
        'Keep telling another trusted adult until someone helps',
        'Keep it secret forever',
      ],
      answer: 1,
      hint: 'You deserve help. You can use a communication card or point to show that you need support.',
    },
  },
  {
    id: 'fire-safety',
    grade: 1,
    subject: 'Science',
    title: 'Stay away from fire',
    description:
      'Fire risks and protective actions. Look, choose and discover.',
    minutes: 5,
    science: { topic: 'Our world', activity: 'guided', image: 'fire' },
    curriculum: { label: 'Fire risks and protective actions', page: 59 },
    guided: [
      {
        symbol: '🔥',
        prompt: 'You find matches or a lighter. What should you do?',
        options: [
          'Play with them',
          'Leave them alone and tell an adult',
          'Hide them in a bag',
        ],
        answer: 1,
        explanation:
          'Matches and lighters are not toys. Tell an adult where they are.',
      },
      {
        symbol: '🚪',
        prompt: 'You notice smoke or fire. What should you do?',
        options: [
          'Hide in a cupboard',
          'Move away to safety and alert an adult',
          'Try to put it out yourself',
        ],
        answer: 1,
        explanation:
          'Move away from danger and alert a trusted adult. Follow the building’s safe exit plan.',
      },
      {
        symbol: '🎒',
        prompt: 'You are outside safely. Your toy is still inside. What now?',
        options: [
          'Go back for it',
          'Stay outside with the adult',
          'Go looking for smoke',
        ],
        answer: 1,
        explanation:
          'Stay outside. Never go back into a burning building. Adults and emergency services handle the fire.',
      },
    ],
    steps: [
      {
        visual: '🔥',
        title: 'You find matches or a lighter. What should you do?',
        text: 'Matches and lighters are not toys. Tell an adult where they are.',
      },
      {
        visual: '🚪',
        title: 'You notice smoke or fire. What should you do?',
        text: 'Move away from danger and alert a trusted adult. Follow the building’s safe exit plan.',
      },
      {
        visual: '🎒',
        title: 'You are outside safely. Your toy is still inside. What now?',
        text: 'Stay outside. Never go back into a burning building. Adults and emergency services handle the fire.',
      },
    ],
    question: {
      prompt: 'You are outside safely. Your toy is still inside. What now?',
      options: [
        'Go back for it',
        'Stay outside with the adult',
        'Go looking for smoke',
      ],
      answer: 1,
      hint: 'Stay outside. Never go back into a burning building. Adults and emergency services handle the fire.',
    },
  },
  {
    id: 'leaf-food-factory',
    grade: 1,
    subject: 'Science',
    title: 'A leaf makes food',
    description: 'Explore a tiny sunlight-powered food factory.',
    minutes: 5,
    science: { topic: 'Biology', activity: 'food', image: 'leaf' },
    steps: [
      {
        visual: '☀️ → 🍃',
        title: 'Catch the light',
        text: 'Green leaves use energy from light to make food.',
      },
      {
        visual: '💧 + 〰 → 🍃',
        title: 'Water and a gas from air',
        text: 'Roots take in water. Leaves take in a gas called carbon dioxide from the air.',
      },
      {
        visual: '🍃 → ◇',
        title: 'Food for the plant',
        text: 'Using light, the plant turns water and carbon dioxide into sugar, its food. This is called photosynthesis. Oxygen is released too.',
      },
    ],
    question: {
      prompt: 'What helps a green leaf make food?',
      options: ['Light, water and carbon dioxide', 'A toy car', 'Only soil'],
      answer: 0,
      hint: 'Leaves use light energy, water and carbon dioxide to make sugar. Soil is not the plant’s food.',
    },
  },
  {
    id: 'living-things',
    grade: 1,
    subject: 'Science',
    title: 'Is it alive?',
    description: 'Sort a little collection of living and non-living things.',
    minutes: 5,
    science: { topic: 'Biology', activity: 'living', image: 'living' },
    steps: [
      {
        visual: '🌳 🦋',
        title: 'Living things grow',
        text: 'Plants and animals are living things. They grow and need water and air.',
      },
      {
        visual: '🪨 ⚽',
        title: 'Non-living things',
        text: 'A rock and a ball are not alive. They do not need food or grow like a plant.',
      },
      {
        visual: '🚗 ≠ 🦋',
        title: 'Moving is not enough',
        text: 'A toy car can move, but it is not alive. A tree stays in one place and is alive!',
      },
    ],
    question: {
      prompt: 'Which one is a living thing?',
      options: ['A toy car', 'A tree', 'A rock'],
      answer: 1,
      hint: 'A tree grows and needs water and air. Moving alone does not make something alive.',
    },
  },
  {
    id: 'my-body',
    grade: 1,
    subject: 'Science',
    title: 'Meet your amazing body',
    description: 'Match body parts with some of the things they do.',
    minutes: 5,
    science: { topic: 'Our body', activity: 'body', image: 'bodyphoto' },
    steps: [
      {
        visual: '👀',
        title: 'Eyes and seeing',
        text: 'Eyes can help us notice colours and shapes. People explore the world in different ways.',
      },
      {
        visual: '👃',
        title: 'Nose and smelling',
        text: 'The nose helps us breathe and notice smells.',
      },
      {
        visual: '✋',
        title: 'Hands and touch',
        text: 'Hands can feel textures, hold things and communicate. Our bodies and abilities are different, and all belong.',
      },
    ],
    question: {
      prompt: 'Which body part helps us notice a smell?',
      options: ['Hands', 'Nose', 'Eyes'],
      answer: 1,
      hint: 'The nose helps us notice smells. This activity uses pictures, so no smelling or speaking is needed.',
    },
  },
  {
    id: 'weather-watch',
    grade: 1,
    subject: 'Science',
    title: 'What is the weather?',
    description: 'Look at the sky and help pack for the day.',
    minutes: 5,
    science: { topic: 'Our world', activity: 'weather', image: 'weather' },
    steps: [
      {
        visual: '☀️',
        title: 'A sunny day',
        text: 'Sunlight makes the day bright. Shade and a hat can help us stay comfortable outside.',
      },
      {
        visual: '🌧️',
        title: 'A rainy day',
        text: 'Rain is water falling from clouds. A raincoat helps keep us dry.',
      },
      {
        visual: '❄️',
        title: 'A cold day',
        text: 'Some days are cold. Warm clothes help keep our bodies warm. Weather can change, and sunshine does not always mean warmth.',
      },
    ],
    question: {
      prompt: 'What helps keep us dry in rain?',
      options: ['A raincoat', 'A sun hat alone', 'A paper book'],
      answer: 0,
      hint: 'A raincoat keeps rain off our clothes. Ask an adult about the weather before going outside.',
    },
  },
  {
    id: 'butterfly-life',
    grade: 1,
    subject: 'Science',
    title: 'A butterfly begins',
    description: 'An egg. A caterpillar. A wonderful change.',
    minutes: 5,
    science: { topic: 'Biology', activity: 'cycle', image: 'butterfly' },
    steps: [
      {
        visual: '🥚',
        title: 'A tiny egg',
        text: 'A butterfly lays eggs on a plant.',
      },
      {
        visual: '🐛',
        title: 'A hungry caterpillar',
        text: 'A caterpillar hatches from an egg. It eats and grows.',
      },
      {
        visual: '◈',
        title: 'Time to change',
        text: 'The caterpillar becomes a pupa, called a chrysalis. Its body changes inside.',
      },
      {
        visual: '🦋',
        title: 'Wings unfold',
        text: 'An adult butterfly comes out. Later, butterflies can lay eggs and the cycle begins again.',
      },
    ],
    question: {
      prompt: 'What hatches from a butterfly egg?',
      options: ['A caterpillar', 'A bird', 'A flower'],
      answer: 0,
      hint: 'The caterpillar eats and grows before becoming a pupa.',
    },
  },
  {
    id: 'space-neighbours',
    grade: 1,
    subject: 'Science',
    title: 'Hello, space neighbours!',
    description: 'Meet our home, our star and our Moon.',
    minutes: 5,
    science: { topic: 'Space', activity: 'space', image: 'earth' },
    steps: [
      {
        visual: '🌍',
        title: 'Earth is our home',
        text: 'Earth is a planet. We live on its land, with oceans all around.',
      },
      {
        visual: '☀️',
        title: 'The Sun is a star',
        text: 'The Sun gives Earth light and warmth. Never look straight at the Sun.',
      },
      {
        visual: '🌕',
        title: 'Meet the Moon',
        text: 'The Moon travels around Earth. It reflects light from the Sun. We can sometimes see it in the daytime too.',
      },
    ],
    question: {
      prompt: 'Which one makes its own light?',
      options: ['Earth', 'The Moon', 'The Sun'],
      answer: 2,
      hint: 'The Sun is a star. Moonlight is sunlight reflected by the Moon.',
    },
  },
  {
    id: 'day-and-night',
    grade: 1,
    subject: 'Science',
    title: 'Why does night come?',
    description: 'Turn Earth and follow a little explorer.',
    minutes: 4,
    science: { topic: 'Space', activity: 'day', image: 'moon' },
    steps: [
      {
        visual: '☀️ → 🌍',
        title: 'The side facing the Sun',
        text: 'Sunlight lights one side of Earth. It is daytime there.',
      },
      {
        visual: '🌍 ↻',
        title: 'Earth turns',
        text: 'Earth slowly turns. Our place moves from the light side to the dark side.',
      },
      {
        visual: '🌃',
        title: 'The side facing away',
        text: 'It is night on the side facing away from the Sun. Earth keeps turning and morning comes again.',
      },
    ],
    question: {
      prompt: 'It is night at our place when…',
      options: [
        'The Sun switches off',
        'Our place faces away from the Sun',
        'The Moon covers the Sun every night',
      ],
      answer: 1,
      hint: 'The Sun keeps shining. Earth turns our place away from its light.',
    },
  },
  {
    id: 'count-to-five',
    grade: 1,
    subject: 'Maths',
    title: 'Let’s count to five',
    description: 'Match a number to a group of dots.',
    minutes: 4,
    steps: [
      {
        visual: '●',
        title: 'One dot',
        text: 'Point to the dot. There is 1 dot.',
      },
      {
        visual: '● ● ●',
        title: 'Count each dot once',
        text: 'Start on the left. Count 1, 2, 3. There are 3 dots.',
      },
      {
        visual: '● ● ● ● ●',
        title: 'Meet five',
        text: 'Count 1, 2, 3, 4, 5. The last number tells us how many.',
      },
    ],
    question: {
      prompt: 'How many dots? ● ● ● ●',
      options: ['3 dots', '4 dots', '5 dots'],
      answer: 1,
      hint: 'Point to each dot once: 1, 2, 3, 4.',
    },
  },
  {
    id: 'plant-needs',
    science: { topic: 'Biology', activity: 'grow', image: 'sunflower' },
    grade: 1,
    subject: 'Science',
    title: 'Help a plant grow',
    description: 'Discover what a growing plant needs.',
    minutes: 4,
    steps: [
      {
        visual: '🌱 → 🌿',
        title: 'Plants grow',
        text: 'A small plant can grow new leaves and become bigger.',
      },
      {
        visual: '☀️ + 💧 + 🌬️',
        title: 'Light, water and air',
        text: 'Plants need light, water and air to grow.',
      },
      {
        visual: '🌱 + 💧 → 🌿',
        title: 'Care for a plant',
        text: 'Give your plant enough water and light. Watch for new leaves.',
      },
    ],
    question: {
      prompt: 'Which helps a plant grow?',
      options: ['A toy car', 'Water and light', 'A dark closed box'],
      answer: 1,
      hint: 'A plant needs water, light and air.',
    },
  },
  {
    id: 'adding-groups',
    grade: 2,
    subject: 'Maths',
    title: 'Two groups, one total',
    description: 'Bring small groups together to add.',
    minutes: 5,
    steps: [
      {
        visual: '● ● + ●',
        title: 'Start with two groups',
        text: 'The first group has 2 dots. The second has 1 dot.',
      },
      {
        visual: '● ● ● = 3',
        title: 'Bring them together',
        text: 'Count all the dots. 2 plus 1 equals 3.',
      },
      {
        visual: '● ● + ● ● = 4',
        title: 'Try two and two',
        text: 'Two dots and two more dots make 4 dots.',
      },
    ],
    question: {
      prompt: '3 dots + 2 dots = ?',
      options: ['4 dots', '6 dots', '5 dots'],
      answer: 2,
      hint: 'Start at 3. Count two more: 4, 5.',
    },
  },
  {
    id: 'animal-homes',
    grade: 2,
    subject: 'Science',
    title: 'A home for every animal',
    description: 'Explore the places animals live.',
    minutes: 4,
    steps: [
      {
        visual: '🐟 → 💧',
        title: 'Fish live in water',
        text: 'Fish use gills to take oxygen from water.',
      },
      {
        visual: '🐦 → 🪺',
        title: 'Birds build nests',
        text: 'Many birds lay eggs and care for chicks in nests.',
      },
      {
        visual: '🐝 → 🐝 🐝',
        title: 'Some animals live together',
        text: 'Honeybees live together in a colony.',
      },
    ],
    question: {
      prompt: 'Where can a fish live?',
      options: ['In water', 'In a dry nest', 'On a bookshelf'],
      answer: 0,
      hint: 'Fish use gills to breathe in water.',
    },
  },
  {
    id: 'equal-groups',
    grade: 3,
    subject: 'Maths',
    title: 'The power of equal groups',
    description: 'See multiplication as repeated addition.',
    minutes: 5,
    steps: [
      {
        visual: '●● | ●● | ●●',
        title: 'Three equal groups',
        text: 'There are 3 groups. Each group has 2 dots.',
      },
      {
        visual: '2 + 2 + 2 = 6',
        title: 'Add the groups',
        text: 'Three groups of 2 make 6 dots altogether.',
      },
      {
        visual: '3 × 2 = 6',
        title: 'A shorter way',
        text: 'We write 3 times 2 equals 6. This is multiplication.',
      },
    ],
    question: {
      prompt: '4 groups of 2 make how many?',
      options: ['6', '8', '4'],
      answer: 1,
      hint: 'Add 2 + 2 + 2 + 2. The total is 8.',
    },
  },
  {
    id: 'water-cycle',
    grade: 3,
    subject: 'Science',
    title: 'Water’s wonderful journey',
    description: 'Follow water from puddles to clouds.',
    minutes: 5,
    steps: [
      {
        visual: '💧 + ☀️ → ↑',
        title: 'Water rises as vapour',
        text: 'Heat changes liquid water into water vapour. This is evaporation.',
      },
      {
        visual: '↑ → ☁️',
        title: 'Clouds form',
        text: 'Water vapour cools into tiny water droplets. This is condensation.',
      },
      {
        visual: '☁️ → 🌧️ → 💧',
        title: 'Water falls again',
        text: 'Droplets join and fall as rain. Water collects and the cycle continues.',
      },
    ],
    question: {
      prompt: 'What do we call water turning into vapour?',
      options: ['Freezing', 'Evaporation', 'Rain'],
      answer: 1,
      hint: 'Heat helps liquid water evaporate into water vapour.',
    },
  },
  {
    id: 'fractions',
    grade: 4,
    subject: 'Maths',
    title: 'A whole lot of halves',
    description: 'Explore equal parts of a whole.',
    minutes: 5,
    steps: [
      {
        visual: '■ ■',
        title: 'One whole, two equal parts',
        text: 'Imagine one bar split into 2 equal pieces. Each piece is one half.',
      },
      {
        visual: '■ □ = ½',
        title: 'One out of two',
        text: 'The filled square is 1 of the 2 equal parts. We write one half as 1/2.',
      },
      {
        visual: '■ ■ □ □ = ²⁄₄',
        title: 'Same amount, new pieces',
        text: 'Two out of 4 equal parts cover the same amount as one half.',
      },
    ],
    question: {
      prompt: 'Which is the same amount as 1/2?',
      options: ['1/4', '2/4', '3/4'],
      answer: 1,
      hint: 'Split each half into two. One half now contains 2 of the 4 equal pieces.',
    },
  },
  {
    id: 'matter',
    grade: 4,
    subject: 'Science',
    title: 'One water, three forms',
    description: 'Meet solids, liquids and gases.',
    minutes: 5,
    steps: [
      {
        visual: '🧊',
        title: 'Solid ice',
        text: 'Ice has its own shape. It is solid water.',
      },
      {
        visual: '🧊 → 💧',
        title: 'Liquid water',
        text: 'Warm ice melts. Liquid water takes the shape of its container.',
      },
      {
        visual: '💧 → ↑',
        title: 'Water vapour',
        text: 'Water can become a gas called water vapour. Water vapour is invisible.',
      },
    ],
    question: {
      prompt: 'What happens when ice warms enough?',
      options: [
        'It melts into liquid water',
        'It becomes a stone',
        'It stays ice forever',
      ],
      answer: 0,
      hint: 'Heat melts ice into liquid water.',
    },
  },
  {
    id: 'area',
    grade: 5,
    subject: 'Maths',
    title: 'Count the space inside',
    description: 'Find area with rows of equal squares.',
    minutes: 5,
    steps: [
      {
        visual: '□ □ □',
        title: 'Meet a square unit',
        text: 'Each equal square covers 1 square unit. This row covers 3 square units.',
      },
      {
        visual: '□ □ □\n□ □ □',
        title: 'Two rows of three',
        text: 'There are 2 rows with 3 squares each. Together they cover 6 square units.',
      },
      {
        visual: '3 × 2 = 6',
        title: 'Area of a rectangle',
        text: 'Multiply length by width to find a rectangle’s area in square units.',
      },
    ],
    question: {
      prompt: 'A rectangle is 4 units long and 3 units wide. Its area is…',
      options: ['7 square units', '12 square units', '14 square units'],
      answer: 1,
      hint: 'Count 3 rows of 4: 4 + 4 + 4 = 12.',
    },
  },
  {
    id: 'food-chains',
    grade: 5,
    subject: 'Science',
    title: 'Follow the food chain',
    description: 'See how energy passes between living things.',
    minutes: 5,
    steps: [
      {
        visual: '☀️ → 🌿',
        title: 'Start with the Sun',
        text: 'Plants use sunlight to make food.',
      },
      {
        visual: '🌿 → 🦗',
        title: 'A plant eater',
        text: 'A grasshopper eats grass. Energy passes from the grass to the grasshopper.',
      },
      {
        visual: '🌿 → 🦗 → 🐸',
        title: 'Follow the energy',
        text: 'A frog eats the grasshopper. Arrows show energy moving from food to the animal eating it.',
      },
    ],
    question: {
      prompt: 'In grass → grasshopper → frog, what does the frog eat?',
      options: ['Sunlight', 'Grass', 'The grasshopper'],
      answer: 2,
      hint: 'Follow the arrow pointing to the frog. It starts at the grasshopper.',
    },
  },
];

export const scienceImages = {
  salad: {
    src: '/images/science/salad.webp',
    alt: 'A bowl filled with pieces of different fresh fruits',
    credit: 'Manjeshwari poet mysore · CC BY-SA 4.0',
    source:
      'https://commons.wikimedia.org/wiki/File:Fruit_Salad_Or_Fruit_Bowl.jpg',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
  },
  well: {
    src: '/images/science/well.webp',
    alt: 'A village water well with a protective surrounding wall',
    credit: 'Suyash.dwivedi · CC BY-SA 4.0',
    source:
      'https://commons.wikimedia.org/wiki/File:Public_well_in_Surouli_Bujurg_Village,_Uttar_Pradesh,_India.jpg',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
  },
  bank: {
    src: '/images/science/bank.webp',
    alt: 'The Bank of India building on a street in Mumbai',
    credit: 'DesiBoy101 · CC BY-SA 4.0',
    source:
      'https://commons.wikimedia.org/wiki/File:Bank_of_India,_Mumbai_main_branch_as_viewed_from_right_side.jpg',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
  },

  ferry: {
    src: '/images/science/ferry.webp',
    alt: 'A passenger ferry travelling on the Padma River',
    credit: 'Dead.rabbit · CC BY-SA 4.0',
    source:
      'https://commons.wikimedia.org/wiki/File:Passenger_Ferry_on_Padma_River.jpg',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
  },

  leaf: {
    src: '/images/science/leaf.webp',
    alt: 'Close-up of the veins and green surface of a leaf',
    credit: 'Martin Vorel martinvorel.com · CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Green_leaf_texture.jpg',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
  },
  living: {
    src: '/images/science/living.webp',
    alt: 'A living oak tree growing in a grassy meadow',
    credit: 'Alan Hughes · CC BY-SA 2.0',
    source:
      'https://commons.wikimedia.org/wiki/File:Meadow_and_Oak_Tree_-_geograph.org.uk_-_5171268.jpg',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
  },
  bodyphoto: {
    src: '/images/science/bodyphoto.webp',
    alt: 'Open palms showing fingers and skin creases',
    credit: 'Eyefive45 · CC BY-SA 4.0',
    source:
      'https://commons.wikimedia.org/wiki/File:Open_Palm_of_the_Left_Hand,_Fingers.jpg',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
  },
  weather: {
    src: '/images/science/weather.webp',
    alt: 'Raindrops on a window with a blurred rainy landscape beyond',
    credit: 'Frank Vincentz · CC BY-SA 3.0',
    source:
      'https://commons.wikimedia.org/wiki/File:Rain_drops_on_window_02_ies.jpg',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
  },
  food: {
    src: '/images/science/food.webp',
    alt: 'Fresh vegetables displayed at a market in Bangalore',
    credit: 'Annapoornima koppad · CC BY 4.0',
    source:
      'https://commons.wikimedia.org/wiki/File:At_Malleswaram_vegetable_market,_Bangalore.jpg',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0',
  },
  storage: {
    src: '/images/science/storage.webp',
    alt: 'An open refrigerator with foods arranged on its shelves',
    credit: 'W.carter · CC BY-SA 4.0',
    source:
      'https://commons.wikimedia.org/wiki/File:Open_refrigerator_with_food_at_night.jpg',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
  },
  hygiene: {
    src: '/images/science/hygiene.webp',
    alt: 'Hands being washed with soap at a sink',
    credit: 'Beat Ruest · CC BY-SA 4.0',
    source:
      'https://commons.wikimedia.org/wiki/File:Washing_hands_with_soap_(1).jpg',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
  },
  water: {
    src: '/images/science/water.webp',
    alt: 'The Spiti River flowing through a mountain valley',
    credit: 'Timothy A. Gonsalves · CC BY-SA 4.0',
    source:
      'https://commons.wikimedia.org/wiki/File:Spiti_River_Kaza_Himachal_Jun18_D72_7232.jpg',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
  },
  animals: {
    src: '/images/science/animals.webp',
    alt: 'A cow standing in a grassy field',
    credit: 'Kanimozhi Vennila · CC0',
    source: 'https://commons.wikimedia.org/wiki/File:Cow_in_Field_image.jpg',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/deed.en',
  },
  shelter: {
    src: '/images/science/shelter.webp',
    alt: 'A red building brick with three holes',
    credit: 'Andrewlister · Public domain',
    source: 'https://commons.wikimedia.org/wiki/File:Brick.jpg',
    licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
  },
  family: {
    src: '/images/science/family.webp',
    alt: 'A picnic basket for carrying a shared meal',
    credit: 'Jeremy Noble · CC BY 2.0',
    source: 'https://commons.wikimedia.org/wiki/File:Picnic_basket_01.jpg',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.0',
  },
  tools: {
    src: '/images/science/tools.webp',
    alt: 'Small gardening tools arranged beside flowers',
    credit: 'Beendy234 · CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Gardening_tools.jpg',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
  },
  festivals: {
    src: '/images/science/festivals.webp',
    alt: 'A lit clay oil lamp used in Diwali celebrations',
    credit: 'Slyronit · CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Diwali_Diya_2.jpg',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
  },
  games: {
    src: '/images/science/games.webp',
    alt: 'Chess pieces arranged on a wooden chessboard',
    credit: 'Wilfredor · CC0',
    source:
      'https://commons.wikimedia.org/wiki/File:Chess_game_Staunton_No._6_perfil_view_8.jpg',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/deed.en',
  },
  facilities: {
    src: '/images/science/facilities.webp',
    alt: 'Bookshelves and seating inside a public library',
    credit: 'John Phelan · CC BY 4.0',
    source:
      'https://commons.wikimedia.org/wiki/File:Princeton_Public_Library_interior,_Princeton_MA.jpg',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0',
  },
  transport: {
    src: '/images/science/transport.webp',
    alt: 'A passenger train on railway tracks in India',
    credit:
      'Varunesh Chandra (Born in Sambalpur, Odisha, India) · CC BY-SA 4.0',
    source:
      'https://commons.wikimedia.org/wiki/File:Passenger_Train_on_its_Way_to_Saharsa.jpg',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
  },
  road: {
    src: '/images/science/road.webp',
    alt: 'A striped pedestrian crossing on a road in India',
    credit: 'Vijayanrajapuram · CC BY-SA 4.0',
    source:
      'https://commons.wikimedia.org/wiki/File:Zebra_crossing_line_kanhangad_01.jpg',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
  },
  appliances: {
    src: '/images/science/appliances.webp',
    alt: 'An electric kettle with a handle and water-level window',
    credit: 'Jacek Halicki · CC BY-SA 4.0',
    source:
      'https://commons.wikimedia.org/wiki/File:2023_Czajnik_elektryczny_N%27OVEEN.jpg',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
  },
  safety: {
    src: '/images/science/safety.webp',
    alt: 'An open right palm illustrating a stop gesture',
    credit: 'Eyefive45 · CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Right_Hand_Palm.png',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
  },
  fire: {
    src: '/images/science/fire.webp',
    alt: 'A fire extinguisher mounted on a wall for trained adults to use',
    credit: 'Tripl3rdmc454 · CC BY-SA 3.0',
    source: 'https://commons.wikimedia.org/wiki/File:Fire_Extinguisher_501.JPG',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
  },
  body: {
    src: '/images/science/body.svg',
    alt: 'Illustrated child with eyes, nose and hands visible',
    credit: 'Anushruti original illustration · CC0',
    source: '/images/science/body.svg',
  },
  sunflower: {
    src: '/images/science/sunflower.webp',
    alt: 'Close-up of a sunflower with yellow petals around a patterned centre',
    credit: 'NathanScientific · CC0',
    source:
      'https://commons.wikimedia.org/wiki/File:Close-up_sunflower_head,_New_Mexico,_U.S.jpg',
  },
  butterfly: {
    src: '/images/science/butterfly.webp',
    alt: 'An orange and black monarch butterfly resting on flowers',
    credit: 'J. Corey Butler · Public domain',
    source:
      'https://commons.wikimedia.org/wiki/File:Monarch_butterfly_(Danaus_plexippus)_2005.jpg',
  },
  earth: {
    src: '/images/science/earth.webp',
    alt: 'Earth from space, showing blue oceans, land and white clouds',
    credit: 'NASA / Apollo 17 crew · Public domain',
    source:
      'https://commons.wikimedia.org/wiki/File:The_Earth_seen_from_Apollo_17.jpg',
  },
  moon: {
    src: '/images/science/moon.webp',
    alt: 'The Moon with pale craters and darker areas',
    credit: 'NASA / JPL / Galileo · Public domain',
    source: 'https://commons.wikimedia.org/wiki/File:Full_moon.png',
  },
} as const;
export const butterflyStages = [
  { label: 'Egg', symbol: '🥚', text: 'A tiny egg rests on a plant.' },
  {
    label: 'Caterpillar',
    symbol: '🐛',
    text: 'The caterpillar eats leaves and grows.',
  },
  {
    label: 'Chrysalis',
    symbol: '🌿',
    text: 'Inside the chrysalis, the body changes.',
  },
  {
    label: 'Butterfly',
    symbol: '🦋',
    text: 'A butterfly emerges and unfolds its wings.',
  },
] as const;
export const spaceObjects = [
  {
    label: 'Earth',
    symbol: '🌍',
    fact: 'Our home planet. Look for oceans, land and clouds.',
    task: 'Find our home planet.',
    image: 'earth',
  },
  {
    label: 'Sun',
    symbol: '☀️',
    fact: 'Our nearest star makes light and warmth. Never look straight at it.',
    task: 'Find the star that gives us light.',
    image: null,
  },
  {
    label: 'Moon',
    symbol: '🌕',
    fact: 'Our Moon reflects sunlight and travels around Earth.',
    task: 'Find the object that travels around Earth.',
    image: 'moon',
  },
] as const;

export const livingCards = [
  {
    name: 'Tree',
    symbol: '🌳',
    living: true,
    why: 'A tree grows and needs water and air.',
  },
  {
    name: 'Toy car',
    symbol: '🚗',
    living: false,
    why: 'A toy car can move, but it does not grow or need food.',
  },
  {
    name: 'Butterfly',
    symbol: '🦋',
    living: true,
    why: 'A butterfly is an animal. It grows through its life cycle.',
  },
  {
    name: 'Rock',
    symbol: '🪨',
    living: false,
    why: 'A rock is not alive. It does not need food or water.',
  },
  {
    name: 'Sunflower',
    symbol: '🌻',
    living: true,
    why: 'A sunflower is a living plant.',
  },
  {
    name: 'Ball',
    symbol: '⚽',
    living: false,
    why: 'A ball can roll, but it is not alive.',
  },
] as const;
export const bodyCards = [
  {
    name: 'Eyes',
    symbol: '👀',
    task: 'Find the part that can help us see shapes.',
    fact: 'Eyes can help us see shapes and colours.',
  },
  {
    name: 'Nose',
    symbol: '👃',
    task: 'Find the part that helps us notice smells.',
    fact: 'The nose helps us breathe and notice smells.',
  },
  {
    name: 'Hands',
    symbol: '✋',
    task: 'Find the parts that can feel a soft cloth.',
    fact: 'Hands can feel textures and help us communicate.',
  },
] as const;
export const weatherCards = [
  {
    name: 'Sunny',
    symbol: '☀️',
    item: 'Sun hat',
    itemSymbol: '👒',
    fact: 'A hat and shade help on a sunny day.',
  },
  {
    name: 'Rainy',
    symbol: '🌧️',
    item: 'Raincoat',
    itemSymbol: '🧥',
    fact: 'A raincoat helps keep us dry.',
  },
  {
    name: 'Cold',
    symbol: '❄️',
    item: 'Warm scarf',
    itemSymbol: '🧣',
    fact: 'Warm clothes help keep us warm on a cold day.',
  },
] as const;

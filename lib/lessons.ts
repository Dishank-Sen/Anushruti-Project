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

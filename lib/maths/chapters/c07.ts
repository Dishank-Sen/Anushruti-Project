import type { MathsChapter } from '../types.ts';

export const chapter07: MathsChapter = {
  id: 'maths-c07',
  number: 7,
  title: "Lina's Family",
  hindiTitle: 'लीना का परिवार',
  blurb: 'Compare heights, heavier vs lighter, and measure with handspans.',
  icon: '📏',
  themeColor: '#06B6D4',
  status: 'ready',
  ncertPage: 78,
  islVocab: [
    {
      word: 'Long / Tall',
      hindiWord: 'लंबा / ऊँचा',
      handShape: 'Open hand rises upward from chest level',
      movement: 'Moves straight up to show height',
      description: 'Sign indicates vertical height.',
    },
    {
      word: 'Short',
      hindiWord: 'छोटा',
      handShape: 'Flat hand held low near waist',
      movement: 'Gentle downward pat',
      description: 'Indicates shorter height.',
    },
    {
      word: 'Heavy',
      hindiWord: 'भारी',
      handShape: 'Both cupped hands pretend to lift heavy stone',
      movement: 'Hands dip down as if pulled by weight',
      description: 'Sign expresses weight and effort.',
    },
    {
      word: 'Handspan',
      hindiWord: 'बित्ता',
      handShape: 'Thumb and little finger stretched wide',
      movement: 'Pivots across surface like measuring',
      description: 'Traditional span from thumb to pinky tip.',
    },
  ],
  lessons: [
    {
      id: 'family-heights',
      chapterId: 'maths-c07',
      grade: 1,
      title: 'Taller and shorter',
      description: 'Compare family members standing side by side.',
      minutes: 4,
      toolkitType: 'compare-sets',
      steps: [
        {
          visual: '👨 👧',
          title: 'Father and Lina',
          text: 'Father is tall. Lina is shorter.',
        },
        {
          visual: '🦒  🐕',
          title: 'Giraffe and puppy',
          text: 'The giraffe is tall. The puppy is short.',
        },
        {
          visual: '🪜  🪑',
          title: 'Ladder and stool',
          text: 'The ladder is taller than the stool.',
        },
      ],
      question: {
        prompt: 'Between a giraffe and a puppy, which is taller? 🦒 🐕',
        options: ['The giraffe', 'The puppy', 'Both are same'],
        answer: 0,
        hint: 'The giraffe can reach high tree leaves.',
        hintLadder: {
          hint1: 'Look at the long neck of the giraffe.',
          hint2: 'The giraffe stands high in the sky.',
          hint3WorkedOut: 'Correct: The giraffe is taller.',
        },
      },
      teacherNote: 'Have students stand back-to-back in pairs to compare height visually.',
    },
    {
      id: 'measuring-handspans',
      chapterId: 'maths-c07',
      grade: 1,
      title: 'Measure with your handspan',
      description: 'Count how many handspans fit across the table.',
      minutes: 4,
      toolkitType: 'measure-units',
      steps: [
        {
          visual: '✋ 🖐️ 🖐️',
          title: 'One handspan',
          text: 'A handspan stretches from thumb to pinky tip.',
        },
        {
          visual: '🪑 [🖐️ 🖐️ 🖐️]',
          title: 'Measure table',
          text: 'The study table is 5 handspans wide.',
        },
        {
          visual: '📖 [🖐️ 🖐️]',
          title: 'Measure book',
          text: 'The storybook is 2 handspans long.',
        },
      ],
      question: {
        prompt: 'If a desk is 5 handspans and a pencil is 1 handspan, which is longer? 🪑 ✏️',
        options: ['The desk (5 handspans)', 'The pencil (1 handspan)', 'They are equal'],
        answer: 0,
        hint: '5 handspans is much more than 1 handspan.',
        hintLadder: {
          hint1: '5 is greater than 1.',
          hint2: 'More handspans mean greater length.',
          hint3WorkedOut: 'Correct: The desk is longer (5 handspans).',
        },
      },
      teacherNote: 'Have learners measure their textbooks using their own handspans.',
    },
  ],
};

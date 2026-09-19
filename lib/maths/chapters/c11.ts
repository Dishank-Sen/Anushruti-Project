import type { MathsChapter } from '../types.ts';

export const chapter11: MathsChapter = {
  id: 'maths-c11',
  number: 11,
  title: 'How Many Times?',
  hindiTitle: 'कितनी बार?',
  blurb: 'Equal groups of swings, toy trains, and sweet jalebi plates.',
  icon: '🎠',
  themeColor: '#14B8A6',
  status: 'ready',
  ncertPage: 126,
  islVocab: [
    {
      word: 'Times / Repeat',
      hindiWord: 'बार / दोहराना',
      handShape: 'Dominant hand leaps repeatedly over index finger',
      movement: 'Rhythmic repeated hops',
      description: 'Sign indicates doing or counting something repeatedly.',
    },
    {
      word: 'Group / Pair',
      hindiWord: 'समूह / जोड़ा',
      handShape: 'Both cupped hands circle to encircle a cluster',
      movement: 'Gathers items into clear distinct sets',
      description: 'Sign shows gathering into equal sets.',
    },
    {
      word: 'Altogether',
      hindiWord: 'सब मिलाकर',
      handShape: 'Both open hands sweep inwards together into center',
      movement: 'Unites all scattered groups into one total',
      description: 'Shows combining all groups for the final sum.',
    },
  ],
  lessons: [
    {
      id: 'equal-groups-swings',
      chapterId: 'maths-c11',
      grade: 1,
      title: 'Children on horse swings',
      description: 'Count pairs of children riding colorful park swings.',
      minutes: 4,
      toolkitType: 'compare-sets',
      steps: [
        {
          visual: '🎠 (2 children)',
          title: 'One swing',
          text: 'One swing carries 2 happy children.',
        },
        {
          visual: '🎠 🎠 (2 + 2 = 4)',
          title: 'Two swings',
          text: '2 swings carry 2 and 2. That makes 4.',
        },
        {
          visual: '🎠 🎠 🎠 (2 + 2 + 2 = 6)',
          title: 'Three swings',
          text: '3 swings carry 2, 2, and 2. That makes 6.',
        },
      ],
      question: {
        prompt: '3 swings have 2 children each. How many children altogether? 🎠',
        options: ['6 children', '5 children', '4 children'],
        answer: 0,
        hint: 'Count by twos: 2, 4, 6.',
        hintLadder: {
          hint1: '2 + 2 + 2 = ?',
          hint2: 'Double two is 4, plus two more is 6.',
          hint3WorkedOut: 'Correct: 3 groups of 2 = 6 children.',
        },
      },
      teacherNote: 'Have children pair up two by two to physicalize counting by 2s.',
    },
    {
      id: 'plates-of-jalebis',
      chapterId: 'maths-c11',
      grade: 1,
      title: 'Plates of sweet jalebis',
      description: 'Count sweet treats grouped on festive plates.',
      minutes: 4,
      toolkitType: 'tap-to-count',
      steps: [
        {
          visual: '🍽️ (3 jalebis)',
          title: 'One plate',
          text: 'One plate holds 3 orange jalebis.',
        },
        {
          visual: '🍽️ 🍽️ (3 + 3 = 6)',
          title: 'Two plates',
          text: 'Two plates hold 3 and 3. That makes 6.',
        },
        {
          visual: '🍽️ 🍽️ 🍽️ (3 + 3 + 3 = 9)',
          title: 'Three plates',
          text: 'Three plates hold 9 sweet jalebis altogether.',
        },
      ],
      question: {
        prompt: '2 plates with 3 sweets each have how many sweets in total? 🍽️',
        options: ['6 sweets', '5 sweets', '8 sweets'],
        answer: 0,
        hint: '3 plus 3 makes 6.',
        hintLadder: {
          hint1: 'Add 3 from first plate and 3 from second plate.',
          hint2: '3 + 3 = 6.',
          hint3WorkedOut: 'Correct: 2 plates of 3 sweets = 6 sweets.',
        },
      },
      teacherNote: 'Use paper plates and clay spirals to practice equal grouping.',
    },
  ],
};

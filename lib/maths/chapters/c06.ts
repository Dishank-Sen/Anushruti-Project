import type { MathsChapter } from '../types.ts';

export const chapter06: MathsChapter = {
  id: 'maths-c06',
  number: 6,
  title: 'Vegetable Farm',
  hindiTitle: 'सब्ज़ी की बगिया',
  blurb: 'Count carrots, tomatoes, and pumpkins in two baskets up to 20.',
  icon: '🥕',
  coverImage: '/images/maths/c06-time.svg',
  themeColor: '#84CC16',
  status: 'ready',
  ncertPage: 64,
  islVocab: [
    {
      word: 'Carrot',
      hindiWord: 'गाजर',
      handShape: 'Curved fist pretending to hold and nibble a carrot',
      movement: 'Gentle tap near chin like eating fresh carrot',
      description: 'Sign imitates holding a crunchy carrot.',
    },
    {
      word: 'Basket',
      hindiWord: 'टोकरी',
      handShape: 'Both cupped hands hold an imaginary basket handle',
      movement: 'Hands show deep rounded basket shape',
      description: 'Outlines a wide woven basket.',
    },
    {
      word: 'More',
      hindiWord: 'ज़्यादा',
      handShape: 'Flat fingertips tap together repeatedly',
      movement: 'Hands touch tips to express abundance',
      description: 'Sign indicates extra quantity or addition.',
    },
  ],
  lessons: [
    {
      id: 'two-vegetable-baskets',
      chapterId: 'maths-c06',
      grade: 1,
      title: 'Two vegetable baskets',
      description: 'Combine carrots from two different farm baskets.',
      minutes: 5,
      toolkitType: 'tap-to-build-equation',
      steps: [
        {
          visual: '🧺 (7 carrots)',
          title: 'First basket',
          text: 'First basket holds 7 orange carrots.',
        },
        {
          visual: '🧺 (5 carrots)',
          title: 'Second basket',
          text: 'Second basket holds 5 crunchy carrots.',
        },
        {
          visual: '🧺 (7) + 🥕🥕🥕 (3) = 10\n+ 🥕🥕 (2) = 12',
          title: 'Make 10 first',
          text: '7 plus 3 makes 10, plus 2 more makes 12.',
        },
      ],
      question: {
        prompt: '7 carrots and 5 carrots together make… 🥕',
        options: ['12 carrots', '10 carrots', '15 carrots'],
        answer: 0,
        hint: 'Start with 7, add 3 to get 10, then add 2 more.',
        hintLadder: {
          hint1: '7 + 3 = 10.',
          hint2: '10 + 2 = 12.',
          hint3WorkedOut: 'Correct: 7 + 5 = 12 carrots.',
        },
      },
      teacherNote: 'Encourage making a ten first when adding numbers larger than 5.',
    },
    {
      id: 'vegetable-count-on',
      chapterId: 'maths-c06',
      grade: 1,
      title: 'Count on from the bigger number',
      description: 'Keep the big number in mind and count forward.',
      minutes: 5,
      toolkitType: 'number-strip',
      steps: [
        {
          visual: '🧠 9  +  👆 4',
          title: 'Remember 9',
          text: 'Keep 9 in mind, then count on 4 fingers.',
        },
        {
          visual: '9 → 10 → 11 → 12 → 13',
          title: 'Count on',
          text: 'Count on: ten, eleven, twelve, thirteen.',
        },
        {
          visual: '9 + 4 = 13',
          title: 'Thirteen total',
          text: '9 plus 4 equals 13 sweet tomatoes.',
        },
      ],
      question: {
        prompt: 'Count on from 9 by 4 steps: 9 + 4 = ?',
        options: ['13', '12', '14'],
        answer: 0,
        hint: 'Say 9, then tap four times: 10, 11, 12, 13.',
        hintLadder: {
          hint1: 'Tap four fingers: 10, 11, 12, 13.',
          hint2: '9 + 4 = 13.',
          hint3WorkedOut: 'Correct: 9 + 4 = 13.',
        },
      },
      teacherNote: 'Show the "finger tap on forehead" cue for holding the larger number.',
    },
  ],
};

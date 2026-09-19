import type { MathsChapter } from '../types.ts';

export const chapter11: MathsChapter = {
  id: 'maths-c11',
  number: 11,
  title: 'How Many Times?',
  blurb: 'Equal groups of swings, toy trains, and sweet jalebi plates.',
  icon: '🎠',
  coverImage: '/images/maths/c11.webp',
  themeColor: '#14B8A6',
  status: 'ready',
  ncertPage: 126,
  islVocab: [
    {
      word: 'Times / Repeat',
      handShape: 'Dominant hand leaps repeatedly over index finger',
      movement: 'Rhythmic repeated hops',
      description: 'Sign indicates doing or counting something repeatedly.',
    },
    {
      word: 'Group / Pair',
      handShape: 'Both cupped hands circle to encircle a cluster',
      movement: 'Gathers items into clear distinct sets',
      description: 'Sign shows gathering into equal sets.',
    },
    {
      word: 'Altogether',
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
        prompt: 'If 4 swings each carry 2 children, how many children in all? 🎠',
        options: ['8 children', '6 children', '10 children'],
        answer: 0,
        hint: 'Count by twos: 2, 4, 6, 8.',
        hintLadder: {
          hint1: '2 children on each of 4 swings.',
          hint2: '2 + 2 + 2 + 2 = 8.',
          hint3WorkedOut: 'Correct: 8 children in all.',
        },
      },
      teacherNote: 'Let children stand in pairs and count total students by skipping twos.',
    },
    {
      id: 'jalebi-plates',
      chapterId: 'maths-c11',
      grade: 1,
      title: 'Sweet jalebi plates',
      description: 'Count groups of three sweet crispy jalebis.',
      minutes: 4,
      toolkitType: 'tap-to-build-equation',
      steps: [
        {
          visual: '🍽️ (3 jalebis)',
          title: 'Plate one',
          text: 'One shiny plate holds 3 golden jalebis.',
        },
        {
          visual: '🍽️ 🍽️ (3 + 3 = 6)',
          title: 'Two plates',
          text: 'Two plates hold 3 and 3. That is 6.',
        },
        {
          visual: '🍽️ 🍽️ 🍽️ (3 + 3 + 3 = 9)',
          title: 'Three plates',
          text: 'Three plates hold 9 sweet jalebis altogether.',
        },
      ],
      question: {
        prompt: '3 plates each have 3 sweets. How many sweets total? 🍽️',
        options: ['9 sweets', '6 sweets', '12 sweets'],
        answer: 0,
        hint: 'Skip count by threes: 3, 6, 9.',
        hintLadder: {
          hint1: '3 + 3 = 6, plus 3 more.',
          hint2: '3 + 3 + 3 = 9.',
          hint3WorkedOut: 'Correct: 9 sweets in total.',
        },
      },
      teacherNote: 'Use paper plates and buttons to physically group by threes.',
    },
    {
      id: 'bicycle-wheels-puzzle',
      chapterId: 'maths-c11',
      grade: 1,
      title: 'Problem solving: Bicycle wheels',
      description: 'Count equal groups of wheels on bicycles.',
      minutes: 5,
      toolkitType: 'compare-sets',
      steps: [
        {
          visual: '🚲 (2 wheels)',
          title: 'One bicycle',
          text: 'One bicycle rolls on 2 round wheels.',
        },
        {
          visual: '🚲 🚲 🚲 (3 bicycles)',
          title: 'Three bicycles parked',
          text: 'Three bicycles stand parked by the school gate.',
        },
        {
          visual: '2 + 2 + 2 = 6 🚲',
          title: 'Count all wheels',
          text: 'Two, four, six: six wheels altogether.',
        },
      ],
      question: {
        prompt: '3 bicycles are parked outside. Each has 2 wheels. Total wheels? 🚲',
        options: ['6 wheels', '5 wheels', '8 wheels'],
        answer: 0,
        hint: 'Skip count by twos: 2, 4, 6.',
        hintLadder: {
          hint1: '3 groups of 2 wheels.',
          hint2: '2 + 2 + 2 = 6.',
          hint3WorkedOut: 'Correct: 6 wheels in all.',
        },
      },
      teacherNote: 'Have students draw bicycles and circle wheels in pairs.',
    },
    {
      id: 'flower-petals-puzzle',
      chapterId: 'maths-c11',
      grade: 1,
      title: 'Problem solving: Garden flower petals',
      description: 'Count groups of five petals on garden flowers.',
      minutes: 5,
      toolkitType: 'tap-to-build-equation',
      steps: [
        {
          visual: '🌸 (5 petals)',
          title: 'One flower',
          text: 'One jasmine flower has 5 delicate petals.',
        },
        {
          visual: '🌸 🌸 🌸 🌸 (4 flowers)',
          title: 'Four flowers in vase',
          text: 'Four fresh flowers bloom in the ceramic vase.',
        },
        {
          visual: '5 + 5 + 5 + 5 = 20 🌸',
          title: 'Count by fives',
          text: 'Five, ten, fifteen, twenty petals in all.',
        },
      ],
      question: {
        prompt: '4 flowers each have 5 petals. How many petals altogether? 🌸',
        options: ['20 petals', '15 petals', '25 petals'],
        answer: 0,
        hint: 'Count by fives 4 times: 5, 10, 15, 20.',
        hintLadder: {
          hint1: '5 + 5 = 10. Repeat for the other two.',
          hint2: '10 + 10 = 20.',
          hint3WorkedOut: 'Correct: 20 petals altogether.',
        },
      },
      teacherNote: 'Let learners use their 5 fingers to represent each flower.',
    },
  ],
};

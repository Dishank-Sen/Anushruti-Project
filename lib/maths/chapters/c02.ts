import type { MathsChapter } from '../types.ts';

export const chapter02: MathsChapter = {
  id: 'maths-c02',
  number: 2,
  title: 'What is Long? What is Round?',
  blurb: 'Discover round balls, long pencils, rolling, and sliding.',
  icon: '⚽',
  coverImage: '/images/maths/c02.webp',
  themeColor: '#4ECDC4',
  status: 'ready',
  ncertPage: 8,
  islVocab: [
    { word: 'Round' },
    { word: 'Long' },
    { word: 'Roll' },
    { word: 'Slide' },
  ],
  lessons: [
    {
      id: 'round-and-long',
      chapterId: 'maths-c02',
      grade: 1,
      title: 'Round and long things',
      description:
        'Sort objects that are round like balls or long like pencils.',
      minutes: 4,
      toolkitType: 'sort-buckets',
      steps: [
        {
          visual: '⚽ 🟠',
          title: 'Round ball',
          text: 'A ball is curved and round all over.',
        },
        {
          visual: '✏️ 📏',
          title: 'Long pencil',
          text: 'A pencil and ruler are long and straight.',
        },
        {
          visual: '🪙 🪵',
          title: 'Coin and log',
          text: 'A coin is round. A stick is long.',
        },
      ],
      question: {
        prompt: 'Which of these is round? ⚽ or 📏',
        options: ['The football', 'The ruler', 'The box'],
        answer: 0,
        hint: 'Round objects roll smoothly like a wheel.',
        hintLadder: {
          hint1: 'Look for the shape with curved edges.',
          hint2: 'A ball has no corners.',
          hint3WorkedOut: 'Correct: The football is round.',
        },
      },
      teacherNote:
        'Provide blindfold feely-bag activities with everyday classroom items.',
    },
    {
      id: 'roll-and-slide',
      chapterId: 'maths-c02',
      grade: 1,
      title: 'Rolling and sliding',
      description: 'See what rolls down a slope and what slides.',
      minutes: 4,
      toolkitType: 'shape-spotter',
      steps: [
        {
          visual: '🛝 ⚽ 💨',
          title: 'Ball rolls down',
          text: 'A round ball rolls down the slide.',
        },
        {
          visual: '🛝 📦 ⬇️',
          title: 'Box slides down',
          text: 'A flat box slides down on its side.',
        },
        {
          visual: '🛝 🪙 🔄',
          title: 'Coin rolls and slides',
          text: 'A coin can roll on edge or slide flat.',
        },
      ],
      question: {
        prompt: 'What happens to a flat wooden box on a ramp? 📦',
        options: ['It slides down', 'It rolls like a ball', 'It flies up'],
        answer: 0,
        hint: 'Its flat surface stays in touch with the slope.',
        hintLadder: {
          hint1: 'Does a box have wheels or corners?',
          hint2: 'Flat bottoms glide along the slope.',
          hint3WorkedOut: 'Correct: The box slides down flat.',
        },
      },
      teacherNote:
        'Build a cardboard ramp so students can test erasers, sharpeners, and bottle caps.',
    },
    {
      id: 'roll-or-slide-mystery',
      chapterId: 'maths-c02',
      grade: 1,
      title: 'Problem solving: Roll or slide?',
      description: 'Find an object that can do both actions.',
      minutes: 5,
      toolkitType: 'shape-spotter',
      steps: [
        {
          visual: '🪙 ➡️ 🛝',
          title: 'Flat face slides',
          text: 'Place a coin flat and it slides smoothly.',
        },
        {
          visual: '🪙 🔄 ⚽',
          title: 'Curved edge rolls',
          text: 'Turn a coin on edge and it rolls.',
        },
        {
          visual: '🪙 ✨',
          title: 'Both movements',
          text: 'A coin can both slide and roll.',
        },
      ],
      question: {
        prompt: 'Which object can BOTH roll on edge and slide flat? 🪙',
        options: ['A round coin', 'A wooden block', 'A football'],
        answer: 0,
        hint: 'It has flat faces and a round rim.',
        hintLadder: {
          hint1: 'Think of something in your pocket or piggy bank.',
          hint2: 'A coin slides on its face and rolls on rim.',
          hint3WorkedOut: 'Correct: A round coin can do both.',
        },
      },
      teacherNote:
        'Provide coins and bottle caps on a wooden ramp to test both motions.',
    },
    {
      id: 'stacking-tower-challenge',
      chapterId: 'maths-c02',
      grade: 1,
      title: 'Problem solving: Building a tower',
      description: 'Select the right shapes to stack high without falling.',
      minutes: 5,
      toolkitType: 'sort-buckets',
      steps: [
        {
          visual: '📦\n📦\n📦',
          title: 'Flat boxes stack',
          text: 'Flat boxes stack safely on top of each other.',
        },
        {
          visual: '⚽\n⚽ ❌ 💨',
          title: 'Round balls roll',
          text: 'Round balls roll off and tumble down.',
        },
        {
          visual: '📦 📦 📦 🏰',
          title: 'Sturdy tower',
          text: 'Flat surfaces make a steady, tall tower.',
        },
      ],
      question: {
        prompt: 'Which shapes should you choose to build a stable tower? 📦',
        options: [
          'Flat wooden blocks',
          'Smooth round marbles',
          'Inflated balloons',
        ],
        answer: 0,
        hint: 'Choose shapes with flat faces that do not roll.',
        hintLadder: {
          hint1: 'Look for surfaces that rest flat together.',
          hint2: 'Flat blocks balance safely without rolling.',
          hint3WorkedOut: 'Correct: Flat wooden blocks stack best.',
        },
      },
      teacherNote: 'Have learners try stacking books versus balls on a table.',
    },
  ],
};

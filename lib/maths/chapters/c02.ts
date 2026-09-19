import type { MathsChapter } from '../types.ts';

export const chapter02: MathsChapter = {
  id: 'maths-c02',
  number: 2,
  title: 'What is Long? What is Round?',
  hindiTitle: 'क्या है लंबा? क्या है गोल?',
  blurb: 'Discover round balls, long pencils, rolling, and sliding.',
  icon: '⚽',
  themeColor: '#4ECDC4',
  status: 'ready',
  ncertPage: 8,
  islVocab: [
    {
      word: 'Round',
      hindiWord: 'गोल',
      handShape: 'C-handshape drawing a circle in air',
      movement: 'Traces a complete smooth circular loop',
      description: 'Sign indicates round spherical or circular contour.',
    },
    {
      word: 'Long',
      hindiWord: 'लंबा',
      handShape: 'Both open index fingers pull apart horizontally',
      movement: 'Hands stretch out to show length',
      description: 'Indicates length stretching from end to end.',
    },
    {
      word: 'Roll',
      hindiWord: 'लुढ़कना',
      handShape: 'Curved hands tumble over each other',
      movement: 'Hands roll forward smoothly like a wheel',
      description: 'Sign represents continuous rolling motion.',
    },
    {
      word: 'Slide',
      hindiWord: 'सरकना',
      handShape: 'Flat hand glides across another flat palm',
      movement: 'Hand slides smoothly without turning over',
      description: 'Sign indicates flat gliding along a ramp.',
    },
  ],
  lessons: [
    {
      id: 'round-and-long',
      chapterId: 'maths-c02',
      grade: 1,
      title: 'Round and long things',
      description: 'Sort objects that are round like balls or long like pencils.',
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
      teacherNote: 'Provide blindfold feely-bag activities with everyday classroom items.',
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
      teacherNote: 'Build a cardboard ramp so students can test erasers, sharpeners, and bottle caps.',
    },
  ],
};

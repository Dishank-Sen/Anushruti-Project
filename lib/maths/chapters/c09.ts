import type { MathsChapter } from '../types.ts';

export const chapter09: MathsChapter = {
  id: 'maths-c09',
  number: 9,
  title: 'Utsav',
  hindiTitle: 'उत्सव',
  blurb: 'Rangoli patterns, festival torans, and repeating shapes.',
  icon: '🪔',
  themeColor: '#EC4899',
  status: 'ready',
  ncertPage: 104,
  islVocab: [
    {
      word: 'Pattern',
      hindiWord: 'पैटर्न / नमूना',
      handShape: 'Fingers trace a repeating wave pattern in air',
      movement: 'Rhythmic repeated waving arcs',
      description: 'Sign shows predictable recurring repetition.',
    },
    {
      word: 'Festival / Utsav',
      hindiWord: 'उत्सव / त्योहार',
      handShape: 'Both open hands flutter upward like fireworks',
      movement: 'Hands expand with joyous celebration',
      description: 'Sign indicates bright festival joy.',
    },
    {
      word: 'Next',
      hindiWord: 'अगला',
      handShape: 'Dominant hand leaps forward over non-dominant hand',
      movement: 'Leaps forward to point to the next place',
      description: 'Shows following step in a sequence.',
    },
  ],
  lessons: [
    {
      id: 'festival-toran-patterns',
      chapterId: 'maths-c09',
      grade: 1,
      title: 'Festival door hanging (Toran)',
      description: 'Find what shape comes next in the festival toran.',
      minutes: 4,
      toolkitType: 'pattern-builder',
      steps: [
        {
          visual: '🍃 🌸 🍃 🌸 🍃 🌸',
          title: 'Leaf and flower',
          text: 'Leaf, flower, leaf, flower repeat along the string.',
        },
        {
          visual: '🔴 🟡 🔴 🟡 🔴 🟡',
          title: 'Color pattern',
          text: 'Red marigold, yellow marigold, red, yellow.',
        },
        {
          visual: '🔺 🔵 🔺 🔵 🔺 ?',
          title: 'What comes next?',
          text: 'Triangle, circle, triangle, circle. What comes next?',
        },
      ],
      question: {
        prompt: 'What comes next? 🍃 🌸 🍃 🌸 🍃 ...',
        options: ['🌸 Pink flower', '🍃 Green leaf', '⭐ Star'],
        answer: 0,
        hint: 'After every green leaf comes a pink flower.',
        hintLadder: {
          hint1: 'Look at the rhythm: Leaf, Flower, Leaf, Flower, Leaf...',
          hint2: 'A flower follows each leaf.',
          hint3WorkedOut: 'Correct: 🌸 Pink flower comes next.',
        },
      },
      teacherNote: 'String real mango leaves and paper flowers to decorate the door.',
    },
    {
      id: 'rangoli-shapes',
      chapterId: 'maths-c09',
      grade: 1,
      title: 'Rangoli dot patterns',
      description: 'Discover symmetry and repeating dots in floor art.',
      minutes: 4,
      toolkitType: 'pattern-builder',
      steps: [
        {
          visual: '· · · ·\n· · · ·\n· · · ·',
          title: 'Dot grid',
          text: 'Artists start rangoli with tidy rows of dots.',
        },
        {
          visual: '⭕ 🔲 ⭕ 🔲 ⭕',
          title: 'Border design',
          text: 'Circles and squares border the colorful rangoli.',
        },
        {
          visual: '🪔 🪔 🪔',
          title: 'Diya lights',
          text: 'Little clay lamps light up the corners.',
        },
      ],
      question: {
        prompt: 'Which shape continues this rangoli border? ⭕ 🔲 ⭕ 🔲 ...',
        options: ['⭕ Circle', '🔲 Square', '🔺 Triangle'],
        answer: 0,
        hint: 'Circle, Square, Circle, Square...',
        hintLadder: {
          hint1: 'The pattern alternates between circle and square.',
          hint2: 'After the square comes a circle.',
          hint3WorkedOut: 'Correct: ⭕ Circle continues the pattern.',
        },
      },
      teacherNote: 'Provide chalk or rangoli powder stencils on black paper.',
    },
  ],
};

import type { MathsChapter } from '../types.ts';

export const chapter09: MathsChapter = {
  id: 'maths-c09',
  number: 9,
  title: 'Utsav',
  blurb: 'Rangoli patterns, festival torans, and repeating shapes.',
  icon: '🪔',
  coverImage: '/images/maths/c09.webp',
  themeColor: '#EC4899',
  status: 'ready',
  ncertPage: 104,
  islVocab: [
    {
      word: 'Pattern',
      handShape: 'Fingers trace a repeating wave pattern in air',
      movement: 'Rhythmic repeated waving arcs',
      description: 'Sign shows predictable recurring repetition.',
    },
    {
      word: 'Festival / Utsav',
      handShape: 'Both open hands flutter upward like fireworks',
      movement: 'Hands expand with joyous celebration',
      description: 'Sign indicates bright festival joy.',
    },
    {
      word: 'Next',
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
        prompt: 'In the toran pattern 🍃 🌸 🍃 🌸 🍃 … what comes next?',
        options: ['🌸 Pink flower', '🍃 Green leaf', '⭐ Gold star'],
        answer: 0,
        hint: 'After every green leaf comes a pink flower.',
        hintLadder: {
          hint1: 'Say the rhythm: leaf, flower, leaf, flower...',
          hint2: 'A flower always follows a leaf.',
          hint3WorkedOut: 'Correct: 🌸 Pink flower comes next.',
        },
      },
      teacherNote: 'Make real paper torans with cutout leaves and marigolds.',
    },
    {
      id: 'rangoli-shapes',
      chapterId: 'maths-c09',
      grade: 1,
      title: 'Floor art (Rangoli)',
      description: 'Count triangles and dots in colourful rangoli designs.',
      minutes: 4,
      toolkitType: 'shape-spotter',
      steps: [
        {
          visual: '⚪ ⚪ ⚪\n⚪ ⚪ ⚪\n⚪ ⚪ ⚪',
          title: 'Grid of nine dots',
          text: 'Nine white chalk dots form the base square.',
        },
        {
          visual: '🔺 🔺 🔺 🔺',
          title: 'Four petal points',
          text: 'Four triangle petals branch to each direction.',
        },
        {
          visual: '🪔 (diya at center)',
          title: 'Diya in center',
          text: 'One glowing lamp sits in the middle.',
        },
      ],
      question: {
        prompt: 'How many triangles make the four petal points? 🔺',
        options: ['4 triangles', '2 triangles', '8 triangles'],
        answer: 0,
        hint: 'One triangle points north, south, east, and west.',
        hintLadder: {
          hint1: 'Count the triangle points: 1, 2, 3, 4.',
          hint2: '4 petals = 4 triangles.',
          hint3WorkedOut: 'Correct: 4 triangles make the points.',
        },
      },
      teacherNote: 'Draw chalk grids in the courtyard for students to join dots.',
    },
    {
      id: 'rangoli-petals-puzzle',
      chapterId: 'maths-c09',
      grade: 1,
      title: 'Problem solving: Rangoli petals',
      description: 'Count the inner and outer petals of the festive design.',
      minutes: 5,
      toolkitType: 'tap-to-build-equation',
      steps: [
        {
          visual: '🌸 🌸 🌸 🌸 (4 inner petals)',
          title: 'Inner petal ring',
          text: 'The inner flower ring has 4 pink petals.',
        },
        {
          visual: '🌼 🌼 🌼 🌼 🌼 🌼 (6 outer petals)',
          title: 'Outer petal ring',
          text: 'The outer flower ring has 6 golden petals.',
        },
        {
          visual: '4 + 6 = 10 🌸',
          title: 'Total petals',
          text: 'Four plus six equals ten petals in the rangoli.',
        },
      ],
      question: {
        prompt: 'A rangoli has 4 inner petals and 6 outer petals. How many petals in all? 🌸',
        options: ['10 petals', '8 petals', '12 petals'],
        answer: 0,
        hint: 'Add 4 and 6 together.',
        hintLadder: {
          hint1: '4 and 6 are friends of 10.',
          hint2: '4 + 6 = 10.',
          hint3WorkedOut: 'Correct: 10 petals in all.',
        },
      },
      teacherNote: 'Use flower petals on floor paper to practice combinations of ten.',
    },
    {
      id: 'diya-lighting-problem',
      chapterId: 'maths-c09',
      grade: 1,
      title: 'Problem solving: Lighting festive lamps',
      description: 'Find total lamps lit in two parts of the house.',
      minutes: 5,
      toolkitType: 'tap-to-build-equation',
      steps: [
        {
          visual: '🪔 🪔 🪔 🪔 🪔 🪔 🪔 🪔 🪔 🪔 (10)',
          title: 'Verandah diyas',
          text: 'Ten glowing diyas line the verandah steps.',
        },
        {
          visual: '🪔 🪔 🪔 🪔 🪔 🪔 🪔 🪔 (8)',
          title: 'Courtyard diyas',
          text: 'Eight bright diyas shine in the open courtyard.',
        },
        {
          visual: '10 + 8 = 18 🪔',
          title: 'Total glowing lamps',
          text: 'Ten and eight make eighteen festival lamps.',
        },
      ],
      question: {
        prompt: 'Meena lights 10 diyas on the steps and 8 in the courtyard. Total diyas? 🪔',
        options: ['18 diyas', '15 diyas', '20 diyas'],
        answer: 0,
        hint: '10 plus 8 ones.',
        hintLadder: {
          hint1: '10 + 8 = ?',
          hint2: 'Ten and eight make eighteen.',
          hint3WorkedOut: 'Correct: 18 diyas shine brightly.',
        },
      },
      teacherNote: 'Have learners place small clay lamps on desks and count in groups.',
    },
  ],
};

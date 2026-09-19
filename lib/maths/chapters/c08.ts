import type { MathsChapter } from '../types.ts';

export const chapter08: MathsChapter = {
  id: 'maths-c08',
  number: 8,
  title: 'Fun with Numbers',
  hindiTitle: 'संख्याओं का खेल',
  blurb: 'Build numbers 21 to 99 using bundles of ten and loose sticks.',
  icon: '🧮',
  themeColor: '#8B5CF6',
  status: 'ready',
  ncertPage: 90,
  islVocab: [
    {
      word: 'Tens',
      hindiWord: 'दहाई',
      handShape: 'Shows bundles with both hands',
      movement: 'Presents distinct grouped tens',
      description: 'Sign indicates groups of ten.',
    },
    {
      word: 'Ones',
      hindiWord: 'इकाई',
      handShape: 'Single finger tapping for each loose unit',
      movement: 'Taps single loose units one by one',
      description: 'Indicates individual single units.',
    },
    {
      word: 'Twenty',
      hindiWord: 'बीस',
      handShape: 'Two open hands of five shown twice',
      movement: 'Two tens presented sequentially',
      description: 'Sign shows two full tens (20).',
    },
  ],
  lessons: [
    {
      id: 'bundles-of-ten-twenties',
      chapterId: 'maths-c08',
      grade: 1,
      title: 'Tens and ones',
      description: 'Count 2 bundles of ten and loose units.',
      minutes: 5,
      toolkitType: 'place-value-blocks',
      steps: [
        {
          visual: '🪵🪵 (2 tens) = 20',
          title: 'Two tens',
          text: 'Two bundles of ten make twenty.',
        },
        {
          visual: '🪵🪵 (2 tens) + 🥢🥢🥢 (3 ones) = 23',
          title: 'Twenty-three',
          text: 'Two tens and 3 ones make 23.',
        },
        {
          visual: '🪵🪵🪵 (3 tens) = 30',
          title: 'Three tens',
          text: 'Three bundles of ten make thirty.',
        },
      ],
      question: {
        prompt: '2 bundles of 10 and 5 loose sticks make… 🪵🥢',
        options: ['25', '20', '52'],
        answer: 0,
        hint: 'Two tens (20) plus five (5) is 25.',
        hintLadder: {
          hint1: 'Think of 2 tens as 20.',
          hint2: '20 + 5 = 25.',
          hint3WorkedOut: 'Correct: 2 tens and 5 ones make 25.',
        },
      },
      teacherNote: 'Use matchsticks tied with rubber bands to represent tens and ones.',
    },
    {
      id: 'hundred-chart-hops',
      chapterId: 'maths-c08',
      grade: 1,
      title: 'Counting to fifty and beyond',
      description: 'Hop down rows of 10 on the number chart.',
      minutes: 5,
      toolkitType: 'number-strip',
      steps: [
        {
          visual: '10 → 20 → 30 → 40 → 50',
          title: 'Count by tens',
          text: 'Jump by tens: ten, twenty, thirty, forty, fifty.',
        },
        {
          visual: '40 + 🥢🥢🥢🥢 = 44',
          title: 'Forty-four',
          text: 'Four tens and four ones make 44.',
        },
        {
          visual: '50 = 🖐️ tens',
          title: 'Fifty',
          text: 'Five full bundles of ten make 50.',
        },
      ],
      question: {
        prompt: 'What comes after 29 when counting forward?',
        options: ['30', '28', '40'],
        answer: 0,
        hint: 'After twenty-nine comes thirty.',
        hintLadder: {
          hint1: '27, 28, 29, ...',
          hint2: 'A new bundle of ten starts.',
          hint3WorkedOut: 'Correct: 30 comes after 29.',
        },
      },
      teacherNote: 'Display a large 1-100 wall chart and let children point with a pointer stick.',
    },
  ],
};

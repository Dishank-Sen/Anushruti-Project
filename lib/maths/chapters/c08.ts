import type { MathsChapter } from '../types.ts';

export const chapter08: MathsChapter = {
  id: 'maths-c08',
  number: 8,
  title: 'Fun with Numbers',
  blurb: 'Build numbers 21 to 99 using bundles of ten and loose sticks.',
  icon: '🧮',
  coverImage: '/images/maths/c08.webp',
  themeColor: '#8B5CF6',
  status: 'ready',
  ncertPage: 90,
  islVocab: [
    {
      word: 'Tens',
      handShape: 'Shows bundles with both hands',
      movement: 'Presents distinct grouped tens',
      description: 'Sign indicates groups of ten.',
    },
    {
      word: 'Ones',
      handShape: 'Single finger tapping for each loose unit',
      movement: 'Taps single loose units one by one',
      description: 'Indicates individual single units.',
    },
    {
      word: 'Twenty',
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
          visual: '🪵🪵 = 20',
          title: 'Two tens',
          text: 'Two bundles of ten make twenty.',
        },
        {
          visual: '🪵🪵 + 🥢🥢🥢 = 23',
          title: 'Twenty-three',
          text: 'Two tens and 3 ones make 23.',
        },
        {
          visual: '🪵🪵🪵 = 30',
          title: 'Three tens',
          text: 'Three bundles of ten make thirty.',
        },
      ],
      question: {
        prompt: '3 bundles of ten and 5 loose sticks make… 🪵',
        options: ['35', '53', '30'],
        answer: 0,
        hint: '3 tens is 30, plus 5 ones is 35.',
        hintLadder: {
          hint1: '3 tens = 30. Count 5 more.',
          hint2: '30 + 5 = 35.',
          hint3WorkedOut: 'Correct: 35.',
        },
      },
      teacherNote: 'Use matchsticks or toothpicks tied with thread into tens.',
    },
    {
      id: 'number-strips-forty',
      chapterId: 'maths-c08',
      grade: 1,
      title: 'Counting to fifty',
      description: 'Follow the number train from 20 up to 50.',
      minutes: 5,
      toolkitType: 'number-strip',
      steps: [
        {
          visual: '21 ➡️ 22 ➡️ 23 ➡️ 24',
          title: 'Twenties train',
          text: 'Hop forward one step at a time.',
        },
        {
          visual: '30 ➡️ 35 ➡️ 40',
          title: 'Tens and fives',
          text: 'Count by fives up the track.',
        },
        {
          visual: '48 ➡️ 49 ➡️ 50 🎉',
          title: 'Fifty reached',
          text: 'Five full tens make fifty.',
        },
      ],
      question: {
        prompt: 'What number comes right after 29? 🚂',
        options: ['30', '28', '39'],
        answer: 0,
        hint: 'After 29, the tens digit changes to 3.',
        hintLadder: {
          hint1: 'Count: 28, 29, …',
          hint2: 'One more than 29 is 30.',
          hint3WorkedOut: 'Correct: 30 comes after 29.',
        },
      },
      teacherNote: 'Create a floor hundred chart for stepping activities.',
    },
    {
      id: 'bead-garland-puzzle',
      chapterId: 'maths-c08',
      grade: 1,
      title: 'Problem solving: The bead garland',
      description: 'Calculate the total beads in a traditional garland.',
      minutes: 5,
      toolkitType: 'place-value-blocks',
      steps: [
        {
          visual: '📿 📿 📿 = 30',
          title: 'Three strings of ten',
          text: 'Three strings hold 10 beads each: 30.',
        },
        {
          visual: '⚪ ⚪ ⚪ ⚪ = 4',
          title: 'Four loose beads',
          text: 'Four shiny beads are added at the end.',
        },
        {
          visual: '30 + 4 = 34 📿',
          title: 'Full garland count',
          text: 'Three tens and four ones make thirty-four beads.',
        },
      ],
      question: {
        prompt: 'A garland has 3 strings of 10 beads and 4 loose beads. Total beads? 📿',
        options: ['34 beads', '43 beads', '7 beads'],
        answer: 0,
        hint: '3 tens is 30, plus 4 ones.',
        hintLadder: {
          hint1: '3 tens = 30.',
          hint2: '30 + 4 = 34.',
          hint3WorkedOut: 'Correct: 34 beads in total.',
        },
      },
      teacherNote: 'Let children string beads into groups of ten using pipe cleaners.',
    },
    {
      id: 'mystery-number-puzzle',
      chapterId: 'maths-c08',
      grade: 1,
      title: 'Problem solving: Mystery number between',
      description: 'Use number neighbors to uncover the secret number.',
      minutes: 5,
      toolkitType: 'number-strip',
      steps: [
        {
          visual: '34 ➡️ [ ? ] ➡️ 36',
          title: 'Between two numbers',
          text: 'The mystery number sits between 34 and 36.',
        },
        {
          visual: '34 + 1 = 35',
          title: 'One more than 34',
          text: 'Hop one step forward from 34.',
        },
        {
          visual: '36 - 1 = 35',
          title: 'One less than 36',
          text: 'Hop one step backward from 36.',
        },
      ],
      question: {
        prompt: 'Which number is 1 more than 34 and 1 less than 36? 🔢',
        options: ['35', '33', '37'],
        answer: 0,
        hint: 'It is the number right between 34 and 36.',
        hintLadder: {
          hint1: 'Count: 34, [ ? ], 36.',
          hint2: '34 + 1 = 35.',
          hint3WorkedOut: 'Correct: 35 is between 34 and 36.',
        },
      },
      teacherNote: 'Show flash cards with missing numbers for quick visual recognition.',
    },
  ],
};

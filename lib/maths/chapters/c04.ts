import type { MathsChapter } from '../types.ts';

export const chapter04: MathsChapter = {
  id: 'maths-c04',
  number: 4,
  title: 'Making 10',
  hindiTitle: '१० बनाना',
  blurb: 'Fill ten frames, make bundles of ten, and count up to 20.',
  icon: '🔟',
  themeColor: '#3B82F6',
  status: 'ready',
  ncertPage: 32,
  islVocab: [
    {
      word: 'Ten',
      hindiWord: 'दस',
      handShape: 'Both open hands showing five fingers each',
      movement: 'Fingers shimmer forward slightly together',
      description: 'Sign shows two open hands (5 + 5 = 10).',
    },
    {
      word: 'Bundle',
      hindiWord: 'बंडल',
      handShape: 'Curved hands grasp together like tying sticks',
      movement: 'Hands bring loose items into one tight unit',
      description: 'Shows grouping ten loose items into one bundle.',
    },
    {
      word: 'Frame',
      hindiWord: 'चौखट',
      handShape: 'Index fingers and thumbs form a rectangle',
      movement: 'Outlines the rectangular grid',
      description: 'Sign outlines a ten-frame grid.',
    },
  ],
  lessons: [
    {
      id: 'making-ten-frame',
      chapterId: 'maths-c04',
      grade: 1,
      title: 'Fill the ten frame',
      description: 'Place counters into the 10-box grid.',
      minutes: 5,
      toolkitType: 'ten-frame',
      steps: [
        {
          visual: '🔲 🔲 🔲 🔲 🔲\n🔲 🔲 🔲 🔲 🔲',
          title: 'Empty ten frame',
          text: 'The frame has ten empty boxes in two rows.',
        },
        {
          visual: '🔵 🔵 🔵 🔵 🔵\n🔲 🔲 🔲 🔲 🔲',
          title: 'Top row full',
          text: 'Five blue dots fill the top row.',
        },
        {
          visual: '🔵 🔵 🔵 🔵 🔵\n🔵 🔵 🔵 🔵 🔵',
          title: 'Full frame',
          text: 'Ten dots fill both rows completely.',
        },
      ],
      question: {
        prompt: 'How many dots fill an entire ten-frame? 🔵',
        options: ['10 dots', '5 dots', '20 dots'],
        answer: 0,
        hint: 'Two rows of 5 dots make ten.',
        hintLadder: {
          hint1: 'Count 5 on top and 5 on bottom.',
          hint2: '5 + 5 = 10.',
          hint3WorkedOut: 'Correct: 10 dots fill the frame.',
        },
      },
      teacherNote: 'Use egg cartons cut to 10 slots and large bottle caps.',
    },
    {
      id: 'ten-and-loose-ones',
      chapterId: 'maths-c04',
      grade: 1,
      title: 'Ten and some more',
      description: 'Combine one bundle of 10 with loose sticks.',
      minutes: 5,
      toolkitType: 'place-value-blocks',
      steps: [
        {
          visual: '🪵 (bundle of 10) + 🥢 = 11',
          title: 'Eleven',
          text: 'One bundle of ten and one stick makes 11.',
        },
        {
          visual: '🪵 (bundle of 10) + 🥢🥢 = 12',
          title: 'Twelve',
          text: 'Ten and two loose sticks make 12.',
        },
        {
          visual: '🪵 (bundle of 10) + 🥢🥢🥢🥢🥢 = 15',
          title: 'Fifteen',
          text: 'Ten and five loose sticks make 15.',
        },
      ],
      question: {
        prompt: 'One bundle of 10 plus 4 loose sticks makes…',
        options: ['14', '10', '40'],
        answer: 0,
        hint: 'Start at 10 and count four more.',
        hintLadder: {
          hint1: '10... 11, 12, 13, 14.',
          hint2: '10 + 4 = 14.',
          hint3WorkedOut: 'Correct: 10 + 4 is 14.',
        },
      },
      teacherNote: 'Tie groups of ten ice-cream sticks with rubber bands.',
    },
  ],
};

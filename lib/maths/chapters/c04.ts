import type { MathsChapter } from '../types.ts';

export const chapter04: MathsChapter = {
  id: 'maths-c04',
  number: 4,
  title: 'Making 10',
  blurb: 'Fill ten frames, make bundles of ten, and count up to 20.',
  icon: '🔟',
  coverImage: '/images/maths/c04.webp',
  themeColor: '#3B82F6',
  status: 'ready',
  ncertPage: 32,
  islVocab: [
    {
      word: 'Ten',
      handShape: 'Both open hands showing five fingers each',
      movement: 'Fingers shimmer forward slightly together',
      description: 'Sign shows two open hands (5 + 5 = 10).',
    },
    {
      word: 'Bundle',
      handShape: 'Curved hands grasp together like tying sticks',
      movement: 'Hands bring loose items into one tight unit',
      description: 'Shows grouping ten loose items into one bundle.',
    },
    {
      word: 'Frame',
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
          visual: '🪵 + 🥢 = 11',
          title: 'Eleven',
          text: 'One bundle of ten and one stick makes 11.',
        },
        {
          visual: '🪵 + 🥢🥢 = 12',
          title: 'Twelve',
          text: 'Ten and two loose sticks make 12.',
        },
        {
          visual: '🪵 + 🥢🥢🥢🥢🥢 = 15',
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
    {
      id: 'ten-frame-partner-puzzle',
      chapterId: 'maths-c04',
      grade: 1,
      title: 'Problem solving: Partner to make 10',
      description: 'Find how many more counters are needed to fill the frame.',
      minutes: 5,
      toolkitType: 'ten-frame',
      steps: [
        {
          visual: '🔵 🔵 🔵 🔵 🔵\n🔵 🔵 🔲 🔲 🔲 = 7',
          title: 'Seven dots placed',
          text: 'Seven blue dots are inside the ten frame.',
        },
        {
          visual: '🔲 🔲 🔲 = 3',
          title: 'Count empty boxes',
          text: 'Three boxes are still empty and waiting.',
        },
        {
          visual: '7 + 3 = 10 🌟',
          title: 'Frame complete',
          text: 'Seven plus three makes a full ten.',
        },
      ],
      question: {
        prompt: 'There are 7 dots in the ten-frame. How many more make 10? 🔵',
        options: ['3 more dots', '2 more dots', '5 more dots'],
        answer: 0,
        hint: 'Count the empty white boxes in the frame.',
        hintLadder: {
          hint1: 'Count from 7 up to 10: 8, 9, 10.',
          hint2: '7 + 3 = 10.',
          hint3WorkedOut: 'Correct: 3 more dots make 10.',
        },
      },
      teacherNote: 'Have students use two different colored counters to see number pairs to 10.',
    },
    {
      id: 'bundle-mystery-problem',
      chapterId: 'maths-c04',
      grade: 1,
      title: 'Problem solving: The stick bundles',
      description: 'Solve the riddle of bundles and loose ones.',
      minutes: 5,
      toolkitType: 'place-value-blocks',
      steps: [
        {
          visual: '🪵 = 10',
          title: 'One bundle of ten',
          text: 'A tied bundle holds exactly 10 sticks.',
        },
        {
          visual: '🥢 🥢 🥢 🥢 🥢 🥢 = 6',
          title: 'Six loose sticks',
          text: 'Six loose sticks lie beside the bundle.',
        },
        {
          visual: '10 + 6 = 16 🥢',
          title: 'Total sticks',
          text: 'One ten and six ones equal sixteen sticks.',
        },
      ],
      question: {
        prompt: 'You have 1 bundle of 10 sticks and 6 loose sticks. How many in total? 🥢',
        options: ['16 sticks', '10 sticks', '60 sticks'],
        answer: 0,
        hint: 'Add 10 and 6 together.',
        hintLadder: {
          hint1: 'Count on 6 after 10: 11, 12, 13, 14, 15, 16.',
          hint2: '10 + 6 = 16.',
          hint3WorkedOut: 'Correct: 10 + 6 is 16 sticks.',
        },
      },
      teacherNote: 'Use real craft sticks and rubber bands for hands-on bundling.',
    },
  ],
};

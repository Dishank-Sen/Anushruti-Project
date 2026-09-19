import type { MathsChapter } from '../types.ts';

export const chapter05: MathsChapter = {
  id: 'maths-c05',
  number: 5,
  title: 'How Many?',
  hindiTitle: 'कितने?',
  blurb: 'Put groups together to add, or take away to find what remains.',
  icon: '➕',
  themeColor: '#10B981',
  status: 'ready',
  ncertPage: 48,
  islVocab: [
    {
      word: 'Add / Plus',
      hindiWord: 'जोड़',
      handShape: 'Both hands sweep together to join palms',
      movement: 'Two separate groups meet in center',
      description: 'Sign indicates combining two distinct amounts.',
    },
    {
      word: 'Take away / Minus',
      hindiWord: 'घटाना',
      handShape: 'Flat hand sweeps across and moves away',
      movement: 'Pulls a portion away from the group',
      description: 'Sign indicates removing some items.',
    },
    {
      word: 'Equal / Total',
      hindiWord: 'बराबर / कुल',
      handShape: 'Both index fingers held parallel horizontally',
      movement: 'Brought together side-by-side',
      description: 'Indicates balanced or total sum.',
    },
  ],
  lessons: [
    {
      id: 'adding-frogs',
      chapterId: 'maths-c05',
      grade: 1,
      title: 'Frogs jumping together',
      description: 'Count frogs as they jump onto the lotus leaf.',
      minutes: 4,
      toolkitType: 'tap-to-build-equation',
      steps: [
        {
          visual: '🐸 🐸 (2)',
          title: 'Two on the leaf',
          text: 'Two green frogs sit on the lily pad.',
        },
        {
          visual: '🐸 🐸  +  🐸 (1) 💨',
          title: 'One more jumps in',
          text: 'One more frog jumps onto the leaf.',
        },
        {
          visual: '🐸 🐸 🐸 = 3',
          title: 'Three altogether',
          text: '2 frogs plus 1 frog equals 3 frogs.',
        },
      ],
      question: {
        prompt: '2 green frogs plus 1 more frog make… 🐸',
        options: ['3 frogs', '2 frogs', '5 frogs'],
        answer: 0,
        hint: 'Count all frogs sitting on the pad together.',
        hintLadder: {
          hint1: 'Start with 2, then count 1 more.',
          hint2: '2 + 1 = 3.',
          hint3WorkedOut: 'Correct: 2 + 1 = 3 frogs.',
        },
      },
      teacherNote: 'Let children act out frog hops across colored floor tiles.',
    },
    {
      id: 'birds-fly-away',
      chapterId: 'maths-c05',
      grade: 1,
      title: 'Birds fly away',
      description: 'See how many birds remain when some fly away.',
      minutes: 4,
      toolkitType: 'compare-sets',
      steps: [
        {
          visual: '🐦 🐦 🐦 🐦 (4)',
          title: 'Four on branch',
          text: 'Four singing birds rest on the branch.',
        },
        {
          visual: '🐦 🐦 🐦  ... 🐦 💨',
          title: 'One flies away',
          text: 'One bird spreads wings and flies away.',
        },
        {
          visual: '🐦 🐦 🐦 = 3',
          title: 'Three left',
          text: 'Four take away one leaves three birds.',
        },
      ],
      question: {
        prompt: '4 birds were on a tree. 1 flew away. How many stay? 🐦',
        options: ['3 birds', '5 birds', '1 bird'],
        answer: 0,
        hint: 'Count the birds still on the branch.',
        hintLadder: {
          hint1: 'Start at 4 and take 1 away.',
          hint2: '4 minus 1 equals 3.',
          hint3WorkedOut: 'Correct: 3 birds stay on the branch.',
        },
      },
      teacherNote: 'Use counters on desks and physically move one away into a pocket.',
    },
  ],
};

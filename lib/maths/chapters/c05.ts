import type { MathsChapter } from '../types.ts';

export const chapter05: MathsChapter = {
  id: 'maths-c05',
  number: 5,
  title: 'How Many?',
  blurb: 'Put groups together to add, or take away to find what remains.',
  icon: '➕',
  coverImage: '/images/maths/c05.webp',
  themeColor: '#10B981',
  status: 'ready',
  ncertPage: 48,
  islVocab: [
    {
      word: 'Add / Plus',
      handShape: 'Both hands sweep together to join palms',
      movement: 'Two separate groups meet in center',
      description: 'Sign indicates combining two distinct amounts.',
    },
    {
      word: 'Take away / Minus',
      handShape: 'Flat hand sweeps across and moves away',
      movement: 'Pulls a portion away from the group',
      description: 'Sign indicates removing some items.',
    },
    {
      word: 'Equal / Total',
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
          visual: '🐸 🐸 = 2',
          title: 'Two on the leaf',
          text: 'Two green frogs sit on the lily pad.',
        },
        {
          visual: '🐸 🐸 + 🐸 = 3',
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
          visual: '🐦 🐦 🐦 🐦 = 4',
          title: 'Four on branch',
          text: 'Four singing birds rest on the branch.',
        },
        {
          visual: '🐦 🐦 🐦 ... 🐦 💨',
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
    {
      id: 'pond-ducks-problem',
      chapterId: 'maths-c05',
      grade: 1,
      title: 'Problem solving: Ducks at the pond',
      description: 'Solve an addition story problem with swimming ducks.',
      minutes: 5,
      toolkitType: 'tap-to-build-equation',
      steps: [
        {
          visual: '🦆 🦆 🦆 = 3',
          title: 'Three ducks swimming',
          text: 'Three yellow ducks paddle in the blue pond.',
        },
        {
          visual: '🦆 🦆 🦆 + 🦆 🦆 🦆 = 6',
          title: 'Three more swim in',
          text: 'Three more ducks swim across to join them.',
        },
        {
          visual: '3 + 3 = 6 🦆',
          title: 'Count all six',
          text: 'Three plus three makes six swimming ducks.',
        },
      ],
      question: {
        prompt: '3 ducks were swimming and 3 more joined them. How many in all? 🦆',
        options: ['6 ducks', '5 ducks', '3 ducks'],
        answer: 0,
        hint: 'Add 3 and 3 together.',
        hintLadder: {
          hint1: 'Count: 3... 4, 5, 6.',
          hint2: '3 + 3 = 6.',
          hint3WorkedOut: 'Correct: 3 + 3 = 6 ducks in all.',
        },
      },
      teacherNote: 'Have students clap three times, then three more times, and count total claps.',
    },
    {
      id: 'balloon-mystery-puzzle',
      chapterId: 'maths-c05',
      grade: 1,
      title: 'Problem solving: The balloon seller',
      description: 'Find how many balloons remain after some fly away.',
      minutes: 5,
      toolkitType: 'compare-sets',
      steps: [
        {
          visual: '🎈 🎈 🎈 🎈 🎈 🎈 🎈 = 7',
          title: 'Seven bright balloons',
          text: 'A child holds seven colourful floating balloons.',
        },
        {
          visual: '🎈 🎈 🎈 🎈 ... 🎈 🎈 🎈 💨',
          title: 'Three float away',
          text: 'Three balloons slip loose into the sky.',
        },
        {
          visual: '7 - 3 = 4 🎈',
          title: 'Four remain in hand',
          text: 'Seven take away three leaves four balloons.',
        },
      ],
      question: {
        prompt: 'You hold 7 balloons. 3 float away into the clouds. How many remain? 🎈',
        options: ['4 balloons', '3 balloons', '10 balloons'],
        answer: 0,
        hint: 'Start with 7 and take away 3.',
        hintLadder: {
          hint1: 'Count backward 3 steps from 7: 6, 5, 4.',
          hint2: '7 - 3 = 4.',
          hint3WorkedOut: 'Correct: 4 balloons remain.',
        },
      },
      teacherNote: 'Use fingers on hand to fold down three fingers from seven.',
    },
  ],
};

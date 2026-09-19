import type { MathsChapter } from '../types.ts';

export const chapter12: MathsChapter = {
  id: 'maths-c12',
  number: 12,
  title: 'How Much Can We Spend?',
  blurb: 'Indian coins ₹1, ₹2, ₹5, ₹10 and paper notes for shopping.',
  icon: '🪙',
  coverImage: '/images/maths/c12.webp',
  themeColor: '#6366F1',
  status: 'ready',
  ncertPage: 136,
  islVocab: [
    {
      word: 'Money / Rupee',
      handShape: 'Thumb rubs against index and middle fingertips',
      movement: 'Gentle circular rubbing motion',
      description: 'Standard sign for money and rupee currency.',
    },
    {
      word: 'Coin',
      handShape: 'Index and thumb form a small round circle',
      movement: 'Held out flat like placing a coin on palm',
      description: 'Indicates a small hard metallic coin.',
    },
    {
      word: 'Shop / Buy',
      handShape: 'Flat hand extends forward like handing money',
      movement: 'Hands exchange items over a counter',
      description: 'Sign shows buying goods at a bazaar.',
    },
  ],
  lessons: [
    {
      id: 'indian-coins-recognition',
      chapterId: 'maths-c12',
      grade: 1,
      title: 'Our shiny coins',
      description: 'Learn to recognize ₹1, ₹2, ₹5, and ₹10 coins.',
      minutes: 4,
      toolkitType: 'coin-tray',
      steps: [
        {
          visual: '🪙 ₹1',
          title: 'One rupee',
          text: 'The ₹1 coin shows number 1 and wheat grains.',
        },
        {
          visual: '🪙 ₹2',
          title: 'Two rupees',
          text: 'The ₹2 coin equals two 1-rupee coins.',
        },
        {
          visual: '🪙 ₹5',
          title: 'Five rupees',
          text: 'The ₹5 coin is thick and heavier.',
        },
        {
          visual: '🪙 ₹10',
          title: 'Ten rupees',
          text: 'The ₹10 coin has a silver center and brass ring.',
        },
      ],
      question: {
        prompt: 'Which coin is made of two different coloured rings? 🪙',
        options: ['The ₹10 coin', 'The ₹1 coin', 'The ₹2 coin'],
        answer: 0,
        hint: 'It has a silver center and golden outer circle.',
        hintLadder: {
          hint1: 'Look at the coin with two metals.',
          hint2: 'The ₹10 coin has dual colors.',
          hint3WorkedOut: 'Correct: The ₹10 coin has two coloured rings.',
        },
      },
      teacherNote: 'Provide play coins and coin rubbings with paper and crayons.',
    },
    {
      id: 'buying-at-toy-shop',
      chapterId: 'maths-c12',
      grade: 1,
      title: 'Shopping with coins',
      description: 'Combine coins to pay exact amounts.',
      minutes: 4,
      toolkitType: 'coin-tray',
      steps: [
        {
          visual: '✏️ = ₹5',
          title: 'Pencil price',
          text: 'A green pencil costs exactly 5 rupees.',
        },
        {
          visual: '🪙 ₹2 + 🪙 ₹2 + 🪙 ₹1 = ₹5',
          title: 'Paying five rupees',
          text: 'Pay with two ₹2 coins and one ₹1 coin.',
        },
        {
          visual: '🪙 ₹5',
          title: 'Single coin',
          text: 'Or pay with one single ₹5 coin.',
        },
      ],
      question: {
        prompt: 'Which group of coins makes exactly ₹5? 🪙',
        options: ['₹2 + ₹2 + ₹1', '₹1 + ₹1 + ₹1', '₹10 + ₹1'],
        answer: 0,
        hint: 'Add: 2 + 2 = 4, then plus 1 = 5.',
        hintLadder: {
          hint1: '2 + 2 = 4.',
          hint2: '4 + 1 = 5 rupees.',
          hint3WorkedOut: 'Correct: ₹2 + ₹2 + ₹1 = ₹5.',
        },
      },
      teacherNote: 'Set up a classroom pretend market with priced stationery items.',
    },
    {
      id: 'stationery-bill-puzzle',
      chapterId: 'maths-c12',
      grade: 1,
      title: 'Problem solving: The school shop bill',
      description: 'Calculate the total cost of two stationery items.',
      minutes: 5,
      toolkitType: 'coin-tray',
      steps: [
        {
          visual: '🧼 = ₹2',
          title: 'Eraser cost',
          text: 'A soft rubber eraser costs ₹2.',
        },
        {
          visual: '✏️ = ₹3',
          title: 'Sharpener cost',
          text: 'A blue plastic sharpener costs ₹3.',
        },
        {
          visual: '₹2 + ₹3 = ₹5 🪙',
          title: 'Total bill',
          text: 'Two rupees plus three rupees makes five rupees.',
        },
      ],
      question: {
        prompt: 'You buy an eraser for ₹2 and a sharpener for ₹3. Total cost? 🪙',
        options: ['₹5', '₹6', '₹4'],
        answer: 0,
        hint: 'Add 2 and 3 together.',
        hintLadder: {
          hint1: '₹2 + ₹3 = ?',
          hint2: '2 + 3 = 5.',
          hint3WorkedOut: 'Correct: ₹5 total cost.',
        },
      },
      teacherNote: 'Have learners count play rupee coins into a payment tray.',
    },
    {
      id: 'change-return-challenge',
      chapterId: 'maths-c12',
      grade: 1,
      title: 'Problem solving: Getting change',
      description: 'Calculate how much change you receive from ₹10.',
      minutes: 5,
      toolkitType: 'coin-tray',
      steps: [
        {
          visual: '🪙 = ₹10',
          title: 'Handing money',
          text: 'You hand a shiny ₹10 coin across the counter.',
        },
        {
          visual: '📏 = ₹6',
          title: 'Item cost',
          text: 'The wooden ruler costs six rupees.',
        },
        {
          visual: '₹10 - ₹6 = ₹4 🪙',
          title: 'Change returned',
          text: 'Ten take away six leaves four rupees change.',
        },
      ],
      question: {
        prompt: 'You give ₹10 to buy a ₹6 ruler. How much change do you receive? 🪙',
        options: ['₹4 change', '₹6 change', '₹16 change'],
        answer: 0,
        hint: 'Subtract 6 from 10.',
        hintLadder: {
          hint1: 'Count up from 6 to 10: 7, 8, 9, 10.',
          hint2: '10 - 6 = 4.',
          hint3WorkedOut: 'Correct: ₹4 change received.',
        },
      },
      teacherNote: 'Role-play buyer and seller exchanging change with mock currency.',
    },
  ],
};

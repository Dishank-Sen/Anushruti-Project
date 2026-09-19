import type { MathsChapter } from '../types.ts';

export const chapter12: MathsChapter = {
  id: 'maths-c12',
  number: 12,
  title: 'How Much Can We Spend?',
  hindiTitle: 'हम कितना खर्च कर सकते हैं?',
  blurb: 'Indian coins ₹1, ₹2, ₹5, ₹10 and paper notes for shopping.',
  icon: '🪙',
  themeColor: '#6366F1',
  status: 'ready',
  ncertPage: 136,
  islVocab: [
    {
      word: 'Money / Rupee',
      hindiWord: 'रुपया / पैसा',
      handShape: 'Thumb rubs against index and middle fingertips',
      movement: 'Gentle circular rubbing motion',
      description: 'Standard sign for money and rupee currency.',
    },
    {
      word: 'Coin',
      hindiWord: 'सिक्का',
      handShape: 'Index and thumb form a small round circle',
      movement: 'Held out flat like placing a coin on palm',
      description: 'Indicates a small hard metallic coin.',
    },
    {
      word: 'Shop / Buy',
      hindiWord: 'दुकान / खरीदना',
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
          text: 'The ₹10 coin has silver center and golden ring.',
        },
      ],
      question: {
        prompt: 'Which two coins together make ₹10? 🪙',
        options: ['₹5 and ₹5', '₹1 and ₹2', '₹2 and ₹3'],
        answer: 0,
        hint: '5 plus 5 equals 10.',
        hintLadder: {
          hint1: 'Two five-rupee coins add up to ten.',
          hint2: '5 + 5 = 10.',
          hint3WorkedOut: 'Correct: ₹5 + ₹5 = ₹10.',
        },
      },
      teacherNote: 'Provide play money or coin rubbings with wax crayons on paper.',
    },
    {
      id: 'buying-little-toys',
      chapterId: 'maths-c12',
      grade: 1,
      title: 'At the toy shop',
      description: 'Pick coins to buy an eraser or wooden whistle.',
      minutes: 4,
      toolkitType: 'coin-tray',
      steps: [
        {
          visual: '✏️ (Cost: ₹5)',
          title: 'Pencil cost',
          text: 'A shiny wooden pencil costs ₹5.',
        },
        {
          visual: '🪙 ₹5  →  ✏️',
          title: 'Pay with coin',
          text: 'Hand over one ₹5 coin for the pencil.',
        },
        {
          visual: '🪙 ₹2 + 🪙 ₹2 + 🪙 ₹1 = ₹5',
          title: 'Pay with smaller coins',
          text: 'Two ₹2 coins and one ₹1 make ₹5 too.',
        },
      ],
      question: {
        prompt: 'A kite costs ₹6. Which coins pay exactly ₹6? 🪁',
        options: ['One ₹5 coin and one ₹1 coin', 'Two ₹2 coins', 'One ₹10 coin'],
        answer: 0,
        hint: '5 plus 1 equals 6.',
        hintLadder: {
          hint1: '₹5 + ₹1 = ?',
          hint2: '5 + 1 = 6.',
          hint3WorkedOut: 'Correct: ₹5 and ₹1 coin make ₹6.',
        },
      },
      teacherNote: 'Set up a mock vegetable or stationery shop in the classroom.',
    },
  ],
};

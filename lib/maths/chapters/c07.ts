import type { MathsChapter } from '../types.ts';

export const chapter07: MathsChapter = {
  id: 'maths-c07',
  number: 7,
  title: "Lina's Family",
  blurb: 'Compare heights, heavier vs lighter, and measure with handspans.',
  icon: '📏',
  coverImage: '/images/maths/c07.webp',
  themeColor: '#06B6D4',
  status: 'ready',
  ncertPage: 78,
  islVocab: [
    { word: 'Long' },
    { word: 'Short' },
    { word: 'Heavy' },
    { word: 'Handspan' },
  ],
  lessons: [
    {
      id: 'family-heights',
      chapterId: 'maths-c07',
      grade: 1,
      title: 'Taller and shorter',
      description: 'Compare family members standing side by side.',
      minutes: 4,
      toolkitType: 'compare-sets',
      steps: [
        {
          visual: '👨 👧',
          title: 'Father and Lina',
          text: 'Father is tall. Lina is shorter.',
        },
        {
          visual: '🦒  🐕',
          title: 'Giraffe and puppy',
          text: 'The giraffe is tall. The puppy is short.',
        },
        {
          visual: '🌳  🌱',
          title: 'Tree and sapling',
          text: 'The mango tree is taller than the sapling.',
        },
      ],
      question: {
        prompt: 'Who is taller between Father and little Lina? 👨 👧',
        options: ['Father', 'Lina', 'Both are same'],
        answer: 0,
        hint: 'Look at whose head reaches higher.',
        hintLadder: {
          hint1: 'Look at the top of their heads.',
          hint2: 'Father reaches higher up than Lina.',
          hint3WorkedOut: 'Correct: Father is taller.',
        },
      },
      teacherNote:
        'Have pairs of students stand back-to-back to compare heights visually.',
    },
    {
      id: 'handspan-measurement',
      chapterId: 'maths-c07',
      grade: 1,
      title: 'Measuring with handspans',
      description: 'Use your stretched hand to measure classroom tables.',
      minutes: 4,
      toolkitType: 'measure-units',
      steps: [
        {
          visual: '🖐️ ➡️ 🖐️ ➡️ 🖐️ = 3',
          title: 'Measure book',
          text: 'This maths book is 3 handspans long.',
        },
        {
          visual: '🖐️ x 6',
          title: 'Measure table',
          text: 'The wooden study desk is 6 handspans long.',
        },
        {
          visual: '🖐️ 📏',
          title: 'Keep hand flat',
          text: 'Stretch thumb and pinky wide to measure.',
        },
      ],
      question: {
        prompt:
          'If a desk is 6 handspans and a notebook is 2 handspans, which is longer? 📏',
        options: ['The desk', 'The notebook', 'Both are equal'],
        answer: 0,
        hint: '6 handspans is greater than 2 handspans.',
        hintLadder: {
          hint1: 'Compare 6 and 2.',
          hint2: '6 is more than 2.',
          hint3WorkedOut: 'Correct: The desk is longer.',
        },
      },
      teacherNote:
        'Demonstrate non-standard measurement along classroom benches.',
    },
    {
      id: 'table-measuring-puzzle',
      chapterId: 'maths-c07',
      grade: 1,
      title: 'Problem solving: Measuring the table',
      description: 'Calculate the difference in handspan measurements.',
      minutes: 5,
      toolkitType: 'measure-units',
      steps: [
        {
          visual: '🪑 🖐️ 🖐️ 🖐️ 🖐️ 🖐️ 🖐️ = 6',
          title: 'Table measurement',
          text: 'Lina measures her desk: 6 handspans.',
        },
        {
          visual: '✏️ 🖐️ 🖐️ = 2',
          title: 'Pencil box',
          text: 'Her pencil box measures 2 handspans.',
        },
        {
          visual: '6 - 2 = 4 🖐️',
          title: 'Find the difference',
          text: 'Six minus two equals four handspans difference.',
        },
      ],
      question: {
        prompt:
          'A table is 6 handspans. A pencil box is 2 handspans. How many handspans LONGER is the table? 📏',
        options: ['4 handspans', '2 handspans', '8 handspans'],
        answer: 0,
        hint: 'Subtract 2 from 6.',
        hintLadder: {
          hint1: '6 - 2 = ?',
          hint2: 'Count back 2 from 6: 5, 4.',
          hint3WorkedOut: 'Correct: The table is 4 handspans longer.',
        },
      },
      teacherNote:
        'Have students measure their own desk and pencil box with handspans.',
    },
    {
      id: 'pace-distance-puzzle',
      chapterId: 'maths-c07',
      grade: 1,
      title: 'Problem solving: Paces to the door',
      description: 'Count footsteps to find the remaining distance.',
      minutes: 5,
      toolkitType: 'measure-units',
      steps: [
        {
          visual: '🚪 ...... 🚶 = 8',
          title: 'Total distance',
          text: 'The classroom door is 8 paces away.',
        },
        {
          visual: '🚶 🚶 🚶 🚶 🚶 = 5',
          title: 'Steps taken',
          text: 'A student walks 5 paces forward.',
        },
        {
          visual: '8 - 5 = 3 🚶',
          title: 'Remaining paces',
          text: 'Eight take away five leaves three more paces.',
        },
      ],
      question: {
        prompt:
          'The door is 8 paces away. You walk 5 paces. How many MORE paces to the door? 🚪',
        options: ['3 more paces', '5 more paces', '13 more paces'],
        answer: 0,
        hint: 'Count how many steps are left between 5 and 8.',
        hintLadder: {
          hint1: 'Count from 5 to 8: 6, 7, 8.',
          hint2: '8 - 5 = 3.',
          hint3WorkedOut: 'Correct: 3 more paces to reach the door.',
        },
      },
      teacherNote: 'Mark floor tiles with chalk for learners to count paces.',
    },
  ],
};

import type { MathsChapter } from '../types.ts';

export const chapter13: MathsChapter = {
  id: 'maths-c13',
  number: 13,
  title: 'So Many Toys and Puzzles',
  blurb: 'Sort colorful toys, count each group, and make picture charts.',
  icon: '🧩',
  coverImage: '/images/maths/c13.webp',
  themeColor: '#D946EF',
  status: 'ready',
  ncertPage: 148,
  islVocab: [{ word: 'Sort' }, { word: 'Chart' }, { word: 'Total' }],
  lessons: [
    {
      id: 'sorting-toys-shelf',
      chapterId: 'maths-c13',
      grade: 1,
      title: 'Tidying the toy shelf',
      description: 'Sort toy cars, stuffed bears, and spinning tops.',
      minutes: 4,
      toolkitType: 'sort-buckets',
      steps: [
        {
          visual: '🚗 🧸 🚗 🚗 🧸',
          title: 'Mixed toys',
          text: 'Toy cars and soft bears are scattered together.',
        },
        {
          visual: '🚗 🚗 🚗\n🧸 🧸',
          title: 'Sorted piles',
          text: 'Place cars in one box and bears in another.',
        },
        {
          visual: '🚗 : 3\n🧸 : 2',
          title: 'Count each',
          text: 'There are 3 cars and 2 soft bears.',
        },
      ],
      question: {
        prompt: 'Which toy has MORE in the sorted boxes? 🚗 or 🧸',
        options: ['Toy cars (3)', 'Stuffed bears (2)', 'Both are equal'],
        answer: 0,
        hint: 'Compare 3 cars with 2 bears.',
        hintLadder: {
          hint1: 'Look at the counts: 3 and 2.',
          hint2: '3 is more than 2.',
          hint3WorkedOut: 'Correct: Toy cars (3) are more.',
        },
      },
      teacherNote:
        'Provide physical sorting trays for beads, pebbles, and small cars.',
    },
    {
      id: 'toy-pictograph',
      chapterId: 'maths-c13',
      grade: 1,
      title: 'Our toy chart (Pictograph)',
      description: 'Read the picture chart to see what class friends love.',
      minutes: 4,
      toolkitType: 'tally-pictograph',
      steps: [
        {
          visual: '🚗 🚗 🚗 🚗 = 4',
          title: 'Four cars',
          text: 'Four friends love playing with red cars.',
        },
        {
          visual: '🪀 🪀 🪀 🪀 🪀 = 5',
          title: 'Five yo-yos',
          text: 'Five children spin colourful plastic yo-yos.',
        },
        {
          visual: '🧸 🧸 = 2',
          title: 'Two bears',
          text: 'Two children cuddle brown stuffed bears.',
        },
      ],
      question: {
        prompt: 'Which toy is loved by the MOST children on the chart? 📊',
        options: ['Plastic yo-yos (5)', 'Red cars (4)', 'Stuffed bears (2)'],
        answer: 0,
        hint: 'Find the longest row on the pictograph.',
        hintLadder: {
          hint1: '5 is the largest number on the chart.',
          hint2: 'Yo-yos have 5 votes.',
          hint3WorkedOut: 'Correct: Plastic yo-yos are loved most.',
        },
      },
      teacherNote:
        'Create a classroom sticky-note chart of favorite fruits or games.',
    },
    {
      id: 'toy-difference-puzzle',
      chapterId: 'maths-c13',
      grade: 1,
      title: 'Problem solving: Toy difference challenge',
      description: 'Find how many more blocks there are than spinning tops.',
      minutes: 5,
      toolkitType: 'compare-sets',
      steps: [
        {
          visual: '🧱 🧱 🧱 🧱 🧱 🧱 🧱 🧱 = 8',
          title: 'Eight wooden blocks',
          text: 'Eight wooden blocks sit in a tall stack.',
        },
        {
          visual: '🪀 🪀 🪀 = 3',
          title: 'Three spinning tops',
          text: 'Three bright spinning tops spin on the carpet.',
        },
        {
          visual: '8 - 3 = 5 🧱',
          title: 'Find the difference',
          text: 'Eight take away three leaves five extra blocks.',
        },
      ],
      question: {
        prompt:
          'There are 8 blocks and 3 spinning tops. How many MORE blocks are there? 🧱',
        options: ['5 more blocks', '3 more blocks', '11 blocks'],
        answer: 0,
        hint: 'Subtract 3 from 8.',
        hintLadder: {
          hint1: '8 - 3 = ?',
          hint2: 'Count back 3 from 8: 7, 6, 5.',
          hint3WorkedOut: 'Correct: 5 more blocks than spinning tops.',
        },
      },
      teacherNote: 'Line up blocks and tops side by side to see the overhang.',
    },
    {
      id: 'total-collection-puzzle',
      chapterId: 'maths-c13',
      grade: 1,
      title: 'Problem solving: The whole toy box',
      description: 'Calculate the total toys gathered for playtime.',
      minutes: 5,
      toolkitType: 'tap-to-build-equation',
      steps: [
        {
          visual: '🚗 🚗 🚗 🚗 = 4',
          title: 'Four cars',
          text: 'Four toy cars are lined up ready.',
        },
        {
          visual: '🧸 🧸 🧸 🧸 🧸 🧸 = 6',
          title: 'Six soft bears',
          text: 'Six stuffed bears sit around the tea table.',
        },
        {
          visual: '4 + 6 = 10 🧸',
          title: 'Total toys in room',
          text: 'Four cars plus six bears make ten toys total.',
        },
      ],
      question: {
        prompt:
          'You have 4 cars and 6 soft bears on the rug. How many toys in total? 🧩',
        options: ['10 toys', '8 toys', '12 toys'],
        answer: 0,
        hint: '4 and 6 make ten.',
        hintLadder: {
          hint1: '4 + 6 = ?',
          hint2: '4 + 6 = 10.',
          hint3WorkedOut: 'Correct: 10 toys in total.',
        },
      },
      teacherNote:
        'Have students put toys into a toy chest while counting up to ten.',
    },
  ],
};

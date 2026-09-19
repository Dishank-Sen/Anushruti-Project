import type { MathsChapter } from '../types.ts';

export const chapter13: MathsChapter = {
  id: 'maths-c13',
  number: 13,
  title: 'So Many Toys and Puzzles',
  hindiTitle: 'खिलौनों का संसार',
  blurb: 'Sort colorful toys, count each group, and make picture charts.',
  icon: '🧩',
  themeColor: '#D946EF',
  status: 'ready',
  ncertPage: 148,
  islVocab: [
    {
      word: 'Sort',
      hindiWord: 'छांटना / अलग करना',
      handShape: 'Both hands separate items into distinct left and right piles',
      movement: 'Hands distribute objects into distinct groups',
      description: 'Sign shows separating mixed items by type.',
    },
    {
      word: 'Chart / List',
      hindiWord: 'तालिका',
      handShape: 'Flat hand draws vertical and horizontal grid lines in air',
      movement: 'Traces columns of a data chart',
      description: 'Outlines a structured table or pictograph.',
    },
    {
      word: 'Most / Highest',
      hindiWord: 'सबसे अधिक',
      handShape: 'Open hand rises above all other levels',
      movement: 'Stretches highest above other groups',
      description: 'Indicates the group with maximum count.',
    },
  ],
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
          visual: '🚗 🚗 🚗 (3 cars)\n🧸 🧸 (2 bears)',
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
        prompt: 'Which toy has more on the shelf? 🚗 (3) or 🧸 (2)',
        options: ['Toy cars (3)', 'Soft bears (2)', 'Both are equal'],
        answer: 0,
        hint: '3 is bigger than 2.',
        hintLadder: {
          hint1: 'Compare 3 with 2.',
          hint2: 'Three cars is more than two bears.',
          hint3WorkedOut: 'Correct: Toy cars (3) has more.',
        },
      },
      teacherNote: 'Collect buttons or bottle caps of 3 different colors to sort into bowls.',
    },
    {
      id: 'favorite-fruit-pictograph',
      chapterId: 'maths-c13',
      grade: 1,
      title: 'Our favorite fruits chart',
      description: 'Read picture rows to see which fruit class friends like best.',
      minutes: 4,
      toolkitType: 'tally-pictograph',
      steps: [
        {
          visual: '🍎 🍎 🍎 🍎 (4 apples)',
          title: 'Apples row',
          text: 'Four friends love sweet red apples.',
        },
        {
          visual: '🍌 🍌 🍌 🍌 🍌 🍌 (6 bananas)',
          title: 'Bananas row',
          text: 'Six friends love yellow bananas.',
        },
        {
          visual: '🥭 🥭 🥭 (3 mangoes)',
          title: 'Mangoes row',
          text: 'Three friends love fragrant mangoes.',
        },
      ],
      question: {
        prompt: 'Which fruit did the most children choose? 🍎(4), 🍌(6), 🥭(3)',
        options: ['Bananas (6)', 'Apples (4)', 'Mangoes (3)'],
        answer: 0,
        hint: 'Look for the longest row of fruit pictures.',
        hintLadder: {
          hint1: '6 is the largest count in the chart.',
          hint2: 'The banana row has 6 bananas.',
          hint3WorkedOut: 'Correct: Bananas (6) were chosen by the most children.',
        },
      },
      teacherNote: 'Make a live pictograph by having learners paste stickers next to their favorite fruit.',
    },
  ],
};

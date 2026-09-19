import type { MathsChapter } from '../types.ts';

export const chapter06: MathsChapter = {
  id: 'maths-c06',
  number: 6,
  title: 'Vegetable Farm',
  blurb: 'Count carrots, tomatoes, and pumpkins in two baskets up to 20.',
  icon: '🥕',
  coverImage: '/images/maths/c06.webp',
  themeColor: '#84CC16',
  status: 'ready',
  ncertPage: 64,
  islVocab: [
    {
      word: 'Carrot',
      handShape: 'Curved fist pretending to hold and nibble a carrot',
      movement: 'Gentle tap near chin like eating fresh carrot',
      description: 'Sign imitates holding a crunchy carrot.',
    },
    {
      word: 'Basket',
      handShape: 'Both cupped hands hold an imaginary basket handle',
      movement: 'Hands show deep rounded basket shape',
      description: 'Outlines a wide woven basket.',
    },
    {
      word: 'More',
      handShape: 'Flat fingertips tap together repeatedly',
      movement: 'Hands touch tips to express abundance',
      description: 'Sign indicates extra quantity or addition.',
    },
  ],
  lessons: [
    {
      id: 'two-vegetable-baskets',
      chapterId: 'maths-c06',
      grade: 1,
      title: 'Two vegetable baskets',
      description: 'Combine carrots from two different farm baskets.',
      minutes: 5,
      toolkitType: 'tap-to-build-equation',
      steps: [
        {
          visual: '🥕 🥕 🥕 🥕 🥕 🥕 🥕 = 7',
          title: 'First basket',
          text: 'First basket holds 7 orange carrots.',
        },
        {
          visual: '🥕 🥕 🥕 🥕 🥕 = 5',
          title: 'Second basket',
          text: 'Second basket holds 5 crunchy carrots.',
        },
        {
          visual: '7 🥕 + 5 🥕 = 12 🥕',
          title: 'Make 10 first',
          text: '7 plus 3 makes 10, plus 2 more makes 12.',
        },
      ],
      question: {
        prompt: '7 carrots in one basket plus 5 carrots in another make… 🥕',
        options: ['12 carrots', '10 carrots', '15 carrots'],
        answer: 0,
        hint: 'First make ten: 7 + 3 = 10. Then add the 2 remaining.',
        hintLadder: {
          hint1: '7 + 3 = 10. How many left from 5?',
          hint2: '10 + 2 = 12.',
          hint3WorkedOut: 'Correct: 7 + 5 = 12 carrots.',
        },
      },
      teacherNote: 'Use two small bowls and colored beads to represent carrots.',
    },
    {
      id: 'vegetable-tally',
      chapterId: 'maths-c06',
      grade: 1,
      title: 'Counting tomatoes and pumpkins',
      description: 'Count garden harvest items up to 20.',
      minutes: 5,
      toolkitType: 'tally-pictograph',
      steps: [
        {
          visual: '🍅 🍅 🍅 🍅 🍅 🍅 🍅 🍅 🍅 🍅 (10)',
          title: 'Ten round tomatoes',
          text: 'One full crate holds ten ripe tomatoes.',
        },
        {
          visual: '🍅 🍅 🍅 🍅 (4 more)',
          title: 'Four extra tomatoes',
          text: 'Four more tomatoes sit on the wooden scale.',
        },
        {
          visual: '10 + 4 = 14 🍅',
          title: 'Fourteen total',
          text: 'Ten tomatoes plus four more make fourteen.',
        },
      ],
      question: {
        prompt: '1 crate of 10 tomatoes plus 4 loose tomatoes makes… 🍅',
        options: ['14 tomatoes', '10 tomatoes', '18 tomatoes'],
        answer: 0,
        hint: '10 and 4 ones make fourteen.',
        hintLadder: {
          hint1: 'Count: 10... 11, 12, 13, 14.',
          hint2: '10 + 4 = 14.',
          hint3WorkedOut: 'Correct: 14 tomatoes.',
        },
      },
      teacherNote: 'Build place-value understanding with tens and ones.',
    },
    {
      id: 'harvest-sorting-puzzle',
      chapterId: 'maths-c06',
      grade: 1,
      title: 'Problem solving: Comparing baskets',
      description: 'Find the difference between two harvest amounts.',
      minutes: 5,
      toolkitType: 'compare-sets',
      steps: [
        {
          visual: '🍅 🍅 🍅 🍅 🍅 🍅 🍅 🍅 = 8',
          title: 'Basket A has eight',
          text: 'Basket A has 8 red juicy tomatoes.',
        },
        {
          visual: '🍅 🍅 🍅 🍅 🍅 = 5',
          title: 'Basket B has five',
          text: 'Basket B has 5 red juicy tomatoes.',
        },
        {
          visual: '8 - 5 = 3 🍅',
          title: 'Find the difference',
          text: 'Eight is three more than five.',
        },
      ],
      question: {
        prompt: 'Basket A has 8 tomatoes. Basket B has 5 tomatoes. How many MORE in Basket A? 🍅',
        options: ['3 more tomatoes', '5 more tomatoes', '13 tomatoes'],
        answer: 0,
        hint: 'Subtract 5 from 8 to find how many extra.',
        hintLadder: {
          hint1: 'Count from 5 up to 8: 6, 7, 8.',
          hint2: '8 - 5 = 3.',
          hint3WorkedOut: 'Correct: Basket A has 3 more tomatoes.',
        },
      },
      teacherNote: 'Align counters in two parallel rows to clearly show the difference.',
    },
    {
      id: 'potato-sack-challenge',
      chapterId: 'maths-c06',
      grade: 1,
      title: 'Problem solving: The potato harvest',
      description: 'Calculate the total potatoes harvested in two rounds.',
      minutes: 5,
      toolkitType: 'tap-to-build-equation',
      steps: [
        {
          visual: '🥔 🥔 🥔 🥔 🥔 🥔 🥔 🥔 🥔 🥔 = 10',
          title: 'Morning harvest',
          text: 'Ten potatoes are dug up in the morning.',
        },
        {
          visual: '🥔 🥔 🥔 🥔 🥔 🥔 🥔 = 7',
          title: 'Evening harvest',
          text: 'Seven more potatoes are collected before sunset.',
        },
        {
          visual: '10 + 7 = 17 🥔',
          title: 'Total potatoes in sack',
          text: 'Ten and seven make seventeen potatoes in all.',
        },
      ],
      question: {
        prompt: 'Farmer Ramu picked 10 potatoes, then picked 7 more. How many in total? 🥔',
        options: ['17 potatoes', '70 potatoes', '12 potatoes'],
        answer: 0,
        hint: 'One bundle of 10 and 7 ones.',
        hintLadder: {
          hint1: 'Add 10 and 7.',
          hint2: '10 + 7 = 17.',
          hint3WorkedOut: 'Correct: 17 potatoes in total.',
        },
      },
      teacherNote: 'Connect place-value bundling directly with farm counting stories.',
    },
  ],
};

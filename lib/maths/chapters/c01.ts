import type { MathsChapter } from '../types.ts';

export const chapter01: MathsChapter = {
  id: 'maths-c01',
  number: 1,
  title: 'Finding the Furry Cat!',
  blurb: 'Explore inside, outside, top, bottom, near, and far.',
  icon: '🐱',
  coverImage: '/images/maths/c01.jpg',
  themeColor: '#FF6B6B',
  status: 'ready',
  ncertPage: 1,
  islVocab: [
    { word: 'Inside' },
    { word: 'Outside' },
    { word: 'Top' },
    { word: 'Bottom' },
  ],
  lessons: [
    {
      id: 'cat-inside-outside',
      chapterId: 'maths-c01',
      grade: 1,
      title: 'Inside and outside',
      description: 'Look where the playful kitten is hiding.',
      minutes: 4,
      toolkitType: 'position-scene',
      steps: [
        {
          visual: '📦 🐱',
          title: 'Kitten in basket',
          text: 'The kitten sits inside the warm basket.',
        },
        {
          visual: '📦  🐱',
          title: 'Kitten steps out',
          text: 'Now the kitten plays outside the basket.',
        },
        {
          visual: '🏠 🐶',
          title: 'Puppy at home',
          text: 'The puppy rests inside the little doghouse.',
        },
        {
          visual: '🏠  🐶',
          title: 'Puppy in garden',
          text: 'The puppy runs outside on the grass.',
        },
      ],
      question: {
        prompt: 'Where is the kitten now? 📦 🐱',
        options: ['Inside the basket', 'Outside in the yard', 'On the roof'],
        answer: 0,
        hint: 'The kitten is tucked right in the basket.',
        hintLadder: {
          hint1: 'Look closely at the basket walls.',
          hint2: 'The kitten is inside the woven basket.',
          hint3WorkedOut: 'Correct: The kitten is inside the basket.',
        },
      },
      teacherNote:
        'Encourage children to point to classroom objects inside pencil boxes and school bags.',
    },
    {
      id: 'cat-top-bottom',
      chapterId: 'maths-c01',
      grade: 1,
      title: 'Top and bottom',
      description: 'Find who is at the top and who is at the bottom.',
      minutes: 4,
      toolkitType: 'position-scene',
      steps: [
        {
          visual: '🌳 🐒',
          title: 'Monkey climbs up',
          text: 'The monkey sits at the top branch.',
        },
        {
          visual: '🌳 🐢',
          title: 'Tortoise below',
          text: 'The tortoise walks at the bottom ground.',
        },
        {
          visual: '🪜 🐱',
          title: 'Cat on ladder',
          text: 'The kitten reaches the top step.',
        },
      ],
      question: {
        prompt: 'Who is at the top of the tree? 🌳 🐒',
        options: ['The monkey', 'The tortoise', 'The fish'],
        answer: 0,
        hint: 'Look high up at the tree leaves.',
        hintLadder: {
          hint1: 'Look toward the top of the tree.',
          hint2: 'The monkey is sitting high above.',
          hint3WorkedOut: 'Correct: The monkey is at the top.',
        },
      },
      teacherNote:
        'Use climbing actions and spatial hand gestures to reinforce top and bottom.',
    },
    {
      id: 'cat-near-far',
      chapterId: 'maths-c01',
      grade: 1,
      title: 'Near and far',
      description: 'See which animal is near and which is far away.',
      minutes: 4,
      toolkitType: 'position-scene',
      steps: [
        {
          visual: '👧 🐶 ...... 🐕',
          title: 'Two dogs',
          text: 'One dog is near the girl.',
        },
        {
          visual: '👧 🐶 ...... 🐕',
          title: 'Dog in distance',
          text: 'The other dog is far away.',
        },
        {
          visual: '🏡 🌻 ...... 🌳',
          title: 'Flower and tree',
          text: 'The flower is near the door.',
        },
      ],
      question: {
        prompt: 'Which plant is near the house? 🏡 🌻',
        options: ['The bright flower', 'The distant tree', 'The river'],
        answer: 0,
        hint: 'The sunflower grows right beside the door.',
        hintLadder: {
          hint1: 'Notice which object is closest to the home.',
          hint2: 'The flower is right next to the wall.',
          hint3WorkedOut: 'Correct: The sunflower is near the house.',
        },
      },
      teacherNote:
        'Demonstrate by placing toys near a student and far across the classroom.',
    },
    {
      id: 'cat-bigger-smaller',
      chapterId: 'maths-c01',
      grade: 1,
      title: 'Bigger and smaller',
      description: 'Compare big animals and tiny friends.',
      minutes: 4,
      toolkitType: 'compare-sets',
      steps: [
        {
          visual: '🐘  🐭',
          title: 'Elephant and mouse',
          text: 'The elephant is very big.',
        },
        {
          visual: '🐘  🐭',
          title: 'Little mouse',
          text: 'The little mouse is small.',
        },
        {
          visual: '🍉  🍓',
          title: 'Watermelon and berry',
          text: 'The watermelon is bigger than berry.',
        },
      ],
      question: {
        prompt: 'Which fruit is bigger? 🍉 or 🍓',
        options: ['Watermelon', 'Strawberry', 'Both are same'],
        answer: 0,
        hint: 'The watermelon needs two big hands to hold.',
        hintLadder: {
          hint1: 'Think about which fruit is larger.',
          hint2: 'The green watermelon is heavy and big.',
          hint3WorkedOut: 'Correct: Watermelon is bigger.',
        },
      },
      teacherNote:
        'Use actual leaves and pebbles of different sizes for tactile comparison.',
    },
    {
      id: 'cat-hiding-puzzle',
      chapterId: 'maths-c01',
      grade: 1,
      title: 'Problem solving: Where is Mittens?',
      description: 'Solve the spatial clues to find the hidden kitten.',
      minutes: 5,
      toolkitType: 'position-scene',
      steps: [
        {
          visual: '🪑  🐱⬇️',
          title: 'Clue one',
          text: 'Mittens is not on top of the chair.',
        },
        {
          visual: '📦 ❌   🪑 🐱⬇️',
          title: 'Clue two',
          text: 'Mittens is not inside the cardboard box.',
        },
        {
          visual: '🪑 ⬇️ 🐱',
          title: 'Look underneath',
          text: 'Look right under the wooden chair.',
        },
      ],
      question: {
        prompt: 'Where did you find the playful kitten? 🪑 🐱',
        options: ['Under the chair', 'Inside the box', 'On the roof'],
        answer: 0,
        hint: 'The kitten is resting beneath the chair seat.',
        hintLadder: {
          hint1: 'Check the space below the wooden seat.',
          hint2: 'Mittens is sitting under the chair legs.',
          hint3WorkedOut: 'Correct: The kitten is under the chair.',
        },
      },
      teacherNote:
        'Place a toy under a desk and have children sign the location.',
    },
  ],
};

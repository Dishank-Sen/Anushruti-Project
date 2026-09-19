import type { MathsChapter } from '../types.ts';

export const chapter10: MathsChapter = {
  id: 'maths-c10',
  number: 10,
  title: 'How do I Spend my Day?',
  hindiTitle: 'मैं अपना दिन कैसे बिताऊँ?',
  blurb: 'Morning sunrise, school time, sunset, night stars, and seasons.',
  icon: '☀️',
  themeColor: '#F59E0B',
  status: 'ready',
  ncertPage: 114,
  islVocab: [
    {
      word: 'Morning',
      hindiWord: 'सुबह',
      handShape: 'Curved hand rises up like the rising sun',
      movement: 'Moves slowly upward above horizon level',
      description: 'Sign represents the morning sun rising.',
    },
    {
      word: 'Night',
      hindiWord: 'रात',
      handShape: 'Both flat hands cross over chest like dusk settling',
      movement: 'Downward enveloping sweep',
      description: 'Sign shows the quiet arrival of night.',
    },
    {
      word: 'Time / Day',
      hindiWord: 'समय / दिन',
      handShape: 'Index finger taps the wrist where a watch rests',
      movement: 'Two gentle taps on wrist',
      description: 'Indicates clock time and daily sequence.',
    },
  ],
  lessons: [
    {
      id: 'daily-routine-order',
      chapterId: 'maths-c10',
      grade: 1,
      title: "Pihu's daily routine",
      description: 'Put morning, school, playtime, and sleep in order.',
      minutes: 4,
      toolkitType: 'sequence-order',
      steps: [
        {
          visual: '🌅 🪥',
          title: 'Morning wake up',
          text: 'Pihu wakes up and brushes teeth at sunrise.',
        },
        {
          visual: '🏫 🎒',
          title: 'School time',
          text: 'She learns with friends during morning school.',
        },
        {
          visual: '⚽ 🌇',
          title: 'Evening play',
          text: 'She plays outside in the golden evening light.',
        },
        {
          visual: '🌙 🛏️',
          title: 'Night sleep',
          text: 'She sleeps peacefully under the moon and stars.',
        },
      ],
      question: {
        prompt: 'What does Pihu do first in the morning? 🌅',
        options: ['Wakes up and brushes teeth', 'Goes to sleep', 'Plays night games'],
        answer: 0,
        hint: 'We start every morning by brushing our teeth.',
        hintLadder: {
          hint1: 'Think about what you do when waking up.',
          hint2: 'Brushing teeth is part of waking up.',
          hint3WorkedOut: 'Correct: Wakes up and brushes teeth.',
        },
      },
      teacherNote: 'Create a visual picture card schedule of the school day on the blackboard.',
    },
    {
      id: 'earlier-and-later',
      chapterId: 'maths-c10',
      grade: 1,
      title: 'Earlier and later',
      description: 'See which activity takes longer and which happens earlier.',
      minutes: 4,
      toolkitType: 'duration-race',
      steps: [
        {
          visual: '🥛 (takes a few seconds)',
          title: 'Drinking water',
          text: 'Drinking a glass of water takes a minute.',
        },
        {
          visual: '🍱 (takes longer)',
          title: 'Eating lunch',
          text: 'Eating lunch takes much more time.',
        },
        {
          visual: '🚶 vs 🚌',
          title: 'Walking vs bus',
          text: 'Walking takes longer than riding a fast bus.',
        },
      ],
      question: {
        prompt: 'Which activity takes more time? ⏱️',
        options: ['Eating a full meal', 'Blinking your eye once', 'Tying one shoe'],
        answer: 0,
        hint: 'Eating lunch takes many minutes of chewing.',
        hintLadder: {
          hint1: 'Blinking happens in a split second.',
          hint2: 'A meal takes time to enjoy and finish.',
          hint3WorkedOut: 'Correct: Eating a full meal takes more time.',
        },
      },
      teacherNote: 'Use a sand timer so learners can visually observe minutes flowing.',
    },
  ],
};

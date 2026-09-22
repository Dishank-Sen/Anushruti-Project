import type { MathsChapter } from '../types.ts';

export const chapter10: MathsChapter = {
  id: 'maths-c10',
  number: 10,
  title: 'How do I Spend my Day?',
  blurb: 'Morning sunrise, school time, sunset, night stars, and seasons.',
  icon: '☀️',
  coverImage: '/images/maths/c10.webp',
  themeColor: '#F59E0B',
  status: 'ready',
  ncertPage: 114,
  islVocab: [{ word: 'Morning' }, { word: 'Night' }, { word: 'Time' }],
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
          visual: '🌙 🛌',
          title: 'Night sleep',
          text: 'She rests peacefully under the night stars.',
        },
      ],
      question: {
        prompt: 'Which activity happens earliest in the day? 🌅',
        options: [
          'Waking up at sunrise',
          'Playing in evening',
          'Sleeping at night',
        ],
        answer: 0,
        hint: 'Think about what you do first when the sun rises.',
        hintLadder: {
          hint1: 'The morning begins when the sun comes up.',
          hint2: 'Waking up happens before school and play.',
          hint3WorkedOut: 'Correct: Waking up at sunrise happens earliest.',
        },
      },
      teacherNote:
        'Use picture cards for students to peg onto a clothesline morning-to-night.',
    },
    {
      id: 'duration-comparison',
      chapterId: 'maths-c10',
      grade: 1,
      title: 'Longer and shorter time',
      description: 'Compare activities that take more time or less time.',
      minutes: 4,
      toolkitType: 'duration-race',
      steps: [
        {
          visual: '🪥 ⏳ 2 min',
          title: 'Brushing teeth',
          text: 'Brushing teeth takes only 2 short minutes.',
        },
        {
          visual: '🚌 ⏱️ 30 min',
          title: 'School bus ride',
          text: 'The bus ride across town takes longer.',
        },
        {
          visual: '👁️ ⚡ 1 sec',
          title: 'Blinking an eye',
          text: 'A blink happens in one quick flash.',
        },
      ],
      question: {
        prompt: 'Which activity takes MORE time? ⏱️',
        options: [
          'Eating lunch with family',
          'Snapping fingers once',
          'Blinking an eye',
        ],
        answer: 0,
        hint: 'Eating a meal takes many minutes, not just a second.',
        hintLadder: {
          hint1: 'A snap and a blink are over in one second.',
          hint2: 'Eating lunch takes time to chew and swallow.',
          hint3WorkedOut: 'Correct: Eating lunch with family takes more time.',
        },
      },
      teacherNote:
        'Use a sand timer so learners can visually observe elapsed time.',
    },
    {
      id: 'timeline-order-puzzle',
      chapterId: 'maths-c10',
      grade: 1,
      title: 'Problem solving: Daily sequence riddle',
      description: 'Solve the riddle of what happens before and after.',
      minutes: 5,
      toolkitType: 'sequence-order',
      steps: [
        {
          visual: '🎒 ➡️ 📖 ➡️ ⚽',
          title: 'Order of events',
          text: 'Pack bag, read book, then play outside.',
        },
        {
          visual: '🍽️ ☀️ ➡️ 🛌 🌙',
          title: 'Afternoon to night',
          text: 'Lunch happens before the stars appear.',
        },
        {
          visual: '🌅 ➡️ ☀️ ➡️ 🌇 ➡️ 🌙',
          title: 'Sun journey',
          text: 'Morning leads to noon, evening, and night.',
        },
      ],
      question: {
        prompt: 'What happens AFTER school but BEFORE bedtime? 🌇',
        options: [
          'Playing with friends outside',
          'Waking up from sleep',
          'Eating breakfast',
        ],
        answer: 0,
        hint: 'Think of what you do in the afternoon or evening.',
        hintLadder: {
          hint1: 'School ends in afternoon, bed is at night.',
          hint2: 'Evening play comes between school and sleep.',
          hint3WorkedOut: 'Correct: Playing with friends outside.',
        },
      },
      teacherNote: 'Create a large pictorial clock showing daily routines.',
    },
    {
      id: 'timer-duration-challenge',
      chapterId: 'maths-c10',
      grade: 1,
      title: 'Problem solving: Which takes less time?',
      description: 'Choose the quickest action among everyday tasks.',
      minutes: 5,
      toolkitType: 'duration-race',
      steps: [
        {
          visual: '👏 ⚡ 1 sec',
          title: 'Single hand clap',
          text: 'Clapping hands takes just one second.',
        },
        {
          visual: '👕 ⏳ 2 min',
          title: 'Putting on shirt',
          text: 'Buttoning a school shirt takes two minutes.',
        },
        {
          visual: '🛌 🌙 8 hr',
          title: 'Night sleep',
          text: 'A full night sleep takes many hours.',
        },
      ],
      question: {
        prompt: 'Which of these takes the LEAST time? 👏',
        options: [
          'Clapping your hands once',
          'Walking to the market',
          'Taking a night sleep',
        ],
        answer: 0,
        hint: 'A single clap is finished in a split second.',
        hintLadder: {
          hint1: 'Think about which action finishes fastest.',
          hint2: 'One clap takes less than a second.',
          hint3WorkedOut: 'Correct: Clapping your hands once.',
        },
      },
      teacherNote: 'Let learners clap and feel how fast one second is.',
    },
  ],
};

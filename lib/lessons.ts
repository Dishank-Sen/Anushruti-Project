export type Lesson = {
  id: string;
  grade: number;
  subject: 'Maths' | 'Science';
  title: string;
  description: string;
  minutes: number;
  steps: { visual: string; title: string; text: string }[];
  question: { prompt: string; options: string[]; answer: number; hint: string };
};
export const lessons: Lesson[] = [
  {
    id: 'count-to-five',
    grade: 1,
    subject: 'Maths',
    title: 'Let’s count to five',
    description: 'Match a number to a group of dots.',
    minutes: 4,
    steps: [
      {
        visual: '●',
        title: 'One dot',
        text: 'Point to the dot. There is 1 dot.',
      },
      {
        visual: '● ● ●',
        title: 'Count each dot once',
        text: 'Start on the left. Count 1, 2, 3. There are 3 dots.',
      },
      {
        visual: '● ● ● ● ●',
        title: 'Meet five',
        text: 'Count 1, 2, 3, 4, 5. The last number tells us how many.',
      },
    ],
    question: {
      prompt: 'How many dots? ● ● ● ●',
      options: ['3 dots', '4 dots', '5 dots'],
      answer: 1,
      hint: 'Point to each dot once: 1, 2, 3, 4.',
    },
  },
  {
    id: 'plant-needs',
    grade: 1,
    subject: 'Science',
    title: 'Help a plant grow',
    description: 'Discover what a growing plant needs.',
    minutes: 4,
    steps: [
      {
        visual: '🌱 → 🌿',
        title: 'Plants grow',
        text: 'A small plant can grow new leaves and become bigger.',
      },
      {
        visual: '☀️ + 💧 + 🌬️',
        title: 'Light, water and air',
        text: 'Plants need light, water and air to grow.',
      },
      {
        visual: '🌱 + 💧 → 🌿',
        title: 'Care for a plant',
        text: 'Give your plant enough water and light. Watch for new leaves.',
      },
    ],
    question: {
      prompt: 'Which helps a plant grow?',
      options: ['A toy car', 'Water and light', 'A dark closed box'],
      answer: 1,
      hint: 'A plant needs water, light and air.',
    },
  },
  {
    id: 'adding-groups',
    grade: 2,
    subject: 'Maths',
    title: 'Two groups, one total',
    description: 'Bring small groups together to add.',
    minutes: 5,
    steps: [
      {
        visual: '● ● + ●',
        title: 'Start with two groups',
        text: 'The first group has 2 dots. The second has 1 dot.',
      },
      {
        visual: '● ● ● = 3',
        title: 'Bring them together',
        text: 'Count all the dots. 2 plus 1 equals 3.',
      },
      {
        visual: '● ● + ● ● = 4',
        title: 'Try two and two',
        text: 'Two dots and two more dots make 4 dots.',
      },
    ],
    question: {
      prompt: '3 dots + 2 dots = ?',
      options: ['4 dots', '6 dots', '5 dots'],
      answer: 2,
      hint: 'Start at 3. Count two more: 4, 5.',
    },
  },
  {
    id: 'animal-homes',
    grade: 2,
    subject: 'Science',
    title: 'A home for every animal',
    description: 'Explore the places animals live.',
    minutes: 4,
    steps: [
      {
        visual: '🐟 → 💧',
        title: 'Fish live in water',
        text: 'Fish use gills to take oxygen from water.',
      },
      {
        visual: '🐦 → 🪺',
        title: 'Birds build nests',
        text: 'Many birds lay eggs and care for chicks in nests.',
      },
      {
        visual: '🐝 → 🐝 🐝',
        title: 'Some animals live together',
        text: 'Honeybees live together in a colony.',
      },
    ],
    question: {
      prompt: 'Where can a fish live?',
      options: ['In water', 'In a dry nest', 'On a bookshelf'],
      answer: 0,
      hint: 'Fish use gills to breathe in water.',
    },
  },
  {
    id: 'equal-groups',
    grade: 3,
    subject: 'Maths',
    title: 'The power of equal groups',
    description: 'See multiplication as repeated addition.',
    minutes: 5,
    steps: [
      {
        visual: '●● | ●● | ●●',
        title: 'Three equal groups',
        text: 'There are 3 groups. Each group has 2 dots.',
      },
      {
        visual: '2 + 2 + 2 = 6',
        title: 'Add the groups',
        text: 'Three groups of 2 make 6 dots altogether.',
      },
      {
        visual: '3 × 2 = 6',
        title: 'A shorter way',
        text: 'We write 3 times 2 equals 6. This is multiplication.',
      },
    ],
    question: {
      prompt: '4 groups of 2 make how many?',
      options: ['6', '8', '4'],
      answer: 1,
      hint: 'Add 2 + 2 + 2 + 2. The total is 8.',
    },
  },
  {
    id: 'water-cycle',
    grade: 3,
    subject: 'Science',
    title: 'Water’s wonderful journey',
    description: 'Follow water from puddles to clouds.',
    minutes: 5,
    steps: [
      {
        visual: '💧 + ☀️ → ↑',
        title: 'Water rises as vapour',
        text: 'Heat changes liquid water into water vapour. This is evaporation.',
      },
      {
        visual: '↑ → ☁️',
        title: 'Clouds form',
        text: 'Water vapour cools into tiny water droplets. This is condensation.',
      },
      {
        visual: '☁️ → 🌧️ → 💧',
        title: 'Water falls again',
        text: 'Droplets join and fall as rain. Water collects and the cycle continues.',
      },
    ],
    question: {
      prompt: 'What do we call water turning into vapour?',
      options: ['Freezing', 'Evaporation', 'Rain'],
      answer: 1,
      hint: 'Heat helps liquid water evaporate into water vapour.',
    },
  },
  {
    id: 'fractions',
    grade: 4,
    subject: 'Maths',
    title: 'A whole lot of halves',
    description: 'Explore equal parts of a whole.',
    minutes: 5,
    steps: [
      {
        visual: '■ ■',
        title: 'One whole, two equal parts',
        text: 'Imagine one bar split into 2 equal pieces. Each piece is one half.',
      },
      {
        visual: '■ □ = ½',
        title: 'One out of two',
        text: 'The filled square is 1 of the 2 equal parts. We write one half as 1/2.',
      },
      {
        visual: '■ ■ □ □ = ²⁄₄',
        title: 'Same amount, new pieces',
        text: 'Two out of 4 equal parts cover the same amount as one half.',
      },
    ],
    question: {
      prompt: 'Which is the same amount as 1/2?',
      options: ['1/4', '2/4', '3/4'],
      answer: 1,
      hint: 'Split each half into two. One half now contains 2 of the 4 equal pieces.',
    },
  },
  {
    id: 'matter',
    grade: 4,
    subject: 'Science',
    title: 'One water, three forms',
    description: 'Meet solids, liquids and gases.',
    minutes: 5,
    steps: [
      {
        visual: '🧊',
        title: 'Solid ice',
        text: 'Ice has its own shape. It is solid water.',
      },
      {
        visual: '🧊 → 💧',
        title: 'Liquid water',
        text: 'Warm ice melts. Liquid water takes the shape of its container.',
      },
      {
        visual: '💧 → ↑',
        title: 'Water vapour',
        text: 'Water can become a gas called water vapour. Water vapour is invisible.',
      },
    ],
    question: {
      prompt: 'What happens when ice warms enough?',
      options: [
        'It melts into liquid water',
        'It becomes a stone',
        'It stays ice forever',
      ],
      answer: 0,
      hint: 'Heat melts ice into liquid water.',
    },
  },
  {
    id: 'area',
    grade: 5,
    subject: 'Maths',
    title: 'Count the space inside',
    description: 'Find area with rows of equal squares.',
    minutes: 5,
    steps: [
      {
        visual: '□ □ □',
        title: 'Meet a square unit',
        text: 'Each equal square covers 1 square unit. This row covers 3 square units.',
      },
      {
        visual: '□ □ □\n□ □ □',
        title: 'Two rows of three',
        text: 'There are 2 rows with 3 squares each. Together they cover 6 square units.',
      },
      {
        visual: '3 × 2 = 6',
        title: 'Area of a rectangle',
        text: 'Multiply length by width to find a rectangle’s area in square units.',
      },
    ],
    question: {
      prompt: 'A rectangle is 4 units long and 3 units wide. Its area is…',
      options: ['7 square units', '12 square units', '14 square units'],
      answer: 1,
      hint: 'Count 3 rows of 4: 4 + 4 + 4 = 12.',
    },
  },
  {
    id: 'food-chains',
    grade: 5,
    subject: 'Science',
    title: 'Follow the food chain',
    description: 'See how energy passes between living things.',
    minutes: 5,
    steps: [
      {
        visual: '☀️ → 🌿',
        title: 'Start with the Sun',
        text: 'Plants use sunlight to make food.',
      },
      {
        visual: '🌿 → 🦗',
        title: 'A plant eater',
        text: 'A grasshopper eats grass. Energy passes from the grass to the grasshopper.',
      },
      {
        visual: '🌿 → 🦗 → 🐸',
        title: 'Follow the energy',
        text: 'A frog eats the grasshopper. Arrows show energy moving from food to the animal eating it.',
      },
    ],
    question: {
      prompt: 'In grass → grasshopper → frog, what does the frog eat?',
      options: ['Sunlight', 'Grass', 'The grasshopper'],
      answer: 2,
      hint: 'Follow the arrow pointing to the frog. It starts at the grasshopper.',
    },
  },
];

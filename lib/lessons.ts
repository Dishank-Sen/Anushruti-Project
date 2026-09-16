export type Lesson = {
  id: string;
  grade: number;
  subject: 'Maths' | 'Science';
  title: string;
  description: string;
  minutes: number;
  science?: {
    topic: 'Biology' | 'Space' | 'Our world' | 'Our body';
    activity:
      | 'grow'
      | 'cycle'
      | 'space'
      | 'day'
      | 'food'
      | 'living'
      | 'body'
      | 'weather';
    image: 'sunflower' | 'butterfly' | 'earth' | 'moon' | 'body';
  };
  steps: { visual: string; title: string; text: string }[];
  question: { prompt: string; options: string[]; answer: number; hint: string };
};
export const lessons: Lesson[] = [
  {
    id: 'leaf-food-factory',
    grade: 1,
    subject: 'Science',
    title: 'A leaf makes food',
    description: 'Explore a tiny sunlight-powered food factory.',
    minutes: 5,
    science: { topic: 'Biology', activity: 'food', image: 'sunflower' },
    steps: [
      {
        visual: '☀️ → 🍃',
        title: 'Catch the light',
        text: 'Green leaves use energy from light to make food.',
      },
      {
        visual: '💧 + 〰 → 🍃',
        title: 'Water and a gas from air',
        text: 'Roots take in water. Leaves take in a gas called carbon dioxide from the air.',
      },
      {
        visual: '🍃 → ◇',
        title: 'Food for the plant',
        text: 'Using light, the plant turns water and carbon dioxide into sugar, its food. This is called photosynthesis. Oxygen is released too.',
      },
    ],
    question: {
      prompt: 'What helps a green leaf make food?',
      options: ['Light, water and carbon dioxide', 'A toy car', 'Only soil'],
      answer: 0,
      hint: 'Leaves use light energy, water and carbon dioxide to make sugar. Soil is not the plant’s food.',
    },
  },
  {
    id: 'living-things',
    grade: 1,
    subject: 'Science',
    title: 'Is it alive?',
    description: 'Sort a little collection of living and non-living things.',
    minutes: 5,
    science: { topic: 'Biology', activity: 'living', image: 'butterfly' },
    steps: [
      {
        visual: '🌳 🦋',
        title: 'Living things grow',
        text: 'Plants and animals are living things. They grow and need water and air.',
      },
      {
        visual: '🪨 ⚽',
        title: 'Non-living things',
        text: 'A rock and a ball are not alive. They do not need food or grow like a plant.',
      },
      {
        visual: '🚗 ≠ 🦋',
        title: 'Moving is not enough',
        text: 'A toy car can move, but it is not alive. A tree stays in one place and is alive!',
      },
    ],
    question: {
      prompt: 'Which one is a living thing?',
      options: ['A toy car', 'A tree', 'A rock'],
      answer: 1,
      hint: 'A tree grows and needs water and air. Moving alone does not make something alive.',
    },
  },
  {
    id: 'my-body',
    grade: 1,
    subject: 'Science',
    title: 'Meet your amazing body',
    description: 'Match body parts with some of the things they do.',
    minutes: 5,
    science: { topic: 'Our body', activity: 'body', image: 'body' },
    steps: [
      {
        visual: '👀',
        title: 'Eyes and seeing',
        text: 'Eyes can help us notice colours and shapes. People explore the world in different ways.',
      },
      {
        visual: '👃',
        title: 'Nose and smelling',
        text: 'The nose helps us breathe and notice smells.',
      },
      {
        visual: '✋',
        title: 'Hands and touch',
        text: 'Hands can feel textures, hold things and communicate. Our bodies and abilities are different, and all belong.',
      },
    ],
    question: {
      prompt: 'Which body part helps us notice a smell?',
      options: ['Hands', 'Nose', 'Eyes'],
      answer: 1,
      hint: 'The nose helps us notice smells. This activity uses pictures, so no smelling or speaking is needed.',
    },
  },
  {
    id: 'weather-watch',
    grade: 1,
    subject: 'Science',
    title: 'What is the weather?',
    description: 'Look at the sky and help pack for the day.',
    minutes: 5,
    science: { topic: 'Our world', activity: 'weather', image: 'earth' },
    steps: [
      {
        visual: '☀️',
        title: 'A sunny day',
        text: 'Sunlight makes the day bright. Shade and a hat can help us stay comfortable outside.',
      },
      {
        visual: '🌧️',
        title: 'A rainy day',
        text: 'Rain is water falling from clouds. A raincoat helps keep us dry.',
      },
      {
        visual: '❄️',
        title: 'A cold day',
        text: 'Some days are cold. Warm clothes help keep our bodies warm. Weather can change, and sunshine does not always mean warmth.',
      },
    ],
    question: {
      prompt: 'What helps keep us dry in rain?',
      options: ['A raincoat', 'A sun hat alone', 'A paper book'],
      answer: 0,
      hint: 'A raincoat keeps rain off our clothes. Ask an adult about the weather before going outside.',
    },
  },
  {
    id: 'butterfly-life',
    grade: 1,
    subject: 'Science',
    title: 'A butterfly begins',
    description: 'An egg. A caterpillar. A wonderful change.',
    minutes: 5,
    science: { topic: 'Biology', activity: 'cycle', image: 'butterfly' },
    steps: [
      {
        visual: '🥚',
        title: 'A tiny egg',
        text: 'A butterfly lays eggs on a plant.',
      },
      {
        visual: '🐛',
        title: 'A hungry caterpillar',
        text: 'A caterpillar hatches from an egg. It eats and grows.',
      },
      {
        visual: '◈',
        title: 'Time to change',
        text: 'The caterpillar becomes a pupa, called a chrysalis. Its body changes inside.',
      },
      {
        visual: '🦋',
        title: 'Wings unfold',
        text: 'An adult butterfly comes out. Later, butterflies can lay eggs and the cycle begins again.',
      },
    ],
    question: {
      prompt: 'What hatches from a butterfly egg?',
      options: ['A caterpillar', 'A bird', 'A flower'],
      answer: 0,
      hint: 'The caterpillar eats and grows before becoming a pupa.',
    },
  },
  {
    id: 'space-neighbours',
    grade: 1,
    subject: 'Science',
    title: 'Hello, space neighbours!',
    description: 'Meet our home, our star and our Moon.',
    minutes: 5,
    science: { topic: 'Space', activity: 'space', image: 'earth' },
    steps: [
      {
        visual: '🌍',
        title: 'Earth is our home',
        text: 'Earth is a planet. We live on its land, with oceans all around.',
      },
      {
        visual: '☀️',
        title: 'The Sun is a star',
        text: 'The Sun gives Earth light and warmth. Never look straight at the Sun.',
      },
      {
        visual: '🌕',
        title: 'Meet the Moon',
        text: 'The Moon travels around Earth. It reflects light from the Sun. We can sometimes see it in the daytime too.',
      },
    ],
    question: {
      prompt: 'Which one makes its own light?',
      options: ['Earth', 'The Moon', 'The Sun'],
      answer: 2,
      hint: 'The Sun is a star. Moonlight is sunlight reflected by the Moon.',
    },
  },
  {
    id: 'day-and-night',
    grade: 1,
    subject: 'Science',
    title: 'Why does night come?',
    description: 'Turn Earth and follow a little explorer.',
    minutes: 4,
    science: { topic: 'Space', activity: 'day', image: 'moon' },
    steps: [
      {
        visual: '☀️ → 🌍',
        title: 'The side facing the Sun',
        text: 'Sunlight lights one side of Earth. It is daytime there.',
      },
      {
        visual: '🌍 ↻',
        title: 'Earth turns',
        text: 'Earth slowly turns. Our place moves from the light side to the dark side.',
      },
      {
        visual: '🌃',
        title: 'The side facing away',
        text: 'It is night on the side facing away from the Sun. Earth keeps turning and morning comes again.',
      },
    ],
    question: {
      prompt: 'It is night at our place when…',
      options: [
        'The Sun switches off',
        'Our place faces away from the Sun',
        'The Moon covers the Sun every night',
      ],
      answer: 1,
      hint: 'The Sun keeps shining. Earth turns our place away from its light.',
    },
  },
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
    science: { topic: 'Biology', activity: 'grow', image: 'sunflower' },
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

export const scienceImages = {
  body: {
    src: '/images/science/body.svg',
    alt: 'Illustrated child with eyes, nose and hands visible',
    credit: 'Anushruti original illustration · CC0',
    source: '/images/science/body.svg',
  },
  sunflower: {
    src: '/images/science/sunflower.webp',
    alt: 'Close-up of a sunflower with yellow petals around a patterned centre',
    credit: 'NathanScientific · CC0',
    source:
      'https://commons.wikimedia.org/wiki/File:Close-up_sunflower_head,_New_Mexico,_U.S.jpg',
  },
  butterfly: {
    src: '/images/science/butterfly.webp',
    alt: 'An orange and black monarch butterfly resting on flowers',
    credit: 'J. Corey Butler · Public domain',
    source:
      'https://commons.wikimedia.org/wiki/File:Monarch_butterfly_(Danaus_plexippus)_2005.jpg',
  },
  earth: {
    src: '/images/science/earth.webp',
    alt: 'Earth from space, showing blue oceans, land and white clouds',
    credit: 'NASA / Apollo 17 crew · Public domain',
    source:
      'https://commons.wikimedia.org/wiki/File:The_Earth_seen_from_Apollo_17.jpg',
  },
  moon: {
    src: '/images/science/moon.webp',
    alt: 'The Moon with pale craters and darker areas',
    credit: 'NASA / JPL / Galileo · Public domain',
    source: 'https://commons.wikimedia.org/wiki/File:Full_moon.png',
  },
} as const;
export const butterflyStages = [
  { label: 'Egg', symbol: '🥚', text: 'A tiny egg rests on a plant.' },
  {
    label: 'Caterpillar',
    symbol: '🐛',
    text: 'The caterpillar eats leaves and grows.',
  },
  {
    label: 'Chrysalis',
    symbol: '🌿',
    text: 'Inside the chrysalis, the body changes.',
  },
  {
    label: 'Butterfly',
    symbol: '🦋',
    text: 'A butterfly emerges and unfolds its wings.',
  },
] as const;
export const spaceObjects = [
  {
    label: 'Earth',
    symbol: '🌍',
    fact: 'Our home planet. Look for oceans, land and clouds.',
    task: 'Find our home planet.',
    image: 'earth',
  },
  {
    label: 'Sun',
    symbol: '☀️',
    fact: 'Our nearest star makes light and warmth. Never look straight at it.',
    task: 'Find the star that gives us light.',
    image: null,
  },
  {
    label: 'Moon',
    symbol: '🌕',
    fact: 'Our Moon reflects sunlight and travels around Earth.',
    task: 'Find the object that travels around Earth.',
    image: 'moon',
  },
] as const;

export const livingCards = [
  {
    name: 'Tree',
    symbol: '🌳',
    living: true,
    why: 'A tree grows and needs water and air.',
  },
  {
    name: 'Toy car',
    symbol: '🚗',
    living: false,
    why: 'A toy car can move, but it does not grow or need food.',
  },
  {
    name: 'Butterfly',
    symbol: '🦋',
    living: true,
    why: 'A butterfly is an animal. It grows through its life cycle.',
  },
  {
    name: 'Rock',
    symbol: '🪨',
    living: false,
    why: 'A rock is not alive. It does not need food or water.',
  },
  {
    name: 'Sunflower',
    symbol: '🌻',
    living: true,
    why: 'A sunflower is a living plant.',
  },
  {
    name: 'Ball',
    symbol: '⚽',
    living: false,
    why: 'A ball can roll, but it is not alive.',
  },
] as const;
export const bodyCards = [
  {
    name: 'Eyes',
    symbol: '👀',
    task: 'Find the part that can help us see shapes.',
    fact: 'Eyes can help us see shapes and colours.',
  },
  {
    name: 'Nose',
    symbol: '👃',
    task: 'Find the part that helps us notice smells.',
    fact: 'The nose helps us breathe and notice smells.',
  },
  {
    name: 'Hands',
    symbol: '✋',
    task: 'Find the parts that can feel a soft cloth.',
    fact: 'Hands can feel textures and help us communicate.',
  },
] as const;
export const weatherCards = [
  {
    name: 'Sunny',
    symbol: '☀️',
    item: 'Sun hat',
    itemSymbol: '👒',
    fact: 'A hat and shade help on a sunny day.',
  },
  {
    name: 'Rainy',
    symbol: '🌧️',
    item: 'Raincoat',
    itemSymbol: '🧥',
    fact: 'A raincoat helps keep us dry.',
  },
  {
    name: 'Cold',
    symbol: '❄️',
    item: 'Warm scarf',
    itemSymbol: '🧣',
    fact: 'Warm clothes help keep us warm on a cold day.',
  },
] as const;

/**
 * Fitzgerald Key: A color-coded grammatical system designed for deaf learners.
 * Standard colors in deaf education:
 * - Orange: Who / Subject / Pronoun (e.g. Cat, Boy, Lina, I, We)
 * - Green: Action / Verb (e.g. Count, Add, Jump, Is, Eat, Make)
 * - Yellow: What / Object / Noun (e.g. Apple, Ball, Coin, Box, Flower)
 * - Blue: Where / Preposition / Location (e.g. In, On, Under, School, Table)
 * - Purple: When / Time (e.g. Morning, Today, Now, Night)
 * - Gray: Other / Modifiers / Conjunctions (e.g. Big, Small, Red, And)
 */

export type FitzgeraldCategory = 'subject' | 'verb' | 'object' | 'place' | 'time' | 'modifier' | 'default';

export interface FitzgeraldToken {
  word: string;
  category: FitzgeraldCategory;
  categoryLabel: string;
}

const SUBJECTS = new Set([
  'I', 'YOU', 'HE', 'SHE', 'IT', 'WE', 'THEY', 'ME', 'US',
  'CAT', 'DOG', 'BIRD', 'BOY', 'GIRL', 'TEACHER', 'LINA', 'FARMER', 'CHILD', 'CHILDREN', 'FRIEND', 'FROG', 'MONKEY'
]);

const VERBS = new Set([
  'COUNT', 'COUNTS', 'ADD', 'ADDS', 'PUT', 'PUTS', 'TAKE', 'TAKES',
  'SEE', 'SEES', 'LOOK', 'LOOKS', 'MAKE', 'MAKES', 'JUMP', 'JUMPS',
  'HAVE', 'HAS', 'HAD', 'GIVE', 'GIVES', 'FIND', 'FINDS', 'IS', 'ARE', 'AM', 'RUN', 'PLAY', 'TOUCH', 'EAT'
]);

const OBJECTS = new Set([
  'APPLE', 'APPLES', 'MANGO', 'MANGOES', 'COIN', 'COINS', 'BALL', 'BALLS',
  'BOOK', 'BOOKS', 'PENCIL', 'PENCILS', 'TREE', 'SHAPE', 'SHAPES', 'CIRCLE', 'SQUARE', 'TRIANGLE',
  'CARROT', 'CARROTS', 'BASKET', 'BASKETS', 'STAR', 'STARS', 'NUMBER', 'NUMBERS', 'MONEY', 'TOY', 'TOYS'
]);

const PLACES = new Set([
  'IN', 'INSIDE', 'ON', 'UNDER', 'AT', 'TO', 'NEAR', 'FAR', 'TOP', 'BOTTOM',
  'SCHOOL', 'GARDEN', 'FARM', 'ROOM', 'BOX', 'TABLE', 'CHAIR', 'WATER', 'POND'
]);

const TIMES = new Set([
  'NOW', 'TODAY', 'MORNING', 'AFTERNOON', 'EVENING', 'NIGHT', 'DAY', 'TIME', 'FIRST', 'THEN', 'NEXT'
]);

const MODIFIERS = new Set([
  'BIG', 'SMALL', 'LONG', 'ROUND', 'TALL', 'SHORT', 'HEAVY', 'LIGHT', 'RED', 'BLUE', 'GREEN', 'YELLOW',
  'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN', 'MANY', 'MORE', 'LESS'
]);

export function categorizeWord(word: string): { category: FitzgeraldCategory; label: string } {
  const clean = word.toUpperCase().replace(/[^A-Z]/g, '');
  if (SUBJECTS.has(clean)) return { category: 'subject', label: 'Who / कौन' };
  if (VERBS.has(clean)) return { category: 'verb', label: 'Action / काम' };
  if (OBJECTS.has(clean)) return { category: 'object', label: 'What / क्या' };
  if (PLACES.has(clean)) return { category: 'place', label: 'Where / कहाँ' };
  if (TIMES.has(clean)) return { category: 'time', label: 'When / कब' };
  if (MODIFIERS.has(clean)) return { category: 'modifier', label: 'Describe / कैसा' };
  return { category: 'default', label: '' };
}

export function parseFitzgerald(sentence: string): FitzgeraldToken[] {
  if (!sentence) return [];
  const words = sentence.trim().split(/\s+/);
  return words.map((w) => {
    const { category, label } = categorizeWord(w);
    return {
      word: w,
      category,
      categoryLabel: label,
    };
  });
}

export const FITZGERALD_COLORS: Record<FitzgeraldCategory, { bg: string; text: string; border: string }> = {
  subject: { bg: '#FFEDD5', text: '#C2410C', border: '#FDBA74' }, // Orange
  verb: { bg: '#DCFCE7', text: '#15803D', border: '#86EFAC' },    // Green
  object: { bg: '#FEF9C3', text: '#A16207', border: '#FDE047' },  // Yellow
  place: { bg: '#E0F2FE', text: '#0369A1', border: '#7DD3FC' },   // Blue
  time: { bg: '#F3E8FF', text: '#7E22CE', border: '#D8B4FE' },    // Purple
  modifier: { bg: '#FEE2E2', text: '#B91C1C', border: '#FCA5A5' },// Red-Pink
  default: { bg: 'transparent', text: 'inherit', border: 'transparent' },
};

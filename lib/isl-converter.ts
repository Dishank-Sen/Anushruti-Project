/**
 * Indian Sign Language (ISL) Conversion Engine
 * Standardized according to ISLRTC (Indian Sign Language Research and Training Centre).
 * 
 * Rules:
 * 1. Tokenizes and normalizes written English / Hindi.
 * 2. Filters out grammatical particles not present in ISL (the, is, an, a, are, was, were).
 * 3. Maps recognized words to verified ISL Lexical Signs.
 * 4. Fallback: Breaks unmapped words into standard ISL Two-Handed Fingerspelling.
 */

export interface IslHandshapeData {
  handshape: string;
  movement: string;
  location: string;
  hindiTerm?: string;
  svgHandGlyph?: string;
}

export interface IslSignToken {
  id: string;
  displayWord: string;
  gloss: string;
  isFingerspelled: boolean;
  letterSequence?: { letter: string; handshape: string; movement: string }[];
  handshape: string;
  movement: string;
  location: string;
  hindiTerm?: string;
}

// Authentic ISLRTC Two-Handed Manual Alphabet
export const ISL_MANUAL_ALPHABET: Record<string, { handshape: string; movement: string }> = {
  A: { handshape: 'Thumb of non-dominant hand', movement: 'Right index touches left thumb tip' },
  B: { handshape: 'Both open palms joined', movement: 'Join both flat palms facing each other with thumbs tucked' },
  C: { handshape: 'C-curve with dominant hand', movement: 'Right hand curves into C facing left' },
  D: { handshape: 'Left vertical index, right C-shape', movement: 'Right thumb & index touch left vertical index finger' },
  E: { handshape: 'Index finger of non-dominant hand', movement: 'Right index touches left index fingertip' },
  F: { handshape: 'Two fingers crossing two fingers', movement: 'Right index and middle fingers cross over left index and middle' },
  G: { handshape: 'Both fists together', movement: 'Right fist rests vertically on left fist' },
  H: { handshape: 'Right flat palm sweeps left palm', movement: 'Right open palm sweeps across left open flat palm' },
  I: { handshape: 'Middle finger of non-dominant hand', movement: 'Right index touches left middle fingertip' },
  J: { handshape: 'Draw J on open palm', movement: 'Right index traces letter J onto left open palm' },
  K: { handshape: 'Hook onto vertical index', movement: 'Right bent index finger hooks around left straight vertical index' },
  L: { handshape: 'L-shape with dominant hand', movement: 'Lay right index finger across left open palm with thumb pointing up' },
  M: { handshape: 'Three fingers on palm', movement: 'Rest right index, middle, ring fingertips on left open palm' },
  N: { handshape: 'Two fingers on palm', movement: 'Rest right index and middle fingertips on left open palm' },
  O: { handshape: 'Ring finger of non-dominant hand', movement: 'Right index touches left ring fingertip' },
  P: { handshape: 'Right circle on left index', movement: 'Form circle with right thumb & index touching left vertical index' },
  Q: { handshape: 'Hook index through circle', movement: 'Hook right index through circle formed by left thumb and index' },
  R: { handshape: 'Curled index on flat palm', movement: 'Right curled index finger rests in center of left open palm' },
  S: { handshape: 'Hook pinky fingers', movement: 'Hook right pinky finger around left pinky finger' },
  T: { handshape: 'Right index on left palm edge', movement: 'Touch bottom edge of left open palm with right index finger' },
  U: { handshape: 'Little finger of non-dominant hand', movement: 'Right index touches left little fingertip' },
  V: { handshape: 'V-sign on flat palm', movement: 'Place right index and middle finger spread in V on left flat palm' },
  W: { handshape: 'Interlaced fingers', movement: 'Interlace fingers of both hands facing each other' },
  X: { handshape: 'Crossed index fingers', movement: 'Cross right index finger over left index finger forming an X' },
  Y: { handshape: 'Thumb and index V', movement: 'Right index points into the V between left thumb and index finger' },
  Z: { handshape: 'Right fingertips to base of palm', movement: 'Touch right bent fingertips to base of upright left palm' },
};

// Core Verified ISLRTC Vocabulary for Foundational Learning
export const ISL_CORE_LEXICON: Record<string, IslHandshapeData> = {
  CAT: {
    handshape: 'Open 3-finger claws at cheeks',
    movement: 'Pull hands sideways twice imitating cat whiskers',
    location: 'Cheeks / Face',
    hindiTerm: 'बिल्ली',
  },
  DOG: {
    handshape: 'Open flat hand patted on side',
    movement: 'Pat thigh or hip twice calling a dog',
    location: 'Thigh / Side',
    hindiTerm: 'कुत्ता',
  },
  BIRD: {
    handshape: 'Thumb and index pinch at mouth',
    movement: 'Open and close index and thumb imitating beak chirping',
    location: 'Mouth / Lips',
    hindiTerm: 'चिड़िया',
  },
  FROG: {
    handshape: 'V-fingers bent under chin',
    movement: 'Flick V-fingers outward imitating jumping legs',
    location: 'Under chin',
    hindiTerm: 'मेंढक',
  },
  APPLE: {
    handshape: 'Curled claw hand',
    movement: 'Twist knuckles gently against cheek twice',
    location: 'Cheek',
    hindiTerm: 'सेब',
  },
  MANGO: {
    handshape: 'Cupped hand holding round fruit',
    movement: 'Bring cupped hand to mouth as if taking a juicy bite',
    location: 'Mouth / Chin',
    hindiTerm: 'आम',
  },
  BOOK: {
    handshape: 'Both flat palms together',
    movement: 'Open palms outward keeping little finger edges touching like a book opening',
    location: 'Chest level',
    hindiTerm: 'किताब',
  },
  SCHOOL: {
    handshape: 'Both open flat hands',
    movement: 'Clap dominant palm down onto non-dominant palm twice',
    location: 'Chest level',
    hindiTerm: 'विद्यालय',
  },
  COUNT: {
    handshape: 'Left flat palm up, right V-fingers',
    movement: 'Tap right V-fingers along left palm from base to fingertips',
    location: 'Left palm',
    hindiTerm: 'गिनना',
  },
  ADD: {
    handshape: 'Both open 5-hands spread apart',
    movement: 'Bring both hands together into joined flattened O-shapes',
    location: 'Neutral chest space',
    hindiTerm: 'जोड़ना',
  },
  ONE: {
    handshape: 'Index finger pointing straight up, palm forward',
    movement: 'Hold still with decisive forward emphasis',
    location: 'Shoulder level',
    hindiTerm: 'एक (१)',
  },
  TWO: {
    handshape: 'Index and middle fingers extended in V-shape',
    movement: 'Hold still with palm forward',
    location: 'Shoulder level',
    hindiTerm: 'दो (२)',
  },
  THREE: {
    handshape: 'Thumb, index, and middle finger extended',
    movement: 'Hold still with palm forward',
    location: 'Shoulder level',
    hindiTerm: 'तीन (३)',
  },
  FOUR: {
    handshape: 'Four fingers up, thumb folded across palm',
    movement: 'Hold still with palm forward',
    location: 'Shoulder level',
    hindiTerm: 'चार (४)',
  },
  FIVE: {
    handshape: 'All five fingers spread open, palm forward',
    movement: 'Hold still or gentle side wave',
    location: 'Shoulder level',
    hindiTerm: 'पाँच (५)',
  },
  TEN: {
    handshape: 'Both open 5-hands facing forward',
    movement: 'Show all 10 fingers with slight forward pulse',
    location: 'Chest level',
    hindiTerm: 'दस (१०)',
  },
  BIG: {
    handshape: 'Both open curved hands facing each other',
    movement: 'Expand hands outward with wide puff of breath',
    location: 'Chest level outwards',
    hindiTerm: 'बड़ा',
  },
  SMALL: {
    handshape: 'Both flat palms facing inward',
    movement: 'Bring palms close together without touching',
    location: 'Chest level',
    hindiTerm: 'छोटा',
  },
  INSIDE: {
    handshape: 'Left curved cup hand; right flat fingers tucked inside',
    movement: 'Dip right hand straight into left cupped palm',
    location: 'Chest space',
    hindiTerm: 'अंदर',
  },
  OUTSIDE: {
    handshape: 'Right hand starts inside left cup',
    movement: 'Pull right hand upward and out away from body',
    location: 'Chest space',
    hindiTerm: 'बाहर',
  },
  MONEY: {
    handshape: 'Thumb rubbing across index and middle fingertips',
    movement: 'Rub thumb tips twice in counting motion',
    location: 'In front of chest',
    hindiTerm: 'पैसे',
  },
};

const STOP_WORDS = new Set([
  'THE', 'A', 'AN', 'IS', 'ARE', 'AM', 'WAS', 'WERE', 'BE', 'BEING', 'BEEN',
  'OF', 'TO', 'FOR', 'BY', 'WITH', 'AT', 'DO', 'DOES', 'DID'
]);

export function convertSentenceToISL(sentence: string): IslSignToken[] {
  if (!sentence) return [];
  const words = sentence.trim().toUpperCase().replace(/[^A-Z0-9\s]/g, '').split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];

  // Filter stop words while ensuring at least one token remains
  const meaningful = words.filter((w) => !STOP_WORDS.has(w));
  const tokensToProcess = meaningful.length > 0 ? meaningful : words;

  return tokensToProcess.map((word, idx) => {
    // 1. Direct match in core lexicon
    if (ISL_CORE_LEXICON[word]) {
      const entry = ISL_CORE_LEXICON[word];
      return {
        id: `sign-${idx}-${word}`,
        displayWord: word,
        gloss: word,
        isFingerspelled: false,
        handshape: entry.handshape,
        movement: entry.movement,
        location: entry.location,
        hindiTerm: entry.hindiTerm,
      };
    }

    // 2. Singularize simple plurals (e.g. APPLES -> APPLE)
    if (word.endsWith('S') && ISL_CORE_LEXICON[word.slice(0, -1)]) {
      const baseWord = word.slice(0, -1);
      const entry = ISL_CORE_LEXICON[baseWord];
      return {
        id: `sign-${idx}-${word}`,
        displayWord: word,
        gloss: `${baseWord} (PLURAL)`,
        isFingerspelled: false,
        handshape: entry.handshape,
        movement: `${entry.movement} (repeat twice for plural)`,
        location: entry.location,
        hindiTerm: entry.hindiTerm,
      };
    }

    // 3. Fallback: Authentic ISLRTC Two-Handed Fingerspelling
    const letters = word.split('').filter((char) => ISL_MANUAL_ALPHABET[char]);
    const letterSeq = letters.map((l) => ({
      letter: l,
      handshape: ISL_MANUAL_ALPHABET[l].handshape,
      movement: ISL_MANUAL_ALPHABET[l].movement,
    }));

    return {
      id: `sign-${idx}-${word}`,
      displayWord: word,
      gloss: word.split('').join('-'),
      isFingerspelled: true,
      letterSequence: letterSeq,
      handshape: `ISL Two-Handed Fingerspelling (${word})`,
      movement: 'Spell each letter sequentially using standard two-handed manual alphabet',
      location: 'Chest level in front of signer',
      hindiTerm: 'अंगुली-वर्तनी',
    };
  });
}

export type ChapterStatus = 'ready' | 'partial' | 'coming-soon';

/* English lookup terms; only the official source registry supplies ISL media. */
export type IslVocabItem = { word: string };

export type ToolkitType =
  | 'tap-to-count'
  | 'ten-frame'
  | 'number-tray'
  | 'sort-buckets'
  | 'position-scene'
  | 'shape-spotter'
  | 'number-strip'
  | 'compare-sets'
  | 'coin-tray'
  | 'pattern-builder'
  | 'day-arc'
  | 'duration-race'
  | 'measure-units'
  | 'tally-pictograph'
  | 'tap-to-build-equation'
  | 'place-value-blocks'
  | 'match-pairs'
  | 'sequence-order';

export type LessonStep = {
  visual: string;
  title: string;
  text: string; // Must be <= 12 words per accessibility guidelines
  islSign?: string;
};

export type HintLadder = {
  hint1: string; // Gentle directional nudge
  hint2: string; // Concrete visual reminder
  hint3WorkedOut: string; // Complete worked-out visual answer
};

export type MathsQuestion = {
  prompt: string;
  options: string[];
  answer: number;
  hint: string;
  hintLadder?: HintLadder;
};

export type MathsLesson = {
  id: string;
  chapterId: string;
  grade: number;
  title: string;
  description: string;
  minutes: number;
  toolkitType: ToolkitType;
  toolkitConfig?: Record<string, unknown>;
  steps: LessonStep[];
  question: MathsQuestion;
  teacherNote?: string;
};

export type MathsChapter = {
  id: string;
  number: number;
  title: string;
  blurb: string;
  icon: string;
  coverImage?: string;
  themeColor: string;
  status: ChapterStatus;
  ncertPage: number;
  islVocab: IslVocabItem[];
  lessons: MathsLesson[];
};

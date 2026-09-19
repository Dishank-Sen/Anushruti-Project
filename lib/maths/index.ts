import type { MathsChapter, MathsLesson } from './types.ts';
import { chapter01 } from './chapters/c01.ts';
import { chapter02 } from './chapters/c02.ts';
import { chapter03 } from './chapters/c03.ts';
import { chapter04 } from './chapters/c04.ts';
import { chapter05 } from './chapters/c05.ts';
import { chapter06 } from './chapters/c06.ts';
import { chapter07 } from './chapters/c07.ts';
import { chapter08 } from './chapters/c08.ts';
import { chapter09 } from './chapters/c09.ts';
import { chapter10 } from './chapters/c10.ts';
import { chapter11 } from './chapters/c11.ts';
import { chapter12 } from './chapters/c12.ts';
import { chapter13 } from './chapters/c13.ts';

export * from './types.ts';

export const ALL_MATHS_CHAPTERS: MathsChapter[] = [
  chapter01,
  chapter02,
  chapter03,
  chapter04,
  chapter05,
  chapter06,
  chapter07,
  chapter08,
  chapter09,
  chapter10,
  chapter11,
  chapter12,
  chapter13,
];

export function getMathsChapter(chapterId: string): MathsChapter | undefined {
  return ALL_MATHS_CHAPTERS.find((c) => c.id === chapterId);
}

export function getMathsLesson(lessonId: string): MathsLesson | undefined {
  for (const chapter of ALL_MATHS_CHAPTERS) {
    const found = chapter.lessons.find((l) => l.id === lessonId);
    if (found) return found;
  }
  return undefined;
}

export function getAllMathsLessons(): MathsLesson[] {
  return ALL_MATHS_CHAPTERS.flatMap((c) => c.lessons);
}

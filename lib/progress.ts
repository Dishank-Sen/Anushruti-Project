import { lessons } from './lessons.ts';
import { getAllMathsLessons } from './maths/index.ts';

export type ProgressData = {
  version: 2;
  completed: string[];
  steps: Record<string, number>;
  answers: Record<string, boolean>;
  stars: Record<string, number>; // 3 = independent, 2 = hint used, 1 = worked-out shown
};

export const storageKey = 'anushruti.progress.v2';
export const legacyStorageKey = 'anushruti.progress.v1';

export function emptyProgress(): ProgressData {
  return {
    version: 2,
    completed: [],
    steps: {},
    answers: {},
    stars: {},
  };
}

function getStepCount(id: string): number | null {
  const legacy = lessons.find((l) => l.id === id);
  if (legacy) return legacy.steps.length;
  const maths = getAllMathsLessons().find((l) => l.id === id);
  if (maths) return maths.steps.length;
  return null;
}

export function parseProgress(raw: string | null): ProgressData {
  try {
    const p = JSON.parse(raw || 'null');
    if (!p) return emptyProgress();

    // Migration from version 1
    if (p.version === 1) {
      const v2 = emptyProgress();
      if (Array.isArray(p.completed)) {
        v2.completed = [
          ...new Set<string>(
            p.completed.filter((id: unknown) => typeof id === 'string' && getStepCount(id) !== null),
          ),
        ];
      }
      if (p.steps && typeof p.steps === 'object') {
        for (const [id, step] of Object.entries(p.steps)) {
          const maxSteps = getStepCount(id);
          if (maxSteps !== null && Number.isInteger(step) && (step as number) >= 0 && (step as number) < maxSteps) {
            v2.steps[id] = step as number;
          }
        }
      }
      if (p.answers && typeof p.answers === 'object') {
        for (const [id, ans] of Object.entries(p.answers)) {
          if (getStepCount(id) !== null && typeof ans === 'boolean') {
            v2.answers[id] = ans;
            v2.stars[id] = ans ? 3 : 1;
          }
        }
      }
      return v2;
    }

    if (p.version !== 2) return emptyProgress();

    const result = emptyProgress();
    if (Array.isArray(p.completed)) {
      result.completed = [
        ...new Set<string>(
          p.completed.filter((id: unknown) => typeof id === 'string' && getStepCount(id) !== null),
        ),
      ];
    }
    if (p.steps && typeof p.steps === 'object') {
      for (const [id, step] of Object.entries(p.steps)) {
        const maxSteps = getStepCount(id);
        if (maxSteps !== null && Number.isInteger(step) && (step as number) >= 0 && (step as number) < maxSteps) {
          result.steps[id] = step as number;
        }
      }
    }
    if (p.answers && typeof p.answers === 'object') {
      for (const [id, ans] of Object.entries(p.answers)) {
        if (getStepCount(id) !== null && typeof ans === 'boolean') {
          result.answers[id] = ans;
        }
      }
    }
    if (p.stars && typeof p.stars === 'object') {
      for (const [id, s] of Object.entries(p.stars)) {
        if (getStepCount(id) !== null && typeof s === 'number' && s >= 1 && s <= 3) {
          result.stars[id] = s;
        }
      }
    }

    return result;
  } catch {
    return emptyProgress();
  }
}

export function completeLesson(
  progress: ProgressData,
  id: string,
  stars: number = 3,
): ProgressData {
  if (getStepCount(id) === null) return progress;
  const clampedStars = Math.max(1, Math.min(3, stars));
  const currentBestStars = progress.stars[id] || 0;
  return {
    ...progress,
    completed: [...new Set([...progress.completed, id])],
    stars: {
      ...progress.stars,
      [id]: Math.max(currentBestStars, clampedStars),
    },
  };
}

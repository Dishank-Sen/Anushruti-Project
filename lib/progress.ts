import { lessons } from './lessons.ts';
export type ProgressData = {
  version: 1;
  completed: string[];
  steps: Record<string, number>;
  answers: Record<string, boolean>;
};
export const storageKey = 'anushruti.progress.v1';
export function emptyProgress(): ProgressData {
  return { version: 1, completed: [], steps: {}, answers: {} };
}
export function parseProgress(raw: string | null): ProgressData {
  try {
    const p = JSON.parse(raw || 'null');
    if (!p || p.version !== 1) return emptyProgress();
    const result = emptyProgress();
    result.completed = Array.isArray(p.completed)
      ? [
          ...new Set<string>(
            p.completed.filter(
              (id: unknown) =>
                typeof id === 'string' && lessons.some((l) => l.id === id),
            ),
          ),
        ]
      : [];
    for (const l of lessons) {
      const step = p.steps?.[l.id];
      if (Number.isInteger(step) && step >= 0 && step < l.steps.length)
        result.steps[l.id] = step;
      if (typeof p.answers?.[l.id] === 'boolean')
        result.answers[l.id] = p.answers[l.id];
    }
    return result;
  } catch {
    return emptyProgress();
  }
}
export function completeLesson(
  progress: ProgressData,
  id: string,
): ProgressData {
  if (!lessons.some((l) => l.id === id)) return progress;
  return { ...progress, completed: [...new Set([...progress.completed, id])] };
}

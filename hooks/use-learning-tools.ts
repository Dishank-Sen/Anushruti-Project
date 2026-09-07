'use client';
import { useEffect } from 'react';
import type { ProgressData } from '@/lib/progress';
// Optional browser capability. Read-only: never marks learning complete for a child.
type Registry = {
  registerTool(
    tool: {
      name: string;
      description: string;
      inputSchema: object;
      annotations: { readOnlyHint: boolean };
      execute(input: unknown): unknown;
    },
    options: { signal: AbortSignal },
  ): void | Promise<void>;
};
export function useLearningTools(progress: ProgressData, ready: boolean) {
  useEffect(() => {
    if (!ready) return;
    const registry = (document as Document & { modelContext?: Registry })
      .modelContext;
    if (!registry) return;
    const lifecycle = new AbortController();
    try {
      void Promise.resolve(
        registry.registerTool(
          {
            name: 'get_learning_progress',
            description:
              'Read this device’s completed visual lessons and latest activity results. This does not measure video watching or formal mastery.',
            inputSchema: {
              type: 'object',
              properties: {},
              additionalProperties: false,
            },
            annotations: { readOnlyHint: true },
            execute(input: unknown) {
              if (
                !input ||
                typeof input !== 'object' ||
                Array.isArray(input) ||
                Object.keys(input).length
              )
                throw new Error('Expected an empty object.');
              return {
                completedLessonIds: progress.completed,
                activityResults: progress.answers,
              };
            },
          },
          { signal: lifecycle.signal },
        ),
      ).catch(() => {
        /* Optional API unavailable; visible learning remains usable. */
      });
    } catch {
      /* Unsupported experimental implementation. */
    }
    return () => lifecycle.abort();
  }, [progress, ready]);
}

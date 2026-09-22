'use client';
/* oxlint-disable next/no-img-element */

import React from 'react';
import { ArrowRight, CheckCircle2, Sparkles, Lock, Star } from 'lucide-react';
import { ALL_MATHS_CHAPTERS, type MathsChapter } from '@/lib/maths';
import type { ProgressData } from '@/lib/progress';

interface ChapterTrailProps {
  grade: number;
  progress: ProgressData;
  onSelectChapter: (chapter: MathsChapter) => void;
  selectedChapterId?: string;
}

export function ChapterTrail({
  grade,
  progress,
  onSelectChapter,
  selectedChapterId,
}: ChapterTrailProps) {
  return (
    <div className="py-4 space-y-6">
      {/* Visual Journey Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-[var(--surface)] border-2 border-[var(--line)] shadow-sm">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--maths)] flex items-center gap-1.5 mb-1">
            <Sparkles size={16} /> NCERT Joyful Mathematics · Class {grade}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading m-0 text-[var(--ink)]">
            Your Maths Adventure Trail
          </h2>
          <p className="text-sm text-[var(--ink-soft)] mt-1 mb-0">
            13 chapters of visual discoveries. Tap any chapter to explore.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-center">
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[var(--gold-tint)] border-2 border-[var(--gold)] text-[var(--ink)] font-bold text-sm">
            <Star size={18} className="fill-[var(--gold)] text-[var(--gold)]" />
            <span>
              {Object.values(progress.stars).reduce((acc, s) => acc + s, 0)}{' '}
              Stars
            </span>
          </div>
        </div>
      </div>

      {/* 13 Chapters Grid / Trail */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {ALL_MATHS_CHAPTERS.map((chapter) => {
          const completedCount = chapter.lessons.filter((l) =>
            progress.completed.includes(l.id),
          ).length;
          const isFullyDone =
            completedCount === chapter.lessons.length &&
            chapter.lessons.length > 0;
          const isSelected = selectedChapterId === chapter.id;

          return (
            <button
              key={chapter.id}
              type="button"
              onClick={() => onSelectChapter(chapter)}
              className={`group relative p-5 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between select-none text-left w-full ${
                isSelected
                  ? 'bg-[var(--surface)] border-[var(--maths)] ring-4 ring-[var(--maths-tint)] shadow-md translate-y-[-2px]'
                  : 'bg-[var(--surface)] border-[var(--line)] hover:border-[light-dark(#c2d0eb,#3f5683)] hover:shadow-md hover:translate-y-[-2px]'
              }`}
              aria-label={`Chapter ${chapter.number}: ${chapter.title}`}
            >
              {/* Top Row: Cover Image, Number, Icon, Status */}
              <div>
                {chapter.coverImage && (
                  <div className="w-full h-44 rounded-2xl overflow-hidden mb-5 bg-[var(--bg)] border border-[var(--line)] flex items-center justify-center shadow-xs">
                    <img
                      src={chapter.coverImage}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <span
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-xs"
                      style={{ backgroundColor: `${chapter.themeColor}20` }}
                    >
                      {chapter.icon}
                    </span>
                    <div className="min-w-0 break-words">
                      <span className="text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)] block">
                        Chapter {String(chapter.number).padStart(2, '0')}
                      </span>
                      <h3 className="text-lg font-bold font-heading text-[var(--ink)] m-0 leading-tight group-hover:text-[var(--maths)] transition-colors">
                        {chapter.title}
                      </h3>
                    </div>
                  </div>

                  {/* Status Badge */}
                  {chapter.status === 'ready' && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[var(--ok-tint)] text-[var(--ok)] border border-[var(--ok)]">
                      Ready
                    </span>
                  )}
                  {chapter.status === 'partial' && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[var(--gold-tint)] text-[light-dark(#8c6200,#edd9ab)] border border-[var(--gold)]">
                      Partial
                    </span>
                  )}
                  {chapter.status === 'coming-soon' && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[var(--bg)] text-[var(--ink-soft)] border border-[var(--line)] flex items-center gap-1">
                      <Lock size={10} /> Soon
                    </span>
                  )}
                </div>

                {/* Blurb */}
                <p className="text-sm text-[var(--ink-soft)] leading-relaxed m-0">
                  {chapter.blurb}
                </p>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-5 pt-3 border-t border-[var(--line)] flex items-center justify-between text-xs font-bold text-[var(--ink-soft)]">
                <span>
                  {chapter.lessons.length} visual{' '}
                  {chapter.lessons.length === 1 ? 'lesson' : 'lessons'}
                </span>
                <div className="flex items-center gap-2">
                  {isFullyDone ? (
                    <span className="flex items-center gap-1 text-[var(--ok)] font-bold">
                      <CheckCircle2 size={16} /> Completed
                    </span>
                  ) : completedCount > 0 ? (
                    <span className="text-[var(--maths)] font-bold">
                      {completedCount}/{chapter.lessons.length} done
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[var(--maths)] font-bold group-hover:translate-x-1 transition-transform">
                      Explore <ArrowRight size={14} />
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

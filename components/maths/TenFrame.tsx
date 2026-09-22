'use client';

import React, { useState } from 'react';
import { RotateCcw, Check, Sparkles } from 'lucide-react';

interface TenFrameProps {
  targetCount?: number;
  initialCount?: number;
}

export function TenFrame({
  targetCount = 10,
  initialCount = 0,
}: TenFrameProps) {
  const [filled, setFilled] = useState<boolean[]>(
    Array(10)
      .fill(false)
      .map((_, i) => i < initialCount),
  );

  function toggleCell(index: number) {
    const next = [...filled];
    next[index] = !next[index];
    setFilled(next);
  }

  function reset() {
    setFilled(Array(10).fill(false));
  }

  const currentCount = filled.filter(Boolean).length;
  const isTargetMet = currentCount === targetCount;

  return (
    <div className="p-6 rounded-3xl bg-[var(--surface)] border-2 border-[var(--line)] shadow-sm my-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--maths)]">
            Ten Frame Manipulative
          </span>
          <h4 className="text-base font-bold m-0">Tap boxes to add counters</h4>
        </div>
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl border-2 font-bold text-lg ${
              isTargetMet
                ? 'bg-[var(--ok-tint)] text-[var(--ok)] border-[var(--ok)]'
                : 'bg-[var(--maths-tint)] text-[var(--maths)] border-[var(--maths)]'
            }`}
          >
            <span>{currentCount}</span>
            <span className="text-xs opacity-75">/ 10</span>
          </div>
          <button
            type="button"
            onClick={reset}
            className="w-10 h-10 rounded-xl border border-[var(--line)] flex items-center justify-center hover:bg-[var(--bg)] text-[var(--ink-soft)] transition"
            aria-label="Clear ten frame"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* Ten Frame Grid (5x2) */}
      <div className="bg-[var(--bg)] p-4 rounded-2xl border-2 border-[var(--line)] inline-block mx-auto w-full max-w-md">
        <div className="grid grid-cols-5 gap-3 mb-3">
          {[0, 1, 2, 3, 4].map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => toggleCell(i)}
              className={`min-w-[56px] min-h-[56px] h-14 rounded-xl border-2 flex items-center justify-center text-2xl transition select-none ${
                filled[i]
                  ? 'bg-[var(--primary)] border-[var(--maths)] text-white shadow-[0_3px_0_#1a328a]'
                  : 'bg-[var(--surface)] border-dashed border-[var(--line)] hover:border-[var(--maths)]'
              }`}
              aria-label={`Box ${i + 1}, ${filled[i] ? 'filled' : 'empty'}`}
            >
              {filled[i] ? '🔵' : ''}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-5 gap-3">
          {[5, 6, 7, 8, 9].map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => toggleCell(i)}
              className={`min-w-[56px] min-h-[56px] h-14 rounded-xl border-2 flex items-center justify-center text-2xl transition select-none ${
                filled[i]
                  ? 'bg-[var(--primary)] border-[var(--maths)] text-white shadow-[0_3px_0_#1a328a]'
                  : 'bg-[var(--surface)] border-dashed border-[var(--line)] hover:border-[var(--maths)]'
              }`}
              aria-label={`Box ${i + 1}, ${filled[i] ? 'filled' : 'empty'}`}
            >
              {filled[i] ? '🔵' : ''}
            </button>
          ))}
        </div>
      </div>

      {isTargetMet && (
        <div className="mt-4 p-3 rounded-2xl bg-[var(--ok-tint)] text-[var(--ok)] font-bold text-sm flex items-center justify-center gap-2 border border-[var(--ok)] animate-in fade-in">
          <Check size={18} />
          <span>Full frame! You built {targetCount}!</span>
          <Sparkles size={16} />
        </div>
      )}
    </div>
  );
}

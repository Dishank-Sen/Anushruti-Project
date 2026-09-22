'use client';

import React, { useState } from 'react';
import { RotateCcw, Check, Sparkles } from 'lucide-react';

interface TapToCountProps {
  items?: string[];
  targetCount?: number;
  label?: string;
}

export function TapToCount({
  items = ['🥭', '🥭', '🥭', '🥭', '🥭'],
  targetCount = 5,
  label = 'Tap each mango to count',
}: TapToCountProps) {
  const [tappedIndices, setTappedIndices] = useState<number[]>([]);

  function toggleItem(index: number) {
    if (tappedIndices.includes(index)) {
      setTappedIndices(tappedIndices.filter((i) => i !== index));
    } else {
      setTappedIndices([...tappedIndices, index]);
    }
  }

  function reset() {
    setTappedIndices([]);
  }

  const currentCount = tappedIndices.length;
  const isComplete = currentCount === targetCount;

  return (
    <div className="p-6 rounded-3xl bg-[var(--surface)] border-2 border-[var(--line)] shadow-sm my-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--maths)]">
            Visual Manipulative
          </span>
          <h4 className="text-base font-bold m-0">{label}</h4>
        </div>
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl border-2 font-bold text-lg transition ${
              isComplete
                ? 'bg-[var(--ok-tint)] text-[var(--ok)] border-[var(--ok)]'
                : 'bg-[var(--maths-tint)] text-[var(--maths)] border-[var(--maths)]'
            }`}
          >
            <span>{currentCount}</span>
            <span className="text-xs opacity-75">/ {targetCount}</span>
          </div>
          <button
            type="button"
            onClick={reset}
            className="w-10 h-10 rounded-xl border border-[var(--line)] flex items-center justify-center hover:bg-[var(--bg)] text-[var(--ink-soft)] transition"
            aria-label="Reset count"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* Tap targets grid (min 56px each) */}
      <div className="flex flex-wrap items-center justify-center gap-4 py-4 min-h-[120px] bg-[var(--bg)] rounded-2xl border border-[var(--line)] p-4">
        {items.map((emoji, idx) => {
          const isTapped = tappedIndices.includes(idx);
          const tapOrder = tappedIndices.indexOf(idx) + 1;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => toggleItem(idx)}
              className={`relative min-w-[64px] min-h-[64px] w-16 h-16 rounded-2xl flex items-center justify-center text-3xl border-2 transition-transform select-none ${
                isTapped
                  ? 'bg-[var(--gold-tint)] border-[var(--gold)] scale-110 shadow-[0_4px_0_#b37d00]'
                  : 'bg-[var(--surface)] border-[var(--line)] hover:scale-105 hover:border-[var(--maths)]'
              }`}
              aria-pressed={isTapped}
              aria-label={`Item ${idx + 1}, ${isTapped ? `counted as number ${tapOrder}` : 'not counted yet'}`}
            >
              <span>{emoji}</span>
              {isTapped && (
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[var(--primary)] text-white text-xs font-bold flex items-center justify-center border-2 border-white shadow-xs">
                  {tapOrder}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Visual Completion Feedback */}
      {isComplete && (
        <div className="mt-4 p-3 rounded-2xl bg-[var(--ok-tint)] text-[var(--ok)] font-bold text-sm flex items-center justify-center gap-2 border border-[var(--ok)] animate-in fade-in">
          <Check size={18} />
          <span>Wonderful! You counted all {targetCount} items!</span>
          <Sparkles size={16} />
        </div>
      )}
    </div>
  );
}

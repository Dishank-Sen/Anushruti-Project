'use client';

import React, { useState } from 'react';
import { HelpCircle, Star, ChevronDown, CheckCircle2 } from 'lucide-react';
import type { HintLadder as HintLadderType } from '@/lib/maths/types';

interface HintLadderProps {
  ladder?: HintLadderType;
  fallbackHint: string;
  onHintRevealed?: (level: number) => void;
}

export function HintLadder({ ladder, fallbackHint, onHintRevealed }: HintLadderProps) {
  const [level, setLevel] = useState<number>(0);

  function revealNext() {
    const nextLevel = Math.min(3, level + 1);
    setLevel(nextLevel);
    onHintRevealed?.(nextLevel);
  }

  return (
    <div className="hint-ladder my-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HelpCircle size={18} className="text-[var(--gold)]" />
          <span className="font-bold text-sm text-[var(--ink)]">Need a clue?</span>
        </div>
        <div className="flex items-center gap-1">
          {[1, 2, 3].map((starIndex) => (
            <Star
              key={starIndex}
              size={16}
              className={`${
                level === 0 || (level === 1 && starIndex <= 2) || (level === 2 && starIndex <= 2) || (level === 3 && starIndex === 1)
                  ? 'fill-[var(--gold)] text-[var(--gold)]'
                  : 'text-[var(--line)]'
              }`}
            />
          ))}
        </div>
      </div>

      {level === 0 && (
        <div className="mt-3">
          <button
            type="button"
            onClick={revealNext}
            className="w-full min-h-[48px] py-2 px-4 rounded-xl border-2 border-[var(--line)] bg-[var(--surface)] text-sm font-bold text-[var(--ink-soft)] hover:bg-[var(--bg)] hover:text-[var(--ink)] transition flex items-center justify-center gap-2"
          >
            <span>Show gentle clue</span>
            <ChevronDown size={16} />
          </button>
        </div>
      )}

      {level >= 1 && (
        <div className="hint-ladder-step animate-in fade-in">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--gold)] block mb-1">
            Clue 1
          </span>
          <p className="text-sm font-medium m-0 text-[var(--ink)]">
            {ladder?.hint1 || fallbackHint}
          </p>
        </div>
      )}

      {level === 1 && ladder && (
        <div className="mt-2">
          <button
            type="button"
            onClick={revealNext}
            className="w-full min-h-[44px] py-1.5 px-3 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-xs font-bold text-[var(--ink-soft)] hover:bg-[var(--bg)] transition flex items-center justify-center gap-1"
          >
            <span>Still stuck? Show bigger clue</span>
            <ChevronDown size={14} />
          </button>
        </div>
      )}

      {level >= 2 && ladder && (
        <div className="hint-ladder-step animate-in fade-in">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--gold)] block mb-1">
            Clue 2
          </span>
          <p className="text-sm font-medium m-0 text-[var(--ink)]">
            {ladder.hint2}
          </p>
        </div>
      )}

      {level === 2 && ladder && (
        <div className="mt-2">
          <button
            type="button"
            onClick={revealNext}
            className="w-full min-h-[44px] py-1.5 px-3 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-xs font-bold text-[var(--retry)] hover:bg-[var(--retry-tint)] transition flex items-center justify-center gap-1"
          >
            <span>Show worked-out answer</span>
            <ChevronDown size={14} />
          </button>
        </div>
      )}

      {level >= 3 && ladder && (
        <div className="hint-ladder-step bg-[var(--ok-tint)] border-[var(--ok)] animate-in fade-in">
          <div className="flex items-center gap-2 text-[var(--ok)] font-bold text-xs uppercase tracking-wider mb-1">
            <CheckCircle2 size={14} />
            <span>Worked-out Answer</span>
          </div>
          <p className="text-sm font-bold m-0 text-[var(--ok)]">
            {ladder.hint3WorkedOut}
          </p>
        </div>
      )}
    </div>
  );
}

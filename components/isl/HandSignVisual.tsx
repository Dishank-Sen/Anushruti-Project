'use client';
/* oxlint-disable next/no-img-element */

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface HandSignVisualProps {
  signKey: string;
  className?: string;
  size?: number;
  showFingerspellingStrip?: boolean;
}

// Action descriptions for foundational ISL signs
const SIGN_ACTIONS: Record<string, string> = {
  TOP: 'Point index finger upward toward the top surface ⬆️',
  BOTTOM: 'Point downward beneath the surface ⬇️',
  INSIDE: 'Place dominant hand inside cupped non-dominant hand 📥',
  OUTSIDE: 'Pull hand outward away from boundary 📤',
  BIG: 'Spread both hands wide apart with open palms 👐',
  SMALL: 'Bring hands or index/thumb close together 🤏',
  ADD: 'Bring both hands together to combine sets ➕',
  PLUS: 'Bring both hands together to combine sets ➕',
  MORE: 'Tap flat fingertips together repeatedly ➕',
  LESS: 'Lower flat hand downward to show smaller amount 📉',
  COUNT: 'Tap index finger along open palm one by one 🔢',
  ROUND: 'Trace a smooth circle in the air with index finger ⭕',
  LONG: 'Pull both index fingers horizontally apart ↔️',
  ROLL: 'Rotate hands forward over each other like a wheel 🔄',
  SLIDE: 'Glide flat hand smoothly along flat palm 🛝',
  CAT: 'Pinch whiskers at cheeks and pull outward twice 🐱',
  BOOK: 'Open cupped palms together like opening a book 📖',
  DOG: 'Pat thigh and snap fingers 🐶',
  SCHOOL: 'Clap flat palms together twice 🏫',
  FRIEND: 'Hook index fingers together in friendship 🤝',
  HAPPY: 'Brush open palm upward against chest twice 😊',
};

/**
 * HandSignVisual: Renders authentic, real hand sign illustrations everywhere.
 * - Single letters (A–Z): Displays the real hand illustration from /images/isl/alphabet/{letter}.svg
 * - Numbers (1–5): Displays the authentic real hand sign (1=index, 2=V, 3=three, 4=four, 5=open)
 * - Words (TOP, INSIDE, CAT, etc.): Displays real hand sign cards for each letter of the word,
 *   with an interactive letter selector and physical action guidance.
 * - ZERO geometric rectangles or fake boxes.
 */
export function HandSignVisual({
  signKey,
  className = '',
  size = 200,
  showFingerspellingStrip = true,
}: HandSignVisualProps) {
  const rawKey = signKey.trim().toUpperCase();
  const isSingleLetter = /^[A-Z]$/.test(rawKey);
  const isNumber = /^[0-9]$/.test(rawKey) || ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE'].includes(rawKey);

  // For multi-letter words, maintain active letter index
  const letters = rawKey.replace(/[^A-Z]/g, '').split('');
  const [prevRawKey, setPrevRawKey] = useState(rawKey);
  const [activeIdx, setActiveIdx] = useState(0);

  if (rawKey !== prevRawKey) {
    setPrevRawKey(rawKey);
    setActiveIdx(0);
  }

  // Map numbers to appropriate real hand sign SVGs
  const getNumberLetter = (numStr: string): string => {
    switch (numStr) {
      case '1':
      case 'ONE':
        return 'd'; // Index pointing straight up
      case '2':
      case 'TWO':
        return 'v'; // Index and middle in V shape
      case '3':
      case 'THREE':
        return 'w'; // Three fingers up
      case '4':
      case 'FOUR':
        return 'b'; // Four fingers up
      case '5':
      case 'FIVE':
        return '5'; // Open 5-finger palm
      default:
        return 'd';
    }
  };

  // 1. Single Letter: Render the real hand sign SVG directly
  if (isSingleLetter) {
    const letterLower = rawKey.toLowerCase();
    return (
      <div
        className={`inline-flex flex-col items-center justify-center p-3 rounded-2xl bg-white border-2 border-[var(--line)] shadow-sm ${className}`}
        style={{ width: size, minHeight: size * 0.9 }}
      >
        <div className="relative w-full flex items-center justify-center h-[140px]">
          <img
            src={`/images/isl/alphabet/${letterLower}.svg`}
            alt={`Real hand sign for letter ${rawKey}`}
            className="max-h-[135px] w-auto object-contain filter drop-shadow-sm select-none"
            loading="lazy"
          />
        </div>
        <div className="mt-2 px-3 py-1 rounded-full bg-[var(--bg)] border border-[var(--line)] flex items-center gap-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--ink-soft)]">
            Letter Sign:
          </span>
          <span className="text-sm font-black text-[var(--maths)] font-mono">
            {rawKey}
          </span>
        </div>
      </div>
    );
  }

  // 2. Number: Render the real counting hand sign SVG directly
  if (isNumber) {
    const mapped = getNumberLetter(rawKey);
    return (
      <div
        className={`inline-flex flex-col items-center justify-center p-3 rounded-2xl bg-white border-2 border-[var(--line)] shadow-sm ${className}`}
        style={{ width: size, minHeight: size * 0.9 }}
      >
        <div className="relative w-full flex items-center justify-center h-[140px]">
          <img
            src={`/images/isl/alphabet/${mapped}.svg`}
            alt={`Real hand sign for number ${rawKey}`}
            className="max-h-[135px] w-auto object-contain filter drop-shadow-sm select-none"
            loading="lazy"
          />
        </div>
        <div className="mt-2 px-3 py-1 rounded-full bg-[var(--bg)] border border-[var(--line)] flex items-center gap-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--ink-soft)]">
            Number Sign:
          </span>
          <span className="text-sm font-black text-[var(--maths)] font-mono">
            {rawKey}
          </span>
        </div>
      </div>
    );
  }

  // 3. Word: Render REAL Hand Signs for its letters + Action Guidance
  const safeLetters = letters.length > 0 ? letters : ['A'];
  const currentLetter = safeLetters[activeIdx] || safeLetters[0];
  const actionText = SIGN_ACTIONS[rawKey];

  return (
    <div className={`flex flex-col items-center gap-3 w-full max-w-[280px] select-none ${className}`}>
      {/* Primary Real Hand Sign Card */}
      <div className="w-full p-3.5 rounded-2xl bg-white border-2 border-[var(--line)] shadow-sm flex flex-col items-center">
        {/* Real Hand Illustration */}
        <div className="relative w-full flex items-center justify-center h-[130px]">
          <img
            src={`/images/isl/alphabet/${currentLetter.toLowerCase()}.svg`}
            alt={`Real hand sign for letter ${currentLetter} in ${rawKey}`}
            className="max-h-[125px] w-auto object-contain filter drop-shadow-sm"
            loading="lazy"
          />
        </div>

        {/* Active Letter Indicator */}
        <div className="mt-2 flex items-center justify-between w-full px-2">
          <button
            type="button"
            disabled={activeIdx === 0}
            onClick={() => setActiveIdx((prev) => Math.max(0, prev - 1))}
            className="p-1 rounded-lg hover:bg-[var(--bg)] text-[var(--ink-soft)] disabled:opacity-30 transition"
            aria-label="Previous letter sign"
          >
            <ChevronLeft size={16} />
          </button>

          <span className="text-xs font-bold text-[var(--ink)] bg-[var(--bg)] px-2.5 py-0.5 rounded-full border border-[var(--line)]">
            Sign: <span className="text-[var(--maths)] font-black">{currentLetter}</span>
            <span className="text-[10px] text-[var(--ink-soft)] ml-1">
              ({activeIdx + 1}/{safeLetters.length})
            </span>
          </span>

          <button
            type="button"
            disabled={activeIdx === safeLetters.length - 1}
            onClick={() => setActiveIdx((prev) => Math.min(safeLetters.length - 1, prev + 1))}
            className="p-1 rounded-lg hover:bg-[var(--bg)] text-[var(--ink-soft)] disabled:opacity-30 transition"
            aria-label="Next letter sign"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Real Hand Sign Letter Strip */}
        {showFingerspellingStrip && safeLetters.length > 1 && (
          <div className="mt-2.5 pt-2 border-t border-[var(--line)] w-full flex flex-col items-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--ink-soft)] mb-1">
              Tap letter to see real hand:
            </span>
            <div className="flex items-center justify-center gap-1.5 flex-wrap">
              {safeLetters.map((char, idx) => {
                const isActive = idx === activeIdx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveIdx(idx)}
                    className={`flex flex-col items-center p-1 rounded-xl border transition ${
                      isActive
                        ? 'bg-[var(--maths-tint)] border-[var(--maths)] shadow-xs scale-105'
                        : 'bg-[var(--bg)] border-[var(--line)] hover:border-[var(--maths)] opacity-75'
                    }`}
                    title={`Real hand sign for ${char}`}
                  >
                    <img
                      src={`/images/isl/alphabet/${char.toLowerCase()}.svg`}
                      alt={`Hand sign for ${char}`}
                      className="w-7 h-7 object-contain"
                      loading="lazy"
                    />
                    <span
                      className={`text-[10px] font-black font-mono leading-tight ${
                        isActive ? 'text-[var(--maths)]' : 'text-[var(--ink)]'
                      }`}
                    >
                      {char}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Optional Concept Action Guidance */}
      {actionText && (
        <div className="w-full p-2.5 rounded-xl bg-[var(--maths-tint)]/60 border border-[var(--maths)]/30 text-left text-[11px] text-[var(--ink)] flex items-start gap-1.5">
          <Sparkles size={14} className="text-[var(--maths)] shrink-0 mt-0.5" />
          <span className="leading-tight">{actionText}</span>
        </div>
      )}
    </div>
  );
}

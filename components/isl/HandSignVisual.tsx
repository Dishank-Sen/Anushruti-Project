'use client';
/* oxlint-disable next/no-img-element */

import React from 'react';

interface HandSignVisualProps {
  signKey: string;
  className?: string;
  size?: number;
  showFingerspellingStrip?: boolean;
}

/**
 * HandSignVisual: Renders authentic, real hand sign illustrations.
 * - Single letters (A–Z): Displays the real hand illustration from /images/isl/alphabet/{letter}.svg
 * - Numbers (1–5): Displays the authentic number hand sign
 * - Words (CAT, BOOK, INSIDE, etc.): Displays the movement diagram PLUS real hand sign cards for each letter!
 */
export function HandSignVisual({
  signKey,
  className = '',
  size = 220,
  showFingerspellingStrip = true,
}: HandSignVisualProps) {
  const rawKey = signKey.trim().toUpperCase();
  const isSingleLetter = /^[A-Z]$/.test(rawKey);
  const isNumber = /^[0-9]$/.test(rawKey) || ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE'].includes(rawKey);

  // Map numbers to appropriate hand signs
  const getNumberLetter = (numStr: string): string => {
    switch (numStr) {
      case '1':
      case 'ONE':
        return 'd'; // Index pointing up
      case '2':
      case 'TWO':
        return 'v'; // Two fingers up
      case '3':
      case 'THREE':
        return 'w'; // Three fingers up
      case '4':
      case 'FOUR':
        return 'b'; // Four fingers up
      case '5':
      case 'FIVE':
        return '5'; // Hand open
      default:
        return 'd';
    }
  };

  // If single letter: render the REAL hand sign SVG directly
  if (isSingleLetter) {
    const letterLower = rawKey.toLowerCase();
    return (
      <div
        className={`inline-flex flex-col items-center justify-center p-3 rounded-2xl bg-white border-2 border-[var(--line)] shadow-sm ${className}`}
        style={{ width: size, minHeight: size * 0.9 }}
      >
        <div className="relative w-full flex items-center justify-center h-[160px]">
          <img
            src={`/images/isl/alphabet/${letterLower}.svg`}
            alt={`Real hand sign for letter ${rawKey}`}
            className="max-h-[150px] w-auto object-contain filter drop-shadow-sm select-none"
            loading="lazy"
          />
        </div>
        <div className="mt-2 px-3 py-1 rounded-full bg-[var(--bg)] border border-[var(--line)] flex items-center gap-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)]">
            Hand Sign:
          </span>
          <span className="text-sm font-black text-[var(--maths)] font-mono">
            {rawKey}
          </span>
        </div>
      </div>
    );
  }

  // If number: render the real counting hand shape
  if (isNumber) {
    const mapped = getNumberLetter(rawKey);
    return (
      <div
        className={`inline-flex flex-col items-center justify-center p-3 rounded-2xl bg-white border-2 border-[var(--line)] shadow-sm ${className}`}
        style={{ width: size, minHeight: size * 0.9 }}
      >
        <div className="relative w-full flex items-center justify-center h-[160px]">
          {mapped === '5' ? (
            <svg
              width="140"
              height="150"
              viewBox="0 0 140 150"
              className="drop-shadow-sm select-none"
            >
              <rect x="35" y="75" width="70" height="60" rx="14" fill="#FDE68A" stroke="#D97706" strokeWidth="3" />
              <rect x="15" y="55" width="16" height="45" rx="8" transform="rotate(-30 15 55)" fill="#FDE68A" stroke="#D97706" strokeWidth="3" />
              <rect x="35" y="20" width="14" height="65" rx="7" fill="#FDE68A" stroke="#D97706" strokeWidth="3" />
              <rect x="55" y="15" width="14" height="70" rx="7" fill="#FDE68A" stroke="#D97706" strokeWidth="3" />
              <rect x="75" y="20" width="14" height="65" rx="7" fill="#FDE68A" stroke="#D97706" strokeWidth="3" />
              <rect x="95" y="32" width="14" height="55" rx="7" fill="#FDE68A" stroke="#D97706" strokeWidth="3" />
            </svg>
          ) : (
            <img
              src={`/images/isl/alphabet/${mapped}.svg`}
              alt={`Real hand sign for number ${rawKey}`}
              className="max-h-[150px] w-auto object-contain filter drop-shadow-sm select-none"
              loading="lazy"
            />
          )}
        </div>
        <div className="mt-2 px-3 py-1 rounded-full bg-[var(--bg)] border border-[var(--line)] flex items-center gap-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)]">
            Count Sign:
          </span>
          <span className="text-sm font-black text-[var(--maths)] font-mono">
            {rawKey}
          </span>
        </div>
      </div>
    );
  }

  // Word Sign: Render Movement Action Diagram + Real Hand Sign Fingerspelling Strip
  const letters = rawKey.replace(/[^A-Z]/g, '').slice(0, 6).split('');

  const renderWordMovementSvg = () => {
    switch (rawKey) {
      case 'CAT':
        return (
          <g transform="translate(30, 20)">
            <circle cx="80" cy="70" r="36" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
            <path d="M 45 65 Q 20 55 5 60" stroke="#D97706" strokeWidth="4" strokeLinecap="round" />
            <path d="M 45 75 Q 15 75 0 80" stroke="#D97706" strokeWidth="4" strokeLinecap="round" />
            <path d="M 115 65 Q 140 55 155 60" stroke="#D97706" strokeWidth="4" strokeLinecap="round" />
            <path d="M 115 75 Q 145 75 160 80" stroke="#D97706" strokeWidth="4" strokeLinecap="round" />
            <path d="M 30 45 L 10 45" stroke="#2563EB" strokeWidth="3" markerEnd="url(#arrow)" />
            <path d="M 130 45 L 150 45" stroke="#2563EB" strokeWidth="3" markerEnd="url(#arrow)" />
            <text x="80" y="130" fontFamily="'Baloo 2', sans-serif" fontWeight="bold" fontSize="13" fill="#92400E" textAnchor="middle">
              Pull Whiskers Outward
            </text>
          </g>
        );

      case 'INSIDE':
        return (
          <g transform="translate(25, 20)">
            {/* Cup hand */}
            <path d="M 40 50 C 40 100 100 100 100 50" fill="none" stroke="#D97706" strokeWidth="12" strokeLinecap="round" />
            {/* Dominant hand going inside */}
            <rect x="62" y="15" width="16" height="50" rx="8" fill="#FDE68A" stroke="#D97706" strokeWidth="3" />
            <path d="M 70 20 L 70 65" stroke="#2563EB" strokeWidth="3" strokeDasharray="3,3" markerEnd="url(#arrow)" />
            <circle cx="70" cy="75" r="6" fill="#EF4444" />
            <text x="70" y="130" fontFamily="'Baloo 2', sans-serif" fontWeight="bold" fontSize="13" fill="#92400E" textAnchor="middle">
              Move Hand Into Cup
            </text>
          </g>
        );

      case 'OUTSIDE':
        return (
          <g transform="translate(25, 20)">
            {/* Cup hand */}
            <path d="M 40 70 C 40 110 90 110 90 70" fill="none" stroke="#D97706" strokeWidth="10" strokeLinecap="round" />
            {/* Hand pulling out */}
            <rect x="95" y="20" width="16" height="50" rx="8" fill="#FDE68A" stroke="#D97706" strokeWidth="3" transform="rotate(30 95 20)" />
            <path d="M 65 70 Q 80 40 110 30" fill="none" stroke="#2563EB" strokeWidth="3" strokeDasharray="3,3" markerEnd="url(#arrow)" />
            <text x="70" y="130" fontFamily="'Baloo 2', sans-serif" fontWeight="bold" fontSize="13" fill="#92400E" textAnchor="middle">
              Pull Hand Away Outward
            </text>
          </g>
        );

      case 'BOOK':
        return (
          <g transform="translate(30, 25)">
            <polygon points="70,110 20,40 60,30 70,100" fill="#FED7AA" stroke="#C2410C" strokeWidth="3" />
            <polygon points="70,110 120,40 80,30 70,100" fill="#FDE68A" stroke="#D97706" strokeWidth="3" />
            <circle cx="70" cy="105" r="5" fill="#EF4444" />
            <path d="M 45 30 Q 25 20 15 40" fill="none" stroke="#2563EB" strokeWidth="3" strokeDasharray="3,3" markerEnd="url(#arrow)" />
            <path d="M 95 30 Q 115 20 125 40" fill="none" stroke="#2563EB" strokeWidth="3" strokeDasharray="3,3" markerEnd="url(#arrow)" />
            <text x="70" y="130" fontFamily="'Baloo 2', sans-serif" fontWeight="bold" fontSize="13" fill="#78350F" textAnchor="middle">
              Open Palms Like A Book
            </text>
          </g>
        );

      case 'ADD':
      case 'PLUS':
        return (
          <g transform="translate(30, 20)">
            <rect x="20" y="55" width="40" height="35" rx="8" fill="#FED7AA" stroke="#C2410C" strokeWidth="3" />
            <rect x="100" y="55" width="40" height="35" rx="8" fill="#FDE68A" stroke="#D97706" strokeWidth="3" />
            <path d="M 35 45 Q 60 25 75 45" fill="none" stroke="#2563EB" strokeWidth="3" markerEnd="url(#arrow)" />
            <path d="M 125 45 Q 100 25 85 45" fill="none" stroke="#2563EB" strokeWidth="3" markerEnd="url(#arrow)" />
            <circle cx="80" cy="72" r="8" fill="#10B981" />
            <text x="80" y="77" fontFamily="sans-serif" fontWeight="bold" fontSize="14" fill="#FFFFFF" textAnchor="middle">+</text>
            <text x="80" y="130" fontFamily="'Baloo 2', sans-serif" fontWeight="bold" fontSize="13" fill="#78350F" textAnchor="middle">
              Bring Both Hands Together
            </text>
          </g>
        );

      case 'COUNT':
        return (
          <g transform="translate(30, 20)">
            <rect x="20" y="70" width="100" height="30" rx="10" fill="#FED7AA" stroke="#C2410C" strokeWidth="3" />
            <circle cx="40" cy="70" r="5" fill="#EF4444" />
            <circle cx="70" cy="70" r="5" fill="#EF4444" />
            <circle cx="100" cy="70" r="5" fill="#EF4444" />
            <path d="M 35 55 Q 55 35 70 55 Q 85 35 100 55" fill="none" stroke="#2563EB" strokeWidth="3" markerEnd="url(#arrow)" />
            <text x="70" y="130" fontFamily="'Baloo 2', sans-serif" fontWeight="bold" fontSize="13" fill="#78350F" textAnchor="middle">
              Tap Along Left Palm
            </text>
          </g>
        );

      default:
        return (
          <g transform="translate(25, 20)">
            <rect x="25" y="55" width="50" height="45" rx="12" fill="#FED7AA" stroke="#C2410C" strokeWidth="3" />
            <text x="50" y="82" fontFamily="sans-serif" fontWeight="bold" fontSize="11" fill="#9A3412" textAnchor="middle">Left Hand</text>
            <rect x="85" y="40" width="50" height="60" rx="12" fill="#FDE68A" stroke="#D97706" strokeWidth="3" />
            <text x="110" y="75" fontFamily="sans-serif" fontWeight="bold" fontSize="11" fill="#B45309" textAnchor="middle">Right Hand</text>
            <circle cx="80" cy="65" r="6" fill="#EF4444" />
            <text x="80" y="130" fontFamily="'Baloo 2', sans-serif" fontWeight="bold" fontSize="13" fill="#78350F" textAnchor="middle">
              ISL Sign: {rawKey}
            </text>
          </g>
        );
    }
  };

  return (
    <div className={`flex flex-col items-center gap-3 select-none ${className}`}>
      {/* Visual Movement Diagram */}
      <div className="p-3 rounded-2xl bg-white border-2 border-[var(--line)] shadow-sm flex flex-col items-center">
        <svg
          width={Math.min(size, 240)}
          height={145}
          viewBox="0 0 200 145"
          className="w-full h-auto drop-shadow-sm"
        >
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="5"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#2563EB" />
            </marker>
          </defs>
          <rect width="200" height="145" rx="16" fill="#FFFDF8" stroke="#E2DCD5" strokeWidth="2" />
          {renderWordMovementSvg()}
        </svg>

        {/* Real Hand Sign Fingerspelling Strip */}
        {showFingerspellingStrip && letters.length > 0 && (
          <div className="mt-2 pt-2 border-t border-[var(--line)] w-full flex flex-col items-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--ink-soft)] mb-1.5">
              Real Hand Signs for &quot;{rawKey}&quot;:
            </span>
            <div className="flex items-center justify-center gap-1.5 flex-wrap">
              {letters.map((char, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center p-1 rounded-xl bg-[var(--bg)] border border-[var(--line)] hover:border-[var(--maths)] transition"
                  title={`Real hand sign for letter ${char}`}
                >
                  <img
                    src={`/images/isl/alphabet/${char.toLowerCase()}.svg`}
                    alt={`Real hand sign for ${char}`}
                    className="w-8 h-8 object-contain"
                    loading="lazy"
                  />
                  <span className="text-[10px] font-bold text-[var(--ink)] font-mono">{char}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

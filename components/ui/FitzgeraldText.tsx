'use client';

import React from 'react';
import { parseFitzgerald, FITZGERALD_COLORS } from '../../lib/fitzgerald.ts';

interface FitzgeraldTextProps {
  text: string;
  enabled?: boolean;
  className?: string;
  showLabels?: boolean;
}

export function FitzgeraldText({
  text,
  enabled = true,
  className = '',
  showLabels = false,
}: FitzgeraldTextProps) {
  if (!enabled) {
    return <span className={className}>{text}</span>;
  }

  const tokens = parseFitzgerald(text);

  return (
    <span className={`inline-flex flex-wrap items-baseline gap-1.5 ${className}`}>
      {tokens.map((tok, idx) => {
        const colors = FITZGERALD_COLORS[tok.category];
        const isColored = tok.category !== 'default';

        if (!isColored) {
          return (
            <span key={idx} className="inline-block">
              {tok.word}
            </span>
          );
        }

        return (
          <span
            key={idx}
            className="inline-flex flex-col items-center px-2 py-0.5 rounded-xl border transition-all select-none"
            style={{
              backgroundColor: colors.bg,
              color: colors.text,
              borderColor: colors.border,
            }}
            title={tok.categoryLabel}
          >
            <span className="font-bold">{tok.word}</span>
            {showLabels && tok.categoryLabel && (
              <span className="text-[9px] font-black uppercase tracking-wider opacity-80 leading-none mt-0.5">
                {tok.categoryLabel.split('/')[0].trim()}
              </span>
            )}
          </span>
        );
      })}
    </span>
  );
}

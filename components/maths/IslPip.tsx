'use client';

import React, { useState } from 'react';
import { Hand, X, Info } from 'lucide-react';
import type { IslVocabItem } from '@/lib/maths/types';
import { HandSignVisual } from '../isl/HandSignVisual';

interface IslPipProps {
  vocab: IslVocabItem[];
}

export function IslPip({ vocab }: IslPipProps) {
  const [open, setOpen] = useState(false);
  const [selectedWord, setSelectedWord] = useState<string>(vocab[0]?.word || '');

  if (!vocab || vocab.length === 0) return null;

  const currentItem = vocab.find((v) => v.word === selectedWord) || vocab[0];

  return (
    <div className="relative my-4">
      {/* Pill button trigger */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)] flex items-center gap-1.5">
          <Hand size={15} className="text-[var(--maths)]" /> ISL Signs:
        </span>
        {vocab.map((item) => (
          <button
            key={item.word}
            type="button"
            onClick={() => {
              setSelectedWord(item.word);
              setOpen(true);
            }}
            className="isl-chip min-h-[40px] px-3.5 py-1.5 rounded-xl border border-[#c2d2fc] bg-[#edf1fe] text-[var(--maths)] font-bold text-sm hover:bg-[#dce5fd] transition flex items-center gap-1.5"
            aria-label={`View Indian Sign Language sign for ${item.word}`}
          >
            <span>{item.word}</span>
          </button>
        ))}
      </div>

      {/* Expanded Sign Card */}
      {open && currentItem && (
        <section
          className="mt-3 p-5 rounded-3xl border-2 border-[var(--maths)] bg-[var(--surface)] shadow-lg animate-in fade-in slide-in-from-top-2 duration-150"
          aria-label={`ISL sign explanation for ${currentItem.word}`}
        >
          <div className="flex items-start justify-between border-b border-[var(--line)] pb-3 mb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-[var(--maths-tint)] text-[var(--maths)]">
                  <Hand size={18} />
                </span>
                <h4 className="font-bold text-base m-0 text-[var(--ink)]">
                  Real ISL Sign: <span className="text-[var(--maths)]">{currentItem.word}</span>
                </h4>
              </div>
              <p className="text-xs text-[var(--ink-soft)] mt-1 mb-0">
                Visual hand sign demonstration and movement reference
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[var(--line)] text-[var(--ink-soft)]"
              aria-label="Close sign card"
            >
              <X size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
            {/* Real Hand Sign Visual */}
            <div className="md:col-span-5 flex justify-center">
              <HandSignVisual signKey={currentItem.word} size={200} />
            </div>

            {/* Handshape & Movement Guide */}
            <div className="md:col-span-7 space-y-3">
              <div className="p-3 rounded-2xl bg-[var(--bg)] border border-[var(--line)]">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--maths)] block mb-1">
                  Handshape
                </span>
                <p className="text-sm font-medium m-0 text-[var(--ink)]">
                  {currentItem.handShape}
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-[var(--bg)] border border-[var(--line)]">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--maths)] block mb-1">
                  Movement
                </span>
                <p className="text-sm font-medium m-0 text-[var(--ink)]">
                  {currentItem.movement}
                </p>
              </div>

              <div className="flex items-start gap-2 p-3 rounded-2xl bg-[var(--maths-tint)]/60 text-[var(--ink)] text-xs">
                <Info size={16} className="text-[var(--maths)] shrink-0 mt-0.5" />
                <span>{currentItem.description}</span>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

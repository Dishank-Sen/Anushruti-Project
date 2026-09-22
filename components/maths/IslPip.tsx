'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { HandSignVisual } from '../isl/HandSignVisual';
import type { IslVocabItem } from '@/lib/maths/types';

export function IslPip({ vocab }: { vocab: Pick<IslVocabItem, 'word'>[] }) {
  const [selected, setSelected] = useState<string | null>(null);
  if (!vocab.length) return null;
  return (
    <section
      className="isl-support"
      aria-label="Indian Sign Language vocabulary"
    >
      <div className="isl-word-list">
        <strong>Indian Sign Language</strong>
        {vocab.map((item) => (
          <Button
            key={item.word}
            variant="outline"
            aria-pressed={selected === item.word}
            onClick={() =>
              setSelected(selected === item.word ? null : item.word)
            }
          >
            {item.word}
          </Button>
        ))}
      </div>
      {selected && (
        <HandSignVisual key={selected} signKey={selected} size={480} />
      )}
    </section>
  );
}

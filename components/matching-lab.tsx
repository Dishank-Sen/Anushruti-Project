'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import type { Lesson } from '@/lib/lessons';
export function MatchingLab({ lesson }: { lesson: Lesson }) {
  const data = lesson.matching!;
  const [selected, setSelected] = useState<string | null>(null);
  const [placed, setPlaced] = useState<string[]>([]);
  const [feedback, setFeedback] = useState('Choose a picture card to begin.');
  const complete = placed.length === data.cards.length;
  function place(bin: string) {
    const card = data.cards.find((c) => c.id === selected);
    if (!card || placed.includes(card.id)) return;
    if (card.bin !== bin) {
      setFeedback(
        '↻ Not here. Try another place for ' + card.label.toLowerCase() + '.',
      );
      return;
    }
    setPlaced((p) => [...p, card.id]);
    setSelected(null);
    setFeedback('✓ ' + card.explanation);
  }
  return (
    <div className="matching-lab">
      <h3>{data.prompt}</h3>
      <p className="science-model-note">
        1 · Choose a card. 2 · Choose its place.
      </p>
      <fieldset className="matching-cards" aria-label="Picture cards">
        {data.cards.map((card) => (
          <Button
            className={`matching-card ${placed.includes(card.id) ? 'matched' : ''}`}
            key={card.id}
            variant={selected === card.id ? 'default' : 'outline'}
            aria-pressed={selected === card.id}
            disabled={placed.includes(card.id)}
            onClick={() => {
              setSelected(card.id);
              setFeedback(
                'Where does ' + card.label.toLowerCase() + ' belong?',
              );
            }}
          >
            <span aria-hidden="true">{card.symbol}</span>
            <strong>{card.label}</strong>
            {placed.includes(card.id) && <small>✓ Matched</small>}
          </Button>
        ))}
      </fieldset>
      <div className="matching-bins">
        {data.bins.map((bin) => (
          <section className="matching-bin" key={bin.id}>
            <Button
              variant="outline"
              disabled={!selected}
              onClick={() => place(bin.id)}
              aria-label={'Place in ' + bin.label}
            >
              <span aria-hidden="true">{bin.symbol}</span>
              {bin.label} <span aria-hidden="true">↓</span>
            </Button>
            <div className="matched-items">
              {data.cards
                .filter((c) => placed.includes(c.id) && c.bin === bin.id)
                .map((c) => (
                  <span key={c.id} className="matched-chip">
                    {c.symbol} {c.label}
                  </span>
                ))}
            </div>
          </section>
        ))}
      </div>
      <output
        className={`science-feedback ${complete ? 'celebrate' : ''}`}
        aria-live="polite"
      >
        {feedback}
      </output>
      {complete && (
        <output className="curriculum-complete">
          ★ All {data.cards.length} pictures matched!
        </output>
      )}
      <div className="matching-progress">
        <span>
          {placed.length} / {data.cards.length} matched
        </span>
        <Progress
          value={(placed.length / data.cards.length) * 100}
          aria-label="Pictures matched"
        />
      </div>
    </div>
  );
}

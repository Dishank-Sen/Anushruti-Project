'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { convertSentenceToISL } from '@/lib/isl-converter';
import { HandSignVisual, OfficialCharts } from './HandSignVisual';
import { FitzgeraldText } from '../ui/FitzgeraldText';
import { FITZGERALD_COLORS } from '@/lib/fitzgerald';
const EXPLAINER_CHIPS = [
  {
    key: 'subject' as const,
    label: 'Who',
    ariaLabel: 'Orange — Who or Subject',
  },
  {
    key: 'verb' as const,
    label: 'Action',
    ariaLabel: 'Green — Action or Verb',
  },
  {
    key: 'object' as const,
    label: 'What',
    ariaLabel: 'Yellow — What or Object',
  },
  {
    key: 'place' as const,
    label: 'Where',
    ariaLabel: 'Blue — Where or Location',
  },
];

function FitzgeraldKeyExplainer() {
  return (
    <section
      aria-labelledby="fk-explainer-heading"
      className="p-5 rounded-3xl bg-[var(--surface)] border-2 border-[var(--line)] space-y-4"
    >
      <div>
        <span
          id="fk-explainer-heading"
          className="text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)]"
        >
          Fitzgerald Key · Colour-coded grammar
        </span>
        <p className="text-sm text-[var(--ink-soft)] m-0 mt-1">
          Each colour shows a word&apos;s role in the sentence.
        </p>
      </div>

      {/* Four colour chips */}
      <ul
        className="flex flex-wrap gap-3 list-none p-0 m-0"
        aria-label="Fitzgerald Key colour categories"
      >
        {EXPLAINER_CHIPS.map(({ key, label, ariaLabel }) => {
          const c = FITZGERALD_COLORS[key];
          return (
            <li
              key={key}
              aria-label={ariaLabel}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border-2 font-bold text-sm select-none"
              style={{
                backgroundColor: c.bg,
                color: c.text,
                borderColor: c.border,
              }}
            >
              {label}
            </li>
          );
        })}
      </ul>

      {/* Worked example */}
      <div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--ink-soft)] block mb-2">
          Example sentence:
        </span>
        <div className="text-lg">
          <FitzgeraldText
            text="Cat has three apples"
            enabled={true}
            showLabels={true}
          />
        </div>
      </div>
    </section>
  );
}

export function TextToSignPlayer() {
  const [input, setInput] = useState('water sun leaf');
  const [tokens, setTokens] = useState(() => convertSentenceToISL(input));
  const [selected, setSelected] = useState('WATER');
  return (
    <div className="sign-explorer">
      <div className="page-heading">
        <div>
          <h1>Indian Sign Language</h1>
          <p>Explore words with ISLRTC’s original demonstrations.</p>
        </div>
      </div>
      <form
        className="isl-search"
        onSubmit={(e) => {
          e.preventDefault();
          const next = convertSentenceToISL(input);
          setTokens(next);
          setSelected(
            next.find((t) => t.available)?.displayWord ??
              next[0]?.displayWord ??
              '',
          );
        }}
      >
        <label htmlFor="isl-words">Find words</label>
        <input
          id="isl-words"
          value={input}
          maxLength={200}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Try water, sun or three"
        />
        <Button type="submit">Find signs</Button>
      </form>
      <p className="isl-note">
        Word references, not an automatic sentence translation. ISL has its own
        grammar.
      </p>
      <div className="isl-word-list">
        {tokens.map((t) => (
          <Button
            variant={selected === t.displayWord ? 'default' : 'outline'}
            key={t.id}
            aria-pressed={selected === t.displayWord}
            onClick={() => setSelected(t.displayWord)}
          >
            {t.displayWord}
            {!t.available ? ' · not linked' : ''}
          </Button>
        ))}
      </div>
      {selected ? (
        <HandSignVisual key={selected} signKey={selected} size={640} />
      ) : (
        <p>Enter a word to look it up.</p>
      )}
      <OfficialCharts />
      <details className="isl-grammar">
        <summary>English reading colours</summary>
        <p>
          These colours support English reading; they do not describe ISL
          grammar.
        </p>
        <FitzgeraldKeyExplainer />
      </details>
    </div>
  );
}

'use client';
/* oxlint-disable next/no-img-element -- Locally bundled, credited educational photographs. */
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { scienceImages, type Lesson } from '@/lib/lessons';
export function CurriculumLab({ lesson }: { lesson: Lesson }) {
  const [step, setStep] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [solved, setSolved] = useState(false);
  const rounds = lesson.guided!;
  const round = rounds[step];
  const finished = solved && step === rounds.length - 1;
  const photo = scienceImages[lesson.science!.image];
  return (
    <>
      <div className="curriculum-lab-layout">
        <figure className="curriculum-figure">
          <div className="curriculum-scene">
            <img src={photo.src} alt={photo.alt} />
            <span className="curriculum-scene-label">
              {lesson.curriculum!.label}
            </span>
            <span className="curriculum-sticker" key={step} aria-hidden="true">
              {round.symbol}
            </span>
          </div>
          <figcaption className="curriculum-photo-credit">
            <a href={photo.source} target="_blank" rel="noreferrer">
              {photo.credit} ↗
            </a>
            {'licenseUrl' in photo && (
              <a href={photo.licenseUrl} target="_blank" rel="noreferrer">
                Reuse licence ↗
              </a>
            )}
          </figcaption>
        </figure>
        <div className="curriculum-prompt">
          <span className="eyebrow">
            DISCOVERY {step + 1} OF {rounds.length}
          </span>
          <h3>{round.prompt}</h3>
          <div className="curriculum-choices">
            {round.options.map((option, i) => (
              <Button
                key={option}
                className={
                  solved && i === round.answer ? 'curriculum-correct' : ''
                }
                variant={choice === i ? 'default' : 'outline'}
                disabled={solved}
                aria-pressed={choice === i}
                onClick={() => {
                  setChoice(i);
                  setSolved(i === round.answer);
                }}
              >
                <span className="choice-letter">
                  {String.fromCharCode(65 + i)}
                </span>
                {option}
                {solved && i === round.answer ? ' ✓' : ''}
              </Button>
            ))}
          </div>
          <output
            className={`science-feedback ${solved ? 'celebrate' : ''}`}
            aria-live="polite"
          >
            {choice === null
              ? 'Look at the picture. Choose an answer.'
              : solved
                ? `✓ ${round.explanation}`
                : '↻ Try another choice. Take your time.'}
          </output>
          {solved && !finished && (
            <Button
              className="curriculum-next"
              onClick={() => {
                setStep((n) => n + 1);
                setChoice(null);
                setSolved(false);
              }}
            >
              Next discovery →
            </Button>
          )}
          {finished && (
            <output className="curriculum-complete">
              ★ Three discoveries made! You can explore again.
            </output>
          )}
        </div>
      </div>
      <Progress
        value={((step + Number(solved)) / rounds.length) * 100}
        aria-label="Discoveries explored"
      />
      <p className="science-model-note">
        Picture practice · no timer · no physical action needed
      </p>
    </>
  );
}

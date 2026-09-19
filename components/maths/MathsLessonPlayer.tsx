'use client';

import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  Star,
} from 'lucide-react';
import type { MathsLesson, MathsChapter } from '@/lib/maths/types';
import type { ProgressData } from '@/lib/progress';
import { IslPip } from './IslPip';
import { TapToCount } from './TapToCount';
import { TenFrame } from './TenFrame';
import { CoinTray } from './CoinTray';
import { HintLadder } from './HintLadder';
import { FitzgeraldText } from '../ui/FitzgeraldText.tsx';
import { HandSignVisual } from '../isl/HandSignVisual.tsx';

function getStepSignKey(stepTitle: string, stepText: string, stepVisual: string, chapter?: MathsChapter): string | null {
  // Check if step text or title contains any vocab word from chapter.islVocab
  if (chapter?.islVocab) {
    for (const v of chapter.islVocab) {
      const regex = new RegExp(`\\b${v.word}\\b`, 'i');
      if (regex.test(stepTitle) || regex.test(stepText)) {
        return v.word;
      }
    }
  }

  // Check for common foundational keywords in title, text, or visual
  const combined = `${stepTitle} ${stepText} ${stepVisual}`;
  const keywords = [
    'INSIDE', 'OUTSIDE', 'TOP', 'BOTTOM', 'ROUND', 'LONG', 'ROLL', 'SLIDE',
    'BIG', 'SMALL', 'ADD', 'PLUS', 'MORE', 'LESS', 'COUNT', 'CAT', 'BOOK',
    'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE',
  ];
  for (const kw of keywords) {
    const regex = new RegExp(`\\b${kw}\\b`, 'i');
    if (regex.test(combined)) {
      return kw;
    }
  }

  // Check for single numbers 1 to 5
  const numMatch = combined.match(/\b([1-5])\b/);
  if (numMatch) {
    return numMatch[1];
  }

  return null;
}

interface MathsLessonPlayerProps {
  lesson: MathsLesson;
  chapter?: MathsChapter;
  progress: ProgressData;
  onSaveProgress: (updated: ProgressData) => void;
  onBack: () => void;
}

export function MathsLessonPlayer({
  lesson,
  chapter,
  progress,
  onSaveProgress,
  onBack,
}: MathsLessonPlayerProps) {
  const [currentStep, setCurrentStep] = useState(progress.steps[lesson.id] || 0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [hintLevelUsed, setHintLevelUsed] = useState<number>(0);

  const isCompleted = progress.completed.includes(lesson.id);
  const currentStars = progress.stars[lesson.id] || 0;

  function goToStep(index: number) {
    const clamped = Math.max(0, Math.min(lesson.steps.length - 1, index));
    setCurrentStep(clamped);
    onSaveProgress({
      ...progress,
      steps: { ...progress.steps, [lesson.id]: clamped },
    });
  }

  function handleCheckAnswer() {
    if (selectedOption === null) return;
    const isCorrect = selectedOption === lesson.question.answer;
    setChecked(true);

    if (isCorrect) {
      let earnedStars = 3;
      if (hintLevelUsed === 1 || hintLevelUsed === 2) earnedStars = 2;
      if (hintLevelUsed >= 3) earnedStars = 1;

      const newCompleted = [...new Set([...progress.completed, lesson.id])];
      const newStars = {
        ...progress.stars,
        [lesson.id]: Math.max(currentStars, earnedStars),
      };
      onSaveProgress({
        ...progress,
        completed: newCompleted,
        stars: newStars,
        answers: { ...progress.answers, [lesson.id]: true },
      });
    }
  }

  const activeStep = lesson.steps[currentStep] || lesson.steps[0];
  const isCorrect = selectedOption === lesson.question.answer;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="btn-tactile btn-tactile-surface text-sm py-2 px-4 min-h-[48px]"
          aria-label="Back to chapters"
        >
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-2">
          {chapter && (
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)] bg-[var(--surface)] px-3 py-1.5 rounded-full border border-[var(--line)]">
              {chapter.icon} {chapter.title}
            </span>
          )}
          {isCompleted && (
            <div className="flex items-center gap-1 text-[var(--ok)] bg-[var(--ok-tint)] px-3 py-1.5 rounded-full text-xs font-bold border border-[var(--ok)]">
              <CheckCircle2 size={14} />
              <span>Done</span>
            </div>
          )}
        </div>
      </div>

      {/* Lesson Title Card */}
      <div className="p-6 rounded-3xl bg-[var(--surface)] border-2 border-[var(--line)] shadow-xs">
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--maths)] block mb-1">
          Visual Discovery · {lesson.minutes} Minutes
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[var(--ink)] m-0">
          {lesson.title}
        </h1>
        <p className="text-sm text-[var(--ink-soft)] mt-1 mb-0">
          {lesson.description}
        </p>
      </div>

      {/* Visual Step Stage */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[var(--surface)] border-2 border-[var(--line)] shadow-sm space-y-6">
        {/* Step Progress Stepper */}
        <div className="flex items-center justify-between border-b border-[var(--line)] pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)]">
            Step {currentStep + 1} of {lesson.steps.length}
          </span>
          <div className="flex items-center gap-2">
            {lesson.steps.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goToStep(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentStep === i
                    ? 'w-8 bg-[var(--maths)]'
                    : i < currentStep
                      ? 'bg-[var(--ok)]'
                      : 'bg-[var(--line)]'
                }`}
                aria-label={`Go to step ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Multimodal Pedagogy Stage: Visual Scene + Real ISL Hand Sign */}
        {(() => {
          const activeSignKey = getStepSignKey(activeStep.title, activeStep.text, activeStep.visual, chapter);
          return (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
              {/* Main Visual Display */}
              <div
                className={`${
                  activeSignKey ? 'md:col-span-8' : 'md:col-span-12'
                } py-6 px-4 rounded-3xl bg-[var(--bg)] border-2 border-[var(--line)] flex flex-col items-center justify-center text-center select-none min-h-[160px]`}
              >
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--ink-soft)] mb-2">
                  👁️ Visual Model
                </span>
                <div className="text-4xl sm:text-5xl font-mono tracking-wide py-2">
                  {activeStep.visual}
                </div>
              </div>

              {/* Real Hand Sign Demonstration for this Step */}
              {activeSignKey && (
                <div className="md:col-span-4 p-4 rounded-3xl bg-[var(--surface)] border-2 border-[#c2d2fc] flex flex-col items-center justify-center text-center shadow-xs">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--maths)] mb-2">
                    🤟 Real Sign: {activeSignKey}
                  </span>
                  <HandSignVisual
                    signKey={activeSignKey}
                    size={160}
                    showFingerspellingStrip={false}
                  />
                </div>
              )}
            </div>
          );
        })()}

        {/* Caption Strip: Strictly <= 12 words with optional Fitzgerald Key colors */}
        <div className="p-4 rounded-2xl bg-[var(--surface)] border-2 border-[#d8e2fd] text-center">
          <h3 className="text-base font-bold text-[var(--ink)] m-0 mb-1">
            {activeStep.title}
          </h3>
          <div className="text-lg sm:text-xl font-bold text-[var(--maths)] m-0 flex justify-center">
            <FitzgeraldText text={activeStep.text} enabled={true} />
          </div>
        </div>

        {/* Interactive Manipulative (if applicable) */}
        {lesson.toolkitType === 'tap-to-count' && (
          <TapToCount targetCount={5} label="Interactive Counting Practice" />
        )}
        {lesson.toolkitType === 'ten-frame' && (
          <TenFrame targetCount={10} initialCount={currentStep + 1} />
        )}
        {lesson.toolkitType === 'coin-tray' && (
          <CoinTray targetAmount={5} />
        )}

        {/* Stepper Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-[var(--line)]">
          <button
            type="button"
            disabled={currentStep === 0}
            onClick={() => goToStep(currentStep - 1)}
            className="btn-tactile btn-tactile-surface text-sm py-2.5 px-6 min-h-[48px] disabled:opacity-40 disabled:pointer-events-none"
          >
            <ArrowLeft size={16} /> Previous
          </button>
          <button
            type="button"
            disabled={currentStep === lesson.steps.length - 1}
            onClick={() => goToStep(currentStep + 1)}
            className="btn-tactile btn-tactile-maths text-sm py-2.5 px-6 min-h-[48px] disabled:opacity-40 disabled:pointer-events-none"
          >
            Next Step <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Question / Activity Area */}
      <div className="p-6 sm:p-10 rounded-3xl bg-[var(--surface)] border-2 border-[var(--line)] shadow-sm space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--maths)] flex items-center gap-1.5 mb-1.5">
            <Sparkles size={16} /> Problem Solving · Step-by-Step
          </span>
          <h2 className="text-xl sm:text-3xl font-bold font-heading text-[var(--ink)] m-0 leading-snug">
            {lesson.question.prompt}
          </h2>
        </div>

        {/* Options Grid (Min 56px touch target each) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" aria-label="Choices">
          {lesson.question.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setSelectedOption(idx);
                  setChecked(false);
                }}
                className={`min-h-[56px] p-4 rounded-2xl border-2 text-left font-bold text-base transition flex items-center gap-3 select-none ${
                  isSelected
                    ? 'bg-[var(--maths-tint)] border-[var(--maths)] text-[var(--maths)] shadow-[0_4px_0_#1a328a]'
                    : 'bg-[var(--bg)] border-[var(--line)] text-[var(--ink)] hover:bg-[var(--surface)] hover:border-[#c2d2fc]'
                }`}
                aria-pressed={isSelected}
              >
                <span
                  className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${
                    isSelected
                      ? 'bg-[var(--maths)] text-white'
                      : 'bg-white border border-[var(--line)] text-[var(--ink-soft)]'
                  }`}
                >
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Check Button */}
        <div>
          <button
            type="button"
            disabled={selectedOption === null}
            onClick={handleCheckAnswer}
            className="btn-tactile btn-tactile-maths w-full sm:w-auto min-h-[56px] text-base px-8 disabled:opacity-40 disabled:pointer-events-none"
          >
            <CheckCircle2 size={20} />
            <span>Check My Answer</span>
          </button>
        </div>

        {/* Feedback Banner (Icon + Short Word + Shape) */}
        {checked && (
          <div aria-live="polite">
            {isCorrect ? (
              <div className="feedback-box correct animate-in fade-in flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={28} className="text-[var(--ok)] shrink-0" />
                  <div>
                    <span className="block text-lg font-bold">✓ You got it!</span>
                    <span className="text-sm font-medium">{lesson.question.hint}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[var(--gold)]">
                  <Star size={20} className="fill-[var(--gold)]" />
                  <span className="font-bold text-base">
                    +{hintLevelUsed === 0 ? 3 : hintLevelUsed < 3 ? 2 : 1}
                  </span>
                </div>
              </div>
            ) : (
              <div className="feedback-box retry animate-in fade-in flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <RotateCcw size={28} className="text-[var(--retry)] shrink-0" />
                  <div>
                    <span className="block text-lg font-bold">↻ Let’s look again!</span>
                    <span className="text-sm font-medium">{lesson.question.hint}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setChecked(false);
                    setSelectedOption(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-white border border-[var(--retry)] text-[var(--retry)] font-bold text-sm hover:bg-[#fff4e6] transition"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        )}

        {/* Hint Ladder */}
        <HintLadder
          ladder={lesson.question.hintLadder}
          fallbackHint={lesson.question.hint}
          onHintRevealed={(lvl) => setHintLevelUsed((prev) => Math.max(prev, lvl))}
        />

        {/* ISL Sign Reference */}
        {chapter?.islVocab && chapter.islVocab.length > 0 && (
          <IslPip vocab={chapter.islVocab} />
        )}
      </div>

      {/* Teacher / Parent Note (if adult mode active or present) */}
      {lesson.teacherNote && (
        <div className="p-5 rounded-3xl bg-[var(--bg)] border-2 border-dashed border-[var(--line)]">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)] block mb-1">
            Teacher &amp; Parent Guide
          </span>
          <p className="text-sm text-[var(--ink)] m-0">
            {lesson.teacherNote}
          </p>
        </div>
      )}
    </div>
  );
}

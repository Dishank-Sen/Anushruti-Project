'use client';
/* oxlint-disable next/no-img-element */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Hand,
  Sparkles,
  Repeat,
  FlipHorizontal,
  Sliders,
  Type,
  BookOpen,
  X,
} from 'lucide-react';
import { convertSentenceToISL, type IslSignToken } from '../../lib/isl-converter.ts';
import { FitzgeraldText } from '../ui/FitzgeraldText.tsx';
import { HandSignVisual } from './HandSignVisual.tsx';

const SAMPLE_SENTENCES = [
  'Cat has three apples',
  'Dog is inside',
  'Count two books',
  'Frog is small',
  'Add one apple',
  'School is big',
];

const SPEED_OPTIONS = [
  { label: '0.5×', value: 0.5, ms: 2400 },
  { label: '0.75×', value: 0.75, ms: 1800 },
  { label: '1.0×', value: 1.0, ms: 1200 },
  { label: '1.25×', value: 1.25, ms: 900 },
];

export function TextToSignPlayer() {
  const [inputText, setInputText] = useState('Cat has three apples');
  const [tokens, setTokens] = useState<IslSignToken[]>(() => convertSentenceToISL('Cat has three apples'));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedIndex, setSpeedIndex] = useState(2); // Default 1.0x
  const [isMirrorMode, setIsMirrorMode] = useState(false);
  const [isLooping, setIsLooping] = useState(true);
  const [showGrammar, setShowGrammar] = useState(true);
  const [showChartModal, setShowChartModal] = useState(false);

  // Sub-letter scrubber for fingerspelled words
  const [activeLetterIdx, setActiveLetterIdx] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleTranslate = useCallback((sentence: string) => {
    setInputText(sentence);
    const result = convertSentenceToISL(sentence);
    setTokens(result);
    setCurrentIndex(0);
    setActiveLetterIdx(0);
    setIsPlaying(false);
  }, []);

  const currentToken: IslSignToken | undefined = tokens[currentIndex];
  const currentSpeed = SPEED_OPTIONS[speedIndex];

  // Auto-play timer effect
  useEffect(() => {
    if (!isPlaying || tokens.length === 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev < tokens.length - 1) {
          setActiveLetterIdx(0);
          return prev + 1;
        } else if (isLooping) {
          setActiveLetterIdx(0);
          return 0;
        } else {
          setIsPlaying(false);
          return prev;
        }
      });
    }, currentSpeed.ms);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, tokens.length, isLooping, currentSpeed.ms]);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Studio Header */}
      <div className="p-6 rounded-3xl bg-[var(--surface)] border-2 border-[var(--line)] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="w-12 h-12 rounded-2xl bg-[var(--maths-tint)] text-[var(--maths)] flex items-center justify-center text-2xl shadow-xs">
            <Hand size={26} />
          </span>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--maths)] flex items-center gap-1">
              <Sparkles size={14} /> ISL Sign Studio · Visual Language Player
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[var(--ink)] m-0">
              Sentence to Sign Language
            </h1>
          </div>
        </div>

        {/* Quick Toggles */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <button
            type="button"
            onClick={() => setShowChartModal(!showChartModal)}
            className="px-3 py-1.5 rounded-xl text-xs font-bold border-2 bg-[var(--surface)] border-[var(--line)] text-[var(--ink)] hover:border-[var(--maths)] transition flex items-center gap-1.5"
            title="View full two-handed manual alphabet reference chart"
          >
            <BookOpen size={14} />
            <span>Alphabet Chart</span>
          </button>
          <button
            type="button"
            onClick={() => setShowGrammar(!showGrammar)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border-2 transition flex items-center gap-1.5 ${
              showGrammar
                ? 'bg-[var(--gold-tint)] border-[var(--gold)] text-[#8c6200]'
                : 'bg-[var(--bg)] border-[var(--line)] text-[var(--ink-soft)]'
            }`}
            title="Toggle Fitzgerald Key Color-Coded Grammar"
            aria-pressed={showGrammar}
          >
            <Type size={14} />
            <span>Grammar Colors</span>
          </button>
        </div>
      </div>

      {/* Input Section */}
      <div className="p-5 rounded-3xl bg-[var(--surface)] border-2 border-[var(--line)] space-y-3">
        <label htmlFor="sentence-input" className="block text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)]">
          Enter any sentence or question / कोई भी वाक्य लिखें
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            id="sentence-input"
            type="text"
            value={inputText}
            onChange={(e) => handleTranslate(e.target.value)}
            placeholder="e.g. Cat has three apples..."
            className="flex-1 px-4 py-3 rounded-2xl border-2 border-[var(--line)] bg-[var(--bg)] text-base font-bold text-[var(--ink)] focus:outline-hidden focus:border-[var(--maths)] transition"
          />
          <button
            type="button"
            onClick={() => handleTranslate(inputText)}
            className="btn-tactile px-6 py-3 rounded-2xl bg-[var(--maths)] text-white font-bold text-sm"
          >
            Translate to ISL
          </button>
        </div>

        {/* Sample Prompts */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs font-bold text-[var(--ink-soft)]">Try:</span>
          {SAMPLE_SENTENCES.map((s) => (
            <button
              type="button"
              key={s}
              onClick={() => handleTranslate(s)}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-[var(--bg)] border border-[var(--line)] hover:border-[var(--maths)] hover:text-[var(--maths)] transition text-[var(--ink)]"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Grammar Analysis Preview (Fitzgerald Key) */}
      {showGrammar && inputText.trim() && (
        <div className="p-4 rounded-2xl bg-[var(--bg)] border-2 border-[var(--line)] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)]">
              Fitzgerald Key Structure (रंग-कोडित व्याकरण)
            </span>
            <span className="text-[11px] text-[var(--ink-soft)]">Orange: Who · Green: Action · Yellow: What · Blue: Where</span>
          </div>
          <div className="text-lg">
            <FitzgeraldText text={inputText} enabled={true} showLabels={true} />
          </div>
        </div>
      )}

      {/* Sign Visualizer Stage */}
      {tokens.length > 0 && currentToken ? (
        <div className="p-6 rounded-3xl bg-[var(--surface)] border-2 border-[var(--line)] shadow-sm space-y-6">
          {/* Top Stage Bar: Counter, Gloss & Mode Indicators */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b-2 border-[var(--line)]">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[var(--maths-tint)] text-[var(--maths)] border border-[var(--maths)]">
                Sign {currentIndex + 1} of {tokens.length}
              </span>
              {currentToken.isFingerspelled && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#e0f2fe] text-[#0369a1] border border-[#7dd3fc]">
                  Two-Handed Fingerspelling
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Mirror Mode Toggle */}
              <button
                type="button"
                onClick={() => setIsMirrorMode(!isMirrorMode)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 ${
                  isMirrorMode
                    ? 'bg-purple-100 text-purple-800 border-purple-300'
                    : 'bg-[var(--bg)] text-[var(--ink-soft)] border-[var(--line)] hover:text-[var(--ink)]'
                }`}
                title="Mirror sign view horizontally for easy mimicry"
                aria-pressed={isMirrorMode}
              >
                <FlipHorizontal size={14} />
                <span>Mirror Mode {isMirrorMode ? 'ON' : 'OFF'}</span>
              </button>
            </div>
          </div>

          {/* Main Visual Display Stage */}
          <div
            className={`p-6 sm:p-8 rounded-3xl bg-[var(--bg)] border-2 border-[var(--line)] flex flex-col items-center text-center gap-5 transition-transform ${
              isMirrorMode ? 'scale-x-[-1]' : ''
            }`}
          >
            {/* Word Gloss */}
            <div className={isMirrorMode ? 'scale-x-[-1]' : ''}>
              <span className="text-3xl sm:text-5xl font-extrabold font-heading text-[var(--ink)] tracking-wide block">
                {currentToken.gloss}
              </span>
            </div>

            {/* Hand Sign Visual Demonstration */}
            <HandSignVisual
              signKey={
                currentToken.isFingerspelled && currentToken.letterSequence
                  ? (currentToken.letterSequence[activeLetterIdx]?.letter ?? currentToken.displayWord)
                  : currentToken.displayWord
              }
              size={220}
            />

            {/* Handshape Description Card */}
            <div
              className={`w-full max-w-lg p-5 rounded-2xl bg-[var(--surface)] border-2 border-[var(--line)] text-left space-y-3 shadow-xs ${
                isMirrorMode ? 'scale-x-[-1]' : ''
              }`}
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--maths)] block">
                  Handshape:
                </span>
                <p className="text-base font-bold text-[var(--ink)] m-0 mt-0.5">
                  {currentToken.handshape}
                </p>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--maths)] block">
                  Movement:
                </span>
                <p className="text-sm text-[var(--ink-soft)] m-0 mt-0.5">
                  {currentToken.movement}
                </p>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--maths)] block">
                  Spatial Location:
                </span>
                <p className="text-xs text-[var(--ink-soft)] m-0 mt-0.5">
                  {currentToken.location}
                </p>
              </div>
            </div>

            {/* Fingerspelled Letters Sequence (if word is fingerspelled) */}
            {currentToken.isFingerspelled && currentToken.letterSequence && (
              <div
                className={`w-full flex flex-col items-center gap-2 pt-2 ${
                  isMirrorMode ? 'scale-x-[-1]' : ''
                }`}
              >
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)]">
                  Spell it out — tap each letter to see its real hand sign:
                </span>
                <div className="flex flex-wrap justify-center gap-2">
                  {currentToken.letterSequence.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveLetterIdx(idx)}
                      className={`flex flex-col items-center p-2 rounded-2xl border-2 text-center transition min-w-[64px] ${
                        idx === activeLetterIdx
                          ? 'bg-[var(--maths)] border-[var(--maths)] shadow-sm'
                          : 'bg-[var(--surface)] border-[var(--line)] hover:border-[var(--maths)]'
                      }`}
                    >
                      <img
                        src={`/images/isl/alphabet/${item.letter.toLowerCase()}.svg`}
                        alt={`Real hand sign for ${item.letter}`}
                        className={`w-10 h-10 object-contain ${idx === activeLetterIdx ? 'filter invert' : ''}`}
                        loading="lazy"
                      />
                      <span className={`block text-sm font-black font-heading leading-tight mt-1 ${idx === activeLetterIdx ? 'text-white' : 'text-[var(--ink)]'}`}>
                        {item.letter}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Player Controls Bar */}
          <div className="space-y-4 pt-2">
            {/* Speed Selector & Play/Pause */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[var(--bg)] border-2 border-[var(--line)]">
              {/* Play / Pause & Loop */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="btn-tactile min-h-[48px] px-5 rounded-2xl bg-[var(--maths)] text-white font-bold text-sm flex items-center gap-2"
                  aria-label={isPlaying ? 'Pause signing playback' : 'Play signing sequence'}
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                  <span>{isPlaying ? 'Pause' : 'Play Signs'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsLooping(!isLooping)}
                  className={`min-h-[48px] min-w-[48px] rounded-2xl border-2 flex items-center justify-center transition ${
                    isLooping
                      ? 'bg-[var(--gold-tint)] border-[var(--gold)] text-[#8c6200]'
                      : 'bg-[var(--surface)] border-[var(--line)] text-[var(--ink-soft)]'
                  }`}
                  title="Loop playback continuously"
                  aria-pressed={isLooping}
                >
                  <Repeat size={18} />
                </button>
              </div>

              {/* Speed Buttons */}
              <div className="flex items-center gap-1 bg-[var(--surface)] p-1 rounded-2xl border-2 border-[var(--line)]">
                <span className="px-2 text-xs font-bold text-[var(--ink-soft)] flex items-center gap-1">
                  <Sliders size={12} /> Speed:
                </span>
                {SPEED_OPTIONS.map((opt, i) => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => setSpeedIndex(i)}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition ${
                      speedIndex === i
                        ? 'bg-[var(--maths)] text-white shadow-xs'
                        : 'text-[var(--ink-soft)] hover:text-[var(--ink)]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Stepper & Scrubbing Dots */}
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                disabled={currentIndex === 0}
                onClick={() => {
                  setCurrentIndex((p) => Math.max(0, p - 1));
                  setActiveLetterIdx(0);
                }}
                className="btn-tactile min-h-[48px] px-4 rounded-2xl bg-[var(--surface)] border-2 border-[var(--line)] text-[var(--ink)] font-bold text-sm flex items-center gap-1 disabled:opacity-40"
              >
                <ChevronLeft size={18} /> Previous
              </button>

              <div className="flex flex-wrap items-center justify-center gap-2">
                {tokens.map((tok, i) => (
                  <button
                    key={tok.id}
                    type="button"
                    onClick={() => {
                      setCurrentIndex(i);
                      setActiveLetterIdx(0);
                    }}
                    className={`h-3 rounded-full transition-all ${
                      i === currentIndex
                        ? 'bg-[var(--maths)] w-8'
                        : 'bg-[var(--line)] hover:bg-[#c2d0eb] w-3'
                    }`}
                    title={tok.displayWord}
                    aria-label={`Jump to sign ${i + 1}: ${tok.displayWord}`}
                  />
                ))}
              </div>

              <button
                type="button"
                disabled={currentIndex === tokens.length - 1}
                onClick={() => {
                  setCurrentIndex((p) => Math.min(tokens.length - 1, p + 1));
                  setActiveLetterIdx(0);
                }}
                className="btn-tactile min-h-[48px] px-4 rounded-2xl bg-[var(--surface)] border-2 border-[var(--line)] text-[var(--ink)] font-bold text-sm flex items-center gap-1 disabled:opacity-40"
              >
                Next <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 rounded-3xl bg-[var(--surface)] border-2 border-[var(--line)] text-center text-[var(--ink-soft)]">
          <BookOpen className="mx-auto mb-2 opacity-50" size={32} />
          <p className="font-bold">Enter a sentence above to see the ISL sign translation.</p>
        </div>
      )}

      {/* Authentic Two-Handed Alphabet Chart Modal */}
      {showChartModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[var(--surface)] rounded-3xl border-2 border-[var(--line)] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
              <div>
                <h3 className="text-xl font-bold font-heading text-[var(--ink)] m-0 flex items-center gap-2">
                  <Hand className="text-[var(--maths)]" size={22} />
                  Authentic Two-Handed Alphabet Reference
                </h3>
                <p className="text-xs text-[var(--ink-soft)] m-0 mt-0.5">
                  Standard bimanual fingerspelling alphabet (A to Z) based on ISLRTC standards.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowChartModal(false)}
                className="p-2 rounded-xl text-[var(--ink-soft)] hover:text-[var(--ink)] hover:bg-[var(--bg)] transition"
                aria-label="Close chart"
              >
                <X size={20} />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden border-2 border-[var(--line)] bg-white p-2 flex justify-center">
              <img
                src="/images/isl/two_handed_alphabet_chart.png"
                alt="Two-Handed Fingerspelling Manual Alphabet A to Z"
                className="max-h-[65vh] w-auto object-contain rounded-xl"
              />
            </div>

            <p className="text-[11px] text-[var(--ink-soft)] text-center m-0">
              Reference: Standard two-handed manual alphabet (Cowplopmorris / Wikimedia Commons · CC BY-SA 3.0)
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

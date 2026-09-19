'use client';
/* oxlint-disable jsx-a11y/prefer-tag-over-role -- Inline SVG is a live chart, not a replaceable image asset. */
import { useEffect, useRef, useState } from 'react';
import {
  Activity,
  AudioLines,
  Check,
  ChevronRight,
  Mic,
  MicOff,
  Pause,
  Play,
  Settings2,
  SlidersHorizontal,
  Star,
  Volume2,
  WandSparkles,
  Waves,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { useVoiceInput } from '@/hooks/use-voice-input';
import { useStableCue } from '@/hooks/use-stable-cue';
import { LevelSmoother, meterPosition } from '@/lib/voice/feedback';
import { useWordRecognition } from '@/hooks/use-word-recognition';
import {
  calibrate,
  clamp,
  semitones,
  type VoiceSample,
} from '@/lib/voice/analysis';
import {
  advanceRound,
  practiceStars,
  freshRound,
  guideAt,
  levels,
  wordMatches,
  type Module,
  type Round,
  type VoiceFrame,
} from '@/lib/voice/practice';
const modules: { id: Module; name: string; icon: typeof Waves }[] = [
  { id: 'steady', name: 'Steady voice', icon: Waves },
  { id: 'hill', name: 'Pitch hills', icon: Activity },
  { id: 'volume', name: 'Volume waves', icon: Volume2 },
  { id: 'rhythm', name: 'Speak & pause', icon: Pause },
  { id: 'words', name: 'Words & phrases', icon: AudioLines },
];
const silent: VoiceFrame = {
  db: -90,
  hz: null,
  confidence: 0,
  clipped: false,
  speech: false,
  held: false,
  noiseDb: -60,
  snr: 0,
  learningNoise: false,
};
type Reference = { db: number; hz: number };
type Point = { x: number; y: number | null };
export function VoiceStudio({ grade = 1 }: { grade?: number }) {
  const [module, setModule] = useState<Module>('steady');
  const [level, setLevel] = useState(grade <= 2 ? 0 : grade <= 4 ? 1 : 2);
  const [frame, setFrame] = useState(silent);
  const [reference, setReference] = useState<Reference | null>(null);
  const [phase, setPhase] = useState<
    'idle' | 'room' | 'voice' | 'ready' | 'practice' | 'done'
  >('idle');
  const [round, setRound] = useState<Round>(freshRound);
  const [points, setPoints] = useState<Point[]>([]);
  const [total, setTotal] = useState(0);
  const [stars, setStars] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [matchedWord, setMatchedWord] = useState(false);
  const [manualOpen, setManualOpen] = useState(false);
  const [manualPitch, setManualPitch] = useState(220);
  const [manualLevel, setManualLevel] = useState(-28);
  const [manualFloor, setManualFloor] = useState(-60);
  const [sensitivity, setSensitivity] = useState(6);
  const [displayDb, setDisplayDb] = useState(-90);
  const smoother = useRef(new LevelSmoother());
  const [demo, setDemo] = useState(false);
  const [demoResult, setDemoResult] = useState(false);
  const [notice, setNotice] = useState('');
  const recognition = useWordRecognition();
  const calibration = useRef(false);
  const calibrationFrames = useRef<VoiceSample[]>([]);
  const active = useRef<Round | null>(null);
  const lastTime = useRef(0);
  const earned = useRef(0);
  const wordRewarded = useRef(false);
  const demoTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const consumer = useRef<(f: VoiceFrame, t: number) => void>(() => {});
  const difficulty = levels[level];
  const word = difficulty.words[wordIndex % difficulty.words.length];
  function clearDemo() {
    if (demoTimer.current !== null) {
      clearInterval(demoTimer.current);
      demoTimer.current = null;
    }
  }
  function stopped() {
    recognition.stop();
    clearDemo();
    active.current = null;
    calibration.current = false;
    setDemo(false);
    setFrame(silent);
    smoother.current.reset();
    setDisplayDb(-90);
    setPhase('idle');
    setReference(null);
  }
  function consume(sample: VoiceFrame, time: number) {
    setFrame(sample);
    setDisplayDb(smoother.current.update(sample.db, time));
    const dt = lastTime.current
      ? Math.min((time - lastTime.current) / 1000, 0.15)
      : 0;
    lastTime.current = time;
    if (sample.learningNoise) {
      setPhase('room');
      return;
    }
    if (calibration.current) {
      setPhase('voice');
      if (sample.speech && sample.hz !== null) {
        calibrationFrames.current.push(sample);
        calibrationFrames.current = calibrationFrames.current.slice(-40);
        const result = calibrate(calibrationFrames.current);
        if (result) {
          calibration.current = false;
          setReference(result);
          setManualPitch(Math.round(result.hz));
          setManualLevel(Math.round(result.db));
          setManualFloor(Math.round(sample.noiseDb));
          setPhase('ready');
          setNotice('Ready');
        }
      }
      return;
    }
    const running = active.current;
    if (!running || !reference) return;
    const next = advanceRound(
      running,
      sample,
      dt,
      module === 'words' && demo ? 'steady' : module,
      level,
      reference,
    );
    active.current = next;
    setRound(next);
    const chartValue = sample.speech
      ? module === 'volume'
        ? sample.db - reference.db
        : sample.hz !== null
          ? semitones(sample.hz, reference.hz)
          : null
      : null;
    setPoints((previous) =>
      [...previous, { x: next.progress, y: chartValue }].slice(-180),
    );
    const collected =
      module === 'words'
        ? next.done
          ? 1
          : 0
        : practiceStars(next, module, level);
    if (collected > earned.current) {
      const gained = collected - earned.current;
      if (!demo) setTotal((n) => n + gained);
      earned.current = collected;
      setStars(collected);
    }
    if (next.done) {
      active.current = null;
      setPhase('done');
      if (demo) {
        clearDemo();
        setDemo(false);
        setFrame(silent);
      }
    }
  }
  useEffect(() => {
    consumer.current = consume;
  });
  useEffect(() => () => clearDemo(), []);
  const mic = useVoiceInput(consume, stopped, (audio, rate, speech) => {
    if (!calibration.current) recognition.acceptAudio(audio, rate, speech);
  });
  const live = mic.state === 'live';
  useEffect(() => {
    if (
      module === 'words' &&
      phase === 'practice' &&
      live &&
      !wordRewarded.current &&
      recognition.finalText &&
      wordMatches(recognition.finalText, word)
    ) {
      wordRewarded.current = true;
      setMatchedWord(true);
      setStars(1);
      setRound({ ...freshRound(), progress: 1, done: true });
      active.current = null;
      setPhase('done');
      setTotal((n) => n + 1);
    }
  }, [recognition.finalText, word, module, live, phase]);
  function resetPractice() {
    active.current = null;
    setRound(freshRound());
    setPoints([]);
    earned.current = 0;
    setStars(0);
    wordRewarded.current = false;
    setMatchedWord(false);
    recognition.clear(false);
    setNotice('');
  }
  async function startMic() {
    setDemoResult(false);
    resetPractice();
    calibration.current = true;
    calibrationFrames.current = [];
    setReference(null);
    setNotice('');
    await mic.start();
  }
  function autoCalibrate() {
    resetPractice();
    recognition.stop();
    calibration.current = true;
    calibrationFrames.current = [];
    setReference(null);
    setPhase('room');
    mic.recalibrate();
  }
  function applyManual() {
    mic.manual(manualFloor, sensitivity);
    calibration.current = false;
    resetPractice();
    setReference({ db: manualLevel, hz: manualPitch });
    setPhase('ready');
    setManualOpen(false);
    recognition.clear(false);
  }
  function startRound() {
    if (
      !live ||
      !reference ||
      (module === 'words' && recognition.state !== 'listening')
    )
      return;
    resetPractice();
    lastTime.current = 0;
    active.current = freshRound();
    setPhase('practice');
  }
  function startDemo() {
    mic.stop();
    resetPractice();
    setReference({ db: -28, hz: 220 });
    setDemo(true);
    setDemoResult(true);
    setPhase('practice');
    active.current = freshRound();
    lastTime.current = 0;
    let ticks = 0;
    demoTimer.current = setInterval(() => {
      ticks++;
      const p = active.current?.progress ?? 0;
      const resting = module === 'rhythm' && !!active.current?.expectRest;
      const target = guideAt(module, p);
      consumer.current(
        {
          db: resting
            ? -65
            : -28 + (module === 'volume' ? target : Math.sin(ticks * 0.25)),
          hz: resting
            ? null
            : 220 *
              2 **
                ((module === 'hill' ? target : Math.sin(ticks * 0.1) * 0.4) /
                  12),
          confidence: 1,
          clipped: false,
          speech: !resting,
          held: false,
          noiseDb: -65,
          snr: resting ? 0 : 37,
          learningNoise: false,
        },
        performance.now(),
      );
    }, 80);
  }
  function changeModule(next: Module) {
    if (active.current || demo) return;
    recognition.stop();
    setModule(next);
    resetPractice();
    setPhase(reference ? 'ready' : 'idle');
  }
  const target = guideAt(module, round.progress);
  const pitchDelta =
    frame.hz && reference ? semitones(frame.hz, reference.hz) - target : 0;
  const levelDelta = reference
    ? displayDb - reference.db - (module === 'volume' ? target : 0)
    : 0;
  let cue = 'Ready to try?',
    symbol = '✦',
    tone = 'idle';
  if (phase === 'room') {
    cue = 'Stay quiet · learning room noise';
    symbol = '◌';
  } else if (phase === 'voice') {
    cue = 'Hum gently while we find your voice';
    symbol = '〰';
  } else if (phase === 'done') {
    cue = demoResult
      ? 'Demo complete'
      : stars >= 2
        ? 'You did it!'
        : 'Practice complete';
    symbol = stars ? '★' : '✓';
    tone = 'good';
  } else if (live || demo) {
    if (!reference) {
      cue = 'Calibrate your microphone';
      symbol = '◎';
    } else if (module === 'rhythm' && phase === 'practice') {
      cue = round.expectRest ? 'Pause · breathe' : 'Say “ma”';
      symbol = round.expectRest ? 'Ⅱ' : '●';
      tone = round.expectRest ? 'rest' : frame.speech ? 'good' : 'idle';
    } else if (frame.clipped) {
      cue = 'A little softer';
      symbol = '↓';
      tone = 'strong';
    } else if (frame.held) {
      cue = 'Take your time';
      symbol = '〰';
    } else if (!frame.speech) {
      cue =
        phase === 'practice'
          ? 'Take a breath · progress saved'
          : 'Waiting for your voice';
      symbol = 'Ⅱ';
      tone = 'rest';
    } else if (frame.clipped || levelDelta > 6) {
      cue = 'A little softer';
      symbol = '↓';
      tone = 'strong';
    } else if (module === 'words') {
      cue = matchedWord
        ? 'Word heard!'
        : recognition.state === 'processing'
          ? 'Reading your words…'
          : 'Say the word, then pause';
      symbol = matchedWord ? '★' : '●';
      tone = 'good';
    } else if (module !== 'volume' && !frame.hz) {
      cue = 'Voice detected · try a steady hum';
      symbol = '〰';
    } else if (
      module !== 'volume' &&
      Math.abs(pitchDelta) > difficulty.tolerance
    ) {
      cue = pitchDelta > 0 ? 'A little lower' : 'A little higher';
      symbol = pitchDelta > 0 ? '↓' : '↑';
      tone = 'adjust';
    } else if (levelDelta < -6) {
      cue = 'Softer signal · move closer';
      symbol = '↗';
      tone = 'adjust';
    } else {
      cue = 'On track!';
      symbol = '★';
      tone = 'good';
    }
  }
  const stableCue = useStableCue([cue, symbol, tone].join('|'), phase);
  [cue, symbol, tone] = stableCue.split('|');
  const levelTarget =
    (reference?.db ?? -28) + (module === 'volume' ? target : 0);
  const voicePresent = frame.speech || frame.held;
  const levelPosition = meterPosition(
    voicePresent ? displayDb : -90,
    levelTarget,
  );
  const locked =
    phase === 'practice' || phase === 'room' || phase === 'voice' || demo;
  const chartTarget = Array.from(
    { length: 61 },
    (_, i) =>
      `${i ? 'L' : 'M'} ${30 + i * 9} ${145 - guideAt(module, i / 60) * 20}`,
  ).join(' ');
  const chartLine = points
    .map((p, i) =>
      p.y === null
        ? ''
        : `${i === 0 || points[i - 1].y === null ? 'M' : 'L'} ${30 + p.x * 540} ${145 - clamp(p.y, -5, 5) * 20}`,
    )
    .join(' ');
  const last = points.at(-1);
  return (
    <div className={`vg ${live ? 'vg-live' : ''}`}>
      <header className="vg-heading">
        <h1>
          Voice garden <span>✦</span>
        </h1>
        <span className="vg-wallet">
          <Star size={18} /> {total} {total === 1 ? 'star' : 'stars'}
        </span>
      </header>
      <div className="vg-controls">
        <label>
          Level
          <select
            aria-label="Practice level"
            value={level}
            disabled={locked}
            onChange={(e) => {
              setLevel(Number(e.target.value));
              resetPractice();
              setWordIndex(0);
              recognition.stop();
            }}
          >
            {levels.map((l, i) => (
              <option key={l.name} value={i}>
                {l.name} · {l.classes}
              </option>
            ))}
          </select>
        </label>
        <div className="vg-mic-actions">
          {live || mic.state === 'requesting' ? (
            <Button variant="outline" onClick={mic.stop}>
              <MicOff size={17} />
              {mic.state === 'requesting'
                ? 'Cancel microphone'
                : 'Stop microphone'}
            </Button>
          ) : (
            <Button disabled={demo} onClick={() => void startMic()}>
              <Mic size={17} />
              Start microphone
            </Button>
          )}
          <Button
            variant="ghost"
            disabled={live || mic.state === 'requesting'}
            onClick={() => (demo ? stopped() : startDemo())}
          >
            {demo ? 'Stop demo' : 'Try demo'}
          </Button>
        </div>
      </div>
      <div className="vg-modules" role="group" aria-label="Practice modules">
        {modules.map(({ id, name, icon: Icon }) => (
          <Button
            variant="outline"
            aria-pressed={module === id}
            disabled={locked}
            key={id}
            onClick={() => changeModule(id)}
          >
            <Icon size={21} />
            <span>{name}</span>
          </Button>
        ))}
      </div>
      <div className="vg-grid">
        <section
          className={`vg-stage vg-${tone}`}
          aria-label="Live practice feedback"
        >
          <div className="vg-stage-top">
            <span>
              {demo || demoResult
                ? 'DEMO · SIMULATED'
                : live
                  ? 'LIVE PRACTICE'
                  : 'PRACTICE SPACE'}
            </span>
            <div
              className="vg-earned"
              aria-label={`${stars} of ${module === 'words' ? 1 : 3} practice stars`}
            >
              {(module === 'words' ? [1] : [1, 2, 3]).map((n) => (
                <Star
                  key={n}
                  className={stars >= n ? 'earned' : ''}
                  size={25}
                />
              ))}
            </div>
          </div>
          <div className="vg-feedback">
            <div className="vg-symbol" aria-hidden="true">
              {symbol}
            </div>
            <h2 aria-live="polite" aria-atomic="true">
              {cue}
            </h2>
          </div>
          <section
            className="vg-target-meter"
            aria-label="Voice level and personal target"
          >
            <div className="vg-target-heading">
              <strong>
                {voicePresent
                  ? 'Your voice level'
                  : live
                    ? 'Waiting for voice'
                    : 'Your voice target'}
              </strong>
              <span>
                {reference
                  ? 'Your comfortable range'
                  : 'Calibrate to set your range'}
              </span>
            </div>
            <div className="vg-target-track" aria-hidden="true">
              <span className="vg-target-band">✓</span>
              <span
                className={`vg-target-pointer ${voicePresent ? 'active' : ''}`}
                style={{ left: `${levelPosition}%` }}
              >
                ●
              </span>
            </div>
            <meter
              className="sr-only"
              min={0}
              max={100}
              low={37.5}
              high={62.5}
              optimum={50}
              value={levelPosition}
              aria-label="Voice level relative to your calibrated target"
            />
            <div className="vg-target-labels">
              <span>Softer</span>
              <strong>Target</strong>
              <span>Stronger</span>
            </div>
            <p>
              {!reference
                ? 'Use a comfortable voice. No need to shout.'
                : !voicePresent
                  ? 'Room sounds do not move your voice marker.'
                  : Math.abs(levelDelta) <= 6
                    ? '✓ In your target range'
                    : levelDelta > 6
                      ? '↓ Try a little softer'
                      : '↗ Move a little closer'}
            </p>
          </section>
          {module === 'words' ? (
            <div className="vg-word">
              <strong>{word}</strong>
              <Button
                variant="ghost"
                disabled={phase === 'practice' || demo}
                onClick={() => {
                  setWordIndex((i) => i + 1);
                  resetPractice();
                }}
                aria-label="Next word"
              >
                <ChevronRight />
              </Button>
              <p>
                {matchedWord
                  ? '✓ Word heard'
                  : recognition.text
                    ? `Heard: ${recognition.text}`
                    : 'Say it in your own voice.'}
              </p>
            </div>
          ) : module === 'rhythm' ? (
            <div
              className="vg-beats"
              aria-label={`${round.bursts} of ${difficulty.cycles} speak-and-pause cycles`}
            >
              {Array.from({ length: difficulty.cycles }, (_, i) => (
                <span
                  className={
                    i < round.bursts
                      ? 'complete'
                      : i === round.bursts
                        ? 'current'
                        : ''
                  }
                  key={i}
                >
                  {i < round.bursts ? <Check /> : <AudioLines />}
                </span>
              ))}
            </div>
          ) : (
            <svg
              className="vg-chart"
              viewBox="0 0 600 260"
              role="img"
              aria-label={
                module === 'volume'
                  ? 'Loudness guide and live signal'
                  : 'Pitch guide and live voice trace'
              }
            >
              {[55, 100, 145, 190, 235].map((y) => (
                <line key={y} x1="30" x2="570" y1={y} y2={y} stroke="#dce6ee" />
              ))}
              <path
                d={chartTarget}
                fill="none"
                stroke="#cdeee1"
                strokeWidth={difficulty.tolerance * 30}
                strokeLinecap="round"
              />
              <path
                d={chartTarget}
                fill="none"
                stroke="#69a990"
                strokeWidth="3"
                strokeDasharray="6 8"
              />
              <path
                d={chartLine}
                fill="none"
                stroke={tone === 'good' ? '#237b58' : '#6963ca'}
                strokeWidth="5"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              {last?.y !== null && last?.y !== undefined && (
                <circle
                  cx={30 + last.x * 540}
                  cy={145 - clamp(last.y, -5, 5) * 20}
                  r="10"
                  fill={tone === 'good' ? '#289769' : '#6963ca'}
                  stroke="white"
                  strokeWidth="4"
                />
              )}
              <text x="30" y="23">
                {module === 'volume'
                  ? 'Softer → gently stronger → softer'
                  : 'Follow the dotted path'}
              </text>
            </svg>
          )}
          <div className="vg-round-bar">
            <Progress
              aria-label="Practice progress"
              value={round.progress * 100}
            />
            <span>
              {module === 'words'
                ? `${matchedWord ? 1 : 0} / 1 phrase matched`
                : module === 'rhythm'
                  ? `${round.bursts} / ${difficulty.cycles} cycles`
                  : `${(round.progress * difficulty.seconds).toFixed(1)} / ${difficulty.seconds}s of voice`}
            </span>
          </div>
          <div className="vg-round-actions">
            {phase === 'practice' ? (
              <Button
                variant="outline"
                onClick={() => {
                  active.current = null;
                  clearDemo();
                  setDemo(false);
                  setPhase('ready');
                }}
              >
                Stop round
              </Button>
            ) : (
              <Button
                className="vg-go"
                disabled={
                  !live ||
                  !reference ||
                  phase === 'room' ||
                  phase === 'voice' ||
                  (module === 'words' && recognition.state !== 'listening')
                }
                onClick={startRound}
              >
                <Play size={18} />
                {phase === 'done' ? 'Play again' : 'Start practice'}
              </Button>
            )}
            <span>
              {phase === 'done'
                ? `${stars} practice ${stars === 1 ? 'star' : 'stars'} earned`
                : 'Pauses are welcome.'}
            </span>
          </div>
        </section>
        <aside className="vg-sidebar">
          <section className="vg-calibration">
            <h3>
              <SlidersHorizontal size={17} /> Calibration
            </h3>
            <Button
              variant="outline"
              disabled={!live || phase === 'practice'}
              onClick={autoCalibrate}
            >
              <WandSparkles size={16} /> Auto-calibrate
            </Button>
            <Button
              variant="outline"
              disabled={!live || phase === 'practice'}
              onClick={() => {
                calibration.current = false;
                setManualFloor(Math.round(frame.noiseDb));
                setManualOpen(true);
              }}
            >
              <Settings2 size={16} /> Manual calibration
            </Button>
            <p>
              {phase === 'room'
                ? '1 · Stay quiet for 2 seconds'
                : phase === 'voice'
                  ? '2 · Hum comfortably until ready'
                  : reference
                    ? '✓ Voice reference ready'
                    : 'Starts automatically with the mic.'}
            </p>
          </section>
          <section className="vg-recognition">
            <h3>
              <AudioLines size={17} /> Live captions
            </h3>
            <p>English · on this device</p>
            <Button
              disabled={!live || demo || phase === 'room' || phase === 'voice'}
              variant="outline"
              onClick={() =>
                recognition.state === 'off'
                  ? recognition.start()
                  : recognition.stop()
              }
            >
              {recognition.state === 'starting'
                ? 'Cancel download'
                : recognition.state === 'off'
                  ? 'Enable captions'
                  : 'Stop captions'}
            </Button>
            <p>
              {recognition.state === 'starting'
                ? `Loading speech model · ${recognition.progress}% of current file`
                : recognition.state === 'processing'
                  ? 'Reading your phrase… wait for Ready before speaking again.'
                  : recognition.state === 'listening'
                    ? 'Ready · say a short phrase, then pause.'
                    : 'First use downloads a small speech model. Audio stays on your device.'}
            </p>
            {recognition.state === 'starting' && (
              <Progress
                value={recognition.progress}
                aria-label="Speech model file download"
              />
            )}
            <output className="vg-caption-text" aria-live="polite">
              {recognition.text || 'Your words will appear here.'}
            </output>
            {recognition.notes.length > 0 && (
              <details className="vg-notes">
                <summary>
                  This session · {recognition.notes.length} phrases
                </summary>
                <ol>
                  {recognition.notes.map((note, i) => (
                    <li key={i}>{note}</li>
                  ))}
                </ol>
                <Button variant="ghost" onClick={() => recognition.clear()}>
                  Clear phrases
                </Button>
              </details>
            )}
            {recognition.error && <output>{recognition.error}</output>}
            <small>
              Captions can mishear. A missing match does not mean you spoke
              incorrectly.
            </small>
          </section>
        </aside>
      </div>
      {(mic.error || notice === 'error') && (
        <output className="vg-error">{mic.error || notice}</output>
      )}
      {live && (
        <div className="vg-mobile-stop">
          <span>
            <Mic size={16} /> Microphone on
          </span>
          <Button onClick={mic.stop}>Stop mic</Button>
        </div>
      )}
      <details className="vg-help">
        <summary>Grown-up settings & measurement notes</summary>
        <p>
          Levels are suggestions, not ability labels. Change them freely.
          Practice stars reward detected effort near a guide; pauses never erase
          them. A word-recognition match is not a pronunciation or therapy
          assessment.
        </p>
        <p className="vg-diagnostics">
          Input: {live ? Math.round(displayDb) : '—'} dBFS · Target:{' '}
          {reference ? Math.round(levelTarget) : '—'} dBFS · Pitch:{' '}
          {frame.hz ? Math.round(frame.hz) : '—'} Hz · Background:{' '}
          {live ? Math.round(frame.noiseDb) : '—'} dBFS
        </p>
        <p>
          The microphone measures device-relative dBFS, not environmental
          decibels. Automatic setup samples room noise, then a comfortable
          voice. A noise-relative periodicity gate reduces steady fan pickup but
          cannot isolate a speaker perfectly. If your voice is missed, lower the
          manual noise margin or move the microphone closer; do not strain to
          reach the guide.
        </p>
        <p>
          Audio is buffered briefly in memory for optional Whisper captions and
          never uploaded. Model files download from Hugging Face and may be
          cached by your browser. The last eight transcribed phrases stay in
          this session only; use Clear phrases to erase them. Stop or leave the
          page to release the microphone and model. Captions may be delayed on
          phones and can mishear children and atypical speech.
        </p>
      </details>
      <Dialog
        open={manualOpen}
        onOpenChange={(open) => {
          setManualOpen(open);
          if (!open && live && !reference) {
            calibration.current = true;
            setPhase('voice');
          }
        }}
      >
        <DialogContent className="vg-manual">
          <DialogTitle>Manual calibration</DialogTitle>
          <DialogDescription>
            Adjust detection for this microphone. Lower the noise margin if
            quiet speech is missed.
          </DialogDescription>
          <label>
            Noise margin: {sensitivity} dB
            <Slider
              aria-label="Noise margin"
              min={3}
              max={18}
              step={1}
              value={[sensitivity]}
              onValueChange={(v) => setSensitivity(Array.isArray(v) ? v[0] : v)}
            />
          </label>
          <label>
            Background level (dBFS)
            <input
              type="number"
              min={-85}
              max={-10}
              value={manualFloor}
              onChange={(e) => setManualFloor(Number(e.target.value))}
            />
          </label>
          <label>
            Comfortable voice level (dBFS)
            <input
              type="number"
              min={-65}
              max={-8}
              value={manualLevel}
              onChange={(e) => setManualLevel(Number(e.target.value))}
            />
          </label>
          <label>
            Comfortable pitch (Hz)
            <input
              type="number"
              min={60}
              max={1000}
              value={manualPitch}
              onChange={(e) => setManualPitch(Number(e.target.value))}
            />
          </label>
          {manualLevel < manualFloor + sensitivity && (
            <p className="vg-error">
              The comfortable voice level must be above the background plus
              noise margin.
            </p>
          )}
          <Button
            disabled={
              !live ||
              ![manualFloor, manualLevel, manualPitch].every(Number.isFinite) ||
              manualFloor < -85 ||
              manualFloor > -10 ||
              manualLevel < -65 ||
              manualLevel > -8 ||
              manualLevel < manualFloor + sensitivity ||
              manualPitch < 60 ||
              manualPitch > 1000
            }
            onClick={applyManual}
          >
            Apply calibration
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

'use client';
/* oxlint-disable jsx-a11y/prefer-tag-over-role -- Segmented meter and inline SVG chart use their supported ARIA roles; replacing the SVG with an img would discard live geometry. */
import { useEffect, useRef, useState } from 'react';
import {
  Activity,
  ArrowRight,
  AudioLines,
  Check,
  CircleHelp,
  Feather,
  Mic,
  MicOff,
  Play,
  ShieldCheck,
  Sparkles,
  Target,
  Waves,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useVoiceInput } from '@/hooks/use-voice-input';
import {
  calibrate,
  clamp,
  levelZone,
  practiceWords,
  semitones,
  targetAt,
  type Exercise,
  type VoiceSample,
} from '@/lib/voice/analysis';

type Reference = { db: number; hz: number };
type Point = { t: number; pitch: number | null };
type Result = {
  demo: boolean;
  voiced: number;
  matched: number;
  exercise: Exercise;
};
type Run = {
  kind: 'calibrate' | 'practice';
  started: number;
  exercise: Exercise;
  demo: boolean;
  reference: Reference;
  samples: VoiceSample[];
  voiced: number;
  matched: number;
  last: number;
};
const idle: VoiceSample = { db: -90, hz: null, confidence: 0, clipped: false };
const exercises = [
  {
    id: 'steady' as const,
    icon: Waves,
    title: 'A steady stream',
    description: 'Keep a gentle sound steady.',
    label: 'Follow the straight path',
    cue: 'Try a comfortable “mmm”. Let your line stay near the dotted path.',
  },
  {
    id: 'hill' as const,
    icon: Activity,
    title: 'A little voice hill',
    description: 'Go a little up, then back down.',
    label: 'Follow the little hill',
    cue: 'Start in your own voice. Glide gently up, then return. No need to stretch.',
  },
  {
    id: 'words' as const,
    icon: AudioLines,
    title: 'Words in bloom',
    description: 'Explore the shape of a word.',
    label: 'Discover your word’s shape',
    cue: 'Say the word at your own pace. This shows your sound; it does not judge pronunciation.',
  },
];
export function VoiceStudio() {
  const [exercise, setExercise] = useState<Exercise>('steady');
  const [sample, setSample] = useState<VoiceSample>(idle);
  const [reference, setReference] = useState<Reference | null>(null);
  const [phase, setPhase] = useState<'idle' | 'calibrate' | 'practice'>('idle');
  const [elapsed, setElapsed] = useState(0);
  const [points, setPoints] = useState<Point[]>([]);
  const [result, setResult] = useState<Result | null>(null);
  const [rounds, setRounds] = useState(0);
  const [demo, setDemo] = useState(false);
  const [message, setMessage] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const run = useRef<Run | null>(null);
  const demoTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const consumeRef = useRef<(value: VoiceSample, time: number) => void>(
    () => {},
  );
  function clearDemo() {
    if (demoTimer.current !== null) {
      clearInterval(demoTimer.current);
      demoTimer.current = null;
    }
  }
  function stopFlow() {
    clearDemo();
    run.current = null;
    setPhase('idle');
    setDemo(false);
    setSample(idle);
  }
  function consume(value: VoiceSample, time: number) {
    setSample(value);
    const active = run.current;
    if (!active) return;
    const t = (time - active.started) / 1000;
    const dt = Math.min(Math.max((time - active.last) / 1000, 0), 0.15);
    active.last = time;
    const duration = active.kind === 'calibrate' ? 3 : 5;
    setElapsed(Math.min(t, duration));
    active.samples.push(value);
    if (active.kind === 'practice') {
      const pitch =
        value.hz !== null ? semitones(value.hz, active.reference.hz) : null;
      setPoints((previous) =>
        [...previous, { t: Math.min(t, 5), pitch }].slice(-75),
      );
      if (value.hz !== null && !value.clipped) {
        active.voiced += dt;
        if (
          Math.abs(pitch! - targetAt(active.exercise, t)) <= 1.5 &&
          levelZone(value.db, active.reference.db) === 'comfortable'
        )
          active.matched += dt;
      }
    }
    if (t < duration) return;
    run.current = null;
    setPhase('idle');
    if (active.kind === 'calibrate') {
      const target = calibrate(active.samples);
      if (target) {
        setReference(target);
        setMessage(
          'Your starting voice is set. Choose a little practice when you’re ready.',
        );
      } else
        setMessage(
          'We couldn’t find a steady starting sound. Try again in a quiet spot, with a gentle hum. Don’t push your voice.',
        );
    } else {
      setResult({
        demo: active.demo,
        voiced: Math.min(5, active.voiced),
        matched: Math.min(5, active.matched),
        exercise: active.exercise,
      });
      if (!active.demo && active.voiced >= 0.5) setRounds((n) => n + 1);
      setMessage(
        active.demo
          ? 'Demo finished. These were simulated signals, not your voice.'
          : active.voiced < 0.5
            ? 'We didn’t find a clear voice this time. You can try again or take a break.'
            : 'A little practice, a little discovery. Take a breath before another go.',
      );
    }
    if (active.demo) {
      clearDemo();
      setDemo(false);
      setSample(idle);
    }
  }
  useEffect(() => {
    consumeRef.current = consume;
  });
  useEffect(() => () => clearDemo(), []);
  const microphone = useVoiceInput(consume, stopFlow);
  const busy = phase !== 'idle';
  const live = microphone.state === 'live';
  const current = exercises.find((e) => e.id === exercise)!;
  const displayReference = demo ? { db: -28, hz: 220 } : reference;
  const zone = sample.clipped
    ? 'strong'
    : levelZone(sample.db, displayReference?.db ?? -28);
  const hasSignal = (live || demo) && sample.db > -55;
  const feedback =
    !live && !demo
      ? 'Ready when you are'
      : sample.clipped
        ? 'Signal too strong'
        : !hasSignal
          ? 'Try a gentle sound'
          : !displayReference
            ? 'Let’s find your starting voice'
            : zone === 'quiet'
              ? 'A softer sound'
              : zone === 'strong'
                ? 'Ease gently'
                : 'In your target zone';
  const detail =
    !live && !demo
      ? 'Start your microphone, or explore the demo.'
      : sample.clipped
        ? 'Ease your voice or move the microphone farther away.'
        : !displayReference
          ? 'Choose “Set my voice” and hum comfortably.'
          : zone === 'strong'
            ? 'No need to push. Try your comfortable voice.'
            : zone === 'quiet'
              ? 'Stay comfortable. Moving a little closer may help.'
              : 'Notice how this feels. Your own voice, your own pace.';
  function startRun(kind: 'calibrate' | 'practice', simulated = false) {
    if (!simulated && !live) return;
    const base = simulated ? { db: -28, hz: 220 } : reference;
    if (kind === 'practice' && !base) return;
    setMessage('');
    setResult(null);
    setPoints([]);
    setElapsed(0);
    setPhase(kind);
    run.current = {
      kind,
      started: performance.now(),
      last: performance.now(),
      exercise,
      demo: simulated,
      reference: base ?? { db: -28, hz: 220 },
      samples: [],
      voiced: 0,
      matched: 0,
    };
  }
  function startDemo() {
    microphone.stop();
    setMessage('');
    setDemo(true);
    startRun('practice', true);
    const started = performance.now();
    demoTimer.current = setInterval(() => {
      const time = performance.now();
      const t = (time - started) / 1000;
      const offset = targetAt(exercise, t) + Math.sin(t * 5) * 0.65;
      consumeRef.current(
        {
          db: -28 + Math.sin(t * 3) * 4,
          hz: 220 * 2 ** (offset / 12),
          confidence: 1,
          clipped: false,
        },
        time,
      );
    }, 80);
  }
  function choose(value: string) {
    if (busy) return;
    setExercise(value as Exercise);
    setResult(null);
    setPoints([]);
    setElapsed(0);
    setMessage('');
  }
  const targetPath = Array.from(
    { length: 51 },
    (_, i) =>
      `${i === 0 ? 'M' : 'L'} ${40 + i * 10.4} ${140 - targetAt(exercise, i / 10) * 14}`,
  ).join(' ');
  const trail = points
    .map((point, i) =>
      point.pitch === null
        ? ''
        : `${i === 0 || points[i - 1].pitch === null ? 'M' : 'L'} ${40 + point.t * 104} ${140 - clamp(point.pitch, -7, 7) * 14}`,
    )
    .join(' ');
  const last = points.at(-1);
  const voicedPitch = (live || demo) && sample.hz !== null;
  return (
    <div className={`voice-studio ${live ? 'voice-is-live' : ''}`}>
      <div className="voice-heading">
        <div>
          <p className="eyebrow">A LITTLE PRACTICE. YOUR OWN PACE.</p>
          <h1>
            Make your voice <em>visible.</em>
          </h1>
          <p>
            A gentle space to explore your sound, one little ripple at a time.
          </p>
        </div>
        <span className="voice-optional">
          <Feather size={16} /> Always optional
        </span>
      </div>
      <div className="voice-top-note">
        <ShieldCheck size={17} />
        <span>
          Your microphone stays on this device. Nothing is recorded or uploaded.
        </span>
      </div>
      <Tabs value={exercise} onValueChange={(v) => choose(String(v))}>
        <TabsList
          className="voice-exercises"
          aria-label="Choose a voice exercise"
        >
          {exercises.map(({ id, icon: Icon, title, description }) => (
            <TabsTrigger key={id} value={id} disabled={busy}>
              <span className="exercise-icon">
                <Icon />
              </span>
              <span>
                <strong>{title}</strong>
                <small>{description}</small>
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={exercise}>
          <div className="voice-workbench">
            <section
              className={`voice-signal signal-${zone}`}
              aria-labelledby="signal-title"
            >
              <div className="signal-header">
                <span id="signal-title">YOUR SOUND, IN COLOUR</span>
                <span
                  className={`signal-status ${live || demo ? 'active' : ''}`}
                >
                  <span />
                  {demo
                    ? 'Demo · simulated'
                    : live
                      ? 'Mic is on'
                      : 'Mic is off'}
                </span>
              </div>
              <div
                className="voice-orbit"
                style={
                  {
                    '--signal-scale': hasSignal
                      ? String(0.85 + clamp((sample.db + 60) / 60, 0, 1) * 0.25)
                      : '0.85',
                  } as React.CSSProperties
                }
              >
                <div className="orbit-ring ring-one" />
                <div className="orbit-ring ring-two" />
                <div className="orbit-core">
                  <AudioLines size={52} />
                  <span>
                    {!live && !demo
                      ? 'Let’s explore'
                      : !hasSignal
                        ? 'A little sound'
                        : zone === 'comfortable' && displayReference
                          ? 'Nice & gentle'
                          : zone === 'strong'
                            ? 'Ease gently'
                            : 'Soft & gentle'}
                  </span>
                </div>
                <span className="orbit-star star-one">✦</span>
                <span className="orbit-star star-two">✧</span>
              </div>
              <h2>{feedback}</h2>
              <p className="signal-detail">{detail}</p>
              <div
                className="voice-meter"
                role="meter"
                aria-label="Device-relative microphone level in dBFS"
                aria-valuemin={-60}
                aria-valuemax={0}
                aria-valuenow={Math.round(Math.max(-60, sample.db))}
                aria-valuetext={
                  !live && !demo
                    ? 'Microphone off'
                    : `${Math.round(sample.db)} dBFS, ${feedback}`
                }
              >
                {Array.from({ length: 30 }, (_, i) => {
                  const db = -60 + i * 2;
                  return (
                    <span
                      key={i}
                      className={`${levelZone(db, displayReference?.db ?? -28)} ${hasSignal && sample.db >= db ? 'lit' : ''}`}
                    />
                  );
                })}
              </div>
              <div className="meter-legend">
                <span>
                  <i className="blue" /> Softer
                </span>
                <span>
                  <i className="green" /> Target
                </span>
                <span>
                  <i className="red" /> Stronger
                </span>
              </div>
              <div className="signal-numbers">
                <div>
                  <strong>
                    {hasSignal ? Math.round(sample.db) : '—'}
                    <small>dBFS</small>
                  </strong>
                  <span>Microphone level</span>
                </div>
                <div>
                  <strong>
                    {voicedPitch ? Math.round(sample.hz!) : '—'}
                    <small>Hz</small>
                  </strong>
                  <span>
                    {hasSignal && !voicedPitch
                      ? 'Pitch not clear yet'
                      : 'Estimated pitch'}
                  </span>
                </div>
              </div>
              <div className="microphone-actions">
                {live || microphone.state === 'requesting' ? (
                  <Button
                    className="voice-stop"
                    onClick={() => {
                      microphone.stop();
                      setMessage(
                        'Microphone stopped. Take all the time you need.',
                      );
                    }}
                  >
                    <MicOff size={18} />
                    {microphone.state === 'requesting'
                      ? 'Cancel microphone'
                      : 'Stop microphone'}
                  </Button>
                ) : (
                  <Button
                    className="voice-start"
                    disabled={demo}
                    onClick={() => {
                      setReference(null);
                      setResult(null);
                      setPoints([]);
                      setElapsed(0);
                      setSample(idle);
                      setMessage('');
                      void microphone.start();
                    }}
                  >
                    <Mic size={19} />
                    {microphone.state === 'error'
                      ? 'Try microphone again'
                      : 'Start microphone'}
                    <ArrowRight size={17} />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  className="voice-demo"
                  disabled={live || microphone.state === 'requesting'}
                  onClick={() => (demo ? stopFlow() : startDemo())}
                >
                  <Play size={15} />
                  {demo ? 'Stop demo' : 'Try a demo first'}
                </Button>
              </div>
              <p className="signal-footnote">
                No speakers or headphones needed.
              </p>
            </section>
            <div className="voice-practice-side">
              <section className="voice-target-card">
                <div className="voice-card-title">
                  <span className="voice-step">1</span>
                  <div>
                    <h2>Find your starting voice</h2>
                    <p>A target made from your comfortable hum.</p>
                  </div>
                  {reference && <Check className="voice-check" />}
                </div>
                <div className="voice-setup-row">
                  <p>
                    {phase === 'calibrate'
                      ? 'Hum gently for a moment. Breathe whenever you need.'
                      : reference
                        ? 'Your starting voice is set for this microphone session.'
                        : 'Sit comfortably. Keep the mic in one place. Try a gentle “mmm” for 3 seconds.'}
                  </p>
                  <Button
                    className="voice-set"
                    variant="outline"
                    disabled={!live || busy}
                    onClick={() => startRun('calibrate')}
                  >
                    <Target size={17} />
                    {reference ? 'Set again' : 'Set my voice'}
                  </Button>
                </div>
                {phase === 'calibrate' && (
                  <Progress
                    aria-label="Comfortable voice setup"
                    value={(elapsed / 3) * 100}
                  />
                )}
              </section>
              <section className="voice-trail-card">
                <div className="voice-card-title">
                  <span className="voice-step">2</span>
                  <div>
                    <h2>{current.label}</h2>
                    <p>{current.cue}</p>
                  </div>
                  <span className="round-duration">5 sec</span>
                </div>
                {exercise === 'words' && (
                  <div className="voice-word">
                    <span aria-hidden="true">
                      {practiceWords[wordIndex].symbol}
                    </span>
                    <div>
                      <strong>{practiceWords[wordIndex].word}</strong>
                      <p>{practiceWords[wordIndex].cue}</p>
                    </div>
                    <Button
                      disabled={busy}
                      variant="outline"
                      onClick={() => {
                        setWordIndex((i) => (i + 1) % practiceWords.length);
                        setPoints([]);
                        setResult(null);
                      }}
                    >
                      Next word <ArrowRight size={16} />
                    </Button>
                  </div>
                )}
                <div className="trail-legend">
                  <span>
                    <i className="target-key" />
                    {exercise === 'words' ? 'Starting pitch' : 'Gentle guide'}
                  </span>
                  <span>
                    <i className="voice-key" />
                    {demo ? 'Simulated voice' : 'Your voice'}
                  </span>
                </div>
                <svg
                  className="voice-chart"
                  viewBox="0 0 600 265"
                  role="img"
                  aria-label={
                    exercise === 'words'
                      ? 'Pitch trace over five seconds. Gaps mean no clear pitch.'
                      : 'Pitch practice graph. Dotted guide and solid measured voice trace over five seconds. Gaps mean no clear pitch.'
                  }
                >
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <g key={i}>
                      <line
                        x1={40 + i * 104}
                        x2={40 + i * 104}
                        y1="38"
                        y2="224"
                        stroke="#e7ebf5"
                      />
                      <text x={40 + i * 104} y="248" textAnchor="middle">
                        {i}s
                      </text>
                    </g>
                  ))}
                  {[70, 140, 210].map((y) => (
                    <line
                      key={y}
                      x1="40"
                      x2="560"
                      y1={y}
                      y2={y}
                      stroke="#e7ebf5"
                    />
                  ))}
                  {exercise !== 'words' && (
                    <path
                      d={targetPath}
                      fill="none"
                      stroke="#e0f4ee"
                      strokeWidth="42"
                      strokeLinecap="round"
                    />
                  )}
                  <path
                    d={targetPath}
                    fill="none"
                    stroke="#75ad9d"
                    strokeWidth="2.5"
                    strokeDasharray="6 7"
                  />
                  <text x="42" y="24">
                    A little higher ↑
                  </text>
                  <text x="42" y="218">
                    A little lower ↓
                  </text>
                  <path
                    d={trail}
                    stroke="#6759d5"
                    fill="none"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {last?.pitch !== null && last?.pitch !== undefined && (
                    <circle
                      cx={40 + last.t * 104}
                      cy={140 - clamp(last.pitch, -7, 7) * 14}
                      r="7"
                      fill="#6759d5"
                      stroke="white"
                      strokeWidth="3"
                    />
                  )}
                </svg>
                <div className="trail-bottom">
                  <span>
                    {phase === 'practice'
                      ? `${elapsed.toFixed(1)} / 5 seconds`
                      : exercise === 'words'
                        ? 'Every word has its own shape.'
                        : 'Stay near the path, without pushing.'}
                  </span>
                  <Button
                    className="voice-practice-button"
                    disabled={!live || !reference || busy}
                    onClick={() => startRun('practice')}
                  >
                    <Play size={16} />{' '}
                    {result ? 'Try another round' : 'Start a little practice'}
                  </Button>
                </div>
                {busy && (
                  <Button
                    className="voice-pause-round"
                    variant="ghost"
                    onClick={() => {
                      run.current = null;
                      clearDemo();
                      setDemo(false);
                      setPhase('idle');
                      setMessage(
                        'Round stopped. You can take a break and try again.',
                      );
                    }}
                  >
                    Stop this round
                  </Button>
                )}
              </section>
              <div className="voice-encouragement">
                <span>✦</span>
                <p>
                  <strong>Little tries count. Breaks do too.</strong>
                  <br />
                  Relax your shoulders. Use a comfortable voice. Stop if it
                  feels tiring.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      {live && (
        <div className="voice-live-dock">
          <span>
            <Mic size={16} /> Your microphone is on
          </span>
          <Button onClick={microphone.stop}>Stop mic</Button>
        </div>
      )}
      {(microphone.error || message) && (
        <output
          className={`voice-message ${microphone.error ? 'voice-error' : ''}`}
          aria-live="polite"
        >
          {microphone.error || message}
        </output>
      )}
      {result && (
        <section className="voice-result">
          <div className="result-icon">
            <Sparkles />
          </div>
          <div>
            <p className="eyebrow">
              {result.demo
                ? 'DEMO RECAP · SIMULATED SIGNAL'
                : 'YOUR LITTLE DISCOVERY'}
            </p>
            <h2>
              {result.voiced < 0.5
                ? 'Let’s try again when you’re ready.'
                : result.exercise === 'words'
                  ? 'You made a word-shaped ripple.'
                  : 'You made your voice visible.'}
            </h2>
            <p>
              {result.exercise === 'words'
                ? 'We measure pitch and level, not whether a word was pronounced correctly.'
                : 'Time near the guide means a clear pitch within the guide band and level near your starting voice. This is exploration, not a grade.'}
            </p>
          </div>
          <div className="result-stat">
            <strong>
              {result.voiced.toFixed(1)}
              <small>s</small>
            </strong>
            <span>Clear voice detected</span>
          </div>
          {result.exercise !== 'words' && (
            <div className="result-stat">
              <strong>
                {result.matched.toFixed(1)}
                <small>s</small>
              </strong>
              <span>Near your guide</span>
            </div>
          )}
        </section>
      )}
      <div className="voice-bottom">
        <span>
          <Feather size={17} />
          {rounds
            ? `${rounds} little ${rounds === 1 ? 'practice' : 'practices'} this visit`
            : 'No scores. No rush. Just discovery.'}
        </span>
        <span>Signing, pointing and typing belong here too.</span>
      </div>
      <details className="voice-guide">
        <summary>
          <CircleHelp size={18} /> For grown-ups: what the colours and lines
          mean
        </summary>
        <div>
          <p>
            <strong>Loudness and pitch are different.</strong> Blue → green →
            red shows microphone level relative to a comfortable starting voice.
            dBFS is a device-relative digital level, not calibrated
            environmental decibels (dB SPL), hearing safety, or a clinical
            assessment. Microphones, distance and background sounds change it.
          </p>
          <p>
            The line estimates pitch in Hz from periodic sound. It may not track
            breathy sounds, consonants, background noise or every voice
            reliably. The pitch guide is relative to the child’s hum (±1.5
            semitones around the path), with a small 3-semitone hill. There is
            no universally correct pitch for a child. A gap means “not enough
            information,” not “wrong.”
          </p>
          <p>
            Help the child set a comfortable voice; never ask them to shout or
            strain to reach green. Exercises and prompts are optional
            exploration, not validated speech therapy or pronunciation scoring.
            Review with a deaf educator or speech-language professional before
            structured instruction.{' '}
            <a
              href="https://www.nidcd.nih.gov/health/taking-care-your-voice"
              target="_blank"
              rel="noreferrer"
            >
              Read NIDCD voice-care guidance ↗
            </a>
          </p>
          <p>
            Audio is analysed in memory only. No recordings, speech-recognition
            service, uploads or stored voice profiles. Stop releases the
            microphone; leaving or hiding the page also stops it. Starting it
            again requires setting a fresh reference.
          </p>
        </div>
      </details>
    </div>
  );
}

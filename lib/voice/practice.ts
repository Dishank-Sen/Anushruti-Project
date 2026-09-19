import { clamp, median, semitones, type VoiceSample } from './analysis.ts';
export type VoiceFrame = VoiceSample & {
  speech: boolean;
  held: boolean;
  noiseDb: number;
  snr: number;
  learningNoise: boolean;
};
/** Room-calibrated energy/periodicity gate, not speaker identification. */
export class NoiseGate {
  floor = -60;
  margin = 6;
  roomPitch: number | null = null;
  private room: VoiceSample[] = [];
  private until = 0;
  private lastVoice = -Infinity;
  private pitches: number[] = [];
  private candidateSince: number | null = null;
  private lastPeriodic = -Infinity;
  reset(time: number) {
    this.room = [];
    this.until = time + 2200;
    this.lastVoice = -Infinity;
    this.pitches = [];
    this.roomPitch = null;
    this.candidateSince = null;
    this.lastPeriodic = -Infinity;
  }
  manual(floor: number, margin: number) {
    this.floor = clamp(floor, -85, -10);
    this.margin = clamp(margin, 3, 18);
    this.until = 0;
    this.room = [];
    this.roomPitch = null;
    this.pitches = [];
    this.candidateSince = null;
    this.lastPeriodic = -Infinity;
    this.lastVoice = -Infinity;
  }
  update(sample: VoiceSample, time: number): VoiceFrame {
    if (this.until) {
      this.room.push(sample);
      if (time >= this.until) {
        const levels = this.room.map((s) => s.db).sort((a, b) => a - b);
        this.floor = clamp(
          levels[Math.floor(levels.length * 0.8)] ?? -60,
          -85,
          -10,
        );
        const frequencies = this.room
          .filter((s) => s.hz !== null)
          .map((s) => s.hz!);
        this.roomPitch =
          frequencies.length > this.room.length * 0.6
            ? median(frequencies)
            : null;
        this.until = 0;
      }
      return {
        ...sample,
        hz: null,
        speech: false,
        held: false,
        noiseDb: this.floor,
        snr: sample.db - this.floor,
        learningNoise: this.until !== 0,
      };
    }
    const snr = sample.db - this.floor;
    const resemblesFan =
      sample.hz !== null &&
      this.roomPitch !== null &&
      Math.abs(semitones(sample.hz, this.roomPitch)) < 0.8 &&
      snr < Math.max(10, this.margin + 3);
    const aboveNoise =
      snr >= this.margin && sample.db > -70 && !resemblesFan && !sample.clipped;
    const periodic = sample.hz !== null && sample.confidence >= 0.85;
    if (aboveNoise && periodic) this.lastPeriodic = time;
    // A burst of energy alone (tap, clap, fan gust) cannot open the voice gate.
    // Once voiced sound starts it, allow nearby unvoiced consonants.
    const candidate =
      aboveNoise && (periodic || time - this.lastPeriodic < 200);
    if (!candidate) this.candidateSince = null;
    else if (this.candidateSince === null) this.candidateSince = time;
    const speech =
      candidate &&
      this.candidateSince !== null &&
      time - this.candidateSince >= 120;
    let hz: number | null = null;
    if (speech) {
      this.lastVoice = time;
      if (sample.hz !== null) {
        this.pitches.push(sample.hz);
        this.pitches = this.pitches.slice(-3);
        hz = median(this.pitches);
      } else this.pitches = [];
    } else this.pitches = [];
    return {
      ...sample,
      hz,
      speech,
      held: !speech && time - this.lastVoice < 450,
      noiseDb: this.floor,
      snr,
      learningNoise: false,
    };
  }
}
export type Module = 'steady' | 'hill' | 'volume' | 'rhythm' | 'words';
export const levels = [
  {
    name: 'Starter',
    classes: 'Class 1–2',
    seconds: 3,
    tolerance: 2.5,
    cycles: 2,
    words: ['sun', 'moon', 'hello', 'water'],
  },
  {
    name: 'Explorer',
    classes: 'Class 3–4',
    seconds: 5,
    tolerance: 2,
    cycles: 3,
    words: ['blue sky', 'good morning', 'thank you', 'my garden'],
  },
  {
    name: 'Challenge',
    classes: 'Class 5+',
    seconds: 7,
    tolerance: 1.5,
    cycles: 4,
    words: [
      'Today is sunny',
      'I would like some water',
      'The flowers are growing',
      'Thank you for helping me',
    ],
  },
] as const;
export const guideAt = (module: Module, progress: number) =>
  module === 'hill' || module === 'volume'
    ? 3 * Math.sin(Math.PI * clamp(progress, 0, 1))
    : 0;
export type Round = {
  progress: number;
  matched: number;
  bursts: number;
  burst: number;
  rest: number;
  expectRest: boolean;
  done: boolean;
};
export const freshRound = (): Round => ({
  progress: 0,
  matched: 0,
  bursts: 0,
  burst: 0,
  rest: 0,
  expectRest: false,
  done: false,
});
/** Pauses never advance the active-voice clock; deliberate rhythm rests follow a voice burst. */
export function advanceRound(
  previous: Round,
  frame: VoiceFrame,
  dt: number,
  module: Module,
  level: number,
  reference: { db: number; hz: number },
): Round {
  if (previous.done || module === 'words') return previous;
  const next = { ...previous };
  const step = clamp(dt, 0, 0.15);
  const difficulty = levels[level];
  if (frame.clipped) return next;
  if (module === 'rhythm') {
    if (next.expectRest) {
      next.rest = frame.speech ? 0 : next.rest + step;
      if (next.rest >= 0.65) {
        next.bursts++;
        next.expectRest = false;
        next.rest = 0;
        next.burst = 0;
      }
    } else {
      next.burst = frame.speech ? next.burst + step : 0;
      if (next.burst >= 0.45) next.expectRest = true;
    }
    next.progress = next.bursts / difficulty.cycles;
    next.matched = next.bursts;
    next.done = next.bursts >= difficulty.cycles;
    return next;
  }
  if (!frame.speech) return next;
  // Pitch exercises wait for an actual pitch, while volume accepts nearby unvoiced consonants.
  if ((module === 'steady' || module === 'hill') && frame.hz === null)
    return next;
  const target = guideAt(module, next.progress);
  const goodLevel =
    Math.abs(frame.db - (reference.db + (module === 'volume' ? target : 0))) <=
    6;
  const goodPitch =
    frame.hz !== null &&
    Math.abs(semitones(frame.hz, reference.hz) - target) <=
      difficulty.tolerance;
  const matched = module === 'volume' ? goodLevel : goodLevel && goodPitch;
  next.progress = Math.min(1, next.progress + step / difficulty.seconds);
  if (matched) next.matched += step;
  next.done = next.progress >= 1;
  return next;
}
export function wordMatches(transcript: string, target: string) {
  const normalize = (s: string) =>
    s
      .toLocaleLowerCase('en')
      .replace(/[^a-z0-9 ]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  return ` ${normalize(transcript)} `.includes(` ${normalize(target)} `);
}
/** Stars allow ordinary variation: 20%, 50%, and 80% of the goal near the guide. */
export function practiceStars(round: Round, module: Module, level: number) {
  const fraction =
    module === 'rhythm'
      ? round.progress
      : round.matched / levels[level].seconds;
  return [0.2, 0.5, 0.8].filter((threshold) => fraction >= threshold).length;
}

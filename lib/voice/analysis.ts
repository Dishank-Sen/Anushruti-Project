/** Device-relative signal analysis. dBFS is NOT a calibrated sound-pressure level. */
export type VoiceSample = {
  db: number;
  hz: number | null;
  confidence: number;
  clipped: boolean;
};
export type Exercise = 'steady' | 'hill' | 'words';
export const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));
export function decibels(samples: Float32Array): number {
  if (!samples.length) return -90;
  let sum = 0;
  for (const value of samples) sum += value * value;
  return clamp(
    20 * Math.log10(Math.max(Math.sqrt(sum / samples.length), 0.000001)),
    -90,
    0,
  );
}
/** YIN cumulative mean normalized difference; uncertain/unvoiced frames return null. */
export function analyseVoice(
  input: Float32Array,
  sampleRate: number,
): VoiceSample {
  const db = decibels(input);
  const clipped = input.some((value) => Math.abs(value) >= 0.98);
  const empty = { db, hz: null, confidence: 0, clipped };
  if (db < -70 || input.length < 1024 || sampleRate < 8000) return empty;
  const stride = sampleRate >= 32000 ? 2 : 1;
  const size = Math.floor(input.length / stride);
  const rate = sampleRate / stride;
  const minLag = Math.floor(rate / 1000);
  const maxLag = Math.min(Math.ceil(rate / 60), Math.floor(size / 2) - 1);
  const count = size - maxLag;
  const difference = new Float32Array(maxLag + 1);
  let running = 0;
  for (let lag = 1; lag <= maxLag; lag++) {
    let sum = 0;
    for (let i = 0; i < count; i++) {
      const delta = input[i * stride] - input[(i + lag) * stride];
      sum += delta * delta;
    }
    running += sum;
    difference[lag] = running > 0 ? (sum * lag) / running : 1;
  }
  for (let lag = minLag; lag < maxLag - 1; lag++) {
    if (difference[lag] >= 0.15) continue;
    while (lag + 1 < maxLag && difference[lag + 1] < difference[lag]) lag++;
    const left = difference[lag - 1];
    const middle = difference[lag];
    const right = difference[lag + 1];
    const denominator = 2 * (2 * middle - right - left);
    const refined = lag + (denominator ? (right - left) / denominator : 0);
    const hz = rate / refined;
    return hz >= 60 && hz <= 1000
      ? { db, hz, confidence: 1 - middle, clipped }
      : empty;
  }
  return empty;
}
export const semitones = (hz: number, base: number) =>
  12 * Math.log2(hz / base);
export const targetAt = (exercise: Exercise, seconds: number) =>
  exercise === 'hill' ? 3 * Math.sin(Math.PI * clamp(seconds / 5, 0, 1)) : 0;
export function levelZone(
  db: number,
  centre: number,
): 'quiet' | 'comfortable' | 'strong' {
  return db < centre - 6 ? 'quiet' : db > centre + 6 ? 'strong' : 'comfortable';
}
export function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  return sorted.length ? sorted[Math.floor(sorted.length / 2)] : 0;
}
export function calibrate(
  samples: VoiceSample[],
): { db: number; hz: number } | null {
  const voiced = samples.filter(
    (s) =>
      s.hz !== null &&
      s.confidence >= 0.85 &&
      !s.clipped &&
      s.db > -65 &&
      s.db < -8,
  );
  if (voiced.length < 12) return null;
  const hz = median(voiced.map((s) => s.hz!));
  // Reject inconsistent/noisy references instead of teaching against a random target.
  if (median(voiced.map((s) => Math.abs(semitones(s.hz!, hz)))) > 2)
    return null;
  return { hz, db: median(voiced.map((s) => s.db)) };
}
export const practiceWords = [
  {
    word: 'Mmm',
    symbol: '〰',
    cue: 'Try a small, comfortable hum.',
    tip: 'Let the line settle. Take a breath whenever you need.',
  },
  {
    word: 'Hello',
    symbol: '👋',
    cue: 'Say “hello” in your own voice.',
    tip: 'Watch how your voice moves across the two parts: hel · lo.',
  },
  {
    word: 'Moon',
    symbol: '🌙',
    cue: 'Try “moon” gently.',
    tip: 'Notice the shape of your voice. No need to stretch the sound.',
  },
  {
    word: 'Mama',
    symbol: '🌼',
    cue: 'Try two little parts: ma · ma.',
    tip: 'Let your voice rest between the two parts.',
  },
] as const;

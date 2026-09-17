/** Bounded in-memory utterances; silence is never submitted to recognition. */
export class UtteranceBuffer {
  private chunks: Float32Array[] = [];
  private lead: Float32Array[] = [];
  private duration = 0;
  private voiced = 0;
  private quiet = 0;
  reset() {
    this.chunks = [];
    this.lead = [];
    this.duration = 0;
    this.voiced = 0;
    this.quiet = 0;
  }
  push(
    chunk: Float32Array,
    rate: number,
    speech: boolean,
  ): Float32Array | null {
    const seconds = chunk.length / rate;
    if (!this.chunks.length && !speech) {
      this.lead.push(chunk);
      while (this.lead.reduce((n, c) => n + c.length, 0) > rate * 0.3)
        this.lead.shift();
      return null;
    }
    if (!this.chunks.length) {
      this.chunks = this.lead;
      this.lead = [];
    }
    this.chunks.push(chunk);
    this.duration += seconds;
    if (speech) {
      this.voiced += seconds;
      this.quiet = 0;
    } else this.quiet += seconds;
    if (this.quiet < 0.7 && this.duration < 6) return null;
    const valid = this.voiced >= 0.24;
    const joined = new Float32Array(
      this.chunks.reduce((n, c) => n + c.length, 0),
    );
    let offset = 0;
    for (const c of this.chunks) {
      joined.set(c, offset);
      offset += c.length;
    }
    this.reset();
    return valid ? resample16k(joined, rate) : null;
  }
}

/** Average source samples into 16 kHz bins (microphones usually deliver 44.1/48 kHz). */
export function resample16k(input: Float32Array, rate: number) {
  if (rate === 16000) return input;
  const output = new Float32Array(Math.floor((input.length * 16000) / rate));
  for (let i = 0; i < output.length; i++) {
    const start = Math.floor((i * rate) / 16000);
    const end = Math.max(start + 1, Math.floor(((i + 1) * rate) / 16000));
    let sum = 0;
    for (let j = start; j < Math.min(end, input.length); j++) sum += input[j];
    output[i] = sum / (Math.min(end, input.length) - start);
  }
  return output;
}

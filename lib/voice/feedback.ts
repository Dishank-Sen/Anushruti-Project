import { clamp } from './analysis.ts';

/** Stable cues: require a sustained change, then leave time to read it. */
export class CueLatch {
  private current = '';
  private candidate = '';
  private since = 0;
  private changed = -Infinity;
  update(value: string, time: number, immediate = false) {
    if (value !== this.candidate) {
      this.candidate = value;
      this.since = time;
    }
    if (
      !this.current ||
      immediate ||
      (time - this.since >= 400 && time - this.changed >= 900)
    ) {
      if (this.current !== value) this.changed = time;
      this.current = value;
    }
    return this.current;
  }
}

export class LevelSmoother {
  private value = -90;
  private time = 0;
  update(db: number, time: number) {
    const dt = this.time ? clamp(time - this.time, 0, 250) : 250;
    this.time = time;
    this.value += (db - this.value) * (1 - Math.exp(-dt / 180));
    return this.value;
  }
  reset() {
    this.value = -90;
    this.time = 0;
  }
}

/** A fixed, device-relative target occupies the same position at every width. */
export const meterPosition = (db: number, target: number) =>
  clamp(50 + (db - target) * (100 / 48), 0, 100);

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  analyseVoice,
  calibrate,
  decibels,
  levelZone,
  semitones,
  targetAt,
} from '../lib/voice/analysis.ts';
function tone(hz: number, rate = 48000, amplitude = 0.1, harmonic = false) {
  return Float32Array.from(
    { length: 4096 },
    (_, i) =>
      amplitude *
      (Math.sin((2 * Math.PI * hz * i) / rate) +
        (harmonic ? 0.3 * Math.sin((4 * Math.PI * hz * i) / rate) : 0)),
  );
}
void test('dBFS uses RMS and handles silence without infinity', () => {
  assert.equal(decibels(new Float32Array(4096)), -90);
  assert.equal(decibels(new Float32Array()), -90);
  assert.ok(Math.abs(decibels(tone(220)) - -23.01) < 0.15);
  assert.ok(
    Math.abs(decibels(tone(220, 48000, 0.2)) - decibels(tone(220)) - 6.02) <
      0.05,
  );
});
void test('pitch tracks multiple fundamentals and sample rates independently of volume', () => {
  for (const rate of [44100, 48000])
    for (const hz of [90, 160, 220, 320, 500, 650])
      for (const amplitude of [0.03, 0.25]) {
        const signal = analyseVoice(tone(hz, rate, amplitude, true), rate);
        assert.ok(signal.hz !== null, `${hz} Hz at ${rate} should be detected`);
        assert.ok(
          Math.abs(signal.hz - hz) < hz * 0.015,
          `${hz} estimated as ${signal.hz}`,
        );
        assert.ok(signal.confidence > 0.85);
      }
});
void test('silence, steady DC, and seeded noise are not rewarded as voiced pitch', () => {
  assert.equal(analyseVoice(new Float32Array(4096), 48000).hz, null);
  assert.equal(analyseVoice(new Float32Array(4096).fill(0.1), 48000).hz, null);
  let seed = 12345;
  const noise = Float32Array.from({ length: 4096 }, () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return (seed / 4294967296 - 0.5) * 0.1;
  });
  assert.equal(analyseVoice(noise, 48000).hz, null);
});
void test('clipping is reported and never accepted for reference calibration', () => {
  const clipped = analyseVoice(tone(220, 48000, 1), 48000);
  assert.equal(clipped.clipped, true);
  assert.equal(calibrate(Array(40).fill(clipped)), null);
});
void test('reference requires enough clear, consistent, comfortably recorded samples', () => {
  const sample = { db: -28, hz: 220, confidence: 0.99, clipped: false };
  assert.equal(calibrate(Array(11).fill(sample)), null);
  assert.deepEqual(calibrate(Array(20).fill(sample)), { db: -28, hz: 220 });
  assert.equal(calibrate(Array(20).fill({ ...sample, hz: null })), null);
  assert.equal(calibrate(Array(20).fill({ ...sample, db: -3 })), null);
});
void test('level colours are relative and pitch targets return gently to the reference', () => {
  assert.equal(levelZone(-40, -28), 'quiet');
  assert.equal(levelZone(-28, -28), 'comfortable');
  assert.equal(levelZone(-10, -28), 'strong');
  assert.equal(semitones(440, 220), 12);
  assert.equal(targetAt('steady', 2), 0);
  assert.equal(targetAt('hill', 2.5), 3);
  assert.ok(Math.abs(targetAt('hill', 5)) < 0.001);
  assert.equal(targetAt('words', 2), 0);
});

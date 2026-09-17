import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CueLatch,
  LevelSmoother,
  meterPosition,
} from '../lib/voice/feedback.ts';
import { UtteranceBuffer, resample16k } from '../lib/voice/utterance.ts';
import { NoiseGate } from '../lib/voice/practice.ts';
void test('rapid cue oscillation does not flicker; sustained guidance eventually updates', () => {
  const latch = new CueLatch();
  assert.equal(latch.update('on target', 0), 'on target');
  for (let t = 80; t < 1600; t += 80)
    assert.equal(
      latch.update(t % 160 ? 'softer' : 'on target', t),
      'on target',
    );
  latch.update('softer', 1600);
  assert.equal(latch.update('softer', 2100), 'softer');
  assert.equal(latch.update('paused', 2200, true), 'paused');
});
void test('meter positions are relative to each microphone and smoothing rejects a one-frame jump', () => {
  assert.equal(meterPosition(-42, -42), 50);
  assert.equal(meterPosition(-18, -18), 50);
  assert.equal(meterPosition(-48, -42), 37.5);
  assert.equal(meterPosition(-36, -42), 62.5);
  const s = new LevelSmoother();
  for (let t = 80; t < 2000; t += 80) s.update(-30, t);
  const jump = s.update(-10, 2000);
  assert.ok(jump < -20);
  assert.ok(jump > -30);
});
void test('loud unpitched noise and brief transients never open the voice gate', () => {
  const gate = new NoiseGate();
  gate.manual(-60, 6);
  for (let t = 0; t < 2000; t += 80)
    assert.equal(
      gate.update({ db: -20, hz: null, confidence: 0, clipped: false }, t)
        .speech,
      false,
    );
  assert.equal(
    gate.update({ db: -25, hz: 220, confidence: 0.99, clipped: false }, 2100)
      .speech,
    false,
  );
  assert.equal(
    gate.update({ db: -80, hz: null, confidence: 0, clipped: false }, 2180)
      .speech,
    false,
  );
});
void test('utterances preserve a short lead-in, wait for a pause, and bound continuous input', () => {
  const b = new UtteranceBuffer();
  const chunk = new Float32Array(1600).fill(0.1);
  for (let i = 0; i < 100; i++) assert.equal(b.push(chunk, 16000, false), null);
  for (let i = 0; i < 5; i++) assert.equal(b.push(chunk, 16000, true), null);
  let result: Float32Array | null = null;
  for (let i = 0; i < 8 && !result; i++) result = b.push(chunk, 16000, false);
  assert.ok(result);
  assert.ok(result.length < 16000 * 2);
  let continuous: Float32Array | null = null;
  for (let i = 0; i < 65 && !continuous; i++)
    continuous = b.push(chunk, 16000, true);
  assert.ok(continuous);
  assert.ok(continuous.length <= 16000 * 6.2);
  b.reset();
  assert.equal(b.push(chunk, 16000, false), null);
});
void test('very short noises produce no transcript input and resampling preserves duration', () => {
  const b = new UtteranceBuffer();
  const chunk = new Float32Array(1600);
  b.push(chunk, 16000, true);
  for (let i = 0; i < 10; i++) assert.equal(b.push(chunk, 16000, false), null);
  const output = resample16k(new Float32Array(48000).fill(0.25), 48000);
  assert.equal(output.length, 16000);
  assert.ok(output.every((x) => Math.abs(x - 0.25) < 0.001));
});

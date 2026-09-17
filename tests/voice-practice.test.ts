import test from 'node:test';
import assert from 'node:assert/strict';
import {
  NoiseGate,
  advanceRound,
  freshRound,
  practiceStars,
  wordMatches,
  type VoiceFrame,
} from '../lib/voice/practice.ts';
const voice = { db: -30, hz: 220, confidence: 0.99, clipped: false };
const signal: VoiceFrame = {
  ...voice,
  speech: true,
  held: false,
  noiseDb: -65,
  snr: 35,
  learningNoise: false,
};
void test('room calibration rejects a steady periodic fan after learning it', () => {
  const gate = new NoiseGate();
  gate.reset(0);
  for (let time = 0; time <= 2240; time += 80)
    gate.update({ ...voice, db: -45, hz: 110 }, time);
  const fan = gate.update({ ...voice, db: -44, hz: 110 }, 2320);
  assert.equal(fan.speech, false);
  assert.equal(fan.hz, null);
  gate.update({ ...voice, db: -30, hz: 220 }, 2400);
  const speaking = gate.update({ ...voice, db: -30, hz: 220 }, 2560);
  assert.equal(speaking.speech, true);
  assert.ok(speaking.hz);
});
void test('manual margin recovers quieter speech without admitting baseline noise', () => {
  const gate = new NoiseGate();
  gate.manual(-55, 6);
  assert.equal(gate.update({ ...voice, db: -51 }, 1000).speech, false);
  gate.manual(-55, 3);
  gate.update({ ...voice, db: -51 }, 1100);
  assert.equal(gate.update({ ...voice, db: -51 }, 1260).speech, true);
  assert.equal(gate.update({ ...voice, db: -55 }, 1340).speech, false);
});
void test('brief gap can hold the display but never invents voiced pitch or advances practice', () => {
  const gate = new NoiseGate();
  gate.manual(-65, 6);
  gate.update(voice, 1000);
  gate.update(voice, 1160);
  const gap = gate.update({ ...voice, db: -70, hz: null }, 1240);
  assert.equal(gap.held, true);
  assert.equal(gap.speech, false);
  assert.equal(gap.hz, null);
  const initial = freshRound();
  assert.deepEqual(
    advanceRound(initial, gap, 0.08, 'steady', 0, voice),
    initial,
  );
});
void test('silence never consumes the active voice budget; matched sound does', () => {
  let round = freshRound();
  for (let i = 0; i < 40; i++)
    round = advanceRound(
      round,
      { ...signal, speech: false, hz: null },
      0.1,
      'steady',
      0,
      voice,
    );
  assert.equal(round.progress, 0);
  for (let i = 0; i < 31; i++)
    round = advanceRound(round, signal, 0.1, 'steady', 0, voice);
  assert.equal(round.done, true);
  assert.ok(round.matched >= 3);
});
void test('pitch exercises wait for pitch; word exercises never reward energy alone', () => {
  const consonant = { ...signal, hz: null };
  assert.equal(
    advanceRound(freshRound(), consonant, 0.1, 'steady', 0, voice).progress,
    0,
  );
  assert.equal(
    advanceRound(freshRound(), consonant, 0.1, 'words', 0, voice).progress,
    0,
  );
});
void test('speak-and-pause requires alternating voice and rests, not just silence', () => {
  let r = freshRound();
  for (let i = 0; i < 100; i++)
    r = advanceRound(r, { ...signal, speech: false }, 0.1, 'rhythm', 0, voice);
  assert.equal(r.bursts, 0);
  for (let cycle = 0; cycle < 2; cycle++) {
    for (let i = 0; i < 5; i++)
      r = advanceRound(r, signal, 0.1, 'rhythm', 0, voice);
    for (let i = 0; i < 7; i++)
      r = advanceRound(
        r,
        { ...signal, speech: false },
        0.1,
        'rhythm',
        0,
        voice,
      );
  }
  assert.equal(r.bursts, 2);
  assert.equal(r.done, true);
});
void test('word matching uses complete normalized words, never partial substrings', () => {
  assert.equal(wordMatches('Hello, good morning!', 'good morning'), true);
  assert.equal(wordMatches('sunny', 'sun'), false);
  assert.equal(wordMatches('', 'moon'), false);
});
void test('stars reward partial success without requiring a perfect round', () => {
  const round = { ...freshRound(), matched: 2.5, progress: 1 };
  assert.equal(practiceStars(round, 'steady', 0), 3);
  assert.equal(practiceStars({ ...round, matched: 1.5 }, 'steady', 0), 2);
  assert.equal(practiceStars({ ...round, matched: 0 }, 'steady', 0), 0);
  assert.equal(practiceStars({ ...round, progress: 0.5 }, 'rhythm', 0), 2);
});
void test('clipped input cannot count as a rhythm rest or earn practice credit', () => {
  const waiting = { ...freshRound(), expectRest: true, rest: 0.6 };
  const clipped = { ...signal, clipped: true, speech: false, hz: null };
  assert.deepEqual(
    advanceRound(waiting, clipped, 0.1, 'rhythm', 0, voice),
    waiting,
  );
  assert.deepEqual(
    advanceRound(freshRound(), clipped, 0.1, 'words', 0, voice),
    freshRound(),
  );
});

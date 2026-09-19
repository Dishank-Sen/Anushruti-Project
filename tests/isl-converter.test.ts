import test from 'node:test';
import assert from 'node:assert/strict';
import {
  convertSentenceToISL,
  ISL_CORE_LEXICON,
  ISL_MANUAL_ALPHABET,
} from '../lib/isl-converter.ts';

void test('ISL core lexicon contains authentic foundational signs', () => {
  const keys = Object.keys(ISL_CORE_LEXICON);
  assert.ok(keys.length >= 15, 'Should have at least 15 core foundational signs');
  for (const key of keys) {
    const item = ISL_CORE_LEXICON[key];
    assert.ok(item.handshape.length > 0);
    assert.ok(item.movement.length > 0);
    assert.ok(item.location.length > 0);
  }
});

void test('ISL manual alphabet covers all 26 letters with authentic two-handed descriptions', () => {
  for (let i = 65; i <= 90; i++) {
    const char = String.fromCharCode(i);
    assert.ok(ISL_MANUAL_ALPHABET[char], `Missing alphabet entry for ${char}`);
    assert.ok(ISL_MANUAL_ALPHABET[char].handshape.length > 0);
    assert.ok(ISL_MANUAL_ALPHABET[char].movement.length > 0);
  }
});

void test('convertSentenceToISL filters stop words and maps recognized words to lexical signs', () => {
  const tokens = convertSentenceToISL('The cat is inside the school');
  // 'The', 'is' should be filtered out
  const words = tokens.map((t) => t.displayWord);
  assert.ok(!words.includes('THE'), 'Should filter out "THE"');
  assert.ok(!words.includes('IS'), 'Should filter out "IS"');
  assert.ok(words.includes('CAT'), 'Should retain "CAT"');
  assert.ok(words.includes('INSIDE'), 'Should retain "INSIDE"');
  assert.ok(words.includes('SCHOOL'), 'Should retain "SCHOOL"');

  const catToken = tokens.find((t) => t.displayWord === 'CAT');
  assert.equal(catToken?.isFingerspelled, false);
  assert.ok(catToken?.handshape.includes('whiskers') || catToken?.movement.includes('whiskers'));
});

void test('convertSentenceToISL gracefully falls back to two-handed fingerspelling for unknown words', () => {
  const tokens = convertSentenceToISL('Rohan');
  assert.equal(tokens.length, 1);
  const rohan = tokens[0];
  assert.equal(rohan.displayWord, 'ROHAN');
  assert.equal(rohan.isFingerspelled, true);
  assert.equal(rohan.letterSequence?.length, 5);
  assert.deepEqual(
    rohan.letterSequence?.map((l) => l.letter),
    ['R', 'O', 'H', 'A', 'N']
  );
});

void test('empty or whitespace input returns empty array without throwing', () => {
  assert.deepEqual(convertSentenceToISL(''), []);
  assert.deepEqual(convertSentenceToISL('   '), []);
});

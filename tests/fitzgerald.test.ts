import test from 'node:test';
import assert from 'node:assert/strict';
import { categorizeWord, parseFitzgerald } from '../lib/fitzgerald.ts';

void test('categorizeWord correctly identifies core parts of speech in deaf education standard', () => {
  assert.equal(categorizeWord('Cat').category, 'subject');
  assert.equal(categorizeWord('Count').category, 'verb');
  assert.equal(categorizeWord('Apple').category, 'object');
  assert.equal(categorizeWord('Under').category, 'place');
  assert.equal(categorizeWord('Morning').category, 'time');
  assert.equal(categorizeWord('Three').category, 'modifier');
  assert.equal(categorizeWord('xyz123').category, 'default');
});

void test('parseFitzgerald breaks sentence into color-coded tokens', () => {
  const tokens = parseFitzgerald('Cat counts three apples on table');
  assert.equal(tokens.length, 6);
  assert.equal(tokens[0].category, 'subject'); // Cat
  assert.equal(tokens[1].category, 'verb');    // counts
  assert.equal(tokens[2].category, 'modifier');// three
  assert.equal(tokens[3].category, 'object');  // apples
  assert.equal(tokens[4].category, 'place');   // on
  assert.equal(tokens[5].category, 'place');   // table
});

void test('parseFitzgerald handles punctuation and empty strings gracefully', () => {
  assert.deepEqual(parseFitzgerald(''), []);
  const tokens = parseFitzgerald('Look! An apple.');
  assert.ok(tokens.length >= 2);
});

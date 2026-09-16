import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { lessons, scienceImages, butterflyStages } from '../lib/lessons.ts';
void test('discovery labs belong only to Class 1 Science and retain unique lesson IDs', () => {
  const labs = lessons.filter((l) => l.science);
  assert.equal(labs.length, 4);
  assert.ok(labs.every((l) => l.grade === 1 && l.subject === 'Science'));
  assert.equal(new Set(lessons.map((l) => l.id)).size, lessons.length);
  assert.deepEqual(
    new Set(labs.map((l) => l.science?.activity)),
    new Set(['grow', 'cycle', 'space', 'day']),
  );
  for (let grade = 2; grade <= 5; grade++)
    assert.equal(lessons.filter((l) => l.grade === grade).length, 2);
});
void test('every discovery photograph is locally available with source, credit and descriptive alt', () => {
  for (const image of Object.values(scienceImages)) {
    assert.ok(existsSync(new URL('../public' + image.src, import.meta.url)));
    assert.ok(image.alt.length > 20);
    assert.match(image.source, /^https:\/\/commons.wikimedia.org\/wiki\/File:/);
    assert.match(image.credit, /CC0|Public domain/);
  }
  assert.deepEqual(
    butterflyStages.map((s) => s.label),
    ['Egg', 'Caterpillar', 'Chrysalis', 'Butterfly'],
  );
});

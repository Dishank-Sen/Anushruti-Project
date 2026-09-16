import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { lessons, scienceImages, butterflyStages } from '../lib/lessons.ts';
void test('discovery labs belong only to Class 1 Science and retain unique lesson IDs', () => {
  const labs = lessons.filter((l) => l.science);
  assert.equal(labs.length, 28);
  assert.ok(labs.every((l) => l.grade === 1 && l.subject === 'Science'));
  assert.equal(new Set(lessons.map((l) => l.id)).size, lessons.length);
  assert.deepEqual(
    new Set(labs.map((l) => l.science?.activity)),
    new Set([
      'grow',
      'cycle',
      'space',
      'day',
      'food',
      'living',
      'body',
      'weather',
      'guided',
      'match',
    ]),
  );
  for (let grade = 2; grade <= 5; grade++)
    assert.equal(lessons.filter((l) => l.grade === grade).length, 2);
});
void test('every discovery image is locally available with source, credit and descriptive alt', () => {
  for (const image of Object.values(scienceImages)) {
    assert.ok(existsSync(new URL('../public' + image.src, import.meta.url)));
    assert.ok(image.alt.length > 20);
    assert.ok(
      image.source.startsWith('https://commons.wikimedia.org/wiki/File:') ||
        image.source === '/images/science/body.svg',
    );
    assert.match(image.credit, /CC0|Public domain|CC BY/);
  }
  assert.deepEqual(
    butterflyStages.map((s) => s.label),
    ['Egg', 'Caterpillar', 'Chrysalis', 'Butterfly'],
  );
});

void test('NCERT path has valid original activities and separate enrichment content', () => {
  const core = lessons.filter((l) => l.curriculum);
  assert.equal(core.length, 20);
  assert.equal(lessons.filter((l) => l.science && !l.curriculum).length, 8);
  for (const l of core) {
    assert.equal(l.grade, 1);
    assert.equal(l.subject, 'Science');
    assert.ok(['guided', 'match'].includes(l.science!.activity));
    assert.ok(l.curriculum!.page >= 51 && l.curriculum!.page <= 59);
    if (l.science?.activity === 'match') {
      assert.ok(l.matching && l.matching.cards.length >= 3);
      const data = l.matching!;
      assert.equal(
        new Set(data.cards.map((c) => c.id)).size,
        data.cards.length,
      );
      assert.equal(new Set(data.bins.map((b) => b.id)).size, data.bins.length);
      for (const card of data.cards) {
        assert.ok(data.bins.some((b) => b.id === card.bin));
        assert.ok(card.explanation.length > 20);
      }
      continue;
    }
    assert.equal(l.guided?.length, 3);
    for (const r of l.guided!) {
      assert.ok(r.answer >= 0 && r.answer < r.options.length);
      assert.equal(new Set(r.options).size, r.options.length);
      assert.ok(r.explanation.length > 20);
    }
  }
});
void test('every Class 1 science cover is distinctive, with no repeated image source', () => {
  const covers = lessons
    .filter((l) => l.science && l.grade === 1)
    .map((l) => scienceImages[l.science!.image]);
  assert.equal(new Set(covers.map((c) => c.src)).size, covers.length);
  assert.equal(new Set(covers.map((c) => c.source)).size, covers.length);
  for (const c of covers)
    if ('licenseUrl' in c)
      assert.match(c.licenseUrl, /^https:\/\/creativecommons.org\//);
});

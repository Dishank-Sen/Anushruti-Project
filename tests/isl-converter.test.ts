import test from 'node:test';
import assert from 'node:assert/strict';
import { convertSentenceToISL } from '../lib/isl-converter.ts';
import {
  findOfficialSign,
  OFFICIAL_SIGNS,
  ISL_CHARTS,
} from '../lib/isl-sources.ts';
import { lessons } from '../lib/lessons.ts';

void test('dictionary lookup retains English words without claiming an ISL translation', () => {
  const tokens = convertSentenceToISL('The cat is inside the school');
  assert.deepEqual(
    tokens.map((t) => t.displayWord),
    ['THE', 'CAT', 'IS', 'INSIDE', 'THE', 'SCHOOL'],
  );
  assert.equal(tokens.find((t) => t.displayWord === 'CAT')?.available, true);
  assert.equal(convertSentenceToISL('Rohan')[0].available, false);
  assert.deepEqual(convertSentenceToISL('  '), []);
  assert.equal(convertSentenceToISL('water '.repeat(100)).length, 40);
});

void test('numbers reference numeric dictionary files, never alphabet hand shapes', () => {
  assert.equal(findOfficialSign('two')?.filename, '2_Two.mp4');
  assert.equal(findOfficialSign('2'), findOfficialSign('TWO'));
  assert.equal(findOfficialSign('ROHAN'), undefined);
  for (const sign of Object.values(OFFICIAL_SIGNS)) {
    assert.match(sign.fileId, /^[\w-]{20,}$/);
    assert.ok(sign.filename.endsWith('.mp4'));
  }
  for (const chart of Object.values(ISL_CHARTS)) {
    assert.equal(new URL(chart.url).hostname, 'cdnbbsr.s3waas.gov.in');
    assert.ok(chart.url.endsWith('.pdf'));
  }
});

void test('every science module links only curated official dictionary terms', () => {
  for (const lesson of lessons.filter((l) => l.subject === 'Science')) {
    assert.ok(lesson.islTerms?.length, `${lesson.id} needs ISL references`);
    for (const term of lesson.islTerms!) {
      assert.ok(
        findOfficialSign(term),
        `${lesson.id}: no official reference for ${term}`,
      );
    }
  }
});

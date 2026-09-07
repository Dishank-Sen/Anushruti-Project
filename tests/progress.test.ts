import test from 'node:test';
import assert from 'node:assert/strict';
import { lessons } from '../lib/lessons.ts';
import {
  parseProgress,
  emptyProgress,
  completeLesson,
} from '../lib/progress.ts';
void test('broken or old storage opens a clean garden', () => {
  for (const raw of [null, '{oops', 'null', '{"version":0}', '[]'])
    assert.deepEqual(parseProgress(raw), emptyProgress());
});
void test('untrusted storage is restricted to known lessons and valid step positions', () => {
  const p = parseProgress(
    JSON.stringify({
      version: 1,
      completed: ['count-to-five', 'count-to-five', 'unknown', 42],
      steps: { 'count-to-five': 99, 'plant-needs': 1, unknown: 1 },
      answers: { 'plant-needs': true, 'count-to-five': 'yes', unknown: true },
    }),
  );
  assert.deepEqual(p.completed, ['count-to-five']);
  assert.deepEqual(p.steps, { 'plant-needs': 1 });
  assert.deepEqual(p.answers, { 'plant-needs': true });
});
void test('completion is idempotent and rejects unknown lesson IDs', () => {
  const once = completeLesson(emptyProgress(), 'count-to-five');
  const twice = completeLesson(once, 'count-to-five');
  assert.equal(twice.completed.length, 1);
  assert.equal(completeLesson(twice, 'unknown'), twice);
  assert.deepEqual(parseProgress(JSON.stringify(twice)), twice);
});
void test('every class has both subjects with usable steps and answer keys', () => {
  assert.equal(new Set(lessons.map((l) => l.id)).size, lessons.length);
  for (let grade = 1; grade <= 5; grade++)
    for (const subject of ['Maths', 'Science'])
      assert.ok(
        lessons.some((l) => l.grade === grade && l.subject === subject),
      );
  for (const l of lessons) {
    assert.ok(l.steps.length >= 2);
    for (const s of l.steps) {
      assert.ok(s.visual.trim());
      assert.ok(s.text.trim());
      assert.ok(s.title.trim());
    }
    assert.ok(l.question.options.length >= 2);
    assert.ok(
      l.question.answer >= 0 && l.question.answer < l.question.options.length,
    );
    assert.ok(l.question.hint.trim());
  }
});

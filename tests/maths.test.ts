import test from 'node:test';
import assert from 'node:assert/strict';
import { ALL_MATHS_CHAPTERS, getAllMathsLessons } from '../lib/maths/index.ts';

void test('all 13 NCERT Class 1 Maths chapters exist in correct sequence', () => {
  assert.equal(ALL_MATHS_CHAPTERS.length, 13);
  ALL_MATHS_CHAPTERS.forEach((chapter, index) => {
    assert.equal(chapter.number, index + 1);
    assert.ok(chapter.id.startsWith('maths-c'));
    assert.ok(chapter.title.length > 0);
    assert.ok(chapter.blurb.length > 0);
    assert.ok(chapter.icon.length > 0);
    assert.ok(chapter.themeColor.startsWith('#'));
    assert.ok(chapter.lessons.length >= 2, `Chapter ${chapter.number} must have at least 2 lessons`);
  });
});

void test('every lesson caption is 12 words or fewer for young deaf learners', () => {
  const lessons = getAllMathsLessons();
  assert.ok(lessons.length >= 26);

  for (const lesson of lessons) {
    assert.ok(lesson.steps.length >= 2, `Lesson ${lesson.id} needs at least 2 steps`);
    for (const step of lesson.steps) {
      assert.ok(step.visual.trim().length > 0, `Step visual in ${lesson.id} must not be empty`);
      const wordCount = step.text.trim().split(/\s+/).filter(Boolean).length;
      assert.ok(
        wordCount <= 12,
        `Step text in ${lesson.id} exceeds 12 words (${wordCount} words): "${step.text}"`,
      );
    }
  }
});

void test('every question has valid options, 0-indexed answer, and hint ladder', () => {
  const lessons = getAllMathsLessons();
  for (const lesson of lessons) {
    const q = lesson.question;
    assert.ok(q.prompt.trim().length > 0);
    assert.ok(q.options.length >= 2);
    assert.ok(q.answer >= 0 && q.answer < q.options.length);
    assert.ok(q.hint.trim().length > 0);
    if (q.hintLadder) {
      assert.ok(q.hintLadder.hint1.trim().length > 0);
      assert.ok(q.hintLadder.hint2.trim().length > 0);
      assert.ok(q.hintLadder.hint3WorkedOut.trim().length > 0);
    }
  }
});

void test('ISL vocabulary is populated with authentic handshape & movement descriptions', () => {
  for (const chapter of ALL_MATHS_CHAPTERS) {
    assert.ok(chapter.islVocab.length >= 2, `Chapter ${chapter.id} should have ISL vocabulary`);
    for (const item of chapter.islVocab) {
      assert.ok(item.word.length > 0);
      assert.ok(item.handShape.length > 0);
      assert.ok(item.movement.length > 0);
      assert.ok(item.description.length > 0);
    }
  }
});

void test('zero audio elements or sound dependencies in maths chapter definitions', () => {
  const serialized = JSON.stringify(ALL_MATHS_CHAPTERS);
  assert.ok(!serialized.includes('<audio'));
  assert.ok(!serialized.includes('.mp3'));
  assert.ok(!serialized.includes('.wav'));
  assert.ok(!serialized.includes('soundEffect'));
});

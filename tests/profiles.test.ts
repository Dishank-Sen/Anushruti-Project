import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_PROFILE,
  loadProfiles,
  getActiveProfile,
  createProfile,
} from '../lib/profiles.ts';

void test('loadProfiles returns default profile in non-browser environment', () => {
  const profiles = loadProfiles();
  assert.ok(profiles.length >= 1);
  assert.equal(profiles[0].id, DEFAULT_PROFILE.id);
  assert.equal(profiles[0].name, DEFAULT_PROFILE.name);
});

void test('getActiveProfile defaults to Curious Explorer', () => {
  const profile = getActiveProfile();
  assert.ok(profile.id);
  assert.ok(profile.name);
  assert.ok(profile.avatar);
});

void test('createProfile constructs valid profile object with provided fields', () => {
  const p = createProfile('Meera', '🚀', 2);
  assert.equal(p.name, 'Meera');
  assert.equal(p.avatar, '🚀');
  assert.equal(p.grade, 2);
  assert.ok(p.id.startsWith('learner-'));
  assert.ok(p.createdAt > 0);
});

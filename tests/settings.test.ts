import test from 'node:test';
import assert from 'node:assert/strict';
import {
  defaultSettings,
  saveSettings,
  loadSettings,
} from '../lib/settings.ts';

void test('theme still updates when device storage is unavailable', (t) => {
  const names = ['window', 'document', 'localStorage'] as const;
  const previous = names.map((name) =>
    Object.getOwnPropertyDescriptor(globalThis, name),
  );
  t.after(() =>
    names.forEach((name, i) => {
      if (previous[i]) Object.defineProperty(globalThis, name, previous[i]!);
      else Reflect.deleteProperty(globalThis, name);
    }),
  );
  const attributes = new Map<string, string>();
  const classes = new Set<string>();
  const style = { colorScheme: '' };
  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: {},
  });
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: {
      getItem: () => {
        throw new Error('Storage blocked');
      },
      setItem: () => {
        throw new Error('Storage blocked');
      },
    },
  });
  Object.defineProperty(globalThis, 'document', {
    configurable: true,
    value: {
      documentElement: {
        setAttribute: (name: string, value: string) =>
          attributes.set(name, value),
        removeAttribute: (name: string) => attributes.delete(name),
        classList: {
          add: (name: string) => classes.add(name),
          remove: (name: string) => classes.delete(name),
        },
        style,
      },
    },
  });
  assert.deepEqual(loadSettings(), defaultSettings);
  saveSettings({ ...defaultSettings, theme: 'dark', islEnabled: false });
  assert.ok(classes.has('dark'));
  assert.equal(style.colorScheme, 'dark');
  assert.equal(attributes.get('data-isl-enabled'), 'false');
  saveSettings({ ...defaultSettings, theme: 'high-contrast' });
  assert.ok(!classes.has('dark'));
  assert.equal(style.colorScheme, 'light');
  assert.equal(attributes.get('data-theme'), 'high-contrast');
  saveSettings(defaultSettings);
  assert.equal(attributes.has('data-theme'), false);
});

'use client';

import React from 'react';
import {
  X,
  Type,
  SunMedium,
  Sparkles,
  Hand,
  Smartphone,
  GraduationCap,
  RotateCcw,
  Check,
} from 'lucide-react';
import {
  type AppSettings,
  type TextSize,
  type ThemeMode,
  saveSettings,
} from '@/lib/settings';

interface SettingsSheetProps {
  open: boolean;
  onClose: () => void;
  settings: AppSettings;
  onSettingsChange: (settings: AppSettings) => void;
  onResetProgress?: () => void;
}

export function SettingsSheet({
  open,
  onClose,
  settings,
  onSettingsChange,
  onResetProgress,
}: SettingsSheetProps) {
  if (!open) return null;

  function update<K extends keyof AppSettings>(key: K, value: AppSettings[K]) {
    const next = { ...settings, [key]: value };
    onSettingsChange(next);
    saveSettings(next);
  }

  return (
    <dialog
      open
      className="fixed inset-0 z-[100] m-0 h-full w-full max-h-none max-w-none border-none flex items-center justify-end bg-black/40 backdrop-blur-xs p-0 sm:p-4"
      aria-labelledby="settings-heading"
    >
      <div className="h-full sm:h-auto sm:max-h-[92vh] w-full max-w-md bg-[var(--surface)] text-[var(--ink)] border-l-2 sm:border-2 border-[var(--line)] sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b-2 border-[var(--line)] bg-[var(--bg)]">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-[var(--maths-tint)] text-[var(--maths)]">
              <SunMedium size={22} />
            </span>
            <h2 id="settings-heading" className="text-xl font-bold font-heading m-0">
              Learning Settings
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[var(--line)] text-[var(--ink-soft)] transition"
            aria-label="Close settings"
          >
            <X size={20} />
          </button>
        </div>

        {/* Settings Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Text Size */}
          <div>
            <div className="text-sm font-bold uppercase tracking-wider text-[var(--ink-soft)] mb-3 flex items-center gap-2">
              <Type size={16} /> Text Size
            </div>
            <div className="grid grid-cols-3 gap-3">
              {([100, 125, 150] as TextSize[]).map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => update('textSize', size)}
                  className={`min-h-[56px] rounded-2xl font-bold flex flex-col items-center justify-center border-2 transition ${
                    settings.textSize === size
                      ? 'bg-[var(--maths)] text-white border-[var(--maths)] shadow-[0_4px_0_#1a328a]'
                      : 'bg-[var(--bg)] text-[var(--ink)] border-[var(--line)] hover:bg-[var(--surface)]'
                  }`}
                  aria-pressed={settings.textSize === size}
                >
                  <span style={{ fontSize: `${size * 0.12}rem` }}>Aa</span>
                  <span className="text-xs">{size}%</span>
                </button>
              ))}
            </div>
          </div>

          {/* Theme & Contrast */}
          <div>
            <div className="text-sm font-bold uppercase tracking-wider text-[var(--ink-soft)] mb-3 flex items-center gap-2">
              <SunMedium size={16} /> Contrast & Display
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'default' as ThemeMode, label: 'Warm Paper' },
                { id: 'high-contrast' as ThemeMode, label: 'High Contrast' },
                { id: 'dark' as ThemeMode, label: 'Night' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => update('theme', t.id)}
                  className={`min-h-[56px] px-2 rounded-2xl font-bold text-sm flex items-center justify-center text-center border-2 transition ${
                    settings.theme === t.id
                      ? 'bg-[var(--maths)] text-white border-[var(--maths)] shadow-[0_4px_0_#1a328a]'
                      : 'bg-[var(--bg)] text-[var(--ink)] border-[var(--line)] hover:bg-[var(--surface)]'
                  }`}
                  aria-pressed={settings.theme === t.id}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Reduce Motion */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-[var(--bg)] border-2 border-[var(--line)]">
            <div className="flex items-center gap-3">
              <Sparkles size={20} className="text-[var(--gold)]" />
              <div>
                <p className="font-bold text-sm m-0">Calm Motion</p>
                <p className="text-xs text-[var(--ink-soft)] m-0">Turn off extra visual bouncing</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => update('reduceMotion', !settings.reduceMotion)}
              className={`w-14 h-8 rounded-full transition-colors relative border-2 ${
                settings.reduceMotion
                  ? 'bg-[var(--ok)] border-[var(--ok)]'
                  : 'bg-[var(--line)] border-[#c8beaa]'
              }`}
              role="switch"
              aria-checked={settings.reduceMotion}
              aria-label="Calm motion switch"
            >
              <span
                className={`absolute top-0.5 w-6 h-6 rounded-full bg-white transition-transform ${
                  settings.reduceMotion ? 'left-7' : 'left-0.5'
                }`}
              />
            </button>
          </div>

          {/* ISL Picture-in-Picture */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-[var(--bg)] border-2 border-[var(--line)]">
            <div className="flex items-center gap-3">
              <Hand size={20} className="text-[var(--maths)]" />
              <div>
                <p className="font-bold text-sm m-0">Indian Sign Language Support</p>
                <p className="text-xs text-[var(--ink-soft)] m-0">Show ISL sign prompts for keywords</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => update('islEnabled', !settings.islEnabled)}
              className={`w-14 h-8 rounded-full transition-colors relative border-2 ${
                settings.islEnabled
                  ? 'bg-[var(--ok)] border-[var(--ok)]'
                  : 'bg-[var(--line)] border-[#c8beaa]'
              }`}
              role="switch"
              aria-checked={settings.islEnabled}
              aria-label="ISL support switch"
            >
              <span
                className={`absolute top-0.5 w-6 h-6 rounded-full bg-white transition-transform ${
                  settings.islEnabled ? 'left-7' : 'left-0.5'
                }`}
              />
            </button>
          </div>

          {/* Haptics */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-[var(--bg)] border-2 border-[var(--line)]">
            <div className="flex items-center gap-3">
              <Smartphone size={20} className="text-[var(--ink)]" />
              <div>
                <p className="font-bold text-sm m-0">Vibrate / Haptic Feel</p>
                <p className="text-xs text-[var(--ink-soft)] m-0">Gentle buzz on touch devices</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => update('haptics', !settings.haptics)}
              className={`w-14 h-8 rounded-full transition-colors relative border-2 ${
                settings.haptics
                  ? 'bg-[var(--ok)] border-[var(--ok)]'
                  : 'bg-[var(--line)] border-[#c8beaa]'
              }`}
              role="switch"
              aria-checked={settings.haptics}
              aria-label="Haptic feel switch"
            >
              <span
                className={`absolute top-0.5 w-6 h-6 rounded-full bg-white transition-transform ${
                  settings.haptics ? 'left-7' : 'left-0.5'
                }`}
              />
            </button>
          </div>

          {/* Adult / Educator Mode */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-[var(--bg)] border-2 border-[var(--line)]">
            <div className="flex items-center gap-3">
              <GraduationCap size={20} className="text-[var(--voice)]" />
              <div>
                <p className="font-bold text-sm m-0">Teacher &amp; Parent Notes</p>
                <p className="text-xs text-[var(--ink-soft)] m-0">Show curriculum guidelines</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => update('adultMode', !settings.adultMode)}
              className={`w-14 h-8 rounded-full transition-colors relative border-2 ${
                settings.adultMode
                  ? 'bg-[var(--ok)] border-[var(--ok)]'
                  : 'bg-[var(--line)] border-[#c8beaa]'
              }`}
              role="switch"
              aria-checked={settings.adultMode}
              aria-label="Teacher notes switch"
            >
              <span
                className={`absolute top-0.5 w-6 h-6 rounded-full bg-white transition-transform ${
                  settings.adultMode ? 'left-7' : 'left-0.5'
                }`}
              />
            </button>
          </div>

          {/* Reset progress */}
          {onResetProgress && (
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  if (confirm('Reset your saved progress on this device?')) {
                    onResetProgress();
                    onClose();
                  }
                }}
                className="w-full min-h-[56px] rounded-2xl font-bold flex items-center justify-center gap-2 border-2 border-[var(--retry)] text-[var(--retry)] hover:bg-[var(--retry-tint)] transition"
              >
                <RotateCcw size={18} /> Reset Learning Progress
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t-2 border-[var(--line)] bg-[var(--bg)] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="btn-tactile btn-tactile-maths w-full sm:w-auto"
          >
            <Check size={18} /> Done
          </button>
        </div>
      </div>
    </dialog>
  );
}

'use client';
/* oxlint-disable react/react-compiler, next/no-html-link-for-pages -- Full document demo navigation resets demo views */

import React, { useState, useEffect } from 'react';
import {
  Home,
  BookOpen,
  Sparkles,
  Trophy,
  Hand,
  Settings,
  Mic,
  Sprout,
  Users,
} from 'lucide-react';
import {
  type AppSettings,
  loadSettings,
  applySettingsToDOM,
} from '@/lib/settings';
import { SettingsSheet } from './SettingsSheet';

interface AppShellProps {
  view: string;
  grade: number;
  onGradeChange: (grade: number) => void;
  children: React.ReactNode;
  onResetProgress?: () => void;
}

const mainNavItems = [
  { view: 'garden', label: 'Home', icon: Home },
  { view: 'lessons', label: 'Learn', icon: BookOpen },
  { view: 'activities', label: 'Play', icon: Sparkles },
  { view: 'progress', label: 'Progress', icon: Trophy },
  { view: 'communication', label: 'Talk', icon: Hand },
];

export function AppShell({
  view,
  grade,
  onGradeChange,
  children,
  onResetProgress,
}: AppShellProps) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<AppSettings>(() => loadSettings());

  useEffect(() => {
    applySettingsToDOM(settings);
  }, [settings]);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[var(--bg)] text-[var(--ink)]">
      {/* Skip to learning accessibility anchor */}
      <a className="skip-link" href="#main">
        Skip to learning
      </a>

      {/* Desktop Left Rail Navigation (min-width: 1024px) */}
      <aside className="hidden lg:flex lg:flex-col lg:w-72 border-r-2 border-[var(--line)] bg-[var(--surface)] shrink-0 min-h-screen sticky top-0 h-screen z-30">
        {/* Brand Header */}
        <div className="p-6 border-b-2 border-[var(--line)]">
          <a href="/?view=garden" className="flex items-center gap-3 no-underline">
            <span className="p-2.5 rounded-2xl bg-[var(--maths-tint)] text-[var(--maths)] flex items-center justify-center">
              <Sprout size={28} />
            </span>
            <div>
              <span className="block text-2xl font-bold font-heading text-[var(--ink)] leading-none">
                Anushruti
              </span>
              <small className="text-xs text-[var(--ink-soft)] font-medium">
                Visual-first learning
              </small>
            </div>
          </a>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto" aria-label="Main Navigation">
          <p className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)]">
            My Learning Space
          </p>
          {mainNavItems.map(({ view: v, label, icon: Icon }) => {
            const isActive =
              view === v ||
              (view === 'lesson' && v === 'lessons') ||
              (view === 'activity' && v === 'activities');
            return (
              <a
                key={v}
                href={`/?view=${v}&grade=${grade}`}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold transition min-h-[56px] text-base no-underline ${
                  isActive
                    ? 'bg-[var(--maths-tint)] text-[var(--maths)] border-2 border-[var(--maths)] shadow-[0_2px_0_#1a328a]'
                    : 'text-[var(--ink)] hover:bg-[var(--bg)] border-2 border-transparent'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon size={22} className={isActive ? 'text-[var(--maths)]' : 'text-[var(--ink-soft)]'} />
                <span>{label}</span>
              </a>
            );
          })}

          <div className="pt-4 border-t-2 border-[var(--line)] mt-4">
            <p className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)]">
              More Tools
            </p>
            <a
              href={`/?view=voice&grade=${grade}`}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold transition min-h-[56px] text-base no-underline ${
                view === 'voice'
                  ? 'bg-[var(--voice-tint)] text-[var(--voice)] border-2 border-[var(--voice)]'
                  : 'text-[var(--ink)] hover:bg-[var(--bg)] border-2 border-transparent'
              }`}
            >
              <Mic size={22} className="text-[var(--voice)]" />
              <span>Voice Garden</span>
            </a>
            <a
              href={`/?view=team`}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold transition min-h-[56px] text-base no-underline ${
                view === 'team'
                  ? 'bg-[#f4ebd0] text-[#6d5117] border-2 border-[#6d5117]'
                  : 'text-[var(--ink)] hover:bg-[var(--bg)] border-2 border-transparent'
              }`}
            >
              <Users size={22} className="text-[var(--ink-soft)]" />
              <span>Team Workspace</span>
            </a>
          </div>
        </nav>

        {/* Desktop Rail Footer */}
        <div className="p-4 border-t-2 border-[var(--line)] bg-[var(--bg)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌻</span>
            <span className="text-xs font-bold text-[var(--ink)]">Curious Explorer</span>
          </div>
          <button
            type="button"
            onClick={() => setSettingsOpen(true)}
            className="w-12 h-12 rounded-2xl flex items-center justify-center border-2 border-[var(--line)] bg-[var(--surface)] text-[var(--ink-soft)] hover:text-[var(--ink)] transition"
            aria-label="Open settings"
          >
            <Settings size={20} />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 lg:pb-0">
        {/* Top Bar */}
        <header className="h-18 lg:h-20 border-b-2 border-[var(--line)] bg-[var(--surface)] px-4 sm:px-8 flex items-center justify-between sticky top-0 z-20 shadow-xs">
          <div className="flex items-center gap-3">
            <a href="/?view=garden" className="lg:hidden flex items-center gap-2 text-[var(--ink)] no-underline">
              <span className="p-2 rounded-xl bg-[var(--maths-tint)] text-[var(--maths)]">
                <Sprout size={20} />
              </span>
              <span className="font-bold font-heading text-lg">Anushruti</span>
            </a>
            <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--science-tint)] text-[var(--science)] text-xs font-bold">
              <Hand size={14} /> Sound-independent
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Grade Selector */}
            <label className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[var(--ink-soft)] bg-[var(--bg)] px-3 py-1.5 rounded-2xl border-2 border-[var(--line)]">
              <span>Level:</span>
              <select
                value={grade}
                onChange={(e) => onGradeChange(Number(e.target.value))}
                className="bg-transparent font-bold text-[var(--ink)] border-none outline-hidden cursor-pointer"
                aria-label="Choose class level"
              >
                {[1, 2, 3, 4, 5].map((g) => (
                  <option key={g} value={g}>
                    Class {g}
                  </option>
                ))}
              </select>
            </label>

            {/* Settings Trigger button */}
            <button
              type="button"
              onClick={() => setSettingsOpen(true)}
              className="min-w-[48px] min-h-[48px] p-2 rounded-2xl border-2 border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--bg)] text-[var(--ink)] flex items-center justify-center transition"
              aria-label="Open settings"
            >
              <Settings size={20} />
            </button>
          </div>
        </header>

        {/* Main View Container */}
        <main id="main" className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* Mobile/Tablet Bottom Navigation Bar */}
      <nav className="bottom-nav-bar" aria-label="Mobile Navigation">
        {mainNavItems.map(({ view: v, label, icon: Icon }) => {
          const isActive =
            view === v ||
            (view === 'lesson' && v === 'lessons') ||
            (view === 'activity' && v === 'activities');
          return (
            <a
              key={v}
              href={`/?view=${v}&grade=${grade}`}
              className={`bottom-nav-item ${isActive ? 'active' : ''}`}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon />
              <span>{label}</span>
            </a>
          );
        })}
      </nav>

      {/* Settings Modal */}
      <SettingsSheet
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        settings={settings}
        onSettingsChange={setSettings}
        onResetProgress={onResetProgress}
      />
    </div>
  );
}

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
  PanelLeftClose,
  PanelLeftOpen,
  Languages,
} from 'lucide-react';
import {
  type AppSettings,
  loadSettings,
  saveSettings,
  applySettingsToDOM,
} from '@/lib/settings';
import { getActiveProfile, type UserProfile } from '@/lib/profiles';
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
  { view: 'sign-studio', label: 'Sign Studio', icon: Languages },
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
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(
    () => Boolean(loadSettings().sidebarCollapsed)
  );
  const [profile, setProfile] = useState<UserProfile>(() => getActiveProfile());

  useEffect(() => {
    applySettingsToDOM(settings);
  }, [settings]);

  const toggleSidebar = () => {
    const next = !sidebarCollapsed;
    setSidebarCollapsed(next);
    const nextSettings = { ...settings, sidebarCollapsed: next };
    setSettings(nextSettings);
    saveSettings(nextSettings);
  };

  const handleSettingsClose = () => {
    setSettingsOpen(false);
    setProfile(getActiveProfile());
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[var(--bg)] text-[var(--ink)]">
      {/* Skip to learning accessibility anchor */}
      <a className="skip-link" href="#main">
        Skip to learning
      </a>

      {/* Desktop Left Rail Navigation (min-width: 1024px) */}
      <aside
        className={`hidden lg:flex lg:flex-col border-r-2 border-[var(--line)] bg-[var(--surface)] shrink-0 min-h-screen sticky top-0 h-screen z-30 transition-all duration-300 ${
          sidebarCollapsed ? 'lg:w-20' : 'lg:w-72'
        }`}
      >
        {/* Brand Header & Collapse Toggle */}
        <div className="p-4 sm:p-5 border-b-2 border-[var(--line)] flex items-center justify-between gap-2">
          <a
            href="/?view=garden"
            className={`flex items-center gap-3 no-underline ${
              sidebarCollapsed ? 'justify-center w-full' : ''
            }`}
          >
            <span className="p-2.5 rounded-2xl bg-[var(--maths-tint)] text-[var(--maths)] flex items-center justify-center shrink-0">
              <Sprout size={24} />
            </span>
            {!sidebarCollapsed && (
              <div>
                <span className="block text-xl font-bold font-heading text-[var(--ink)] leading-none">
                  Anushruti
                </span>
                <small className="text-xs text-[var(--ink-soft)] font-medium">
                  Visual-first learning
                </small>
              </div>
            )}
          </a>

          {!sidebarCollapsed && (
            <button
              type="button"
              onClick={toggleSidebar}
              className="p-2 rounded-xl text-[var(--ink-soft)] hover:text-[var(--ink)] hover:bg-[var(--bg)] transition border border-transparent hover:border-[var(--line)]"
              aria-label="Collapse sidebar"
              title="Collapse sidebar to icon mode"
            >
              <PanelLeftClose size={18} />
            </button>
          )}
        </div>

        {/* If collapsed, show an uncollapse button at top */}
        {sidebarCollapsed && (
          <div className="p-2 flex justify-center border-b border-[var(--line)]">
            <button
              type="button"
              onClick={toggleSidebar}
              className="p-2 rounded-xl text-[var(--ink-soft)] hover:text-[var(--ink)] hover:bg-[var(--bg)] transition border border-transparent hover:border-[var(--line)]"
              aria-label="Expand sidebar"
              title="Expand sidebar"
            >
              <PanelLeftOpen size={18} />
            </button>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto" aria-label="Main Navigation">
          {!sidebarCollapsed && (
            <p className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)]">
              My Learning Space
            </p>
          )}

          {mainNavItems.map(({ view: v, label, icon: Icon }) => {
            const isActive =
              view === v ||
              (view === 'lesson' && v === 'lessons') ||
              (view === 'activity' && v === 'activities');
            return (
              <a
                key={v}
                href={`/?view=${v}&grade=${grade}`}
                title={sidebarCollapsed ? label : undefined}
                className={`flex items-center rounded-2xl font-bold transition min-h-[52px] text-sm no-underline ${
                  sidebarCollapsed ? 'justify-center px-2 py-3' : 'gap-3.5 px-4 py-3'
                } ${
                  isActive
                    ? 'bg-[var(--maths-tint)] text-[var(--maths)] border-2 border-[var(--maths)] shadow-[0_2px_0_#1a328a]'
                    : 'text-[var(--ink)] hover:bg-[var(--bg)] border-2 border-transparent'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon size={20} className={isActive ? 'text-[var(--maths)]' : 'text-[var(--ink-soft)]'} />
                {!sidebarCollapsed && <span>{label}</span>}
              </a>
            );
          })}

          <div className="pt-3 border-t-2 border-[var(--line)] mt-3">
            {!sidebarCollapsed && (
              <p className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)]">
                More Tools
              </p>
            )}
            <a
              href={`/?view=voice&grade=${grade}`}
              title={sidebarCollapsed ? 'Voice Garden' : undefined}
              className={`flex items-center rounded-2xl font-bold transition min-h-[52px] text-sm no-underline ${
                sidebarCollapsed ? 'justify-center px-2 py-3' : 'gap-3.5 px-4 py-3'
              } ${
                view === 'voice'
                  ? 'bg-[var(--voice-tint)] text-[var(--voice)] border-2 border-[var(--voice)]'
                  : 'text-[var(--ink)] hover:bg-[var(--bg)] border-2 border-transparent'
              }`}
            >
              <Mic size={20} className="text-[var(--voice)]" />
              {!sidebarCollapsed && <span>Voice Garden</span>}
            </a>

            <a
              href={`/?view=team`}
              title={sidebarCollapsed ? 'Team Workspace' : undefined}
              className={`flex items-center rounded-2xl font-bold transition min-h-[52px] text-sm no-underline ${
                sidebarCollapsed ? 'justify-center px-2 py-3' : 'gap-3.5 px-4 py-3'
              } ${
                view === 'team'
                  ? 'bg-[#f4ebd0] text-[#6d5117] border-2 border-[#6d5117]'
                  : 'text-[var(--ink)] hover:bg-[var(--bg)] border-2 border-transparent'
              }`}
            >
              <Users size={20} className="text-[var(--ink-soft)]" />
              {!sidebarCollapsed && <span>Team Workspace</span>}
            </a>
          </div>
        </nav>

        {/* Desktop Rail Footer with Profile & Settings */}
        <div className="p-3 border-t-2 border-[var(--line)] bg-[var(--bg)] flex items-center justify-between gap-2">
          {!sidebarCollapsed ? (
            <button
              type="button"
              onClick={() => setSettingsOpen(true)}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-[var(--surface)] transition text-left select-none"
              title="Switch profile or change settings"
            >
              <span className="text-2xl">{profile.avatar}</span>
              <div className="overflow-hidden">
                <span className="block text-xs font-bold text-[var(--ink)] truncate max-w-[120px]">
                  {profile.name}
                </span>
                <span className="text-[10px] text-[var(--ink-soft)]">Learner Profile</span>
              </div>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setSettingsOpen(true)}
              className="text-xl mx-auto flex items-center justify-center p-1 rounded-xl hover:bg-[var(--surface)] transition cursor-pointer"
              aria-label={`Current profile: ${profile.name}. Click to switch.`}
            >
              {profile.avatar}
            </button>
          )}

          <button
            type="button"
            onClick={() => setSettingsOpen(true)}
            className={`rounded-2xl flex items-center justify-center border-2 border-[var(--line)] bg-[var(--surface)] text-[var(--ink-soft)] hover:text-[var(--ink)] transition shrink-0 ${
              sidebarCollapsed ? 'w-10 h-10 mx-auto' : 'w-11 h-11'
            }`}
            aria-label="Open settings"
            title="Settings & Profile"
          >
            <Settings size={18} />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 lg:pb-0">
        {/* Top Bar */}
        <header className="h-16 lg:h-18 border-b-2 border-[var(--line)] bg-[var(--surface)] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20 shadow-xs">
          <div className="flex items-center gap-3">
            <a href="/?view=garden" className="lg:hidden flex items-center gap-2 text-[var(--ink)] no-underline">
              <span className="p-2 rounded-xl bg-[var(--maths-tint)] text-[var(--maths)]">
                <Sprout size={18} />
              </span>
              <span className="font-bold font-heading text-lg">Anushruti</span>
            </a>

            <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--science-tint)] text-[var(--science)] text-xs font-bold">
              <Hand size={14} /> Visual-first · Sound-independent
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Active Profile Pill */}
            <button
              type="button"
              onClick={() => setSettingsOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-[var(--bg)] border-2 border-[var(--line)] hover:border-[#c2d0eb] transition"
              title="Click to switch learner"
            >
              <span className="text-base">{profile.avatar}</span>
              <span className="text-xs font-bold text-[var(--ink)] hidden sm:inline">{profile.name}</span>
            </button>

            {/* Grade Selector */}
            <label className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[var(--ink-soft)] bg-[var(--bg)] px-3 py-1.5 rounded-2xl border-2 border-[var(--line)]">
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
              className="min-w-[44px] min-h-[44px] p-2 rounded-2xl border-2 border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--bg)] text-[var(--ink)] flex items-center justify-center transition"
              aria-label="Open settings"
            >
              <Settings size={18} />
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
        onClose={handleSettingsClose}
        settings={settings}
        onSettingsChange={setSettings}
        onResetProgress={onResetProgress}
      />
    </div>
  );
}

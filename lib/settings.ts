export type TextSize = 100 | 125 | 150;
export type ThemeMode = 'default' | 'high-contrast' | 'dark';

export type AppSettings = {
  version: 1;
  textSize: TextSize;
  theme: ThemeMode;
  reduceMotion: boolean;
  islEnabled: boolean;
  haptics: boolean;
  adultMode: boolean;
  fitzgeraldGrammar?: boolean;
  sidebarCollapsed?: boolean;
};

export const SETTINGS_STORAGE_KEY = 'anushruti.settings.v1';

export const defaultSettings: AppSettings = {
  version: 1,
  textSize: 100,
  theme: 'default',
  reduceMotion: false,
  islEnabled: true,
  haptics: true,
  adultMode: false,
  fitzgeraldGrammar: true,
  sidebarCollapsed: false,
};

export function loadSettings(): AppSettings {
  if (typeof window === 'undefined') return defaultSettings;
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) return defaultSettings;
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== 1) return defaultSettings;
    return {
      version: 1,
      textSize: [100, 125, 150].includes(parsed.textSize)
        ? parsed.textSize
        : 100,
      theme: ['default', 'high-contrast', 'dark'].includes(parsed.theme)
        ? parsed.theme
        : 'default',
      reduceMotion: Boolean(parsed.reduceMotion),
      islEnabled:
        parsed.islEnabled !== undefined ? Boolean(parsed.islEnabled) : true,
      haptics: parsed.haptics !== undefined ? Boolean(parsed.haptics) : true,
      adultMode: Boolean(parsed.adultMode),
      fitzgeraldGrammar:
        parsed.fitzgeraldGrammar !== undefined
          ? Boolean(parsed.fitzgeraldGrammar)
          : true,
      sidebarCollapsed: Boolean(parsed.sidebarCollapsed),
    };
  } catch {
    return defaultSettings;
  }
}

export function saveSettings(settings: AppSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Persistence may be unavailable, but the active page still updates.
  }
  applySettingsToDOM(settings);
}

export function applySettingsToDOM(settings: AppSettings): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;

  // Apply text size
  root.setAttribute('data-text-size', String(settings.textSize));

  // Apply theme
  if (settings.theme === 'high-contrast') {
    root.setAttribute('data-theme', 'high-contrast');
    root.classList.remove('dark');
  } else if (settings.theme === 'dark') {
    root.removeAttribute('data-theme');
    root.classList.add('dark');
  } else {
    root.removeAttribute('data-theme');
    root.classList.remove('dark');
  }

  // Apply reduced motion
  root.setAttribute('data-reduce-motion', String(settings.reduceMotion));
  root.setAttribute('data-isl-enabled', String(settings.islEnabled));
  root.style.colorScheme = settings.theme === 'dark' ? 'dark' : 'light';
}

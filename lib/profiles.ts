/**
 * Device-local user profiles for shared tablets and classrooms.
 * Storage key: anushruti.profiles.v1
 * 
 * Strict privacy: All data is stored purely inside browser localStorage.
 * No personal child data is ever transmitted or committed.
 */

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  grade: number;
  createdAt: number;
}

export const DEFAULT_AVATARS = ['🌻', '🦊', '🦁', '🐼', '🐬', '🚀', '⭐', '🎨', '🐱', '🐘'];

export const PROFILES_STORAGE_KEY = 'anushruti.profiles.v1';
export const ACTIVE_PROFILE_KEY = 'anushruti.active_profile.v1';

export const DEFAULT_PROFILE: UserProfile = {
  id: 'default-learner',
  name: 'Curious Explorer',
  avatar: '🌻',
  grade: 1,
  createdAt: 1710000000000,
};

export function loadProfiles(): UserProfile[] {
  if (typeof window === 'undefined') return [DEFAULT_PROFILE];
  try {
    const raw = localStorage.getItem(PROFILES_STORAGE_KEY);
    if (!raw) return [DEFAULT_PROFILE];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return [DEFAULT_PROFILE];
  } catch {
    return [DEFAULT_PROFILE];
  }
}

export function saveProfiles(profiles: UserProfile[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(profiles));
  } catch {
    // Local storage quota or restricted
  }
}

export function getActiveProfileId(): string {
  if (typeof window === 'undefined') return DEFAULT_PROFILE.id;
  try {
    return localStorage.getItem(ACTIVE_PROFILE_KEY) || DEFAULT_PROFILE.id;
  } catch {
    return DEFAULT_PROFILE.id;
  }
}

export function setActiveProfileId(id: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(ACTIVE_PROFILE_KEY, id);
  } catch {
    // Local storage quota or restricted
  }
}

export function getActiveProfile(): UserProfile {
  const profiles = loadProfiles();
  const activeId = getActiveProfileId();
  return profiles.find((p) => p.id === activeId) || profiles[0] || DEFAULT_PROFILE;
}

export function createProfile(name: string, avatar: string, grade = 1): UserProfile {
  const profiles = loadProfiles();
  const newProfile: UserProfile = {
    id: `learner-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    name: name.trim() || `Learner ${profiles.length + 1}`,
    avatar: avatar || DEFAULT_AVATARS[profiles.length % DEFAULT_AVATARS.length],
    grade,
    createdAt: Date.now(),
  };
  const updated = [...profiles, newProfile];
  saveProfiles(updated);
  setActiveProfileId(newProfile.id);
  return newProfile;
}

export function updateProfile(id: string, updates: Partial<Omit<UserProfile, 'id' | 'createdAt'>>): UserProfile | null {
  const profiles = loadProfiles();
  const index = profiles.findIndex((p) => p.id === id);
  if (index === -1) return null;
  const updatedProfile = { ...profiles[index], ...updates };
  profiles[index] = updatedProfile;
  saveProfiles(profiles);
  return updatedProfile;
}

export function deleteProfile(id: string): UserProfile[] {
  const profiles = loadProfiles();
  if (profiles.length <= 1) return profiles; // Keep at least one profile
  const filtered = profiles.filter((p) => p.id !== id);
  saveProfiles(filtered);
  if (getActiveProfileId() === id) {
    setActiveProfileId(filtered[0].id);
  }
  return filtered;
}

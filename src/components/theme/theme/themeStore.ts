/**
 * @license
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import { ThemeType, ThemeService } from './theme.service';

/**
 * Extended theme type with stable identifier for caching.
 */
export interface ThemedThemeType extends ThemeType {
  __themeId?: string;
}

/**
 * Interface for ThemeStore compatible with React 18's useSyncExternalStore.
 */
export interface ThemeStoreInterface {
  getSnapshot: () => ThemedThemeType;
  getServerSnapshot: () => ThemedThemeType;
  subscribe: (listener: () => void) => () => void;
  setTheme: (theme: ThemeType) => void;
  setSnapshotSilent: (processedTheme: ThemedThemeType) => void;
  notify: () => void;
}

/**
 * Compute a stable identifier for a theme.
 * Uses a lightweight fingerprint based on a few key color values.
 */
export function computeThemeId(theme: ThemeType): string {
  const backgroundKey = 'background-basic-color-1';
  const primaryKey = 'color-primary-default';

  const bg = theme[backgroundKey] ?? '';
  const primary = theme[primaryKey] ?? '';

  const combined = `${bg}-${primary}`;
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }

  return `theme_${Math.abs(hash).toString(36)}`;
}

/**
 * External store for theme with subscription support.
 * Compatible with React 18's useSyncExternalStore for selective re-renders.
 *
 * @example
 * ```tsx
 * const store = new ThemeStore();
 * store.setTheme(lightTheme);
 *
 * // In a component using useSyncExternalStore:
 * const theme = useSyncExternalStore(store.subscribe, store.getSnapshot);
 * ```
 */
export class ThemeStore implements ThemeStoreInterface {
  private listeners = new Set<() => void>();
  private currentTheme: ThemedThemeType = {};

  /**
   * Get the current theme snapshot.
   * Required for useSyncExternalStore.
   */
  getSnapshot = (): ThemedThemeType => {
    return this.currentTheme;
  };

  /**
   * Get the server-side snapshot.
   * Required for useSyncExternalStore with SSR.
   */
  getServerSnapshot = (): ThemedThemeType => {
    return this.currentTheme;
  };

  /**
   * Subscribe to theme changes.
   * Returns an unsubscribe function.
   */
  subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  /**
   * Update the current theme.
   * Processes the theme through ThemeService.create() and adds a stable __themeId.
   */
  setTheme = (theme: ThemeType): void => {
    const processedTheme = ThemeService.create(theme);
    const themeId = this.computeThemeId(theme);

    this.currentTheme = {
      ...processedTheme,
      __themeId: themeId,
    };

    this.notifyListeners();
  };

  /**
   * Update the snapshot without notifying listeners.
   * Use this for synchronous updates during render, followed by notify() in useEffect.
   */
  setSnapshotSilent = (processedTheme: ThemedThemeType): void => {
    this.currentTheme = processedTheme;
  };

  /**
   * Notify all subscribed listeners of a theme change.
   * Public wrapper around notifyListeners for use with setSnapshotSilent.
   */
  notify = (): void => {
    this.notifyListeners();
  };

  /**
   * Get the current theme ID for cache key purposes.
   */
  getThemeId = (): string => {
    return this.currentTheme.__themeId ?? 'default';
  };

  /**
   * Notify all listeners of a theme change.
   */
  private notifyListeners(): void {
    this.listeners.forEach((listener) => {
      listener();
    });
  }

  private computeThemeId(theme: ThemeType): string {
    return computeThemeId(theme);
  }
}

/**
 * React Context for the ThemeStore instance.
 * Used by useThemeValue and useThemeValues hooks.
 */
export const ThemeStoreContext = React.createContext<ThemeStore | null>(null);

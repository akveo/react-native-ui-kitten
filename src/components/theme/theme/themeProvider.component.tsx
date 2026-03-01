/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React, { useRef, useEffect, useMemo } from 'react';
import { ThemeContext } from './themeContext';
import { ThemeService, ThemeType } from './theme.service';
import { ThemeStore, ThemeStoreContext, computeThemeId } from './themeStore';
import { styleCache } from '../style/styleCache';

export interface ThemeProviderProps {
  theme: ThemeType;
  children?: React.ReactNode;
}

/**
 * Since ApplicationProvider is the root component of the application,
 * it provides same theme for all underlying components.
 *
 * ThemeProvider allows modifying this theme so that each component that is the child
 * of ThemeProvider will use modified theme.
 *
 * Now also integrates with ThemeStore for selective subscriptions via useThemeValue hooks.
 *
 * @overview-example ThemeProviderSimpleUsage
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ theme, children }) => {
  // Create ThemeStore instance once
  const storeRef = useRef<ThemeStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = new ThemeStore();
  }
  const store = storeRef.current;

  // Clear style cache when theme changes so components recompute with new colors
  const prevThemeRef = useRef(theme);
  if (prevThemeRef.current !== theme) {
    styleCache.clear();
    prevThemeRef.current = theme;
  }

  // Compute themeId synchronously during render so children get the correct ID
  const themeId = useMemo(() => computeThemeId(theme), [theme]);

  // Get processed theme from store for ThemeContext
  const processedTheme = useMemo(() => {
    return ThemeService.create(theme);
  }, [theme]);

  // Add __themeId to the processed theme for cache key usage
  const themedWithId = useMemo(() => {
    return {
      ...processedTheme,
      __themeId: themeId,
    };
  }, [processedTheme, themeId]);

  // Synchronously update the store snapshot during render so children
  // reading via useSyncExternalStore see the correct theme immediately.
  store.setSnapshotSilent(themedWithId);

  // Notify useSyncExternalStore subscribers after render (for memo'd/external components)
  useEffect(() => {
    store.notify();
  }, [themedWithId, store]);

  return (
    <ThemeStoreContext.Provider value={store}>
      <ThemeContext.Provider value={themedWithId}>
        {children}
      </ThemeContext.Provider>
    </ThemeStoreContext.Provider>
  );
};

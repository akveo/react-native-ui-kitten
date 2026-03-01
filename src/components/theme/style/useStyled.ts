/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { useContext, useMemo, useState, useCallback, useRef, useSyncExternalStore } from 'react';
import { ThemeStyleType } from '@ui-kitten/processor';
import { StyleConsumerService } from './styleConsumer.service';
import { Interaction, StyleType } from './style.service';
import { styleCache } from './styleCache';
import { MappingContext } from '../mapping/mappingContext';
import { ThemeType } from '../theme/theme.service';
import { ThemedThemeType, ThemeStoreContext } from '../theme/themeStore';

export interface UseStyledResult {
  style: StyleType;
  theme: ThemeType;
  dispatch: (interactions: Interaction[]) => void;
}

export interface UseStyledOptions {
  appearance?: string;
  status?: string;
  size?: string;
  category?: string;
  disabled?: boolean;
  checked?: boolean;
  selected?: boolean;
  indeterminate?: boolean;
  level?: string;
  shape?: string;
  // Calendar-specific props
  bounding?: boolean;
  today?: boolean;
  range?: boolean;
  [key: string]: unknown;
}

/** Internal keys to exclude from proxy key tracking */
const INTERNAL_KEYS = new Set(['__themeId', 'toJSON', 'toString', 'valueOf', 'constructor']);

/**
 * Creates a Proxy-wrapped theme that tracks which keys are accessed.
 * Used during style computation to discover theme key dependencies.
 */
function createTrackedTheme(theme: ThemeType): {
  trackedTheme: ThemeType;
  getAccessedKeys: () => Set<string>;
} {
  const accessedKeys = new Set<string>();
  const trackedTheme = new Proxy(theme, {
    get(target, prop, receiver) {
      if (typeof prop === 'string' && !INTERNAL_KEYS.has(prop)) {
        accessedKeys.add(prop);
      }
      return Reflect.get(target, prop, receiver);
    },
  });
  return { trackedTheme, getAccessedKeys: () => accessedKeys };
}

// Module-level constants for referential stability (no-op fallbacks when store is null)
const EMPTY_THEME: ThemedThemeType = {};
const noopSubscribe = (_listener: () => void) => () => {};
const noopGetSnapshot = () => EMPTY_THEME;

/**
 * Modern hook-based alternative to @styled decorator.
 * Computes Eva Design System styles for a component based on its props and current interactions.
 *
 * Uses useSyncExternalStore with Proxy-based key tracking for selective re-renders:
 * only re-renders when theme keys actually used by this component change.
 *
 * Theme is read exclusively from ThemeStoreContext (provided by ThemeProvider/StyleProvider).
 * This avoids subscribing to ThemeContext, which would defeat selective re-rendering
 * since useContext triggers re-renders on any context value change.
 */
export function useStyled(
  componentName: string,
  options: UseStyledOptions = {},
): UseStyledResult {
  const mapping = useContext(MappingContext);
  const store = useContext(ThemeStoreContext);
  const [interactions, setInteractions] = useState<Interaction[]>([]);

  // Refs for selective re-render tracking
  const trackedKeysRef = useRef<Set<string> | null>(null);
  const prevSnapshotRef = useRef<ThemedThemeType | null>(null);

  // Selective getSnapshot: returns the same reference if tracked keys haven't changed
  const getSnapshot = useCallback((): ThemedThemeType => {
    if (!store) {
      return EMPTY_THEME;
    }
    const current = store.getSnapshot();
    const prev = prevSnapshotRef.current;
    const tracked = trackedKeysRef.current;

    // First render or no tracked keys yet — store and return current
    if (!prev || !tracked || tracked.size === 0) {
      prevSnapshotRef.current = current;
      return current;
    }

    // Same reference — no change
    if (current === prev) {
      return prev;
    }

    // Check only tracked keys
    let hasChange = false;
    for (const key of tracked) {
      if (current[key] !== prev[key]) {
        hasChange = true;
        break;
      }
    }

    if (hasChange) {
      prevSnapshotRef.current = current;
      return current;
    }

    // Tracked keys unchanged — return previous ref to skip re-render
    return prev;
  }, [store]);

  const theme = useSyncExternalStore(
    store ? store.subscribe : noopSubscribe,
    store ? getSnapshot : noopGetSnapshot,
    store ? getSnapshot : noopGetSnapshot,
  );

  // Cache service and default props, re-create when mapping changes
  const serviceRef = useRef<StyleConsumerService | null>(null);
  const defaultPropsRef = useRef<Record<string, unknown>>({});
  const mappingRef = useRef<unknown>(null);

  if (mapping && Object.keys(mapping).length > 0 && mapping !== mappingRef.current) {
    mappingRef.current = mapping;
    serviceRef.current = new StyleConsumerService(componentName, mapping as ThemeStyleType);
    defaultPropsRef.current = serviceRef.current.createDefaultProps() as Record<string, unknown>;
  }

  const service = serviceRef.current;
  const defaultProps = defaultPropsRef.current;

  // Compute style with caching
  const style = useMemo(() => {
    if (!service || !mapping || !theme || Object.keys(theme).length === 0) {
      return {};
    }

    // Get theme ID for cache key (from ThemeStore or fallback)
    const themeId = (theme as ThemedThemeType).__themeId ?? 'default';

    // Build variants object for cache key
    const variants: Record<string, string | boolean | undefined> = {
      status: options.status,
      size: options.size,
      category: options.category,
      level: options.level,
      shape: options.shape,
      disabled: options.disabled,
      checked: options.checked,
      selected: options.selected,
      indeterminate: options.indeterminate,
      bounding: options.bounding,
      today: options.today,
      range: options.range,
    };

    // Try cache first
    const cacheKey = styleCache.buildKey(
      componentName,
      options.appearance,
      variants,
      interactions,
      themeId,
    );

    const cached = styleCache.get(cacheKey);
    if (cached) {
      return cached;
    }

    // Cache miss - compute style with key tracking
    const { trackedTheme, getAccessedKeys } = createTrackedTheme(theme);

    const mergedProps: Record<string, unknown> = { ...defaultProps };
    Object.keys(options).forEach((key) => {
      if (options[key] !== undefined) {
        mergedProps[key] = options[key];
      }
    });

    const computed = service.createStyleProp(
      mergedProps,
      mapping as ThemeStyleType,
      trackedTheme,
      interactions,
    );

    // Save tracked keys for selective re-render comparison
    const newKeys = getAccessedKeys();
    if (newKeys.size > 0) {
      // Merge with any existing tracked keys (from render-phase access)
      const existing = trackedKeysRef.current;
      if (existing) {
        for (const key of newKeys) {
          existing.add(key);
        }
      } else {
        trackedKeysRef.current = newKeys;
      }
    }

    // Store in cache
    styleCache.set(cacheKey, computed);

    return computed;
  }, [
    service,
    defaultProps,
    componentName,
    // Common props used by most styled components
    options.appearance,
    options.status,
    options.size,
    options.category,
    options.disabled,
    options.checked,
    options.selected,
    options.indeterminate,
    options.level,
    options.shape,
    // Calendar-specific props
    options.bounding,
    options.today,
    options.range,
    mapping,
    theme,
    interactions,
  ]);

  // Create a tracked proxy for the returned theme to capture render-phase key access
  const returnTheme = useMemo(() => {
    if (!theme || Object.keys(theme).length === 0) {
      return theme;
    }
    return new Proxy(theme, {
      get(target, prop, receiver) {
        if (typeof prop === 'string' && !INTERNAL_KEYS.has(prop)) {
          if (!trackedKeysRef.current) {
            trackedKeysRef.current = new Set<string>();
          }
          trackedKeysRef.current.add(prop);
        }
        return Reflect.get(target, prop, receiver);
      },
    });
  }, [theme]);

  // Stable dispatch function
  const dispatch = useCallback((newInteractions: Interaction[]) => {
    setInteractions(newInteractions);
  }, []);

  return { style, theme: returnTheme, dispatch };
}

/**
 * Hook to get default props for a styled component.
 */
export function useStyledDefaultProps(componentName: string): Record<string, unknown> {
  const mapping = useContext(MappingContext);

  return useMemo(() => {
    if (!mapping || Object.keys(mapping).length === 0) {
      return {};
    }
    const service = new StyleConsumerService(componentName, mapping as ThemeStyleType);
    return service.createDefaultProps() as Record<string, unknown>;
  }, [componentName, mapping]);
}

/**
 * @license
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { StyleType } from './style.service';

interface CacheEntry {
  style: StyleType;
  accessCount: number;
}

/**
 * Global cache for computed styles with LRU eviction.
 * Shared across all component instances for maximum efficiency.
 */
export class StyleCacheClass {
  private cache = new Map<string, CacheEntry>();
  private readonly maxSize: number;
  private accessCounter = 0;

  constructor(maxSize = 1000) {
    this.maxSize = maxSize;
  }

  /**
   * Build a deterministic cache key from style parameters.
   *
   * Key format: {componentName}::{appearance}::{variants}::{interactions}::{themeId}
   * Example: "Button::filled::status:primary|size:medium::active::light"
   */
  buildKey(
    componentName: string,
    appearance: string | undefined,
    variants: Record<string, string | boolean | undefined>,
    interactions: string[],
    themeId: string,
  ): string {
    // Sort variants for deterministic key
    const variantPairs = Object.entries(variants)
      .filter(([, v]) => v !== undefined && v !== false)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}:${v}`)
      .join('|');

    // Sort interactions for deterministic key
    const interactionKey = [...interactions].sort().join('|');

    return `${componentName}::${appearance ?? 'default'}::${variantPairs}::${interactionKey}::${themeId}`;
  }

  /**
   * Get cached style by key.
   * Returns null if not found.
   */
  get(key: string): StyleType | null {
    const entry = this.cache.get(key);
    if (!entry) {
      return null;
    }

    // Update access count for LRU tracking
    entry.accessCount = ++this.accessCounter;
    return entry.style;
  }

  /**
   * Store a computed style in the cache.
   * Evicts least recently used entry if at capacity.
   */
  set(key: string, style: StyleType): void {
    // Evict LRU entry if at capacity
    if (this.cache.size >= this.maxSize && !this.cache.has(key)) {
      this.evictLRU();
    }

    this.cache.set(key, {
      style,
      accessCount: ++this.accessCounter,
    });
  }

  /**
   * Evict the least recently used entry.
   */
  private evictLRU(): void {
    let lruKey: string | null = null;
    let lruAccess = Infinity;

    for (const [key, entry] of this.cache) {
      if (entry.accessCount < lruAccess) {
        lruAccess = entry.accessCount;
        lruKey = key;
      }
    }

    if (lruKey) {
      this.cache.delete(lruKey);
    }
  }

  /**
   * Invalidate all cached entries for a specific theme.
   * Call this when theme changes.
   */
  invalidateTheme(themeId: string): void {
    const keysToDelete: string[] = [];

    for (const key of this.cache.keys()) {
      if (key.endsWith(`::${themeId}`)) {
        keysToDelete.push(key);
      }
    }

    for (const key of keysToDelete) {
      this.cache.delete(key);
    }
  }

  /**
   * Clear entire cache.
   * Useful when mapping changes.
   */
  clear(): void {
    this.cache.clear();
    this.accessCounter = 0;
  }

  /**
   * Get cache statistics for debugging and monitoring.
   */
  getStats(): { size: number; maxSize: number } {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
    };
  }
}

/**
 * Singleton instance of StyleCache.
 * Shared across all components for maximum cache efficiency.
 */
export const styleCache = new StyleCacheClass();

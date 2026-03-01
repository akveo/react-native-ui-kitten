/**
 * @license
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { StyleCacheClass, styleCache } from './styleCache';

describe('StyleCache', () => {
  let cache: StyleCacheClass;

  beforeEach(() => {
    cache = new StyleCacheClass(5); // Small cache for testing
  });

  afterEach(() => {
    styleCache.clear(); // Clean up singleton between tests
  });

  describe('buildKey', () => {
    it('should build deterministic key from parameters', () => {
      const key1 = cache.buildKey(
        'Button',
        'filled',
        { status: 'primary', size: 'medium' },
        ['active'],
        'light',
      );
      const key2 = cache.buildKey(
        'Button',
        'filled',
        { status: 'primary', size: 'medium' },
        ['active'],
        'light',
      );

      expect(key1).toEqual(key2);
      expect(key1).toEqual('Button::filled::size:medium|status:primary::active::light');
    });

    it('should sort variants for deterministic key', () => {
      const key1 = cache.buildKey(
        'Button',
        'filled',
        { status: 'primary', size: 'medium' },
        [],
        'light',
      );
      const key2 = cache.buildKey(
        'Button',
        'filled',
        { size: 'medium', status: 'primary' },
        [],
        'light',
      );

      expect(key1).toEqual(key2);
    });

    it('should sort interactions for deterministic key', () => {
      const key1 = cache.buildKey('Button', 'filled', {}, ['active', 'hover'], 'light');
      const key2 = cache.buildKey('Button', 'filled', {}, ['hover', 'active'], 'light');

      expect(key1).toEqual(key2);
    });

    it('should filter out undefined and false variants', () => {
      const key = cache.buildKey(
        'Button',
        'filled',
        { status: 'primary', disabled: false, checked: undefined },
        [],
        'light',
      );

      expect(key).toEqual('Button::filled::status:primary::::light');
    });

    it('should use "default" for undefined appearance', () => {
      const key = cache.buildKey('Button', undefined, {}, [], 'light');

      expect(key).toEqual('Button::default::::::light');
    });
  });

  describe('get/set', () => {
    it('should return null for cache miss', () => {
      const result = cache.get('nonexistent-key');
      expect(result).toBeNull();
    });

    it('should return cached style on hit', () => {
      const style = { backgroundColor: 'red', padding: 10 };
      cache.set('test-key', style);

      const result = cache.get('test-key');
      expect(result).toEqual(style);
    });

    it('should update access count on get', () => {
      cache.set('key1', { a: 1 });
      cache.set('key2', { b: 2 });

      // Access key1 to make it more recently used
      cache.get('key1');
      cache.get('key1');

      // Fill cache to capacity
      cache.set('key3', { c: 3 });
      cache.set('key4', { d: 4 });
      cache.set('key5', { e: 5 });

      // key2 should be evicted as least recently used
      cache.set('key6', { f: 6 });

      expect(cache.get('key1')).not.toBeNull();
      expect(cache.get('key2')).toBeNull();
    });
  });

  describe('LRU eviction', () => {
    it('should evict least recently used entry when at capacity', () => {
      // Fill cache to capacity
      cache.set('key1', { a: 1 });
      cache.set('key2', { b: 2 });
      cache.set('key3', { c: 3 });
      cache.set('key4', { d: 4 });
      cache.set('key5', { e: 5 });

      // Cache is now full, add one more
      cache.set('key6', { f: 6 });

      // key1 should be evicted (least recently used)
      expect(cache.get('key1')).toBeNull();
      expect(cache.get('key6')).toEqual({ f: 6 });
    });

    it('should not evict when updating existing key', () => {
      cache.set('key1', { a: 1 });
      cache.set('key2', { b: 2 });
      cache.set('key3', { c: 3 });
      cache.set('key4', { d: 4 });
      cache.set('key5', { e: 5 });

      // Update existing key (should not trigger eviction)
      cache.set('key3', { c: 33 });

      expect(cache.get('key1')).not.toBeNull();
      expect(cache.get('key3')).toEqual({ c: 33 });
    });
  });

  describe('invalidateTheme', () => {
    it('should remove all entries for specified theme', () => {
      cache.set('Button::filled::::active::light', { a: 1 });
      cache.set('Button::outline::::active::light', { b: 2 });
      cache.set('Button::filled::::active::dark', { c: 3 });
      cache.set('Input::default::::::light', { d: 4 });

      cache.invalidateTheme('light');

      expect(cache.get('Button::filled::::active::light')).toBeNull();
      expect(cache.get('Button::outline::::active::light')).toBeNull();
      expect(cache.get('Input::default::::::light')).toBeNull();
      expect(cache.get('Button::filled::::active::dark')).not.toBeNull();
    });
  });

  describe('clear', () => {
    it('should remove all entries', () => {
      cache.set('key1', { a: 1 });
      cache.set('key2', { b: 2 });

      cache.clear();

      expect(cache.get('key1')).toBeNull();
      expect(cache.get('key2')).toBeNull();
      expect(cache.getStats().size).toEqual(0);
    });
  });

  describe('getStats', () => {
    it('should return current cache stats', () => {
      expect(cache.getStats()).toEqual({ size: 0, maxSize: 5 });

      cache.set('key1', { a: 1 });
      cache.set('key2', { b: 2 });

      expect(cache.getStats()).toEqual({ size: 2, maxSize: 5 });
    });
  });

  describe('singleton instance', () => {
    it('should be shared across usages', () => {
      styleCache.set('singleton-key', { test: true });
      expect(styleCache.get('singleton-key')).toEqual({ test: true });
    });
  });
});

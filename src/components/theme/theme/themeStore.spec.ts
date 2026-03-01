/**
 * @license
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ThemeStore } from './themeStore';

describe('ThemeStore', () => {
  let store: ThemeStore;

  beforeEach(() => {
    store = new ThemeStore();
  });

  describe('getSnapshot', () => {
    it('should return empty object initially', () => {
      expect(store.getSnapshot()).toEqual({});
    });

    it('should return current theme after setTheme', () => {
      const theme = {
        'color-primary-default': '#3366FF',
        'background-basic-color-1': '#FFFFFF',
      };

      store.setTheme(theme);

      const snapshot = store.getSnapshot();
      expect(snapshot['color-primary-default']).toEqual('#3366FF');
      expect(snapshot['background-basic-color-1']).toEqual('#FFFFFF');
    });
  });

  describe('getServerSnapshot', () => {
    it('should return same value as getSnapshot', () => {
      const theme = { color: 'red' };
      store.setTheme(theme);

      expect(store.getServerSnapshot()).toEqual(store.getSnapshot());
    });
  });

  describe('setTheme', () => {
    it('should process theme through ThemeService.create', () => {
      const theme = {
        primaryColor: '#3366FF',
        refValue: '$primaryColor',
      };

      store.setTheme(theme);

      const snapshot = store.getSnapshot();
      // refValue should be resolved to primaryColor value
      expect(snapshot.refValue).toEqual('#3366FF');
    });

    it('should add __themeId to processed theme', () => {
      const theme = {
        'color-primary-default': '#3366FF',
        'background-basic-color-1': '#FFFFFF',
      };

      store.setTheme(theme);

      const snapshot = store.getSnapshot();
      expect(snapshot.__themeId).toBeDefined();
      expect(typeof snapshot.__themeId).toBe('string');
    });

    it('should notify all subscribers', () => {
      const listener1 = jest.fn();
      const listener2 = jest.fn();

      store.subscribe(listener1);
      store.subscribe(listener2);

      store.setTheme({ color: 'red' });

      expect(listener1).toHaveBeenCalledTimes(1);
      expect(listener2).toHaveBeenCalledTimes(1);
    });
  });

  describe('subscribe', () => {
    it('should add listener and return unsubscribe function', () => {
      const listener = jest.fn();

      const unsubscribe = store.subscribe(listener);
      store.setTheme({ color: 'red' });

      expect(listener).toHaveBeenCalledTimes(1);

      unsubscribe();
      store.setTheme({ color: 'blue' });

      expect(listener).toHaveBeenCalledTimes(1); // Still 1, not 2
    });

    it('should handle multiple subscribers', () => {
      const listener1 = jest.fn();
      const listener2 = jest.fn();
      const listener3 = jest.fn();

      store.subscribe(listener1);
      const unsub2 = store.subscribe(listener2);
      store.subscribe(listener3);

      store.setTheme({ color: 'red' });

      expect(listener1).toHaveBeenCalledTimes(1);
      expect(listener2).toHaveBeenCalledTimes(1);
      expect(listener3).toHaveBeenCalledTimes(1);

      // Unsubscribe middle one
      unsub2();
      store.setTheme({ color: 'blue' });

      expect(listener1).toHaveBeenCalledTimes(2);
      expect(listener2).toHaveBeenCalledTimes(1); // Not called again
      expect(listener3).toHaveBeenCalledTimes(2);
    });
  });

  describe('setSnapshotSilent', () => {
    it('should update snapshot without notifying listeners', () => {
      const listener = jest.fn();
      store.subscribe(listener);

      const processedTheme = {
        'color-primary-default': '#3366FF',
        __themeId: 'theme_test',
      };

      store.setSnapshotSilent(processedTheme);

      expect(listener).not.toHaveBeenCalled();
      expect(store.getSnapshot()).toBe(processedTheme);
      expect(store.getSnapshot()['color-primary-default']).toEqual('#3366FF');
    });

    it('should be returned by getSnapshot after silent update', () => {
      const theme1 = { key1: 'value1', __themeId: 'id1' };
      const theme2 = { key2: 'value2', __themeId: 'id2' };

      store.setSnapshotSilent(theme1);
      expect(store.getSnapshot()).toBe(theme1);

      store.setSnapshotSilent(theme2);
      expect(store.getSnapshot()).toBe(theme2);
    });
  });

  describe('notify', () => {
    it('should trigger all subscribed listeners', () => {
      const listener1 = jest.fn();
      const listener2 = jest.fn();

      store.subscribe(listener1);
      store.subscribe(listener2);

      store.notify();

      expect(listener1).toHaveBeenCalledTimes(1);
      expect(listener2).toHaveBeenCalledTimes(1);
    });

    it('should work with setSnapshotSilent for two-phase update', () => {
      const listener = jest.fn();
      store.subscribe(listener);

      const processedTheme = { color: 'red', __themeId: 'test' };

      // Phase 1: silent update
      store.setSnapshotSilent(processedTheme);
      expect(listener).not.toHaveBeenCalled();
      expect(store.getSnapshot()).toBe(processedTheme);

      // Phase 2: notify
      store.notify();
      expect(listener).toHaveBeenCalledTimes(1);
    });
  });

  describe('getThemeId', () => {
    it('should return "default" before any theme is set', () => {
      // Before setTheme, __themeId is undefined, so getThemeId returns 'default'
      expect(store.getThemeId()).toEqual('default');
    });

    it('should return theme ID after theme is set', () => {
      store.setTheme({
        'color-primary-default': '#3366FF',
        'background-basic-color-1': '#FFFFFF',
      });

      const themeId = store.getThemeId();
      expect(themeId).toBeDefined();
      expect(themeId).not.toEqual('default');
      expect(themeId.startsWith('theme_')).toBe(true);
    });

    it('should return different IDs for different themes', () => {
      store.setTheme({
        'color-primary-default': '#3366FF',
        'background-basic-color-1': '#FFFFFF',
      });
      const lightThemeId = store.getThemeId();

      store.setTheme({
        'color-primary-default': '#3366FF',
        'background-basic-color-1': '#222B45',
      });
      const darkThemeId = store.getThemeId();

      expect(lightThemeId).not.toEqual(darkThemeId);
    });

    it('should return same ID for identical themes', () => {
      const theme = {
        'color-primary-default': '#3366FF',
        'background-basic-color-1': '#FFFFFF',
      };

      store.setTheme(theme);
      const id1 = store.getThemeId();

      store.setTheme({ ...theme });
      const id2 = store.getThemeId();

      expect(id1).toEqual(id2);
    });
  });
});

/**
 * @license
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { renderHook, act } from '@testing-library/react-native';
import {
  useControllable,
  useControllableBoolean,
  useControllableString,
} from '../useControllable';

describe('useControllable', () => {
  describe('uncontrolled mode', () => {
    it('should use defaultValue initially', () => {
      const { result } = renderHook(() =>
        useControllable({
          defaultValue: 'initial',
        }),
      );

      expect(result.current.value).toBe('initial');
      expect(result.current.isControlled).toBe(false);
    });

    it('should update internal state when setValue is called', () => {
      const { result } = renderHook(() =>
        useControllable({
          defaultValue: 'initial',
        }),
      );

      act(() => {
        result.current.setValue('updated');
      });

      expect(result.current.value).toBe('updated');
    });

    it('should call onChange when setValue is called', () => {
      const onChange = jest.fn();
      const { result } = renderHook(() =>
        useControllable({
          defaultValue: 'initial',
          onChange,
        }),
      );

      act(() => {
        result.current.setValue('updated');
      });

      expect(onChange).toHaveBeenCalledWith('updated');
    });

    it('should support functional updates', () => {
      const { result } = renderHook(() =>
        useControllable({
          defaultValue: 5,
        }),
      );

      act(() => {
        result.current.setValue((prev) => prev + 1);
      });

      expect(result.current.value).toBe(6);
    });
  });

  describe('controlled mode', () => {
    it('should use provided value', () => {
      const { result } = renderHook(() =>
        useControllable({
          value: 'controlled',
          defaultValue: 'default',
        }),
      );

      expect(result.current.value).toBe('controlled');
      expect(result.current.isControlled).toBe(true);
    });

    it('should not update internal state when setValue is called', () => {
      const { result, rerender } = renderHook(
        ({ value }) =>
          useControllable({
            value,
            defaultValue: 'default',
          }),
        { initialProps: { value: 'controlled' } },
      );

      act(() => {
        result.current.setValue('attempted update');
      });

      // Value should still be controlled value
      expect(result.current.value).toBe('controlled');
    });

    it('should call onChange when setValue is called', () => {
      const onChange = jest.fn();
      const { result } = renderHook(() =>
        useControllable({
          value: 'controlled',
          defaultValue: 'default',
          onChange,
        }),
      );

      act(() => {
        result.current.setValue('new value');
      });

      expect(onChange).toHaveBeenCalledWith('new value');
    });

    it('should update when controlled value changes', () => {
      const { result, rerender } = renderHook(
        ({ value }) =>
          useControllable({
            value,
            defaultValue: 'default',
          }),
        { initialProps: { value: 'initial' } },
      );

      expect(result.current.value).toBe('initial');

      rerender({ value: 'updated' });

      expect(result.current.value).toBe('updated');
    });
  });

  describe('mode switching warning', () => {
    it('should warn when switching from uncontrolled to controlled', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

      const { rerender } = renderHook(
        ({ value }) =>
          useControllable({
            value,
            defaultValue: 'default',
          }),
        { initialProps: { value: undefined as string | undefined } },
      );

      rerender({ value: 'now controlled' });

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('switching between controlled and uncontrolled'),
      );

      consoleSpy.mockRestore();
    });
  });
});

describe('useControllableBoolean', () => {
  it('should default to false', () => {
    const { result } = renderHook(() => useControllableBoolean({}));

    expect(result.current.value).toBe(false);
  });

  it('should use provided defaultValue', () => {
    const { result } = renderHook(() =>
      useControllableBoolean({ defaultValue: true }),
    );

    expect(result.current.value).toBe(true);
  });

  it('should toggle value', () => {
    const { result } = renderHook(() =>
      useControllableBoolean({ defaultValue: false }),
    );

    act(() => {
      result.current.setValue(!result.current.value);
    });

    expect(result.current.value).toBe(true);
  });
});

describe('useControllableString', () => {
  it('should default to empty string', () => {
    const { result } = renderHook(() => useControllableString({}));

    expect(result.current.value).toBe('');
  });

  it('should use provided defaultValue', () => {
    const { result } = renderHook(() =>
      useControllableString({ defaultValue: 'hello' }),
    );

    expect(result.current.value).toBe('hello');
  });
});

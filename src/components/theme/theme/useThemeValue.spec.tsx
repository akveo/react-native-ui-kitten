/**
 * @license
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import { View, Text } from 'react-native';
import { render, RenderAPI, act } from '@testing-library/react-native';
import { ThemeProvider } from './themeProvider.component';
import { useThemeValue, useThemeValues } from './useThemeValue';

describe('useThemeValue', () => {
  const lightTheme = {
    'color-primary-default': '#3366FF',
    'color-success-default': '#00E096',
    'background-basic-color-1': '#FFFFFF',
  };

  const darkTheme = {
    'color-primary-default': '#3366FF',
    'color-success-default': '#00E096',
    'background-basic-color-1': '#222B45',
  };

  describe('basic functionality', () => {
    it('should return selected theme value', () => {
      let selectedValue: string | undefined;

      const TestComponent = () => {
        selectedValue = useThemeValue((theme) => theme['color-primary-default']);
        return <View />;
      };

      render(
        <ThemeProvider theme={lightTheme}>
          <TestComponent />
        </ThemeProvider>,
      );

      expect(selectedValue).toEqual('#3366FF');
    });

    it('should return object from selector', () => {
      let selectedValues: { primary: string; success: string } | undefined;

      const TestComponent = () => {
        selectedValues = useThemeValue((theme) => ({
          primary: theme['color-primary-default'] ?? '',
          success: theme['color-success-default'] ?? '',
        }));
        return <View />;
      };

      render(
        <ThemeProvider theme={lightTheme}>
          <TestComponent />
        </ThemeProvider>,
      );

      expect(selectedValues).toEqual({
        primary: '#3366FF',
        success: '#00E096',
      });
    });

    it('should throw error when used outside ThemeProvider', () => {
      const TestComponent = () => {
        useThemeValue((theme) => theme['color-primary-default']);
        return <View />;
      };

      // Suppress console.error for this test
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(<TestComponent />);
      }).toThrow('useThemeValue must be used within a ThemeProvider');

      consoleSpy.mockRestore();
    });
  });

  describe('re-render behavior', () => {
    it('should update when selected value changes', () => {
      const renderCounts: number[] = [];
      let renderCount = 0;

      const TestComponent = () => {
        renderCount++;
        renderCounts.push(renderCount);
        const bg = useThemeValue((theme) => theme['background-basic-color-1']);
        return <Text testID="text">{bg}</Text>;
      };

      const { getByTestId, rerender } = render(
        <ThemeProvider theme={lightTheme}>
          <TestComponent />
        </ThemeProvider>,
      );

      expect(getByTestId('text').props.children).toEqual('#FFFFFF');

      rerender(
        <ThemeProvider theme={darkTheme}>
          <TestComponent />
        </ThemeProvider>,
      );

      expect(getByTestId('text').props.children).toEqual('#222B45');
    });
  });
});

describe('useThemeValues', () => {
  const theme = {
    'color-primary-default': '#3366FF',
    'color-success-default': '#00E096',
    'background-basic-color-1': '#FFFFFF',
    'text-basic-color': '#222B45',
  };

  it('should return multiple selected values', () => {
    let selectedValues: { primary: string; success: string } | undefined;

    const TestComponent = () => {
      selectedValues = useThemeValues({
        primary: (t) => t['color-primary-default'] ?? '',
        success: (t) => t['color-success-default'] ?? '',
      });
      return <View />;
    };

    render(
      <ThemeProvider theme={theme}>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(selectedValues).toEqual({
      primary: '#3366FF',
      success: '#00E096',
    });
  });

  it('should throw error when used outside ThemeProvider', () => {
    const TestComponent = () => {
      useThemeValues({
        primary: (t) => t['color-primary-default'],
      });
      return <View />;
    };

    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useThemeValues must be used within a ThemeProvider');

    consoleSpy.mockRestore();
  });

  it('should work with many selectors', () => {
    let selectedValues:
      | { primary: string; success: string; background: string; text: string }
      | undefined;

    const TestComponent = () => {
      selectedValues = useThemeValues({
        primary: (t) => t['color-primary-default'] ?? '',
        success: (t) => t['color-success-default'] ?? '',
        background: (t) => t['background-basic-color-1'] ?? '',
        text: (t) => t['text-basic-color'] ?? '',
      });
      return <View />;
    };

    render(
      <ThemeProvider theme={theme}>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(selectedValues).toEqual({
      primary: '#3366FF',
      success: '#00E096',
      background: '#FFFFFF',
      text: '#222B45',
    });
  });
});

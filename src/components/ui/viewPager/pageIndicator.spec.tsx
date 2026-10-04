/**
 * @license
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import {
  fireEvent,
  render,
} from '@testing-library/react-native';
import {
  dark,
  light,
  mapping,
} from '@ui-kitten/eva';
import * as material from '@ui-kitten/material';
import { ApplicationProvider } from '../../theme';
import {
  PageIndicator,
  PageIndicatorProps,
} from './pageIndicator.component';

const themeValue = (name: string): string => {
  let value: string = light[name];
  while (typeof value === 'string' && value.startsWith('$')) {
    value = light[value.slice(1)];
  }
  return value;
};

const evaMapping = mapping.components.PageIndicator.appearances.default;

describe('@page-indicator: component checks', () => {

  const TestPageIndicator = (props: Partial<PageIndicatorProps>): React.ReactElement => (
    <ApplicationProvider
      mapping={mapping}
      theme={light}
    >
      <PageIndicator
        testID='indicator'
        pageCount={3}
        {...props}
      />
    </ApplicationProvider>
  );

  const dotsOf = (component: ReturnType<typeof render>): ReturnType<typeof component.getAllByTestId> => (
    component.getAllByTestId(/^@indicator\/dot-\d+$/)
  );

  const isSelected = (dot: ReturnType<typeof render>['getByTestId'] extends (...args: never[]) => infer R ? R : never): boolean => (
    dot.props['aria-selected'] ?? dot.props.accessibilityState?.selected
  );

  it('should render one dot per page with the mapped size', () => {
    const component = render(<TestPageIndicator pageCount={4} />);

    const dots = dotsOf(component);

    expect(dots.length).toEqual(4);
    expect(StyleSheet.flatten(dots[1].props.style)).toMatchObject({
      width: evaMapping.mapping.dotWidth,
      height: evaMapping.mapping.dotHeight,
      backgroundColor: themeValue(evaMapping.mapping.dotBackgroundColor),
    });
  });

  it('should widen and colour the selected dot with the status colour', () => {
    const component = render(
      <TestPageIndicator
        selectedIndex={2}
        status='danger'
        onSelect={jest.fn()}
      />,
    );

    const [first, , third] = dotsOf(component);

    expect(StyleSheet.flatten(third.props.style)).toMatchObject({
      width: evaMapping.mapping.selectedDotWidth,
      backgroundColor: themeValue('color-danger-default'),
    });
    expect(StyleSheet.flatten(first.props.style).width).toEqual(evaMapping.mapping.dotWidth);
    expect(isSelected(third)).toEqual(true);
    expect(isSelected(first)).toEqual(false);
  });

  it('should default to primary and the first page', () => {
    const component = render(<TestPageIndicator />);

    expect(StyleSheet.flatten(dotsOf(component)[0].props.style).backgroundColor)
      .toEqual(themeValue('color-primary-default'));
  });

  it('should size the dots by progress between two pages', () => {
    const component = render(
      <TestPageIndicator
        selectedIndex={0}
        progress={0.25}
      />,
    );

    const [first, second, third] = dotsOf(component).map(dot => StyleSheet.flatten(dot.props.style).width);
    const { dotWidth, selectedDotWidth } = evaMapping.mapping;

    expect(first).toBeCloseTo(dotWidth + (selectedDotWidth - dotWidth) * 0.75);
    expect(second).toBeCloseTo(dotWidth + (selectedDotWidth - dotWidth) * 0.25);
    expect(third).toEqual(dotWidth);
  });

  it('should call onSelect with the pressed dot index and expose dot test ids', () => {
    const onSelect = jest.fn();
    const component = render(<TestPageIndicator onSelect={onSelect} />);

    fireEvent.press(component.getByTestId('@indicator/dot-2'));

    expect(onSelect).toHaveBeenCalledWith(2);
  });

  it('should name the dots through dotAccessibilityLabel', () => {
    const component = render(
      <TestPageIndicator
        onSelect={jest.fn()}
        dotAccessibilityLabel={(index, count) => `Page ${index + 1} of ${count}`}
      />,
    );

    expect(component.getByLabelText('Page 2 of 3')).toBeTruthy();
  });

  it('should expose a display-only indicator as one element naming the current page', () => {
    const component = render(<TestPageIndicator selectedIndex={1} />);

    const summary = component.getByLabelText('Page 2 of 3');
    expect(summary.props.accessible).toEqual(true);
    expect(summary.props.accessibilityRole).toEqual('text');
    dotsOf(component).forEach((dot) => {
      expect(dot.props.onPress).toBeUndefined();
      expect(dot.props.accessibilityRole).toBeUndefined();
      expect(dot.props.importantForAccessibility).toEqual('no');
    });
  });

  it('should name the current page through dotAccessibilityLabel or a consumer label when display-only', () => {
    const labelled = render(
      <TestPageIndicator
        progress={1.6}
        dotAccessibilityLabel={(index, count) => `Slide ${index + 1}/${count}`}
      />,
    );
    expect(labelled.getByLabelText('Slide 3/3')).toBeTruthy();

    const own = render(<TestPageIndicator aria-label='Onboarding progress' />);
    expect(own.getByLabelText('Onboarding progress')).toBeTruthy();
  });

  it('should keep the touch areas of neighbouring dots apart', () => {
    const component = render(<TestPageIndicator onSelect={jest.fn()} />);

    const { hitSlop } = dotsOf(component)[0].props;
    const gap = 2 * evaMapping.mapping.dotMarginHorizontal;

    expect(hitSlop.left + hitSlop.right).toBeLessThanOrEqual(gap);
    expect(hitSlop.top).toBeGreaterThan(0);
  });

  it('should merge dotStyle after the mapping', () => {
    const component = render(<TestPageIndicator dotStyle={{ height: 12 }} />);

    expect(StyleSheet.flatten(dotsOf(component)[0].props.style).height).toEqual(12);
  });
  describe('unselected dot contrast', () => {

    const resolve = (theme: Record<string, string>, name: string): string => {
      let value: string = theme[name];
      while (typeof value === 'string' && value.startsWith('$')) {
        value = theme[value.slice(1)];
      }
      return value;
    };

    const luminance = (hex: string): number => {
      const [r, g, b] = [1, 3, 5].map((i) => {
        const c = parseInt(hex.slice(i, i + 2), 16) / 255;
        return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    const contrast = (a: string, b: string): number => {
      const [high, low] = [luminance(a), luminance(b)].sort((x, y) => y - x);
      return (high + 0.05) / (low + 0.05);
    };

    const cases = [
      ['eva light', mapping, light],
      ['eva dark', mapping, dark],
      ['material light', material.mapping, material.light],
      ['material dark', material.mapping, material.dark],
    ] as const;

    it.each(cases)('should keep the dots visible on the page background (%s)', (_, designMapping, theme) => {
      const component = render(
        <ApplicationProvider
          mapping={designMapping}
          theme={theme}
        >
          <PageIndicator
            testID='indicator'
            pageCount={3}
          />
        </ApplicationProvider>,
      );

      const dot = StyleSheet.flatten(component.getByTestId('@indicator/dot-1').props.style);

      expect(contrast(dot.backgroundColor, resolve(theme, 'background-basic-color-1'))).toBeGreaterThan(2.5);
    });
  });
});

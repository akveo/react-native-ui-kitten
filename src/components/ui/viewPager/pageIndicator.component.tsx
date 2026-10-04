/**
 * @license
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React, { memo, useCallback, useMemo } from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {
  buildAccessibilityProps,
  EvaStatus,
  LiteralUnion,
} from '../../devsupport';
import { useStyled, StyleType } from '../../theme';

export interface PageIndicatorProps extends ViewProps {
  /**
   * Number of pages, one dot each.
   */
  pageCount: number;
  /**
   * Index of the selected page. Defaults to 0.
   */
  selectedIndex?: number;
  /**
   * Fractional page position while the pager scrolls, e.g. `offset / pageWidth` from
   * `ViewPager.onOffsetChange`. The dots grow and shrink as the pages slide; without it
   * the selected dot switches when `selectedIndex` changes.
   */
  progress?: number;
  /**
   * Called with the index of a pressed dot.
   */
  onSelect?: (index: number) => void;
  /**
   * Appearance of the component. Defaults to *default*.
   */
  appearance?: LiteralUnion<'default'>;
  /**
   * Status of the component: the colour of the selected dot.
   * Can be `basic`, `primary`, `success`, `info`, `warning`, `danger` or `control`.
   * Defaults to *primary*.
   */
  status?: EvaStatus;
  /**
   * Style of every dot, merged after the mapping.
   */
  dotStyle?: StyleProp<ViewStyle>;
  /**
   * Accessible name of a dot, e.g. `(index, count) => \`Page ${index + 1} of ${count}\``.
   * Unset by default, since the library ships no translations.
   */
  dotAccessibilityLabel?: (index: number, pageCount: number) => string;
}

export type PageIndicatorElement = React.ReactElement<PageIndicatorProps>;

const clamp01 = (value: number): number => Math.min(1, Math.max(0, value));

/**
 * Dots that show which page of a ViewPager is visible and how many there are.
 *
 * @extends React.FC
 *
 * @property {number} pageCount - Number of pages, one dot each.
 *
 * @property {number} selectedIndex - Index of the selected page. Defaults to 0.
 *
 * @property {number} progress - Fractional page position while the pager scrolls
 * (`offset / pageWidth` from `ViewPager.onOffsetChange`), so the dots follow the swipe.
 *
 * @property {(number) => void} onSelect - Called with the index of a pressed dot.
 *
 * @property {string} status - Colour of the selected dot.
 * Can be `basic`, `primary`, `success`, `info`, `warning`, `danger` or `control`.
 * Defaults to *primary*.
 *
 * @property {StyleProp<ViewStyle>} dotStyle - Style of every dot, merged after the mapping.
 *
 * @property {(index, pageCount) => string} dotAccessibilityLabel - Accessible name of a dot.
 *
 * @property {ViewProps} ...ViewProps - Any props applied to View component.
 *
 * @overview-example ViewPagerIndicator
 * Feed `selectedIndex` from the pager and, for dots that follow the swipe, `progress` from
 * `onOffsetChange` divided by the pager width.
 */
const PageIndicatorComponent: React.FC<PageIndicatorProps> = ({
  pageCount,
  selectedIndex = 0,
  progress,
  onSelect,
  appearance,
  status,
  style,
  dotStyle,
  dotAccessibilityLabel,
  testID,
  ...viewProps
}) => {
  const { style: evaStyle } = useStyled('PageIndicator', { appearance, status });

  const componentStyle = useMemo(() => {
    const {
      dotWidth,
      dotHeight,
      dotBorderRadius,
      dotMarginHorizontal,
      dotBackgroundColor,
      selectedDotWidth,
      selectedDotBackgroundColor,
      ...containerParameters
    } = evaStyle as StyleType;

    return {
      container: containerParameters,
      dot: {
        width: dotWidth,
        height: dotHeight,
        borderRadius: dotBorderRadius,
        marginHorizontal: dotMarginHorizontal,
        backgroundColor: dotBackgroundColor,
      },
      selectedDot: {
        width: selectedDotWidth,
        backgroundColor: selectedDotBackgroundColor,
      },
    };
  }, [evaStyle]);

  // How selected a dot is, 0..1: exact with `selectedIndex`, fractional while the pager slides.
  const selectionOf = useCallback((index: number): number => {
    const position = Number.isFinite(progress) ? progress : selectedIndex;
    return 1 - clamp01(Math.abs(index - position));
  }, [progress, selectedIndex]);

  const dots = useMemo(() => Array.from({ length: Math.max(0, pageCount) }, (_, index) => index), [pageCount]);

  // Without `onSelect` the dots only show the position: screen readers get one element that names
  // the current page instead of a row of disabled buttons. With `onSelect` every dot is a button.
  const interactive = Boolean(onSelect);
  const currentIndex = Math.min(Math.max(0, Math.round(Number.isFinite(progress) ? progress : selectedIndex)), Math.max(0, pageCount - 1));
  const summaryProps = interactive || pageCount <= 0 ? {} : {
    accessible: true,
    accessibilityRole: 'text' as const,
    'aria-label': viewProps['aria-label']
      ?? viewProps.accessibilityLabel
      ?? dotAccessibilityLabel?.(currentIndex, pageCount)
      ?? `Page ${currentIndex + 1} of ${pageCount}`,
  };

  // Touch areas reach halfway to the neighbouring dot, so they meet without overlapping.
  const hitSlop = useMemo(() => {
    const horizontal = componentStyle.dot.marginHorizontal ?? 0;
    return { top: 8, bottom: 8, left: horizontal, right: horizontal };
  }, [componentStyle.dot.marginHorizontal]);

  return (
    <View
      {...viewProps}
      {...summaryProps}
      testID={testID}
      style={[styles.container, componentStyle.container, style]}
    >
      {dots.map((index) => {
        const selection = selectionOf(index);
        const selected = selection >= 0.5;
        const width = componentStyle.dot.width + (componentStyle.selectedDot.width - componentStyle.dot.width) * selection;

        const dotStyles = [
          componentStyle.dot,
          { width },
          selected && { backgroundColor: componentStyle.selectedDot.backgroundColor },
          dotStyle,
        ];

        if (!interactive) {
          // Plain views: nothing to press, and nothing for a screen reader to stop on.
          return (
            <View
              key={index}
              testID={testID && `@${testID}/dot-${index}`}
              importantForAccessibility='no'
              style={dotStyles}
            />
          );
        }

        return (
          <Pressable
            key={index}
            {...buildAccessibilityProps({
              role: 'button',
              selected,
              label: dotAccessibilityLabel?.(index, pageCount),
            }, {})}
            testID={testID && `@${testID}/dot-${index}`}
            hitSlop={hitSlop}
            onPress={() => onSelect?.(index)}
            style={dotStyles}
          />
        );
      })}
    </View>
  );
};

PageIndicatorComponent.displayName = 'PageIndicator';

export const PageIndicator = memo(PageIndicatorComponent);
PageIndicator.displayName = 'PageIndicator';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

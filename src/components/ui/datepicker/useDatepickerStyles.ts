/**
 * @license
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import { StyleType } from '../../theme';

/**
 * Space kept between the picker popover and each window edge when the window is narrower than
 * the mapping's `popoverWidth` (#1784).
 */
export const DATEPICKER_POPOVER_WINDOW_INSET = 8;

export interface DatepickerStyles {
  control: StyleType;
  text: StyleType;
  placeholder: StyleType;
  icon: StyleType;
  label: StyleType;
  captionLabel: StyleType;
  popover: StyleType;
}

export function useDatepickerStyles(evaStyle: StyleType): DatepickerStyles {
  const { width: windowWidth } = useWindowDimensions();

  return useMemo(() => {
    const {
      textMarginHorizontal,
      textFontFamily,
      textFontSize,
      textFontWeight,
      textColor,
      placeholderColor,
      iconWidth,
      iconHeight,
      iconMarginHorizontal,
      iconTintColor,
      labelColor,
      labelFontSize,
      labelMarginBottom,
      labelFontWeight,
      labelFontFamily,
      captionMarginTop,
      captionColor,
      captionFontSize,
      captionFontWeight,
      captionFontFamily,
      popoverWidth,
      ...controlParameters
    } = evaStyle;

    return {
      control: controlParameters,
      text: {
        marginHorizontal: textMarginHorizontal,
        fontFamily: textFontFamily,
        fontSize: textFontSize,
        fontWeight: textFontWeight,
        color: textColor,
      },
      placeholder: {
        marginHorizontal: textMarginHorizontal,
        fontFamily: textFontFamily,
        fontSize: textFontSize,
        fontWeight: textFontWeight,
        color: placeholderColor,
      },
      icon: {
        width: iconWidth,
        height: iconHeight,
        marginHorizontal: iconMarginHorizontal,
        tintColor: iconTintColor,
      },
      label: {
        color: labelColor,
        fontSize: labelFontSize,
        fontFamily: labelFontFamily,
        marginBottom: labelMarginBottom,
        fontWeight: labelFontWeight,
      },
      captionLabel: {
        marginTop: captionMarginTop,
        fontSize: captionFontSize,
        fontWeight: captionFontWeight,
        fontFamily: captionFontFamily,
        color: captionColor,
      },
      popover: {
        width: popoverWidth,
        // The calendar inside sizes the popover (its mapping width is 344); cap the popover at the
        // window so the calendar, which is `maxWidth: '100%'`, shrinks with it on narrow screens.
        maxWidth: windowWidth - 2 * DATEPICKER_POPOVER_WINDOW_INSET,
      },
    };
  }, [evaStyle, windowWidth]);
}

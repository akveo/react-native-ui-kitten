/**
 * @license
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { useMemo } from 'react';
import { StyleType } from '../../theme';

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
        fontSize: captionFontSize,
        fontWeight: captionFontWeight,
        fontFamily: captionFontFamily,
        color: captionColor,
      },
      popover: {
        width: popoverWidth,
        marginBottom: captionMarginTop,
      },
    };
  }, [evaStyle]);
}

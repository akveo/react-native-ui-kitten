/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { StyleType } from '../../theme';

export const getComponentStyle = ({
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
}: StyleType): StyleType => ({
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
});

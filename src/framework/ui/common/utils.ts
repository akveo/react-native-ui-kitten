import { StyleType } from '@kitten/theme';

const DEFAULT_TEXT_SIZE_DEPENDENCY_COEFFICIENT: number = 1.22;

export const processTextStyles = (style: StyleType,
                                  allowSizeFormatting: boolean = false): StyleType | null => {

  if (!style) {
    return null;
  }
  if (!('fontSize' in style) && ('lineHeight' in style) && allowSizeFormatting) {
    return {
      ...style,
      fontSize: style.lineHeight / DEFAULT_TEXT_SIZE_DEPENDENCY_COEFFICIENT,
    };
  } else if (('fontSize' in style) && !('lineHeight' in style)) {
    return {
      ...style,
      lineHeight: style.fontSize * DEFAULT_TEXT_SIZE_DEPENDENCY_COEFFICIENT,
    };
  } else {
    return style;
  }
};

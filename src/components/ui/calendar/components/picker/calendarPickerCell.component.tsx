/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React, { useCallback, useMemo } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';
import {
  buildAccessibilityProps,
  TouchableWithoutFeedback,
} from '../../../../devsupport';
import {
  useStyled,
  StyleType,
} from '../../../../theme';
import { CalendarDateInfo } from '../../type';

type ChildrenProp<D> = (date: CalendarDateInfo<D>, style: StyleType) => React.ReactElement;

export interface CalendarPickerCellProps<D> {
  date: CalendarDateInfo<D>;
  selected?: boolean;
  bounding?: boolean;
  today?: boolean;
  range?: boolean;
  firstRangeItem?: boolean;
  lastRangeItem?: boolean;
  onSelect?: (date: CalendarDateInfo<D>) => void;
  children: ChildrenProp<D>;
  shouldComponentUpdate?: (props: CalendarPickerCellProps<D>, nextProps: CalendarPickerCellProps<D>) => boolean;
  style?: StyleProp<TextStyle>;
  disabled?: boolean;
}

export type CalendarPickerCellElement<D> = React.ReactElement<CalendarPickerCellProps<D>>;

const getContainerBorderRadius = (
  borderRadius: number,
  firstRangeItem?: boolean,
  lastRangeItem?: boolean
): StyleType => {
  const borderStyle = {
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
  };

  if (firstRangeItem) {
    borderStyle.borderBottomLeftRadius = borderRadius;
    borderStyle.borderTopLeftRadius = borderRadius;
  }

  if (lastRangeItem) {
    borderStyle.borderBottomRightRadius = borderRadius;
    borderStyle.borderTopRightRadius = borderRadius;
  }

  return borderStyle;
};

const getComponentStyle = (
  source: StyleType,
  firstRangeItem?: boolean,
  lastRangeItem?: boolean
): StyleType => {
  const {
    contentBorderWidth,
    contentBorderRadius,
    contentBorderColor,
    contentBackgroundColor,
    contentTextFontSize,
    contentTextFontWeight,
    contentTextColor,
    contentTextFontFamily,
    borderRadius,
    ...containerParameters
  } = source;

  return {
    container: {
      ...containerParameters,
      ...getContainerBorderRadius(borderRadius, firstRangeItem, lastRangeItem),
    },
    contentContainer: {
      borderWidth: contentBorderWidth,
      borderRadius: contentBorderRadius,
      borderColor: contentBorderColor,
      backgroundColor: contentBackgroundColor,
    },
    contentText: {
      fontSize: contentTextFontSize,
      fontWeight: contentTextFontWeight,
      color: contentTextColor,
      fontFamily: contentTextFontFamily,
    },
  };
};

// Not using React.memo - the parent CalendarPicker handles optimization via shouldItemUpdate
function CalendarPickerCellComponent<D>({
  style,
  date,
  bounding,
  children,
  selected,
  today,
  range,
  firstRangeItem,
  lastRangeItem,
  onSelect,
  disabled,
  ...touchableProps
}: CalendarPickerCellProps<D>): React.ReactElement<TouchableOpacityProps> {
  const { style: evaStyleRaw } = useStyled('CalendarCell', {
    selected,
    bounding,
    today,
    range,
    disabled,
  });

  const evaStyle = useMemo(
    () => getComponentStyle(evaStyleRaw, firstRangeItem, lastRangeItem),
    [evaStyleRaw, firstRangeItem, lastRangeItem]
  );

  const onPress = useCallback((): void => {
    onSelect?.(date);
  }, [onSelect, date]);

  const renderContentElement = (source: ChildrenProp<D>): React.ReactElement => {
    return source?.(date, {
      container: evaStyle.contentContainer,
      text: evaStyle.contentText,
    });
  };

  return (
    <TouchableWithoutFeedback
      {...touchableProps}
      {...buildAccessibilityProps({
        role: 'button',
        selected: Boolean(selected),
        disabled: Boolean(disabled),
      })}
      disabled={disabled}
      style={[evaStyle.container, styles.container, style]}
      onPress={onPress}
    >
      {renderContentElement(children)}
    </TouchableWithoutFeedback>
  );
}

export const CalendarPickerCell = CalendarPickerCellComponent as <D>(
  props: CalendarPickerCellProps<D>
) => React.ReactElement<TouchableOpacityProps>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

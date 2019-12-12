/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {
  styled,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import { CalendarDateInfo } from '../../type';

type ChildrenProp<D> = (date: CalendarDateInfo<D>, style: StyleType) => React.ReactElement;

export interface CalendarPickerCellProps<D> extends StyledComponentProps, TouchableOpacityProps {
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
}

export type CalendarPickerCellElement<D> = React.ReactElement<CalendarPickerCellProps<D>>;

class CalendarPickerCellComponent<D> extends React.Component<CalendarPickerCellProps<D>> {

  static styledComponentName: string = 'CalendarCell';

  public shouldComponentUpdate(nextProps: CalendarPickerCellProps<D>): boolean {
    if (nextProps.shouldComponentUpdate) {
      return nextProps.shouldComponentUpdate(this.props, nextProps);
    }
    return true;
  }

  private onPress = (): void => {
    if (this.props.onSelect) {
      this.props.onSelect(this.props.date);
    }
  };

  private getContainerBorderRadius = (borderRadius: number): StyleType => {
    const { firstRangeItem, lastRangeItem } = this.props;

    if (firstRangeItem) {
      return {
        borderBottomLeftRadius: borderRadius,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: 0,
      };
    }
    if (lastRangeItem) {
      return {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: borderRadius,
        borderTopLeftRadius: 0,
        borderTopRightRadius: borderRadius,
      };
    }

    return {};
  };

  private getComponentStyle = (source: StyleType): StyleType => {
    const {
      contentBorderWidth,
      contentBorderRadius,
      contentBorderColor,
      contentBackgroundColor,
      contentTextFontSize,
      contentTextLineHeight,
      contentTextFontWeight,
      contentTextColor,
      contentTextFontFamily,
      borderRadius,
      ...containerParameters
    } = source;

    return {
      container: {
        ...containerParameters,
        ...this.getContainerBorderRadius(borderRadius),
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
        lineHeight: contentTextLineHeight,
        color: contentTextColor,
        fontFamily: contentTextFontFamily,
      },
    };
  };

  private renderContentElement = (source: ChildrenProp<D>, style: StyleType): React.ReactElement => {
    return source && source(this.props.date, {
      container: style.contentContainer,
      text: style.contentText,
    });
  };

  public render(): React.ReactElement<TouchableOpacityProps> {
    const { style, themedStyle, date, bounding, children, ...restProps } = this.props;
    const { container, ...componentStyles } = this.getComponentStyle(themedStyle);

    return (
      <TouchableOpacity
        activeOpacity={1.0}
        onPress={this.onPress}
        {...restProps}
        style={[container, styles.container, style]}>
        {this.renderContentElement(children, componentStyles)}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export const CalendarPickerCell = styled(CalendarPickerCellComponent);

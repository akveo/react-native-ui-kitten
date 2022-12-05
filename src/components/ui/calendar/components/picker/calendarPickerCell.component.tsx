/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';
import { TouchableWithoutFeedback } from '../../../../devsupport';
import {
  styled,
  StyledComponentProps,
  StyleType,
} from '../../../../theme';
import { CalendarDateInfo } from '../../type';

type ChildrenProp<D> = (date: CalendarDateInfo<D>, style: StyleType) => React.ReactElement;

export interface CalendarPickerCellProps<D> extends StyledComponentProps {
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

@styled('CalendarCell')
export class CalendarPickerCell<D> extends React.Component<CalendarPickerCellProps<D>> {

  public shouldComponentUpdate(nextProps: CalendarPickerCellProps<D>): boolean {
    if (nextProps.shouldComponentUpdate) {
      return nextProps.shouldComponentUpdate(this.props, nextProps);
    }
    return true;
  }

  private onPress = (): void => {
    this.props.onSelect?.(this.props.date);
  };

  private getContainerBorderRadius = (borderRadius: number): StyleType => {
    const { firstRangeItem, lastRangeItem } = this.props;

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

  private getComponentStyle = (source: StyleType): StyleType => {
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
        color: contentTextColor,
        fontFamily: contentTextFontFamily,
      },
    };
  };

  private renderContentElement = (source: ChildrenProp<D>, evaStyle): React.ReactElement => {
    return source?.(this.props.date, {
      container: evaStyle.contentContainer,
      text: evaStyle.contentText,
    });
  };

  public render(): React.ReactElement<TouchableOpacityProps> {
    const { eva, style, date, bounding, children, ...touchableProps } = this.props;
    const evaStyle = this.getComponentStyle(eva.style);

    return (
      <TouchableWithoutFeedback
        {...touchableProps}
        style={[evaStyle.container, styles.container, style]}
        onPress={this.onPress}
      >
        {this.renderContentElement(children, evaStyle)}
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

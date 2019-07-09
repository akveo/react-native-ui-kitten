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

type ChildrenProp<D> = (date: D, style: StyleType) => React.ReactElement<any>;

interface ComponentProps<D> extends TouchableOpacityProps {
  date: D;
  selected?: boolean;
  today?: boolean;
  onSelect?: (date: D) => void;
  children: ChildrenProp<D>;
  shouldComponentUpdate?: (props: CalendarPickerCellProps<D>, nextProps: CalendarPickerCellProps<D>) => boolean;
}

export type CalendarPickerCellProps<D> = StyledComponentProps & ComponentProps<D>;
export type CalendarPickerCellElement<D> = React.ReactElement<CalendarPickerCellProps<D>>;

class CalendarPickerCellComponent<D> extends React.Component<CalendarPickerCellProps<D>> {

  static styledComponentName: string = 'CalendarCell';

  static defaultProps = {
    selected: false,
    today: false,
  };

  public shouldComponentUpdate(nextProps: CalendarPickerCellProps<D>): boolean {
    if (nextProps.shouldComponentUpdate) {
      return nextProps.shouldComponentUpdate(this.props, nextProps);
    }
    return true;
  }

  private onPress = () => {
    if (this.props.onSelect) {
      this.props.onSelect(this.props.date);
    }
  };

  private getComponentStyle = (source: StyleType): StyleType => {
    const {
      contentBorderRadius,
      contentBorderColor,
      contentBackgroundColor,
      contentTextFontSize,
      contentTextLineHeight,
      contentTextFontWeight,
      contentTextColor,
      ...containerParameters
    } = source;

    return {
      container: containerParameters,
      contentContainer: {
        borderRadius: contentBorderRadius,
        borderColor: contentBorderColor,
        backgroundColor: contentBackgroundColor,
      },
      contentText: {
        fontSize: contentTextFontSize,
        fontWeight: contentTextFontWeight,
        lineHeight: contentTextLineHeight,
        color: contentTextColor,
      },
    };
  };

  private renderContentElement = (source: ChildrenProp<D>, style: StyleType): React.ReactElement<any> => {
    return source(this.props.date, {
      container: style.contentContainer,
      text: style.contentText,
    });
  };

  public render(): React.ReactElement<TouchableOpacityProps> {
    const { style, themedStyle, date, children, ...restProps } = this.props;

    const { container, ...componentStyles } = this.getComponentStyle(themedStyle);
    const contentElement: React.ReactElement<any> = date && this.renderContentElement(children, componentStyles);

    return (
      <TouchableOpacity
        activeOpacity={1.0}
        onPress={this.onPress}
        {...restProps}
        style={[container, styles.container, style]}>
        {contentElement}
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

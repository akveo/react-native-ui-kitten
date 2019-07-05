/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {
  styled,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';

type CalendarDayContentElement = React.ReactElement<any>;
type ChildrenProp<D> = (date: D, style: StyleType) => CalendarDayContentElement;

interface ComponentProps<D> extends TouchableOpacityProps {
  date: D;
  selectedDate: D;
  selected?: boolean;
  onSelect?: (date: D) => void;
  children: ChildrenProp<D>;
  shouldComponentUpdate?: (prevProps: CalendarDayProps<D>, nextProps: CalendarDayProps<D>) => boolean;
}

export type CalendarDayProps<D> = StyledComponentProps & ComponentProps<D>;
export type CalendarDayElement<D> = React.ReactElement<CalendarDayProps<D>>;

/**
 * Calendar Day component. Styled by Eva Design System (CalendarCell)
 * Used to provide Eva styles to children.
 *
 * @extends React.Component
 *
 * @property {D} date - Date displayed by a component
 *
 * @property {D} selectedDate - date which is now currently selected.
 * Usable with `shouldComponentUpdate` prop.
 *
 * @property {boolean} selected - selection flag.
 * Allows Eva to determine selection changes and provide corresponding styles.
 *
 * @property {(date: D) => void} onSelect - selection emitter.
 * Fires when component is pressed.
 *
 * @property {(date: D, style: StyleType) => ReactElement<any>} children - Render Prop.
 * Should return the content of a component.
 *
 * @property {(prevProps: CalendarDayProps<D>, nextProps: CalendarDayProps<D>) => boolean} shouldComponentUpdate -
 * Delegates `shouldComponentUpdate` lifecycle.
 * This is optional but can be useful when optimizing performance.
 */

class CalendarDayComponent<D> extends React.Component<CalendarDayProps<D>> {

  static styledComponentName: string = 'CalendarCell';

  static defaultProps = {
    selected: false,
  };

  public shouldComponentUpdate(nextProps: CalendarDayProps<D>): boolean {
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

  private renderContentElement = (source: ChildrenProp<D>, style: StyleType): CalendarDayContentElement => {
    return source(this.props.date, {
      container: style.contentContainer,
      text: style.contentText,
    });
  };

  public render(): React.ReactElement<TouchableOpacityProps> {
    const { style, themedStyle, date, children, ...restProps } = this.props;

    const { container, ...componentStyles } = this.getComponentStyle(themedStyle);
    const contentElement: CalendarDayContentElement = date && this.renderContentElement(children, componentStyles);

    return (
      <TouchableOpacity
        activeOpacity={1.0}
        onPress={this.onPress}
        {...restProps}
        style={[container, style]}>
        {contentElement}
      </TouchableOpacity>
    );
  }
}

export const CalendarDay = styled(CalendarDayComponent);

import React from 'react';
import {
  ImageStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ImageProps,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import {
  Text,
  TextElement,
} from '../text/text.component';
import { Popover } from '../popover/popover.component';
import { CalendarElement } from '../calendar/calendar.component';
import { RangeCalendarElement } from '../calendar/rangeCalendar.component';
import {
  Interaction,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import { Dimensions } from 'react-native';

interface State {
  visible: boolean;
}

export interface ComponentProps {
  icon?: (style: ImageStyle) => React.ReactElement<ImageProps>;
}

export type DatepickerProps<D> = ComponentProps & StyledComponentProps & TouchableOpacityProps;

export abstract class BaseDatepickerComponent<D, P> extends React.Component<DatepickerProps<D> & P, State> {

  public state: State = {
    visible: false,
  };

  public abstract getComponentTitle(): string;

  public abstract renderCalendar(): CalendarElement<D> | RangeCalendarElement<D>;

  private getComponentStyles = (style: StyleType): StyleType => {
    const {
      popoverMarginHorizontal,
      textFontSize,
      textLineHeight,
      textFontWeight,
      textColor,
      iconWidth,
      iconHeight,
      iconTintColor,
      ...containerStyles
    } = style;

    return {
      container: containerStyles,
      icon: {
        width: iconWidth,
        height: iconHeight,
        tintColor: iconTintColor,
      },
      text: {
        fontSize: textFontSize,
        lineHeight: textLineHeight,
        fontWeight: textFontWeight,
        color: textColor,
      },
      popover: {
        indent: popoverMarginHorizontal,
      },
    };
  };

  private onPressIn = (event: GestureResponderEvent) => {
    this.props.dispatch([Interaction.ACTIVE]);

    if (this.props.onPressIn) {
      this.props.onPressIn(event);
    }
  };

  private onPressOut = (event: GestureResponderEvent) => {
    this.props.dispatch([]);

    if (this.props.onPressOut) {
      this.props.onPressOut(event);
    }
  };

  private toggleVisible = (): void => {
    const visible: boolean = !this.state.visible;

    this.setState({ visible }, this.dispatchActive);
  };

  private dispatchActive = (): void => {
    const { visible } = this.state;
    if (visible) {
      this.props.dispatch([Interaction.ACTIVE]);
    } else {
      this.props.dispatch([]);
    }
  };

  public formatDateToString(date: D): string {
    const selectedDate: Date = new Date(Date.parse(date.toString()));
    const day: number = selectedDate.getDate();
    const month: number = selectedDate.getMonth() + 1;
    const year: number = selectedDate.getFullYear();

    return `${day}/${month}/${year}`;
  }

  private renderIcon = (style: StyleType): React.ReactElement<ImageProps> => {
    const { icon } = this.props;

    return icon && icon(style);
  };

  private renderText = (style: StyleType): TextElement => {
    return (
      <Text style={style}>
        {this.getComponentTitle()}
      </Text>
    );
  };

  private renderControl = (): React.ReactElement<TouchableOpacityProps> => {
    const { themedStyle, disabled, style } = this.props;
    const { container, icon, text } = this.getComponentStyles(themedStyle);

    return (
      <TouchableOpacity
        activeOpacity={1.0}
        disabled={disabled}
        style={[container, styles.container, style]}
        onPress={this.toggleVisible}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}>
        {this.renderText(text)}
        {this.renderIcon(icon)}
      </TouchableOpacity>
    );
  };

  public render(): React.ReactNode {
    const { themedStyle } = this.props;
    const { popover } = this.getComponentStyles(themedStyle);

    const popoverStyle: StyleType = {
      width: Dimensions.get('window').width - popover.indent,
      maxWidth: Dimensions.get('window').width - popover.indent,
    };

    return (
      <Popover
        style={popoverStyle}
        visible={this.state.visible}
        content={this.renderCalendar()}
        onBackdropPress={this.toggleVisible}>
        {this.renderControl()}
      </Popover>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});


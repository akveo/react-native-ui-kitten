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
import { BaseCalendarProps } from '../calendar/baseCalendar.component';
import { NativeDateService } from '../calendar/service/nativeDate.service';
import { CalendarElement } from '../calendar/calendar.component';
import { RangeCalendarElement } from '../calendar/rangeCalendar.component';
import {
  Interaction,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import { Dimensions } from 'react-native';

const FULL_DATE_FORMAT_STRING: string = 'DD/MM/YYYY';

interface State {
  visible: boolean;
}

export interface ComponentProps {
  icon?: (style: ImageStyle) => React.ReactElement<ImageProps>;
}

export type DatepickerProps<D> =
  ComponentProps &
  StyledComponentProps &
  TouchableOpacityProps &
  BaseCalendarProps<D>;

export abstract class BaseDatepickerComponent<D, P> extends React.Component<DatepickerProps<D> & P, State> {

  static defaultProps = {
    dateService: new NativeDateService(),
  };

  public state: State = {
    visible: false,
  };

  protected abstract getComponentTitle(): string;

  protected abstract renderCalendar(): CalendarElement<D> | RangeCalendarElement<D>;

  protected formatDateToString(date: D): string {
    return this.props.dateService.format(date, FULL_DATE_FORMAT_STRING);
  }

  private getComponentStyles = (style: StyleType): StyleType => {
    const {
      popoverMarginHorizontal,
      textFontSize,
      textLineHeight,
      textFontWeight,
      textFontFamily,
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
        fontFamily: textFontFamily,
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


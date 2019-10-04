import React from 'react';
import {
  ImageStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ImageProps,
  StyleSheet,
  GestureResponderEvent,
  Dimensions,
} from 'react-native';
import {
  Interaction,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import {
  Text,
  TextElement,
} from '../text/text.component';
import {
  Popover,
  PopoverElement,
} from '../popover/popover.component';
import { BaseCalendarProps } from '../calendar/baseCalendar.component';
import { NativeDateService } from '../calendar/service/nativeDate.service';
import { CalendarElement } from '../calendar/calendar.component';
import { RangeCalendarElement } from '../calendar/rangeCalendar.component';

const FULL_DATE_FORMAT_STRING: string = 'DD/MM/YYYY';

interface State {
  visible: boolean;
}

export interface ComponentProps {
  icon?: (style: ImageStyle) => React.ReactElement<ImageProps>;
}

export type DatepickerProps<D> =
  ComponentProps
  & StyledComponentProps
  & TouchableOpacityProps
  & BaseCalendarProps<D>;

export type DatepickerElement<D> = React.ReactElement<DatepickerProps<D>>;

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

  private onPressIn = (event: GestureResponderEvent): void => {
    this.props.dispatch([Interaction.ACTIVE]);

    if (this.props.onPressIn) {
      this.props.onPressIn(event);
    }
  };

  private onPressOut = (event: GestureResponderEvent): void => {
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
    if (this.state.visible) {
      this.props.dispatch([Interaction.ACTIVE]);
    } else {
      this.props.dispatch([]);
    }
  };

  private renderIcon = (style: StyleType): React.ReactElement<ImageProps> => {
    return this.props.icon && this.props.icon(style);
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

  public render(): PopoverElement {
    const { popover } = this.getComponentStyles(this.props.themedStyle);

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


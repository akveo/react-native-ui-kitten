import React from 'react';
import {
  GestureResponderEvent,
  ImageProps,
  ImageStyle,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
  ViewStyle,
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
import { Popover } from '../popover/popover.component';
import { BaseCalendarProps } from '../calendar/baseCalendar.component';
import { NativeDateService } from '../calendar/service/nativeDate.service';
import { CalendarElement } from '../calendar/calendar.component';
import { RangeCalendarElement } from '../calendar/rangeCalendar.component';
import { PopoverPlacements } from '@kitten/ui/popover/type';

const FULL_DATE_FORMAT_STRING: string = 'DD/MM/YYYY';

type DatepickerChildren<D = Date> = [CalendarElement<D>, React.ReactElement];

interface State {
  visible: boolean;
}

export interface ComponentProps {
  controlStyle?: StyleProp<ViewStyle>;
  icon?: (style: ImageStyle) => React.ReactElement<ImageProps>;
  status?: string;
  size?: string;
  placeholder?: string;
}

export type BaseDatepickerProps<D = Date> =
  StyledComponentProps
  & TouchableOpacityProps
  & BaseCalendarProps<D>
  & ComponentProps;

export abstract class BaseDatepickerComponent<P, D = Date> extends React.Component<BaseDatepickerProps<D> & P, State> {

  static defaultProps: Partial<BaseDatepickerProps> = {
    dateService: new NativeDateService(),
    placeholder: 'dd/mm/yyyy',
  };

  public state: State = {
    visible: false,
  };

  protected abstract getComponentTitle(): string;

  protected abstract renderCalendar(): CalendarElement<D> | RangeCalendarElement<D>;

  protected formatDateToString(date: D): string {
    return this.props.dateService.format(date, FULL_DATE_FORMAT_STRING);
  }

  private getComponentStyle = (style: StyleType): StyleType => {
    const {
      textFontSize,
      textLineHeight,
      textFontWeight,
      textFontFamily,
      textColor,
      iconWidth,
      iconHeight,
      iconTintColor,
      popoverWidth,
      ...containerStyles
    } = style;

    return {
      control: containerStyles,
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
        width: popoverWidth,
      },
    };
  };

  private onPress = (event: GestureResponderEvent): void => {
    this.setVisibility();

    if (this.props.onPress) {
      this.props.onPress(event);
    }
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

  private setVisibility = (): void => {
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

  private renderIconElement = (style: StyleType): React.ReactElement<ImageProps> => {
    const iconElement: React.ReactElement<ImageProps> = this.props.icon(style);

    return React.cloneElement(iconElement, {
      style: [style, iconElement.props.style],
    });
  };

  private renderTextElement = (style: StyleType): TextElement => {
    return (
      <Text
        style={style}
        numberOfLines={1}
        ellipsizeMode='tail'>
        {this.getComponentTitle()}
      </Text>
    );
  };

  private renderControlChildren = (style: StyleType): React.ReactNodeArray => {
    return [
      this.props.icon && this.renderIconElement(style.icon),
      this.renderTextElement(style.text),
    ];
  };

  private renderControlElement = (style: StyleType): React.ReactElement<TouchableOpacityProps> => {
    const { themedStyle, controlStyle, ...restProps } = this.props;
    const [iconElement, textElement] = this.renderControlChildren(style);

    return (
      <TouchableOpacity
        {...restProps}
        activeOpacity={1.0}
        style={[styles.control, style.control, controlStyle]}
        onPress={this.onPress}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}>
        {textElement}
        {iconElement}
      </TouchableOpacity>
    );
  };

  private renderComponentChildren = (style: StyleType): DatepickerChildren<D> => {
    return [
      this.renderCalendar(),
      this.renderControlElement(style),
    ];
  };

  public render(): React.ReactElement<ViewProps> {
    const { themedStyle, style } = this.props;
    const { popover, ...componentStyle }: StyleType = this.getComponentStyle(themedStyle);

    const [calendarElement, controlElement] = this.renderComponentChildren(componentStyle);

    return (
      <View style={style}>
        <Popover
          style={[popover, styles.popover]}
          placement={PopoverPlacements.BOTTOM_START}
          visible={this.state.visible}
          content={calendarElement}
          onBackdropPress={this.setVisibility}>
          {controlElement}
        </Popover>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  control: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  popover: {
    borderWidth: 0,
  },
});


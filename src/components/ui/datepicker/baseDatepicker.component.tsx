import React from 'react';
import {
  GestureResponderEvent,
  ImageProps,
  ImageStyle,
  StyleProp,
  StyleSheet,
  TextStyle,
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
import { IconElement } from '../icon/icon.component';
import { Popover } from '../popover/popover.component';
import { BaseCalendarProps } from '../calendar/baseCalendar.component';
import { CalendarElement } from '../calendar/calendar.component';
import { RangeCalendarElement } from '../calendar/rangeCalendar.component';
import { NativeDateService } from '../calendar/service/nativeDate.service';
import { isValidString } from '../support/services';
import {
  PopoverPlacement,
  PopoverPlacements,
} from '../popover/type';

type IconProp = (style: StyleType) => IconElement;

export interface BaseDatepickerProps<D = Date> extends StyledComponentProps,
  TouchableOpacityProps,
  BaseCalendarProps<D> {

  controlStyle?: StyleProp<ViewStyle>;
  label?: string;
  caption?: string;
  captionIcon?: IconProp;
  icon?: (style: ImageStyle) => React.ReactElement<ImageProps>;
  status?: string;
  size?: string;
  placeholder?: string;
  labelStyle?: StyleProp<TextStyle>;
  captionStyle?: StyleProp<TextStyle>;
  placement?: PopoverPlacement | string;
  backdropStyle?: StyleProp<ViewStyle>;
  onFocus?: () => void;
  onBlur?: () => void;
}

interface State {
  visible: boolean;
}

export abstract class BaseDatepickerComponent<P, D = Date> extends React.Component<BaseDatepickerProps<D> & P, State> {

  static defaultProps: Partial<BaseDatepickerProps> = {
    dateService: new NativeDateService(),
    placeholder: 'dd/mm/yyyy',
    placement: PopoverPlacements.BOTTOM_START,
  };

  public state: State = {
    visible: false,
  };

  private popoverRef: React.RefObject<Popover> = React.createRef();

  public show = (): void => {
    this.popoverRef.current.show();
  };

  public hide = (): void => {
    this.popoverRef.current.hide();
  };

  public focus = (): void => {
    this.setState({ visible: true }, this.onPickerVisible);
  };

  public blur = (): void => {
    this.setState({ visible: false }, this.onPickerInvisible);
  };

  public isFocused = (): boolean => {
    return this.state.visible;
  };

  public abstract clear(): void;

  protected abstract getComponentTitle(): string;

  protected abstract renderCalendar(): CalendarElement<D> | RangeCalendarElement<D>;

  private getComponentStyle = (style: StyleType): StyleType => {
    const {
      textMarginHorizontal,
      textFontFamily,
      textFontSize,
      textLineHeight,
      textFontWeight,
      textColor,
      placeholderColor,
      iconWidth,
      iconHeight,
      iconMarginHorizontal,
      iconTintColor,
      labelColor,
      labelFontSize,
      labelLineHeight,
      labelMarginBottom,
      labelFontWeight,
      captionMarginTop,
      captionColor,
      captionFontSize,
      captionLineHeight,
      captionFontWeight,
      captionIconWidth,
      captionIconHeight,
      captionIconMarginRight,
      captionIconTintColor,
      popoverWidth,
      ...controlParameters
    } = style;

    return {
      control: controlParameters,
      captionContainer: {
        marginTop: captionMarginTop,
      },
      text: {
        marginHorizontal: textMarginHorizontal,
        fontFamily: textFontFamily,
        fontSize: textFontSize,
        fontWeight: textFontWeight,
        lineHeight: textLineHeight,
        color: textColor,
      },
      placeholder: {
        marginHorizontal: textMarginHorizontal,
        color: placeholderColor,
      },
      icon: {
        width: iconWidth,
        height: iconHeight,
        marginHorizontal: iconMarginHorizontal,
        tintColor: iconTintColor,
      },
      label: {
        color: labelColor,
        fontSize: labelFontSize,
        lineHeight: labelLineHeight,
        marginBottom: labelMarginBottom,
        fontWeight: labelFontWeight,
      },
      captionIcon: {
        width: captionIconWidth,
        height: captionIconHeight,
        tintColor: captionIconTintColor,
        marginRight: captionIconMarginRight,
      },
      captionLabel: {
        fontSize: captionFontSize,
        fontWeight: captionFontWeight,
        lineHeight: captionLineHeight,
        color: captionColor,
      },
      popover: {
        width: popoverWidth,
        marginBottom: captionMarginTop,
      },
    };
  };

  private onPress = (event: GestureResponderEvent): void => {
    this.setPickerVisible();

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

  private onPickerVisible = (): void => {
    this.props.dispatch([Interaction.ACTIVE]);

    if (this.props.onFocus) {
      this.props.onFocus();
    }
  };

  private onPickerInvisible = (): void => {
    this.props.dispatch([]);

    if (this.props.onBlur) {
      this.props.onBlur();
    }
  };

  private setPickerVisible = (): void => {
    this.setState({ visible: true }, this.onPickerVisible);
  };

  private setPickerInvisible = (): void => {
    this.setState({ visible: false }, this.onPickerInvisible);
  };

  private renderIconElement = (style: StyleType): React.ReactElement<ImageProps> => {
    const iconElement: React.ReactElement<ImageProps> = this.props.icon(style);

    return React.cloneElement(iconElement, {
      style: [style, iconElement.props.style],
    });
  };

  private renderLabelElement = (style: TextStyle): TextElement => {
    return (
      <Text
        key={1}
        style={[style, styles.label, this.props.labelStyle]}>
        {this.props.label}
      </Text>
    );
  };

  private renderCaptionElement = (style: TextStyle): TextElement => {
    return (
      <Text
        key={2}
        style={[style, styles.captionLabel, this.props.captionStyle]}>
        {this.props.caption}
      </Text>
    );
  };

  private renderCaptionIconElement = (style: ImageStyle): IconElement => {
    const iconElement: IconElement = this.props.captionIcon(style);

    return React.cloneElement(iconElement, {
      key: 3,
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

  private renderComponentChildren = (style: StyleType): React.ReactElement[] => {
    return [
      this.renderCalendar(),
      isValidString(this.props.label) && this.renderLabelElement(style.label),
      this.renderControlElement(style),
      isValidString(this.props.caption) && this.renderCaptionElement(style.captionLabel),
      this.props.captionIcon && this.renderCaptionIconElement(style.captionIcon),
    ];
  };

  public render(): React.ReactElement<ViewProps> {
    const { themedStyle, style, placement, backdropStyle } = this.props;
    const { popover, ...componentStyle }: StyleType = this.getComponentStyle(themedStyle);

    const [
      calendarElement,
      labelElement,
      controlElement,
      captionElement,
      captionIconElement,
    ] = this.renderComponentChildren(componentStyle);

    return (
      <View style={style}>
        {labelElement}
        <Popover
          ref={this.popoverRef}
          style={[popover, styles.popover]}
          backdropStyle={backdropStyle}
          placement={placement}
          visible={this.state.visible}
          content={calendarElement}
          onBackdropPress={this.setPickerInvisible}>
          {controlElement}
        </Popover>
        <View style={[componentStyle.captionContainer, styles.captionContainer]}>
          {captionIconElement}
          {captionElement}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  popover: {
    borderWidth: 0,
  },
  control: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    textAlign: 'left',
  },
  captionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  captionLabel: {
    textAlign: 'left',
  },
});

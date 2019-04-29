import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  GestureResponderEvent,
  StyleSheet,
  ImageProps,
  StyleProp,
  TextStyle,
} from 'react-native';
import {
  StyledComponentProps,
  StyleType,
  Interaction,
  styled,
} from '@kitten/theme';
import {
  Text as TextComponent,
  Props as TextProps,
} from '../text/text.component';
import {
  ButtonIconAlignment,
  ButtonIconAlignments,
} from './type';

interface ButtonProps {
  textStyle?: StyleProp<TextStyle>;
  icon?: (style: StyleType) => React.ReactElement<ImageProps>;
  status?: string;
  size?: string;
  iconAlignment?: string | ButtonIconAlignment;
  children?: React.ReactText;
}

const Text = styled<TextProps>(TextComponent);

export type Props = ButtonProps & StyledComponentProps & TouchableOpacityProps;

const ALIGNMENT_DEFAULT: ButtonIconAlignment = ButtonIconAlignments.LEFT;

export class Button extends React.Component<Props> {

  static styledComponentName: string = 'Button';

  static defaultProps: Partial<Props> = {
    iconAlignment: 'left',
  };

  private onPress = (event: GestureResponderEvent) => {
    if (this.props.onPress) {
      this.props.onPress(event);
    }
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

  private getComponentStyle = (style: StyleType): StyleType => {
    const { style: containerStyle, textStyle } = this.props;

    const {
      textColor,
      textFontSize,
      textLineHeight,
      textFontWeight,
      textMarginHorizontal,
      iconWidth,
      iconHeight,
      iconTintColor,
      iconMarginHorizontal,
      ...containerParameters
    } = style;

    const { iconAlignment } = this.props;

    const alignment: ButtonIconAlignment = ButtonIconAlignments.parse(iconAlignment, ALIGNMENT_DEFAULT);

    return {
      container: {
        ...containerParameters,
        ...StyleSheet.flatten(containerStyle),
        ...styles.container,
        flexDirection: alignment.flex(),
      },
      text: {
        color: textColor,
        fontSize: textFontSize,
        lineHeight: textLineHeight,
        fontWeight: textFontWeight,
        marginHorizontal: textMarginHorizontal,
        ...StyleSheet.flatten(textStyle),
        ...styles.text,
      },
      icon: {
        width: iconWidth,
        height: iconHeight,
        tintColor: iconTintColor,
        marginHorizontal: iconMarginHorizontal,
        ...styles.icon,
      },
    };
  };

  private renderTextElement = (style: StyleType): React.ReactElement<TextProps> => {
    const { children: text } = this.props;

    return (
      <Text
        style={style}
        key={1}>
        {text}
      </Text>
    );
  };

  private renderImageElement = (style: StyleType): React.ReactElement<ImageProps> | null => {
    const { icon } = this.props;
    return icon ? React.cloneElement(icon(style), { key: 2 }) : null;
  };

  private renderComponentChildren = (style: StyleType): React.ReactNode => {
    const { icon, children } = this.props;

    const hasIcon: boolean = icon !== undefined;
    const hasText: boolean = children !== undefined;

    return [
      hasIcon ? this.renderImageElement(style.icon) : undefined,
      hasText ? this.renderTextElement(style.text) : undefined,
    ];
  };

  public render(): React.ReactElement<TouchableOpacityProps> {
    const { themedStyle, ...derivedProps } = this.props;
    const { container, ...componentStyles } = this.getComponentStyle(themedStyle);
    const componentChildren: React.ReactNode = this.renderComponentChildren(componentStyles);

    return (
      <TouchableOpacity
        activeOpacity={1.0}
        {...derivedProps}
        style={container}
        onPress={this.onPress}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}>
        {componentChildren}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {},
  icon: {},
});

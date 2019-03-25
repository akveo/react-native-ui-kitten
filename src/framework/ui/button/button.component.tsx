import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  GestureResponderEvent,
  StyleSheet,
  ImageProps,
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
  ButtonAlignment,
  ButtonAlignments,
} from './type';

interface ButtonProps {
  icon?: (style: StyleType) => React.ReactElement<ImageProps>;
  status?: string;
  size?: string;
  alignment?: string | ButtonAlignment;
  children?: React.ReactText;
}

const Text = styled<TextProps>(TextComponent);

export type Props = ButtonProps & StyledComponentProps & TouchableOpacityProps;

const ALIGNMENT_DEFAULT: ButtonAlignment = ButtonAlignments.LEFT;

export class Button extends React.Component<Props> {

  static defaultProps: Partial<Props> = {
    alignment: 'left',
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
    const {
      textColor,
      textFontSize,
      textFontWeight,
      textMarginHorizontal,
      iconWidth,
      iconHeight,
      iconTintColor,
      iconMarginHorizontal,
      ...containerParameters
    } = style;

    const alignment: ButtonAlignment = ButtonAlignments.parse(this.props.alignment, ALIGNMENT_DEFAULT);

    return {
      container: {
        ...containerParameters,
        flexDirection: alignment.flex(),
      },
      text: {
        color: textColor,
        fontSize: textFontSize,
        fontWeight: textFontWeight,
        marginHorizontal: textMarginHorizontal,
      },
      icon: {
        width: iconWidth,
        height: iconHeight,
        tintColor: iconTintColor,
        marginHorizontal: iconMarginHorizontal,
      },
    };
  };

  private renderTextElement = (style: StyleType): React.ReactElement<TextProps> => {
    const { children: text } = this.props;

    return (
      <Text
        style={[style, styles.text]}
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
    const { style, themedStyle, ...derivedProps } = this.props;
    const { container, ...componentStyles } = this.getComponentStyle(themedStyle);
    const componentChildren: React.ReactNode = this.renderComponentChildren(componentStyles);

    return (
      <TouchableOpacity
        {...derivedProps}
        style={[container, style, styles.container]}
        activeOpacity={1.0}
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
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  text: {},
  icon: {},
});

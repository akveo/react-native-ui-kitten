import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  GestureResponderEvent,
  StyleSheet,
  ImageSourcePropType,
  Image,
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
  icon?: ImageSourcePropType;
  status?: string;
  size?: string;
  alignment?: string | ButtonAlignment;
  children?: React.ReactText;
}

const Text = styled<TextComponent, TextProps>(TextComponent);

export type Props = ButtonProps & StyledComponentProps & TouchableOpacityProps;

const ALIGNMENT_DEFAULT: ButtonAlignment = ButtonAlignments.LEFT;

export class Button extends React.Component<Props> {

  static defaultProps: Partial<Props> = {
    status: 'primary',
    size: 'medium',
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
    const { text, icon, ...container } = style;
    const alignment: ButtonAlignment = ButtonAlignments.parse(this.props.alignment, ALIGNMENT_DEFAULT);

    return {
      container: {
        ...container,
        flexDirection: alignment.flex(),
      },
      text: text,
      icon: icon,
    };
  };

  private createTextElement = (style: StyleType): React.ReactElement<TextProps> => {
    const { children: text } = this.props;

    return (
      <Text
        style={[style, strictStyles.text]}
        key={1}>
        {text}
      </Text>
    );
  };

  private createImageElement = (style: StyleType): React.ReactElement<ImageProps> => {
    const { icon: image } = this.props;

    return (
      <Image
        key={0}
        style={[style, strictStyles.icon]}
        source={image}
      />
    );
  };

  private createComponentChildren = (style: StyleType): React.ReactNode => {
    const { icon, children } = this.props;

    const hasIcon: boolean = icon !== undefined;
    const hasText: boolean = children !== undefined;

    return [
      hasIcon ? this.createImageElement(style.icon) : undefined,
      hasText ? this.createTextElement(style.text) : undefined,
    ];
  };

  public render(): React.ReactElement<TouchableOpacityProps> {
    const { style, themedStyle, ...derivedProps } = this.props;
    const { container, ...componentStyles } = this.getComponentStyle(themedStyle);
    const componentChildren: React.ReactNode = this.createComponentChildren(componentStyles);

    return (
      <TouchableOpacity
        {...derivedProps}
        style={[style, container, strictStyles.container]}
        activeOpacity={1.0}
        onPress={this.onPress}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}>
        {componentChildren}
      </TouchableOpacity>
    );
  }
}

const strictStyles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  text: {},
  icon: {},
});

import React from 'react';
import {
  TouchableOpacity,
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
  Text,
  TextProps,
} from '../text/text.component';
import { TouchableIndexedProps } from '../support/typings';

type TextElement = React.ReactElement<TextProps>;
type IconElement = React.ReactElement<ImageProps>;
type IconProp = (style: StyleType) => IconElement;

interface ListDerivedProps {
  index?: number;
}

export interface OverflowMenuItemType extends ListDerivedProps {
  icon?: IconProp;
  text: React.ReactText;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
}

export type OverflowMenuItemProps = StyledComponentProps & TouchableIndexedProps & OverflowMenuItemType;

class OverflowMenuItemComponent extends React.Component<OverflowMenuItemProps> {

  static styledComponentName: string = 'OverflowMenuItem';

  private onPress = (event: GestureResponderEvent) => {
    if (this.props.onPress) {
      this.props.onPress(this.props.index, event);
    }
  };

  private onPressIn = (event: GestureResponderEvent) => {
    this.props.dispatch([Interaction.ACTIVE]);

    if (this.props.onPressIn) {
      this.props.onPressIn(this.props.index, event);
    }
  };

  private onPressOut = (event: GestureResponderEvent) => {
    this.props.dispatch([]);

    if (this.props.onPressOut) {
      this.props.onPressOut(this.props.index, event);
    }
  };

  private onLongPress = (event: GestureResponderEvent) => {
    if (this.props.onLongPress) {
      this.props.onLongPress(this.props.index, event);
    }
  };

  private getComponentStyle = (source: StyleType): StyleType => {
    const { style, textStyle } = this.props;

    const {
      textMarginHorizontal,
      textFontSize,
      textLineHeight,
      textFontWeight,
      textColor,
      iconWidth,
      iconHeight,
      iconMarginHorizontal,
      iconTintColor,
      ...containerStyle
    } = source;

    return {
      container: {
        ...containerStyle,
        ...styles.container,
        ...StyleSheet.flatten(style),
      },
      text: {
        marginHorizontal: textMarginHorizontal,
        fontSize: textFontSize,
        lineHeight: textLineHeight,
        fontWeight: textFontWeight,
        color: textColor,
        ...StyleSheet.flatten(textStyle),
      },
      icon: {
        width: iconWidth,
        height: iconHeight,
        marginHorizontal: iconMarginHorizontal,
        tintColor: iconTintColor,
      },
    };
  };

  private renderTextElement = (style: StyleType): TextElement => {
    return (
      <Text
        key={2}
        style={style}>
        {this.props.text}
      </Text>
    );
  };

  private renderIconElement = (style: StyleType): IconElement => {
    const iconElement: IconElement = this.props.icon(style);

    return React.cloneElement(iconElement, {
      key: 1,
      style: [style, iconElement.props.style],
    });
  };

  private renderComponentChildren = (style: StyleType): React.ReactNodeArray => {
    const { icon } = this.props;

    return [
      icon && this.renderIconElement(style.icon),
      this.renderTextElement(style.text),
    ];
  };

  public render(): React.ReactNode {
    const { style, themedStyle, ...restProps } = this.props;
    const { container, ...componentStyles } = this.getComponentStyle(themedStyle);

    const [iconElement, textElement] = this.renderComponentChildren(componentStyles);

    return (
      <TouchableOpacity
        activeOpacity={1.0}
        {...restProps}
        style={container}
        onPress={this.onPress}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
        onLongPress={this.onLongPress}>
        {iconElement}
        {textElement}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export const OverflowMenuItem = styled<OverflowMenuItemProps>(OverflowMenuItemComponent);

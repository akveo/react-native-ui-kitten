import React from 'react';
import {
  TouchableOpacity,
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
import { TouchableOpacityIndexedProps } from '../common/type';

export interface OverflowMenuItemType {
  icon?: (style: StyleType) => React.ReactElement<ImageProps>;
  text: React.ReactText;
  disabled?: boolean;
  index?: number;
}

const Text = styled<TextProps>(TextComponent);

export type Props = OverflowMenuItemType & StyledComponentProps & TouchableOpacityIndexedProps;

export class OverflowMenuItem extends React.Component<Props> {

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

  private getComponentStyle = (style: StyleType): StyleType => {
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
    } = style;

    return {
      container: {
        ...containerStyle,
        ...styles.container,
        borderBottomColor: 'red',
      },
      text: {
        marginHorizontal: textMarginHorizontal,
        fontSize: style.textFontSize,
        lineHeight: textLineHeight,
        fontWeight: textFontWeight,
        color: textColor,
      },
      icon: {
        width: iconWidth,
        height: iconHeight,
        marginHorizontal: iconMarginHorizontal,
        tintColor: iconTintColor,
      },
    };
  };

  private renderTextElement = (style: StyleType): React.ReactElement<TextProps> => {
    const { text } = this.props;

    return (
      <Text
        key={2}
        style={style}>
        {text}
      </Text>
    );
  };

  private renderImageElement = (style: StyleType): React.ReactElement<ImageProps> => {
    const { icon } = this.props;

    return React.cloneElement(icon(style), { key: 1 });
  };

  private renderComponentChildren = (style: StyleType): React.ReactNode => {
    const { icon } = this.props;

    return [
      icon ? this.renderImageElement(style.icon) : null,
      this.renderTextElement(style.text),
    ];
  };

  public render(): React.ReactNode {
    const { style, themedStyle, ...restProps } = this.props;
    const { container, ...componentStyles } = this.getComponentStyle(themedStyle);
    const componentChildren: React.ReactNode = this.renderComponentChildren(componentStyles);

    return (
      <TouchableOpacity
        {...restProps}
        style={[container, style]}
        activeOpacity={1.0}
        onPress={this.onPress}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
        onLongPress={this.onLongPress}>
        {componentChildren}
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

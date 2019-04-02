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
  size?: string;
  isLastItem?: boolean;
  disabled?: boolean;
  index?: number;
}

const Text = styled<TextProps>(TextComponent);

export type Props = OverflowMenuItemType & StyledComponentProps & TouchableOpacityIndexedProps;

export class OverflowMenuItem extends React.Component<Props> {

  static defaultProps: Partial<Props> = {
    isLastItem: false,
  };

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
    const { isLastItem } = this.props;

    return {
      container: {
        minHeight: style.minHeight,
        padding: style.padding,
        backgroundColor: style.backgroundColor,
        borderBottomColor: !isLastItem ? style.borderColor : null,
        borderBottomWidth: !isLastItem ? style.borderWidth : null,
      },
      text: {
        color: style.textColor,
        fontWeight: style.textFontWeight,
        fontSize: style.textFontSize,
        marginHorizontal: style.textMarginHorizontal,
      },
      icon: {
        tintColor: style.iconTintColor,
        width: style.iconWidth,
        height: style.iconHeight,
        marginHorizontal: style.iconMarginHorizontal,
      },
    };
  };

  private renderTextElement = (style: StyleType): React.ReactElement<TextProps> => {
    return (
      <Text
        style={style}
        key={2}>
        {this.props.text}
      </Text>
    );
  };

  private renderImageElement = (style: StyleType): React.ReactElement<ImageProps> | null => {
    const { icon } = this.props;
    return icon ? React.cloneElement(icon(style), { key: 1 }) : null;
  };

  private renderComponentChildren = (style: StyleType): React.ReactNode => ([
    this.props.icon ? this.renderImageElement(style.icon) : null,
    this.renderTextElement(style.text),
  ]);

  public render(): React.ReactNode {
    const { style, themedStyle, ...restProps } = this.props;
    const { container, ...componentStyles } = this.getComponentStyle(themedStyle);
    const componentChildren: React.ReactNode = this.renderComponentChildren(componentStyles);

    return (
      <TouchableOpacity
        {...restProps}
        style={[container, styles.container, style]}
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

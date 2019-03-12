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

export interface OverflowMenuItemType {
  icon?: (style: StyleType) => React.ReactElement<ImageProps>;
  text: React.ReactText;
  size?: string;
  isLastItem?: boolean;
  disabled?: boolean;
  onPress?: () => void;
}

const Text = styled<TextComponent, TextProps>(TextComponent);

export type Props = OverflowMenuItemType & StyledComponentProps & TouchableOpacityProps;

export class OverflowMenuItem extends React.Component<Props> {

  static defaultProps: Partial<Props> = {
    isLastItem: false,
  };

  private onPress = (event: GestureResponderEvent) => {
    if (!this.props.disabled) {
      if (this.props.onPress) {
        this.props.onPress(event);
      }
    }
  };

  private onPressIn = (event: GestureResponderEvent) => {
    if (!this.props.disabled) {
      this.props.dispatch([Interaction.ACTIVE]);

      if (this.props.onPressIn) {
        this.props.onPressIn(event);
      }
    }
  };

  private onPressOut = (event: GestureResponderEvent) => {
    if (!this.props.disabled) {
      this.props.dispatch([]);

      if (this.props.onPressOut) {
        this.props.onPressOut(event);
      }
    }
  };

  private getComponentStyle = (style: StyleType): StyleType => {
    const { isLastItem } = this.props;
    const { text, icon, ...container } = style;
    const { borderColor, borderWidth, ...restContainerProps } = container;

    return {
      container: {
        borderBottomColor: !isLastItem ? borderColor : null,
        borderBottomWidth: !isLastItem ? borderWidth : null,
        ...restContainerProps,
      },
      text: text,
      icon: icon,
    };
  };

  private renderTextElement = (style: StyleType): React.ReactElement<TextProps> => (
    <Text
      style={style}
      key={2}>
      {this.props.text}
    </Text>
  );

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
        onPressOut={this.onPressOut}>
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

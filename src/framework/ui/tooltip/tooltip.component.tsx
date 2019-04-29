import React from 'react';
import {
  ImageProps,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewProps,
} from 'react-native';
import {
  styled,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import {
  Text as TextComponent,
  Props as TextProps,
} from '../text/text.component';
import {
  Popover as PopoverComponent,
  Props as PopoverProps,
} from '../popover/popover.component';
import { Omit } from '../common/type';

interface TooltipProps {
  text: string;
  textStyle?: StyleProp<TextStyle>;
  icon?: (style: StyleType) => React.ReactElement<ImageProps>;
  children: React.ReactElement<any>;
}

const Popover = styled<PopoverProps>(PopoverComponent);
const Text = styled<TextProps>(TextComponent);

export type Props = TooltipProps & StyledComponentProps & Omit<PopoverProps, 'content'>;

export class Tooltip extends React.Component<Props> {

  static styledComponentName: string = 'Tooltip';

  static defaultProps: Partial<Props> = {
    indicatorOffset: 8,
  };

  private getComponentStyle = (source: StyleType): StyleType => {
    const { textStyle } = this.props;
    const {
      popoverPaddingHorizontal,
      popoverPaddingVertical,
      popoverBorderRadius,
      popoverBackgroundColor,
      iconWidth,
      iconHeight,
      iconMarginHorizontal,
      iconTintColor,
      textMarginHorizontal,
      textFontSize,
      textLineHeight,
      textColor,
    } = source;

    return {
      popover: {
        paddingHorizontal: popoverPaddingHorizontal,
        paddingVertical: popoverPaddingVertical,
        borderRadius: popoverBorderRadius,
        backgroundColor: popoverBackgroundColor,
        ...styles.popover,
      },
      content: styles.content,
      icon: {
        width: iconWidth,
        height: iconHeight,
        marginHorizontal: iconMarginHorizontal,
        tintColor: iconTintColor,
        ...styles.icon,
      },
      text: {
        marginHorizontal: textMarginHorizontal,
        fontSize: textFontSize,
        lineHeight: textLineHeight,
        color: textColor,
        ...StyleSheet.flatten(textStyle),
        ...styles.text,
      },
    };
  };

  private renderTextElement = (style: StyleType): React.ReactElement<TextProps> => {
    const { text } = this.props;

    return (
      <Text
        key={1}
        style={style}>
        {text}
      </Text>
    );
  };

  private renderIconElement = (style: StyleType): React.ReactElement<ImageProps> => {
    const { icon } = this.props;

    const iconElement: React.ReactElement<ImageProps> = icon(style);

    return React.cloneElement(iconElement, { key: 0 });
  };

  private renderContentElementChildren = (style: StyleType): React.ReactNode => {
    const { icon } = this.props;

    return [
      icon ? this.renderIconElement(style.icon) : null,
      this.renderTextElement(style.text),
    ];
  };

  private renderPopoverContentElement = (style: StyleType): React.ReactElement<ViewProps> => {
    const { content, ...childrenStyle } = style;

    const contentChildren: React.ReactNode = this.renderContentElementChildren(childrenStyle);

    return (
      <View style={content}>
        {contentChildren}
      </View>
    );
  };

  public render(): React.ReactElement<PopoverProps> {
    const { style, children, themedStyle, ...derivedProps } = this.props;
    const { popover, ...componentStyle } = this.getComponentStyle(themedStyle);
    const contentElement: React.ReactElement<TextProps> = this.renderPopoverContentElement(componentStyle);

    return (
      <Popover
        {...derivedProps}
        style={[popover, style]}
        content={contentElement}>
        {children}
      </Popover>
    );
  }
}

const styles = StyleSheet.create({
  popover: {},
  content: {
    flexDirection: 'row',
  },
  icon: {},
  text: {
    alignSelf: 'center',
  },
});

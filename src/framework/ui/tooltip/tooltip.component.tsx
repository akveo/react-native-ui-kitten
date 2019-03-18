import React from 'react';
import { StyleSheet } from 'react-native';
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
import { Omit } from '../service/type';

interface TooltipProps {
  text: string;
  children: React.ReactElement<any>;
}

const Popover = styled<PopoverComponent, PopoverProps>(PopoverComponent);
const Text = styled<TextComponent, TextProps>(TextComponent);

export type Props = TooltipProps & StyledComponentProps & Omit<PopoverProps, 'content'>;

export class Tooltip extends React.Component<Props> {

  static defaultProps: Partial<Props> = {
    indicatorOffset: 8,
  };

  private getComponentStyle = (source: StyleType): StyleType => {
    const {
      popoverPaddingHorizontal,
      popoverPaddingVertical,
      popoverBorderRadius,
      popoverBackgroundColor,
      textColor,
    } = source;

    return {
      popover: {
        paddingHorizontal: popoverPaddingHorizontal,
        paddingVertical: popoverPaddingVertical,
        borderRadius: popoverBorderRadius,
        backgroundColor: popoverBackgroundColor,
      },
      text: {
        color: textColor,
      },
    };
  };

  private renderPopoverContentElement = (style: StyleType): React.ReactElement<TextProps> => {
    const { text } = this.props;

    return (
      <Text
        style={[style, styles.text]}>
        {text}
      </Text>
    );
  };

  public render(): React.ReactElement<PopoverProps> {
    const { style, children, themedStyle, ...derivedProps } = this.props;
    const { popover, text } = this.getComponentStyle(themedStyle);
    const contentElement: React.ReactElement<TextProps> = this.renderPopoverContentElement(text);

    return (
      <Popover
        {...derivedProps}
        style={[popover, style, styles.popover]}
        content={contentElement}>
        {children}
      </Popover>
    );
  }
}

const styles = StyleSheet.create({
  popover: {},
  text: {
    alignSelf: 'center',
  },
});

import React from 'react';
import {
  Text,
  StyleSheet,
  TextProps,
} from 'react-native';
import {
  styled,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
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

export type Props = TooltipProps & StyledComponentProps & Omit<PopoverProps, 'content'>;

export class Tooltip extends React.Component<Props> {

  static defaultProps: Partial<Props> = {
    indicatorOffset: 8,
  };

  private getComponentStyle = (source: StyleType): StyleType => {
    const { popover, text } = source;

    return {
      container: {
        ...popover,
        ...styles.container,
      },
      text: {
        ...text,
        ...styles.text,
      },
    };
  };

  private renderPopoverContentElement = (style: StyleType): React.ReactElement<TextProps> => {
    const { text } = this.props;

    return (
      <Text
        style={style}>
        {text}
      </Text>
    );
  };

  public render(): React.ReactElement<PopoverProps> {
    const { children, themedStyle, ...derivedProps } = this.props;
    const { container, text } = this.getComponentStyle(themedStyle);
    const contentElement: React.ReactElement<TextProps> = this.renderPopoverContentElement(text);

    return (
      <Popover
        {...derivedProps}
        style={[container, derivedProps.style]}
        content={contentElement}>
        {children}
      </Popover>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  text: {
    alignSelf: 'center',
  },
});

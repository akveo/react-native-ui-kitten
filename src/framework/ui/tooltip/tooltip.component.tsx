import React from 'react';
import {
  Text,
  StyleSheet,
} from 'react-native';
import {
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import {
  Popover as Popover,
  Props as PopoverProps,
} from '../popover/popover.component';
import { Omit } from '../service/type';

type ChildElement<P> = React.ReactElement<P>;

interface TooltipProps {
  text: string;
  children: ChildElement<any>;
}

export type Props = TooltipProps & StyledComponentProps & Omit<PopoverProps, 'children'>;

export class Tooltip extends React.Component<Props> {

  static defaultProps: Partial<Props> = {
    indicatorOffset: 8,
  };

  private getComponentStyle = (source: StyleType): StyleType => {
    const { textColor, ...derivedStyle } = source;

    return {
      container: {
        ...derivedStyle,
        ...strictStyles.container,
      },
      text: {
        color: textColor,
        ...strictStyles.text,
      },
    };
  };

  public render(): React.ReactElement<PopoverProps> {
    const { text, children, themedStyle, ...derivedProps } = this.props;
    const componentStyle: StyleType = this.getComponentStyle(themedStyle);

    return (
      <Popover
        {...derivedProps}
        style={[componentStyle.container, derivedProps.style]}>
        {children}
        <Text
          style={componentStyle.text}>
          {text}
        </Text>
      </Popover>
    );
  }
}

const strictStyles = StyleSheet.create({
  container: {},
  text: {
    alignSelf: 'center',
  },
});

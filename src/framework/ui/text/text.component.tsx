import React from 'react';
import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleSheet,
} from 'react-native';
import {
  styled,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';

interface ComponentProps {
  category?: string;
  status?: string;
  children?: React.ReactText;
}

export type TextProps = StyledComponentProps & RNTextProps & ComponentProps;

export class TextComponent extends React.Component<TextProps> {

  static styledComponentName: string = 'Text';

  private getComponentStyle = (source: StyleType): StyleType => {
    const { style } = this.props;

    return {
      fontSize: source.fontSize,
      lineHeight: source.lineHeight,
      fontWeight: source.fontWeight,
      color: source.color,
      ...StyleSheet.flatten(style),
    };
  };

  public render(): React.ReactElement<RNTextProps> {
    const { themedStyle, ...derivedProps } = this.props;
    const componentStyle: StyleType = this.getComponentStyle(themedStyle);

    return (
      <RNText
        {...derivedProps}
        style={componentStyle}
      />
    );
  }
}

export const Text = styled<TextProps>(TextComponent);

import React from 'react';
import {
  StyleSheet,
  Text as TextComponent,
  TextProps as TextComponentProps,
} from 'react-native';
import {
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';

interface ComponentProps {
  category?: string;
  status?: string;
  children?: React.ReactText;
}

export type TextProps = StyledComponentProps & TextComponentProps & ComponentProps;

export class Text extends React.Component<TextProps> {

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

  public render(): React.ReactElement<ComponentProps> {
    const { themedStyle, ...derivedProps } = this.props;
    const componentStyle: StyleType = this.getComponentStyle(themedStyle);

    return (
      <TextComponent
        {...derivedProps}
        style={componentStyle}
      />
    );
  }
}

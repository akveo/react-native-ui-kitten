import React from 'react';
import {
  Text as TextComponent,
  TextProps as TextComponentProps,
} from 'react-native';
import {
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';

interface TextProps {
  category?: string;
  status?: string;
  children?: React.ReactText;
}

export type Props = TextProps & StyledComponentProps & TextComponentProps;

export class Text extends React.Component<Props> {

  static styledComponentName: string = 'Text';

  private getComponentStyle = (source: StyleType): StyleType => {
    return {
      fontSize: source.fontSize,
      lineHeight: source.lineHeight,
      fontWeight: source.fontWeight,
      color: source.color,
    };
  };

  public render(): React.ReactElement<TextProps> {
    const { style, themedStyle, ...derivedProps } = this.props;
    const componentStyle: StyleType = this.getComponentStyle(themedStyle);

    return (
      <TextComponent
        {...derivedProps}
        style={[componentStyle, style]}
      />
    );
  }
}

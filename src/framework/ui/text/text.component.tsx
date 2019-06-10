/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  StyleSheet,
  Text as RNText,
  TextProps as RNTextProps,
} from 'react-native';
import {
  styled,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';

interface ComponentProps {
  category?: string;
  status?: string;
  children?: string;
}

export type TextProps = StyledComponentProps & RNTextProps & ComponentProps;

/**
 * Styled Text component.
 *
 * @extends React.Component
 *
 * @property {string} status - Determines the status of the component.
 * Can be `primary`, `success`, `info`, `warning` or `danger`.
 *
 * @property {string} children - Determines text of the component.
 *
 * @property {string} category - Determines the category of the component.
 * Can be `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `s1`, `s2`, `p1`, `p2`, `c1`, `c2`, `label`.
 * Default is `p1`.
 *
 * @property {string} appearance - Determines the appearance of the component.
 * Can be `default`, `alternative`, `hint`.
 * Default is `default`.
 *
 * @property TextComponentProps
 *
 * @property StyledComponentProps
 *
 * @example Simple usage example
 *
 * ```
 * import React from 'react';
 * import { Text, TextProps } from 'react-native-ui-kitten';
 *
 * export const TextShowcase = (props?: TextProps): React.ReactElement<TextProps> => {
 *   return (
 *     <Text>
 *       Sample Text
 *     </Text>
 *   );
 * };
 * ```
 */

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

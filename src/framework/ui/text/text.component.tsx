/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  Text as RNText,
  TextProps as RNTextProps,
} from 'react-native';
import {
  styled,
  StyledComponentProps,
} from '@kitten/theme';

interface ComponentProps {
  category?: string;
  status?: string;
  children?: string;
}

export type TextProps = StyledComponentProps & RNTextProps & ComponentProps;
export type TextElement = React.ReactElement<TextProps>;

/**
 * Styled `Text` component.
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
 * @overview-example Simple Usage
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
 *
 * @overview-example Eva Styling
 *
 * ```
 * import React from 'react';
 * import { Text, TextProps } from 'react-native-ui-kitten';
 *
 * export const TextShowcase = (props?: TextProps): React.ReactElement<TextProps> => {
 *   return (
 *     <Text
 *       appearance='alternative'
 *       category='p2'
 *       status='success'>
 *       Sample Text
 *     </Text>
 *   );
 * };
 * ```
 */

export class TextComponent extends React.Component<TextProps> {

  static styledComponentName: string = 'Text';

  public render(): React.ReactElement<RNTextProps> {
    const { themedStyle, style, ...derivedProps } = this.props;

    return (
      <RNText
        {...derivedProps}
        style={[themedStyle, style]}
      />
    );
  }
}

export const Text = styled<TextProps>(TextComponent);

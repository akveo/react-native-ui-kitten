/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

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

/**
 * The `Text` component is a component used to render text blocks.
 *
 * @extends React.Component
 *
 * @property {string} status - Determines the status of the component.
 * Can be 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'white'.
 * By default status is 'primary'.
 *
 * @property {React.ReactText} children - Determines text of the component.
 *
 * @property {string} category - Determines the category of the component.
 * Can be 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 's1' | 's2' | 'p1' | 'p2' | 'c1' | 'c2' | 'overline' | 'label'.
 * By default category is 'p1'.
 *
 * @property {string} appearance - Determines the appearance of the component.
 * Can be 'dark' | 'light' | 'hintLight' | 'hintDark'.
 * By default appearance is 'dark'.
 *
 * @property TextComponentProps
 *
 * @property StyledComponentProps
 *
 * @example Simple usage example
 *
 * ```
 * import { Text } from '@kitten/ui';
 * <Text>Test Text</Text>
 * ```
 *
 * @example Text API example
 *
 * ```
 * import { Text } from '@kitten/ui';
 *
 * public render(): React.ReactNode {
 *   return (
 *     <Text
 *       style={styles.text}
 *       status='danger'
 *       appearance='hintLight'
 *       category='h1'>
 *       Test Text
 *     </Text>
 *   );
 * }
 * ```
 * */

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

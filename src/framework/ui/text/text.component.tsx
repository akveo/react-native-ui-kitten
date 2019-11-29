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

type ChildElement = string | TextElement;

interface ComponentProps {
  category?: string;
  status?: string;
  children?: ChildElement | ChildElement[];
}

export type TextProps = StyledComponentProps & RNTextProps & ComponentProps;
export type TextElement = React.ReactElement<TextProps>;

/**
 * Styled `Text` component.
 *
 * @extends React.Component
 *
 * @property {string} appearance - Determines the appearance of the component.
 * Can be `default`, `alternative`, `hint`.
 * Default is `default`.
 *
 * @property {string} status - Determines the status of the component.
 * Can be `basic`, `primary`, `success`, `info`, `warning`, `danger` or `control`.
 *
 * @property {string} category - Determines the category of the component.
 * Can be `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `s1`, `s2`, `p1`, `p2`, `c1`, `c2`, `label`.
 * Default is `p1`.
 *
 * @property {string | ReactElement<TextProps>} children - Determines text of the component.
 *
 * @property {TextProps} ...TextProps - Any props applied to Text component.
 *
 * @overview-example TextSimpleUsage
 *
 * @overview-example TextAppearances
 *
 * @overview-example TextCategories
 *
 * @overview-example TextStatuses
 *
 * @example TextInlineStyling
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

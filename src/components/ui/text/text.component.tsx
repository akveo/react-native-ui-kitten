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
import { Overwrite } from 'utility-types';
import {
  styled,
  StyledComponentProps,
} from '../../theme';
import { EvaStatus } from '../../devsupport';

type TextStyledProps = Overwrite<StyledComponentProps, {
  appearance?: 'default' | 'alternative' | 'hint' | string;
}>;

type ChildElement = React.ReactText | TextElement;

export interface TextProps extends RNTextProps, TextStyledProps {
  children?: ChildElement | ChildElement[];
  category?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 's1' | 's2' | 'p1' | 'p2' | 'c1' | 'c2' | 'label' | string;
  status?: EvaStatus;
}

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
    const { eva, style, ...textProps } = this.props;

    return (
      <RNText
        {...textProps}
        style={[eva.style, style]}
      />
    );
  }
}

export const Text = styled<TextProps>(TextComponent);

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
 * Basic text writing, including headings, paragraphs, captions, and more.
 *
 * @extends React.Component
 *
 * @property {ReactText | ReactElement<TextProps>} children - String or number to be rendered as text.
 * Also can be ReactElement<TextProps> - nested Text component.
 *
 * @property {string} appearance - Can be `default`, `alternative` or `hint`.
 * Use `alternative` for displaying light text on a dark content and vice versa.
 * Use `hint` for giving user a hint on something.
 *
 * @property {string} category - Can be `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `s1`, `s2`, `p1`, `p2`, `c1`, `c2`, `label`.
 * Defaults to *p1*.
 * Use *h* categories when needed to display headings.
 * Use *s* categories when needed to display subtitles.
 * Use *p* categories when needed to display regular text.
 * Use *c* and *label* categories when needed to give user a hint on something.
 *
 * @property {string} status - Status of the component.
 * Can be `basic`, `primary`, `success`, `info`, `warning`, `danger` or `control`.
 * Defaults to *basic*.
 * Use *control* status when needed to display within a contrast container.
 *
 * @property {TextProps} ...TextProps - Any props applied to Text component.
 *
 * @overview-example TextSimpleUsage
 *
 * @overview-example TextAppearances
 *
 * @overview-example TextStatuses
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

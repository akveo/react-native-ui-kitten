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
} from '../../theme';
import { TextAppearance, TextCategory, TextStatus } from '@eva-design/eva/mapping.types';

interface TextStyledProps extends StyledComponentProps {
  appearance?: TextAppearance;
}

type ChildElement = React.ReactText | TextElement;

export interface TextProps extends RNTextProps, TextStyledProps {
  children?: ChildElement | ChildElement[];
  category?: TextCategory;
  status?: TextStatus;
}

export type TextElement = React.ReactElement<TextProps>;

/**
 * Basic text writing.
 *
 * @extends React.Component
 *
 * @property {ReactText | ReactElement<TextProps>} children - String or number to be rendered as text.
 * Also can be ReactElement<TextProps> - nested Text component.
 *
 * @property {string} appearance - The predefined ones are `default`, `alternative` or `hint`.
 * Can be extended with custom mapping feature.
 * Use `alternative` for displaying light text on a dark content and vice versa.
 * Use `hint` for giving user a hint on something.
 *
 * @property {string} category - The predefined ones are
 * `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `s1`, `s2`, `p1`, `p2`, `c1`, `c2`, `label`.
 * Can be extended with custom mapping feature. Defaults to *p1*.
 * Use *h* categories when needed to display headings.
 * Use *s* categories when needed to display subtitles.
 * Use *p* categories when needed to display regular text.
 * Use *c* and *label* categories when needed to give user a hint on something.
 *
 * @property {string} status - Status of the component.
 * The predefined ones are `basic`, `primary`, `success`, `info`, `warning`, `danger` or `control`.
 * Can be extended with custom mapping feature. Defaults to *basic*.
 * Use *control* status when needed to display within a contrast container.
 *
 * @property {TextProps} ...TextProps - Any props applied to Text component.
 *
 * @overview-example TextCategories
 * Text has pre-defined set of styles for headings, subtitles, paragraphs, and more.
 *
 * @overview-example TextAppearances
 * Also, it has 2 types of additional appearances:
 * `hint` and `alternative`.
 *
 * Use hints when needed to give user a hint on action.
 * And use alternative when needed to display light text in light themes (same for dark).
 *
 * @overview-example TextStatuses
 *
 * @overview-example TextStyling
 * Text can be styled with `style` property.
 * In most cases this is redundant, if [custom theme is configured](guides/branding).
 * ```
 * import { Text } from '@ui-kitten/components';
 *
 * <Text style={...}>Place your Text</Text>
 * ```
 */
@styled('Text')
export class Text extends React.Component<TextProps> {

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

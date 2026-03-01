/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  Text as RNText,
  TextProps as RNTextProps,
} from 'react-native';
import {
  EvaStatus,
  LiteralUnion,
} from '../../devsupport';
import { useStyled } from '../../theme';

type ChildElement = React.ReactText | TextElement;

export interface TextProps extends RNTextProps {
  children?: ChildElement | ChildElement[];
  /**
   * Appearance of the component.
   * Can be `default`, `alternative` or `hint`.
   * Use `alternative` for displaying light text on a dark content and vice versa.
   * Use `hint` for giving user a hint on something.
   */
  appearance?: LiteralUnion<'default' | 'alternative' | 'hint'>;
  /**
   * Typography category.
   * Can be `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `s1`, `s2`, `p1`, `p2`, `c1`, `c2`, `label`.
   * Defaults to *p1*.
   * Use *h* categories when needed to display headings.
   * Use *s* categories when needed to display subtitles.
   * Use *p* categories when needed to display regular text.
   * Use *c* and *label* categories when needed to give user a hint on something.
   */
  category?: LiteralUnion<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 's1' | 's2' | 'p1' | 'p2' | 'c1' | 'c2' | 'label'>;
  /**
   * Status of the component.
   * Can be `basic`, `primary`, `success`, `info`, `warning`, `danger` or `control`.
   * Defaults to *basic*.
   * Use *control* status when needed to display within a contrast container.
   */
  status?: EvaStatus;
}

export type TextElement = React.ReactElement<TextProps>;

/**
 * Basic text writing.
 *
 * @extends React.FC
 *
 * @property {ReactText | ReactElement<TextProps>} children - String or number to be rendered as text.
 * Also can be ReactElement<TextProps> (nested Text component).
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
export const Text = React.forwardRef<RNText, TextProps>(
  (props, ref) => {
    const {
      appearance,
      category,
      status,
      style,
      children,
      ...textProps
    } = props;

    // Use the new hook instead of @styled decorator
    const { style: evaStyle } = useStyled('Text', {
      appearance,
      category,
      status,
    });

    return (
      <RNText
        ref={ref}
        {...textProps}
        style={[evaStyle, style]}
      >
        {children}
      </RNText>
    );
  },
);

Text.displayName = 'Text';

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  ListItem,
  ListItemElement,
  ListItemProps,
} from '../list/listItem.component';

export type AutocompleteItemProps = ListItemProps;
export type AutocompleteItemElement = React.ReactElement<AutocompleteItemProps>;

/**
 * A single item in Autocomplete List.
 * Items should be rendered within Autocomplete children to provide a usable component.
 *
 * @extends React.Component
 *
 * @property {ReactText | (TextProps) => ReactElement} title - String, number or a function component
 * to render within the button.
 * If it is a function, expected to return a Text.
 *
 * @property {(ImageProps) => ReactElement} accessoryLeft - Function component
 * to render to start of the *title*.
 * Expected to return an Image.
 *
 * @property {(ImageProps) => ReactElement} accessoryRight - Function component
 * to render to end of the *title*.
 * Expected to return an Image.
 *
 * @property {TouchableOpacityProps} ...TouchableOpacityProps - Any props applied to TouchableOpacity component.
 *
 * @overview-example AutocompleteItemSimpleUsage
 */
export class AutocompleteItem extends React.Component<ListItemProps> {

  public render(): ListItemElement {
    return (
      <ListItem {...this.props} />
    );
  }
}

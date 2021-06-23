/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  MenuGroup,
  MenuGroupElement,
  MenuGroupProps,
} from '../menu/menuGroup.component';

export type DrawerGroupProps = MenuGroupProps;
export type DrawerGroupElement = React.ReactElement<DrawerGroupProps>;

/**
 * A group of items displayed in Drawer.
 * Groups should be rendered within Drawer and contain DrawerItem components to provide a useful component.
 *
 * @extends React.Component
 *
 * @property {ReactElement<DrawerItemProps> | ReactElement<DrawerItemProps>[]} children -
 * items to be rendered within group.
 *
 * @property {ReactText | ReactElement | (TextProps) => ReactElement} title - String, number or a function component
 * to render within the group.
 * If it is a function, expected to return a Text.
 *
 * @property {ReactElement | (ImageProps) => ReactElement} accessoryLeft - Function component
 * to render to start of the *title*.
 * Expected to return an Image.
 *
 * @property {ReactElement | (ImageProps) => ReactElement} accessoryRight - Function component
 * to render to end of the *title*.
 * Expected to return an Image.
 *
 * @property {TouchableOpacityProps} ...TouchableOpacityProps - Any props applied to TouchableOpacity component.
 *
 * @overview-example DrawerGroups
 */
export class DrawerGroup extends React.Component<DrawerGroupProps> {

  public render(): MenuGroupElement {
    return (
      <MenuGroup {...this.props} />
    );
  }
}

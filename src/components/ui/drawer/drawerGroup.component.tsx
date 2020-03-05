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
 * Renders a group of items displayed in Drawer.
 * Groups should be rendered within Drawer children to provide a usable component.
 *
 * @extends React.Component
 *
 * @property {ReactElement<DrawerItemProps> | ReactElement<DrawerItemProps>[]} children -
 * items to be rendered within group.
 *
 * @property {string | (props: TextProps) => ReactElement} title - A string or a function component
 * to render within the group.
 * If it is a function, it will be called with props provided by Eva.
 * Otherwise, renders a Text styled by Eva.
 *
 * @property {(props: ImageProps) => ReactElement} accessoryLeft - A function component
 * to render to start of the `title`.
 * Called with props provided by Eva.
 *
 * @property {(props: ImageProps) => ReactElement} accessoryRight - A function component
 * to render to end of the `title`.
 * Called with props provided by Eva.
 *
 * @property {TouchableOpacityProps} ...TouchableOpacityProps - Any props applied to TouchableOpacity component.
 */
export class DrawerGroup extends React.Component<DrawerGroupProps> {

  public render(): MenuGroupElement {
    return (
      <MenuGroup {...this.props} />
    );
  }
}

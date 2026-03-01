/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  MenuItem,
  MenuItemElement,
  MenuItemProps,
} from '../menu/menuItem.component';

export type DrawerItemProps = MenuItemProps;
export type DrawerItemElement = React.ReactElement<DrawerItemProps>;

/**
 * A single item in Drawer.
 * Items should be rendered within Drawer or DrawerGroup children to provide a usable component.
 *
 * @extends React.FC
 *
 * @property {ReactText | ReactElement | (TextProps) => ReactElement} title - String, number or a function component
 * to render within the item.
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
 * @overview-example DrawerItemSimpleUsage
 */
export const DrawerItem: React.FC<MenuItemProps> = (props): MenuItemElement => {
  return (
    <MenuItem {...props} />
  );
};

DrawerItem.displayName = 'DrawerItem';

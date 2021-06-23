/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import { ViewProps } from 'react-native';
import {
  FalsyFC,
  RenderProp,
} from '../../devsupport';
import {
  styled,
  StyleType,
} from '../../theme';
import {
  Menu,
  MenuProps,
} from '../menu/menu.component';

export interface DrawerProps extends MenuProps {
  header?: RenderProp<ViewProps>;
  footer?: RenderProp<ViewProps>;
}

export type DrawerElement = React.ReactElement<DrawerProps>;

/**
 * Navigation panel which slides from the side of the screen.
 * Drawer should contain DrawerItem or DrawerGroup components to provide a useful component.
 *
 * @extends React.Component
 *
 * @property {ReactElement<DrawerItemProps> | ReactElement<DrawerItemProps>[]} children -
 * items to be rendered within drawer.
 * 
 * @property {ReactElement | (ViewProps) => ReactElement} header - Function component
 * to render above the content.
 *
 * @property {ReactElement | (ViewProps) => ReactElement} footer - Function component
 * to render below the content.
 *
 * @property {IndexPath} selectedIndex - Index of selected item.
 * IndexPath `row: number, section?: number` - position of element in sectioned list.
 * Drawer becomes sectioned when DrawerGroup is rendered within children.
 * Updating this property is not required if marking items selected is not needed.
 *
 * @property {(IndexPath | IndexPath[]) => void} onSelect - Called when item is pressed.
 * Called with `row: number` for non-grouped items.
 * Called with `row: number, section: number` for items rendered within group,
 * where row - index of item in group, section - index of group in list.
 *
 * @property {string} appearance - Appearance of the component.
 * Can be `default` or `noDivider`.
 *
 * @property {ListProps} ...ListProps - Any props applied to List component,
 * excluding `renderItem` and `data`.
 *
 * @overview-example DrawerSimpleUsage
 *
 * @overview-example DrawerIndexType
 * Drawer works with special index object - IndexPath.
 * For non-grouped items in drawer, there is only a `row` property.
 * Otherwise, `row` is an index of option within the group, section - index of group in drawer.
 * ```
 * interface IndexPath {
 *   row: number;
 *   section?: number;
 * }
 * ```
 *
 * @overview-example Using with React Navigation
 * Drawer can also be [configured with React Navigation](guides/configure-navigation)
 * to provide a navigational component.
 *
 * ```
 * import React from 'react';
 * import { NavigationContainer } from '@react-navigation/native';
 * import { createDrawerNavigator } from '@react-navigation/drawer';
 * import { Drawer, DrawerItem, Layout, Text, IndexPath } from '@ui-kitten/components';
 *
 * const { Navigator, Screen } = createDrawerNavigator();
 *
 * const UsersScreen = () => (
 *   <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
 *     <Text category='h1'>USERS</Text>
 *   </Layout>
 * );
 *
 * const OrdersScreen = () => (
 *   <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
 *     <Text category='h1'>ORDERS</Text>
 *   </Layout>
 * );
 *
 * const DrawerContent = ({ navigation, state }) => (
 *   <Drawer
 *     selectedIndex={new IndexPath(state.index)}
 *     onSelect={index => navigation.navigate(state.routeNames[index.row])}>
 *     <DrawerItem title='Users' />
 *     <DrawerItem title='Orders' />
 *   </Drawer>
 * );
 *
 * export const DrawerNavigator = () => (
 *   <Navigator drawerContent={props => <DrawerContent {...props}/>}>
 *     <Screen name='Users' component={UsersScreen}/>
 *     <Screen name='Orders' component={OrdersScreen}/>
 *   </Navigator>
 * );
 *
 * export const AppNavigator = () => (
 *   <NavigationContainer>
 *     <DrawerNavigator/>
 *   </NavigationContainer>
 * );
 * ```
 *
 * @overview-example DrawerNoMarkers
 * Pressing of drawer items can be handled without marking items.
 *
 * @overview-example DrawerAccessories
 * Drawer may be configured with header and footer,
 * and items may contain inner views configured with `accessoryLeft` and `accessoryRight` properties.
 * Within Eva, item accessories are expected to be images or [svg icons](guides/icon-packages).
 *
 * @overview-example DrawerGroups
 * And be grouped within `DrawerGroup` component.
 *
 * @overview-example DrawerStyling
 * Drawer and it's inner views can be styled by passing them as function components.
 * ```
 * import { DrawerItem, Text } from '@ui-kitten/components';
 *
 * <DrawerItem
 *   title={evaProps => <Text {...evaProps}>USERS</Text>}>
 * </DrawerItem>
 * ```
 *
 * @overview-example DrawerTheming
 * In most cases this is redundant, if [custom theme is configured](guides/branding).
 */
@styled('Drawer')
export class Drawer extends React.Component<DrawerProps> {

  private getComponentStyle = (source: StyleType) => {
    const {
      headerPaddingHorizontal,
      headerPaddingVertical,
      footerPaddingHorizontal,
      footerPaddingVertical,
      ...containerParameters
    } = source;

    return {
      container: containerParameters,
      header: {
        paddingHorizontal: headerPaddingHorizontal,
        paddingVertical: headerPaddingVertical,
      },
      footer: {
        paddingHorizontal: footerPaddingHorizontal,
        paddingVertical: footerPaddingVertical,
      },
    };
  };

  public render(): React.ReactFragment {
    const { eva, style, header, footer, ...menuProps } = this.props;
    const evaStyle = this.getComponentStyle(eva.style);

    return (
      <React.Fragment>
        <FalsyFC
          style={evaStyle.header}
          component={header}
        />
        <Menu
          style={[evaStyle.container, style]}
          showsVerticalScrollIndicator={false}
          bounces={false}
          {...menuProps}
        />
        <FalsyFC
          style={evaStyle.footer}
          component={footer}
        />
      </React.Fragment>
    );
  }
}

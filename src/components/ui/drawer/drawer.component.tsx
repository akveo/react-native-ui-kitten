/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import { ViewProps } from 'react-native';
import { Overwrite } from 'utility-types';
import {
  FalsyFC,
  RenderProp,
} from '../../devsupport';
import {
  styled,
  StyledComponentProps,
  StyleType,
} from '../../theme';
import {
  Menu,
  MenuProps,
} from '../menu/menu.component';

type DrawerStyledProps = Overwrite<StyledComponentProps, {
  appearance?: 'default' | 'noDivider' | string;
}>;

export interface DrawerProps extends MenuProps, DrawerStyledProps {
  header?: RenderProp<ViewProps>;
  footer?: RenderProp<ViewProps>;
}

export type DrawerElement = React.ReactElement<DrawerProps>;

/**
 * Styled `Drawer` component.
 * Renders UI Kitten Menu component with additional styles provided by Eva.
 *
 * @extends React.Component
 *
 * @property {string} appearance - appearance of the component.
 * Can be `default` or `noDivider`.
 *
 * @property {ReactElement<DrawerItemProps> | ReactElement<DrawerItemProps>[]} children -
 * items to be rendered within drawer.
 *
 * @property {IndexPath} selectedIndex - index of selected item.
 * IndexPath `{ row: number, section: number | undefined }` - position of element in sectioned list.
 * Drawer becomes sectioned when DrawerGroup is rendered within children.
 * Updating this property is not required if marking items selected is not needed.
 *
 * @property {(option: IndexPath | IndexPath[]) => void} onSelect - called when item is pressed.
 * Called with `{ row: number }` by default.
 * Called with { row: number, section: number } for items rendered within DrawerGroup.
 *
 * @property {ListProps} ...ListProps - Any props applied to List component,
 * excluding `renderItem` and `data`.
 *
 * @overview-example DrawerSimpleUsage
 *
 * @overview-example Using with React Navigation
 *
 * ```
 * import React from 'react';
 * import { NavigationContainer } from '@react-navigation/native';
 * import { createDrawerNavigator } from '@react-navigation/drawer';
 * import { Drawer, DrawerItem, Layout, Text } from '@ui-kitten/components';
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
 * const DrawerContent = ({ navigation, state }) => {
 *
 *   const onSelect = (index) => {
 *     navigation.navigate(state.routeNames[index]);
 *   };
 *
 *   return (
 *     <Drawer
 *       selectedIndex={state.index}
 *       onSelect={onSelect}>
 *       <DrawerItem title='Home' />
 *       <DrawerItem title='Settings' />
 *     </UIKittenDrawer>
 *   );
 * };
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
 * @overview-example DrawerWithIcons
 *
 * @overview-example DrawerHeader
 *
 * @overview-example DrawerFooter
 *
 * @example DrawerCustomHeader
 *
 * @example DrawerNotificationBadgeItem
 */
class DrawerComponent extends React.Component<DrawerProps> {

  static styledComponentName: string = 'Drawer';

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

export const Drawer = styled<DrawerProps>(DrawerComponent);

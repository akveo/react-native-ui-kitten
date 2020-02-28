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
 * Renders a Menu with additional styles provided by Eva.
 *
 * @extends React.Component
 *
 * @property {() => ReactElement} header - Determines the function to render a header. Optional.
 *
 * @property {() => ReactElement} footer - Determines the function to render a footer. Optional.
 *
 * @property {(index: number, event: GestureResponderEvent) => void} onSelect - Determines the function to handle
 * menu item press.
 *
 * @property {MenuProps} ...MenuProps - Any props applied to Menu component.
 *
 * @overview-example DrawerSimpleUsage
 *
 * @overview-example Using with React Navigation
 *
 * ```
 * import React from 'react';
 * import { NavigationContainer } from '@react-navigation/native';
 * import { createDrawerNavigator } from '@react-navigation/drawer';
 * import { Drawer as UIKittenDrawer, Layout, Text } from '@ui-kitten/components';
 *
 * const Drawer = createDrawerNavigator();
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
 *     <UIKittenDrawer
 *       data={[{ title: 'Home' }, { title: 'Settings' }]}
 *       selectedIndex={state.index}
 *       onSelect={onSelect}
 *     />
 *   );
 * };
 *
 * export const DrawerNavigator = () => (
 *   <Drawer.Navigator drawerContent={props => <DrawerContent {...props}/>}>
 *     <Drawer.Screen name='Users' component={UsersScreen}/>
 *     <Drawer.Screen name='Orders' component={OrdersScreen}/>
 *   </Drawer.Navigator>
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

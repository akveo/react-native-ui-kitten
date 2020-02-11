import React from 'react';
import {
  styled,
  StyledComponentProps,
} from '@kitten/theme';
import {
  Menu,
  MenuElement,
  MenuProps,
} from '../menu/menu.component';
import { MenuItemType } from '../menu/menuItem.component';

export type DrawerHeaderElement = React.ReactElement;
export type DrawerFooterElement = React.ReactElement;

export interface DrawerProps extends StyledComponentProps, MenuProps {
  header?: () => DrawerHeaderElement;
  footer?: () => DrawerFooterElement;
}

export type DrawerElement = React.ReactElement<DrawerProps>;

/**
 * Styled `Navigation Drawer` component. The principle of rendering a `Drawer` is the same as a rendering a List.
 *
 * @extends React.Component
 *
 * @property {MenuItemType[]} data - Determines the items displayed in drawer menu.
 *
 * @property {string} appearance - Determines the appearance of the component.
 * Can be `default` or `noDivider`.
 * Default is `default`.
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

  private renderHeader = (): DrawerHeaderElement => {
    return this.props.header();
  };

  private renderFooter = (): DrawerFooterElement => {
    return this.props.footer();
  };

  private renderMenu = (): MenuElement => {
    const { style, header, footer, themedStyle, ...restProps } = this.props;

    return (
      <Menu
        style={themedStyle}
        showsVerticalScrollIndicator={false}
        bounces={false}
        {...restProps}
      />
    );
  };

  private renderComponentChildren = (): React.ReactNodeArray => {
    const { header, footer } = this.props;

    return [
      header && this.renderHeader(),
      this.renderMenu(),
      footer && this.renderFooter(),
    ];
  };

  public render(): React.ReactFragment {
    const [header, menu, footer] = this.renderComponentChildren();

    return (
      <React.Fragment>
        {header}
        {menu}
        {footer}
      </React.Fragment>
    );
  }
}

export const Drawer = styled<DrawerProps>(DrawerComponent);

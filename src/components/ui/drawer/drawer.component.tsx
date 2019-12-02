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

interface ComponentProps {
  header?: () => DrawerHeaderElement;
  footer?: () => DrawerFooterElement;
}

export type DrawerProps = StyledComponentProps & ComponentProps & MenuProps;
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
 * import { createAppContainer, SafeAreaView } from 'react-navigation';
 * import { createDrawerNavigator } from 'react-navigation-drawer';
 * import { Drawer, Layout, Text } from '@ui-kitten/components';
 *
 * // React Navigation also requires installing additional dependencies:
 * //
 * // npm i react-navigation react-navigation-drawer react-native-reanimated react-native-gesture-handler
 * //
 * // Then, install it for ios:
 * //
 * // cd ./ios && pod install
 *
 * const HomeScreen = () => (
 *   <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
 *     <Text category='h1'>HOME</Text>
 *   </Layout>
 * );
 *
 * const SettingsScreen = () => (
 *   <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
 *     <Text category='h1'>SETTINGS</Text>
 *   </Layout>
 * );
 *
 * const DrawerComponent = ({ navigation }) => {
 *
 *   const onSelect = (index) => {
 *     const { [index]: selectedTabRoute } = navigation.state.routes;
 *     navigation.navigate(selectedTabRoute.routeName);
 *   };
 *
 *   return (
 *     <SafeAreaView>
 *       <Drawer data={[{ title: 'Home' }, { title: 'Settings' }]} onSelect={onSelect} />
 *     </SafeAreaView>
 *   );
 * };
 *
 * const DrawerNavigator = createDrawerNavigator({
 *   Home: HomeScreen,
 *   Settings: SettingsScreen,
 * }, {
 *   contentComponent: DrawerComponent,
 * });
 *
 * export const AppNavigator = createAppContainer(DrawerNavigator);
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

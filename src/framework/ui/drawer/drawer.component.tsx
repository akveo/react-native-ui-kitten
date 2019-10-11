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

export type DrawerHeaderElement = React.ReactElement<any>;
export type DrawerFooterElement = React.ReactElement<any>;

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
 * @property {() => DrawerHeaderElement} header - Determines the function to render a header. Optional.
 *
 * @property {() => DrawerFooterElement} footer - Determines the function to render a footer. Optional.
 *
 * @property {(index: number, event: GestureResponderEvent) => void} onSelect - Determines the function to handle
 * menu item press.
 *
 * @property ListProps
 *
 * @overview-example DrawerSimpleUsage
 *
 * @overview-example DrawerWithIcons
 *
 * @overview-example DrawerHeader
 *
 * @overview-example DrawerFooter
 *
 * @overview-example Using with React Navigation
 *
 * ```
 * import React from 'react';
 * import { SafeAreaView } from 'react-navigation';
 * import { createDrawerNavigator } from 'react-navigation-drawer';
 * import { Dashboard, Messages, Settings } from './path-to/screen-components'; // <-- Import screen components
 *
 * class DrawerNavigation extends React.Component {
 *
 *   constructor(props) {
 *     super(props);
 *     this.drawerData = props.items.map(this.createDrawerItem);
 *   }
 *
 *   onRouteSelect = (index) => {
 *     const { [index]: route } = this.drawerData;
 *     this.props.navigation.navigate(route.title);
 *   };
 *
 *   createDrawerItem = ({ routeName }) => ({
 *     title: routeName,
 *   });
 *
 *   render() {
 *     return (
 *       <SafeAreaView>
 *         <Drawer data={this.drawerData} onSelect={this.onRouteSelect}/>
 *       </SafeAreaView>
 *     );
 *   }
 * }
 *
 * export const DrawerNavigator = createDrawerNavigator({
 *   Dashboard: Dashboard,
 *   Messages: Messages,
 *   Settings: Settings,
 * }, {
 *   contentComponent: DrawerNavigation,
 * });
 * ```
 *
 * @example DrawerCustomHeader
 *
 * @example DrawerNotificationBadgeItem
 */
class DrawerComponent extends React.Component<DrawerProps> {

  static styledComponentName: string = 'Drawer';

  private renderHeader = (): DrawerHeaderElement => {
    const { header } = this.props;

    return header();
  };

  private renderFooter = (): DrawerFooterElement => {
    const { footer } = this.props;

    return footer();
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

  private renderComponentChildren = (): [DrawerHeaderElement, MenuElement, DrawerFooterElement] => {
    const { header, footer } = this.props;

    return [
      header && this.renderHeader(),
      this.renderMenu(),
      footer && this.renderFooter(),
    ];
  };

  public render(): React.ReactNode {
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

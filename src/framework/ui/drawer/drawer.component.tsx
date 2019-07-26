import React from 'react';
import {
  GestureResponderEvent,
  ListRenderItemInfo,
  ViewProps,
} from 'react-native';
import {
  styled,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import {
  DrawerItem,
  DrawerItemElement,
  DrawerItemProps,
} from './drawerItem.component';
import {
  List,
  ListProps,
} from '../list/list.component';
import { Override } from '../support/typings';

export type DrawerHeaderElement = React.ReactElement<any>;

type DrawerListProps = Override<ListProps, {
  data: DrawerItemProps[],
  renderItem?: (info: ListRenderItemInfo<DrawerItemProps>) => DrawerItemElement;
}>;

interface ComponentProps extends DrawerListProps {
  header?: (style: StyleType) => DrawerHeaderElement;
  onSelect?: (index: number, event: GestureResponderEvent) => void;
}

export type DrawerProps = StyledComponentProps & ComponentProps;
export type DrawerElement = React.ReactElement<DrawerProps>;

/**
 * Styled Navigation Drawer component. The principle of rendering a Drawer is the same as a rendering a List.
 *
 * @extends React.Component
 *
 * @property {DrawerItemProps[]} data - Determines the items displayed in drawer menu.
 *
 * @property {(info: ListRenderItemInfo<DrawerItemProps>, style: StyleType) => DrawerItemElement} renderItem -
 * Determines the function to render a menu item. By default renders a ListItem
 * with properties passed to a `data` property item.
 *
 * @property {(style: StyleType) => DrawerHeaderElement} header - Determines the function to render a header. Optional.
 *
 * @property {(index: number, event: GestureResponderEvent) => void} onSelect - Determines the function to handle
 * menu item press.
 *
 * @property ListProps
 *
 * @overview-example Simple Usage
 *
 * ```
 * import React from 'react';
 * import { Drawer } from 'react-native-ui-kitten';
 *
 * const data = [
 *   { title: 'Feed' },
 *   { title: 'Messages' },
 *   { title: 'Settings' },
 * ];
 *
 * export const DrawerShowcase = (props) => (
 *   <Drawer data={data}/>
 * );
 * ```
 *
 * @overview-example Using with React Navigation
 *
 * ```
 * import React from 'react';
 * import { createDrawerNavigator, SafeAreaView } from 'react-navigation';
 * import { Feed, Messages, Settings } from './path-to/screen-components'; // <-- Import screen components
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
 *   Feed: Feed,
 *   Messages: Messages,
 *   Settings: Settings,
 * }, {
 *   contentComponent: DrawerNavigation,
 * });
 *
 * ```
 *
 * @example Header
 *
 * ```
 * import React from 'react';
 * import { View } from 'react-native';
 * import { Drawer, Text } from 'react-native-ui-kitten';
 *
 * const data = [
 *   { title: 'Feed' },
 *   { title: 'Messages' },
 *   { title: 'Settings' },
 * ];
 *
 * const DrawerHeader = (style) => (
 *   <View style={style}>
 *     <Text category='h6'>Awesome Application</Text>
 *   </View>
 * );
 *
 * export const DrawerShowcase = (props) => (
 *   <Drawer data={data} header={DrawerHeader} />
 * );
 * ```
 *
 * @example Icon Item
 *
 * ```
 * import React from 'react';
 * import { View, Image } from 'react-native';
 * import { Drawer } from 'react-native-ui-kitten';
 *
 * const data = [
 *   { title: 'Feed' },
 *   { title: 'Messages', icon: MessagesIcon },
 *   { title: 'Settings' },
 * ];
 *
 * const MessagesIcon = (style) => (
 *   <Image
 *     style={style}
 *     source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/email.png' }}
 *   />
 * );
 *
 * export const DrawerShowcase = (props) => (
 *   <Drawer data={data} />
 * );
 * ```
 *
 * @example Notification Badge Item
 *
 * ```
 * import React from 'react';
 * import { View, StyleSheet } from 'react-native';
 * import { Drawer, Text } from 'react-native-ui-kitten';
 *
 * const data = [
 *   { title: 'Feed' },
 *   { title: 'Messages', accessory: NotificationBadge },
 *   { title: 'Settings' },
 * ];
 *
 * const NotificationBadge = (style) => (
 *   <View style={[style, styles.badge]}>
 *     <Text>NEW</Text>
 *   </View>
 * );
 *
 * export const DrawerShowcase = (props) => (
 *   <Drawer data={data} />
 * );
 *
 * const styles = StyleSheet.create({
 *   badge: {
 *     justifyContent: 'center',
 *     alignItems: 'center',
 *     height: 24,
 *     paddingHorizontal: 24,
 *     borderRadius: 12,
 *     backgroundColor: 'orange',
 *   },
 * });
 * ```
 *
 * @example Custom Item
 *
 * ```
 * import React from 'react';
 * import { View } from 'react-native';
 * import { Drawer, DrawerItem, Text } from 'react-native-ui-kitten';
 *
 * const data = [
 *   { title: 'Feed' },
 *   { title: 'Messages' },
 *   { title: 'Settings' },
 * ];
 *
 * const DrawerItemShowcase = ({item, index}, style) => (
 *   <DrawerItem style={style}>
 *     <Text category='s2'>{item.title}</Text>
 *   </View>
 * );
 *
 * export const DrawerShowcase = (props) => (
 *   <Drawer data={data} renderItem={DrawerItemShowcase}/>
 * );
 * ```
 */
class DrawerComponent extends React.Component<DrawerProps> {

  static styledComponentName: string = 'Drawer';

  private onItemPress = (index: number, event: GestureResponderEvent) => {
    if (this.props.onSelect) {
      this.props.onSelect(index, event);
    }
  };

  private getComponentStyle = (source: StyleType): StyleType => {
    const {
      headerPaddingHorizontal,
      headerPaddingVertical,
      headerBackgroundColor,
      ...containerParameters
    } = source;

    return {
      container: containerParameters,
      header: {
        paddingHorizontal: headerPaddingHorizontal,
        paddingVertical: headerPaddingVertical,
        backgroundColor: headerBackgroundColor,
      },
    };
  };

  private renderHeaderElement = (style: StyleType): DrawerHeaderElement => {
    const headerElement: DrawerHeaderElement = this.props.header(style);

    return React.cloneElement(headerElement, {
      style: [style, headerElement.props.style],
    });
  };

  private renderItemElement = (info: ListRenderItemInfo<DrawerItemProps>): DrawerItemElement => {
    return (
      <DrawerItem
        onPress={this.onItemPress}
        {...info.item}
      />
    );
  };

  public render(): React.ReactElement<ViewProps> {
    const { style, themedStyle, header, ...restProps } = this.props;
    const componentStyle: StyleType = this.getComponentStyle(themedStyle);

    const headerElement: DrawerHeaderElement = header && this.renderHeaderElement(componentStyle.header);

    return (
      <React.Fragment>
        {headerElement}
        <List
          showsVerticalScrollIndicator={false}
          bounces={false}
          renderItem={this.renderItemElement}
          {...restProps}
        />
      </React.Fragment>
    );
  }
}

export const Drawer = styled<DrawerProps>(DrawerComponent);

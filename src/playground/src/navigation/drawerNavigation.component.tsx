import React from 'react';
import {
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';
import {
  NavigationRoute,
  SafeAreaView,
  DrawerItemsProps,
} from 'react-navigation';
import {
  Divider,
  Drawer,
  DrawerHeaderElement,
  DrawerHeaderFooter,
  Icon,
  MenuItemType,
  Text,
  DrawerHeaderFooterElement,
  StyleType,
  IconElement,
  DrawerElement,
} from 'react-native-ui-kitten';

export class DrawerNavigation extends React.Component<DrawerItemsProps> {

  private onItemSelect = (index: number) => {
    const { [index]: selectedRoute } = this.props.items;
    this.props.navigation.navigate(selectedRoute.routeName);
  };

  private createDrawerItem = (source: NavigationRoute): MenuItemType => {
    return {
      title: source.routeName,
      // @ts-ignore
      accessory: this.shouldRenderBadge(source) && this.renderBadge,
    };
  };

  private shouldRenderBadge = (source: NavigationRoute): boolean => {
    return source.routeName === 'Drawer';
  };

  private renderBadge = (style: StyleType): React.ReactElement<ViewProps> => {
    return (
      <View style={[style, styles.badge]}>
        <Text category='c2'>NEW</Text>
      </View>
    );
  };

  private renderIcon = (style: StyleType): IconElement => {
    return (
      <Icon name='star' {...style}/>
    );
  };

  private renderHeader = (): DrawerHeaderElement => {
    return (
      <React.Fragment>
        <DrawerHeaderFooter
          disabled={true}
          title='UI Kitten'
          description='Playground Module'
          icon={this.renderIcon}
        />
        <Divider/>
      </React.Fragment>
    );
  };

  private renderFooter = (): DrawerHeaderFooterElement => {
    return (
      <React.Fragment>
        <Divider/>
        <DrawerHeaderFooter
          disabled={true}
          description='Version 4.2.0'
        />
      </React.Fragment>
    );
  };

  public render(): DrawerElement {
    const drawerItems: MenuItemType[] = this.props.items.map(this.createDrawerItem);

    return (
      <SafeAreaView style={[styles.safeArea]}>
        <Drawer
          header={this.renderHeader}
          footer={this.renderFooter}
          data={drawerItems}
          onSelect={this.onItemSelect}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  badge: {
    paddingHorizontal: 8,
    height: 24,
    width: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
  },
});

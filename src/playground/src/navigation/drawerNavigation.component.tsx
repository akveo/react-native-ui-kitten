import React from 'react';
import {
  StyleSheet,
  View,
  ImageProps,
} from 'react-native';
import {
  DrawerItemsProps,
  NavigationRoute,
  SafeAreaView,
} from 'react-navigation';
import {
  Drawer,
  DrawerHeaderElement,
  DrawerProps,
  MenuItemType,
  Text,
  DrawerFence,
  Icon,
  Divider,
} from '@kitten/ui';
import { StyleType } from '@kitten/theme';
import { DrawerFooterElement } from '@kitten/ui/drawer/drawer.component';

export class DrawerNavigation extends React.Component<DrawerItemsProps> {

  private onItemSelect = (index: number) => {
    const { [index]: selectedRoute } = this.props.items;
    this.props.navigation.navigate(selectedRoute.routeName);
  };

  private createDrawerItem = (source: NavigationRoute): MenuItemType => {
    return {
      title: source.routeName,
      accessory: this.shouldRenderBadge(source) && this.renderBadge,
    };
  };

  private shouldRenderBadge = (source: NavigationRoute): boolean => {
    return source.routeName === 'Drawer';
  };

  private renderBadge = (style: StyleType): React.ReactElement<any> => {
    return (
      <View style={[style, styles.badge]}>
        <Text category='c2'>NEW</Text>
      </View>
    );
  };

  private renderIcon = (style: StyleType): React.ReactElement<ImageProps> => {
    return (
      <Icon name='star' {...style}/>
    );
  };

  private renderHeader = (): DrawerHeaderElement => {
    return (
      <React.Fragment>
        <DrawerFence
          title='UI Kitten'
          description='Playground Module'
          icon={this.renderIcon}
        />
        <Divider/>
      </React.Fragment>
    );
  };

  private renderFooter = (): DrawerFooterElement => {
    return (
      <React.Fragment>
        <Divider/>
        <DrawerFence description='Version 4.2.0'/>
      </React.Fragment>
    );
  };

  public render(): React.ReactElement<DrawerProps> {
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

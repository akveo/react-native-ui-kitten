import React from 'react';
import {
  ImageSourcePropType,
  StyleSheet,
  View,
} from 'react-native';
import {
  DrawerItemsProps,
  NavigationRoute,
  SafeAreaView,
} from 'react-navigation';
import {
  Avatar,
  Drawer,
  DrawerHeaderElement,
  DrawerItemProps,
  DrawerProps,
  Text,
} from '@kitten/ui';
import { StyleType } from '@kitten/theme';

export class DrawerNavigation extends React.Component<DrawerItemsProps> {

  private logoImage: ImageSourcePropType = require('../assets/brand-logo.png');

  private onItemSelect = (index: number) => {
    const { [index]: selectedRoute } = this.props.items;
    this.props.navigation.navigate(selectedRoute.routeName);
  };

  private createDrawerItem = (source: NavigationRoute): DrawerItemProps => {
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

  private renderHeader = (style: StyleType): DrawerHeaderElement => {
    return (
      <View style={[style, styles.header]}>
        <Avatar size='giant' source={this.logoImage}/>
        <View style={styles.headerDetails}>
          <Text category='h6'>UI Kitten</Text>
          <Text category='s2'>Playground Module</Text>
        </View>
      </View>
    );
  };

  public render(): React.ReactElement<DrawerProps> {
    const drawerItems: DrawerItemProps[] = this.props.items.map(this.createDrawerItem);

    return (
      <SafeAreaView style={[styles.safeArea]}>
        <Drawer
          header={this.renderHeader}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerDetails: {
    marginHorizontal: 8,
  },
  badge: {
    paddingHorizontal: 8,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
  },
});

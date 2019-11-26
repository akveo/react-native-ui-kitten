import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { NavigationRoute } from 'react-navigation';
import {
  Avatar,
  Divider,
  Drawer,
  DrawerElement,
  DrawerHeaderElement,
  DrawerHeaderFooter,
  DrawerHeaderFooterElement,
  Layout,
  MenuItemType,
  Text,
} from 'react-native-ui-kitten';

export const HomeDrawer = ({ navigation, ...props }): DrawerElement => {

  const onItemSelect = (index: number): void => {
    const { [index]: selectedRoute } = this.props.items;
    this.props.navigation.navigate(selectedRoute.routeName);
  };

  const createDrawerItem = ({ routeName }: NavigationRoute): MenuItemType => {
    return { title: routeName };
  };

  const renderHeader = (): DrawerHeaderElement => (
    <Layout
      style={styles.header}
      level='2'>
      <View style={styles.profileContainer}>
        <Avatar
          size='giant'
          source={require('../../assets/images/brand-logo.png')}
        />
        <Text
          style={styles.profileName}
          category='h6'>
          UI Kitten Playground
        </Text>
      </View>
    </Layout>
  );

  const renderFooter = (): DrawerHeaderFooterElement => (
    <React.Fragment>
      <Divider/>
      <DrawerHeaderFooter
        disabled={true}
        description='Version 4.2.0'
      />
    </React.Fragment>
  );

  return (
    <Drawer
      header={renderHeader}
      footer={renderFooter}
      data={navigation.state.routes.map(createDrawerItem)}
      onSelect={onItemSelect}
    />
  );
};

const styles = StyleSheet.create({
  header: {
    height: 160,
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileName: {
    marginHorizontal: 16,
  },
});

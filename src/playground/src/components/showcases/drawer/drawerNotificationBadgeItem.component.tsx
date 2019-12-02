import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import {
  Drawer,
  Layout,
  Text,
} from '@ui-kitten/components';

const NotificationBadge = (style) => (
  <Layout style={[style, styles.badge]}>
    <Text>NEW</Text>
  </Layout>
);

const drawerData = [
  { title: 'Dashboard' },
  {
    title: 'Messages',
    accessory: NotificationBadge,
  },
  { title: 'Settings' },
  { title: 'Articles' },
];

export const DrawerNotificationBadgeItemShowcase = () => {

  const onRouteSelect = (index) => {
    const route = drawerData[index];
    // navigate with React Navigation
    // this.props.navigation.navigate(route.title);
  };

  return (
    <SafeAreaView>
      <Drawer
        data={drawerData}
        onSelect={onRouteSelect}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  badge: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 24,
    width: 48,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: '#3366FF',
  },
});

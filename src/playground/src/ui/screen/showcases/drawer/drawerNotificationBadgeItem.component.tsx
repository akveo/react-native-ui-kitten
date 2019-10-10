import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import {
  Drawer,
  Layout,
  Text,
} from 'react-native-ui-kitten';

const NotificationBadge = (style) => (
  <Layout style={[style, styles.badge]}>
    <Text>NEW</Text>
  </Layout>
);

export class DrawerNotificationBadgeItemShowcase extends React.Component {

  drawerData = [
    { title: 'Dashboard' },
    { title: 'Messages', accessory: NotificationBadge },
    { title: 'Settings' },
    { title: 'Articles' },
  ];

  onRouteSelect = (index) => {
    // const { [index]: route } = this.drawerData;
    // navigate with React Navigation
    // this.props.navigation.navigate(route.title);
  };

  render() {
    return (
      <Layout style={styles.container}>
        <SafeAreaView>
          <Drawer
            data={this.drawerData}
            onSelect={this.onRouteSelect}
          />
        </SafeAreaView>
      </Layout>
    );
  }
}

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
    backgroundColor: 'orange',
  },
});

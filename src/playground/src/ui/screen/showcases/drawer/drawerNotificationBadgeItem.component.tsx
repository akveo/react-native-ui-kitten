import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import {
  Drawer,
  Text,
} from 'react-native-ui-kitten';
import { createDrawerNavigator } from 'react-navigation-drawer';

const renderNotificationBadge = (style) => (
  <View style={[style, styles.badge]}>
    <Text>NEW</Text>
  </View>
);

export class DrawerNotificationBadgeItemShowcase extends React.Component {

  drawerData = [
    { title: 'Dashboard' },
    { title: 'Messages', accessory: renderNotificationBadge },
    { title: 'Settings' },
    { title: 'Articles' },
  ];

  onRouteSelect = (index) => {
    const { [index]: route } = this.drawerData;
    // here you can handle route selecting after component will be interrated with the
    // navigation library
    // this.props.navigation.navigate(route.title);
  };

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <Drawer
            data={this.drawerData}
            onSelect={this.onRouteSelect}
          />
        </SafeAreaView>
      </View>
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

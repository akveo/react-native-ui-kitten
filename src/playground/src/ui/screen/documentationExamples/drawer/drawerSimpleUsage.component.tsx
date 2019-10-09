import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Drawer } from 'react-native-ui-kitten';
import { createDrawerNavigator } from 'react-navigation-drawer';

export class DrawerSimpleUsageShowcase extends React.Component {

  drawerData = [
    { title: 'Dashboard' },
    { title: 'Messages' },
    { title: 'Settings' },
    { title: 'Articles' },
    { title: 'Ecommerce' },
    { title: 'Chat' },
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
});

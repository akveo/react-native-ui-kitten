import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import {
  Drawer,
  DrawerHeaderFooter,
} from 'react-native-ui-kitten';
import { createDrawerNavigator } from 'react-navigation-drawer';

export class DrawerFooterShowcase extends React.Component {

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

  renderFooter = () => (
    <DrawerHeaderFooter description='Awesome Application Version 4.2.0-beta.1'/>
  );

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <Drawer
            data={this.drawerData}
            footer={this.renderFooter}
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

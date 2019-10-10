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

export class DrawerCustomHeaderShowcase extends React.Component {

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

  renderHeader = () => (
    <View>
      <Text category='h6'>Awesome Application</Text>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <Drawer
            data={this.drawerData}
            header={this.renderHeader}
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

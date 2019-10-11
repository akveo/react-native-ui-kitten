import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import {
  Drawer,
  Layout,
  Text,
} from 'react-native-ui-kitten';

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
    // const { [index]: route } = this.drawerData;
    // navigate with React Navigation
    // this.props.navigation.navigate(route.title);
  };

  renderHeader = () => (
    <Layout level='2'>
      <Text category='h6'>Drawer Header</Text>
    </Layout>
  );

  render() {
    return (
      <Layout style={styles.container}>
        <SafeAreaView>
          <Drawer
            data={this.drawerData}
            header={this.renderHeader}
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
});

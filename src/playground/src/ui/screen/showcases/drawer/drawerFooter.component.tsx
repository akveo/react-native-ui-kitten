import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import {
  Drawer,
  DrawerHeaderFooter,
  Layout,
} from 'react-native-ui-kitten';

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
    // const { [index]: route } = this.drawerData;
    // navigate with React Navigation
    // this.props.navigation.navigate(route.title);
  };

  renderFooter = () => (
    <DrawerHeaderFooter description='Drawer Footer'/>
  );

  render() {
    return (
      <Layout style={styles.container}>
        <SafeAreaView>
          <Drawer
            data={this.drawerData}
            footer={this.renderFooter}
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

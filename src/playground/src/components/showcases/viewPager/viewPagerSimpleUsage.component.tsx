import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Text,
  ViewPager,
} from 'react-native-ui-kitten';

export class ViewPagerSimpleUsageShowcase extends React.Component {

  state = {
    selectedIndex: 0,
  };

  onIndexChange = (selectedIndex) => {
    this.setState({ selectedIndex });
  };

  render() {
    return (
      <ViewPager
        selectedIndex={this.state.selectedIndex}
        onSelect={this.onIndexChange}>
        <Layout
          level='2'
          style={styles.tab}>
          <Text category='h5'>Tab 1</Text>
        </Layout>
        <Layout
          level='2'
          style={styles.tab}>
          <Text category='h5'>Tab 2</Text>
        </Layout>
      </ViewPager>
    );
  }
}

const styles = StyleSheet.create({
  tab: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

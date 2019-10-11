import React from 'react';
import { StyleSheet } from 'react-native';
import {
  ViewPager,
  Layout,
  Text,
} from 'react-native-ui-kitten';

export class ViewPagerLazyLoadingShowcase extends React.Component {

  state = {
    selectedIndex: 0,
  };

  onSelect = (selectedIndex) => {
    this.setState({ selectedIndex });
  };

  shouldLoadComponent = (index) => {
    return index === this.state.selectedIndex;
  };

  render() {
    return (
      <ViewPager
        selectedIndex={this.state.selectedIndex}
        shouldLoadComponent={this.shouldLoadComponent}
        onSelect={this.onSelect}>
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

import React from 'react';
import { StyleSheet } from 'react-native';
import {
  ViewPager,
  Layout,
  Text,
} from 'react-native-ui-kitten';

export class ViewPagerInlineStylingShowcase extends React.Component {

  state = {
    selectedIndex: 0,
  };

  onSelect = (selectedIndex) => {
    this.setState({ selectedIndex });
  };

  render() {
    return (
      <ViewPager
        style={styles.container}
        selectedIndex={this.state.selectedIndex}
        onSelect={this.onSelect}>
        <Layout>
          <Text>Tab 1</Text>
        </Layout>
        <Layout>
          <Text>Tab 2</Text>
        </Layout>
      </ViewPager>
    );
  }
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16 },
});

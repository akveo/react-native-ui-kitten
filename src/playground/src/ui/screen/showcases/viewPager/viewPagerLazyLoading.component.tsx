import React from 'react';
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

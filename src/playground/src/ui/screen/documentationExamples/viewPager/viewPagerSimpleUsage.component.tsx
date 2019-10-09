import React from 'react';
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

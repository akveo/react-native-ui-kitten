import React from 'react';
import {
  Tab,
  TabView,
  Text,
} from 'react-native-ui-kitten';

export class TabViewSimpleUsageShowcase extends React.Component {

  state = {
    selectedIndex: 0,
  };

  onSelect = (selectedIndex) => {
    this.setState({ selectedIndex });
  };

  render() {
    return (
      <TabView
        selectedIndex={this.state.selectedIndex}
        onSelect={this.onSelect}>
        <Tab title='DASHBOARD'>
          <Text>DASHBOARD</Text>
        </Tab>
        <Tab title='SETTINGS'>
          <Text>SETTINGS</Text>
        </Tab>
      </TabView>
    );
  }
}

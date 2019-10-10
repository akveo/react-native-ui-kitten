import React from 'react';
import {
  Tab,
  TabBar,
} from 'react-native-ui-kitten';

export class TabBarSimpleUsageShowcase extends React.Component {

  state = {
    selectedIndex: 0,
  };

  onBarSelect = (selectedIndex) => {
    this.setState({ selectedIndex });
  };

  render() {
    return (
      <TabBar
        selectedIndex={this.state.selectedIndex}
        onSelect={this.onBarSelect}>
        <Tab title='Tab 1'/>
        <Tab title='Tab 2'/>
        <Tab title='Tab 3'/>
      </TabBar>
    );
  }
}

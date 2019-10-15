import React from 'react';
import {
  TabView,
  TabViewElement,
  TabViewProps,
} from 'react-native-ui-kitten';

interface State {
  selectedIndex: number;
}

export class TabViewShowcase extends React.Component<TabViewProps, State> {

  public state: State = {
    selectedIndex: 0,
  };

  private onSelect = (selectedIndex: number) => {
    this.setState({ selectedIndex });
  };

  public render(): TabViewElement {
    return (
      <TabView
        {...this.props}
        selectedIndex={this.state.selectedIndex}
        onSelect={this.onSelect}
      />
    );
  }
}

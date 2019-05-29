import React from 'react';
import {
  TabView,
  TabViewProps,
} from '@kitten/ui';

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

  public render(): React.ReactElement<TabViewProps> {
    return (
      <TabView
        {...this.props}
        selectedIndex={this.state.selectedIndex}
        onSelect={this.onSelect}
      />
    );
  }
}

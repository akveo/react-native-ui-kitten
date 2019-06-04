import React from 'react';
import {
  BottomNavigation,
  BottomNavigationProps,
} from '@kitten/ui';

interface State {
  selectedIndex: number;
}

export class BottomNavigationShowcase extends React.Component<BottomNavigationProps, State> {

  public state: State = {
    selectedIndex: 0,
  };

  private onSelect = (selectedIndex: number) => {
    this.setState({ selectedIndex });
  };

  public render(): React.ReactElement<BottomNavigationProps> {
    return (
      <BottomNavigation
        {...this.props}
        selectedIndex={this.state.selectedIndex}
        onSelect={this.onSelect}
      />
    );
  }
}

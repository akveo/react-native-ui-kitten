import React from 'react';
import {
  BottomNavigation,
  BottomNavigationElement,
  BottomNavigationProps,
} from 'react-native-ui-kitten';

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

  public render(): BottomNavigationElement {
    return (
      <BottomNavigation
        {...this.props}
        selectedIndex={this.state.selectedIndex}
        onSelect={this.onSelect}
      />
    );
  }
}

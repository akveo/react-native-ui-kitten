import React from 'react';
import {
  Menu,
  MenuProps,
  MenuElement,
} from '@kitten/ui';

interface State {
  selectedIndex: number;
}

export class MenuShowcase extends React.Component<MenuProps, State> {

  public state: State = {
    selectedIndex: null,
  };

  private onSelect = (selectedIndex: number): void => {
    this.setState({ selectedIndex });
  };

  public render(): MenuElement {
    return (
      <Menu
        {...this.props}
        selectedIndex={this.state.selectedIndex}
        onSelect={this.onSelect}
      />
    );
  }
}

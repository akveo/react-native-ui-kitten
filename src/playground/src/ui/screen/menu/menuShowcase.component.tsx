import React from 'react';
import {
  Menu,
  MenuProps,
  MenuElement,
  MenuItemType,
} from '@kitten/ui';

interface State {
  selectedMenuItem: MenuItemType;
}

export class MenuShowcase extends React.Component<MenuProps, State> {

  public state: State = {
    selectedMenuItem: null,
  };

  private onSelect = (selectedMenuItem: MenuItemType): void => {
    this.setState({ selectedMenuItem });
  };

  public render(): MenuElement {
    return (
      <Menu
        {...this.props}
        selectedItem={this.state.selectedMenuItem}
        onSelect={this.onSelect}
      />
    );
  }
}

import React from 'react';
import {
  OverflowMenu,
  OverflowMenuProps,
  OverflowMenuElement,
  Button,
} from 'react-native-ui-kitten';

interface State {
  menuVisible: boolean;
  selectedMenuIndex: number;
}

export class OverflowMenuShowcase extends React.Component<OverflowMenuProps, State> {

  public state: State = {
    menuVisible: false,
    selectedMenuIndex: null,
  };

  private toggleMenu = (): void => {
    const menuVisible: boolean = !this.state.menuVisible;
    this.setState({ menuVisible });
  };

  private onSelect = (selectedMenuIndex: number): void => {
    this.setState({ selectedMenuIndex }, this.toggleMenu);
  };

  public render(): OverflowMenuElement {
    const { menuVisible, selectedMenuIndex } = this.state;

    return (
      <OverflowMenu
        {...this.props}
        visible={menuVisible}
        selectedIndex={selectedMenuIndex}
        onSelect={this.onSelect}
        onBackdropPress={this.toggleMenu}>
        <Button onPress={this.toggleMenu}>
          TOGGLE MENU
        </Button>
      </OverflowMenu>
    );
  }
}

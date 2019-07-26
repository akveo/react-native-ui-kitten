import React from 'react';
import {
  Button,
  OverflowMenu,
  OverflowMenuElement,
  OverflowMenuProps,
} from '@kitten/ui';

interface State {
  overflowMenuVisible: boolean;
}

export class OverflowMenuShowcase extends React.Component<OverflowMenuProps, State> {

  public state: State = {
    overflowMenuVisible: false,
  };

  private toggleOverflowMenu = () => {
    const overflowMenuVisible: boolean = !this.state.overflowMenuVisible;

    this.setState({ overflowMenuVisible });
  };

  public render(): OverflowMenuElement {
    return (
      <OverflowMenu
        {...this.props}
        visible={this.state.overflowMenuVisible}
        onBackdropPress={this.toggleOverflowMenu}>
        <Button onPress={this.toggleOverflowMenu}>SHOW MENU</Button>
      </OverflowMenu>
    );
  }
}

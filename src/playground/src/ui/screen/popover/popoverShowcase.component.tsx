import React from 'react';
import { ViewProps } from 'react-native';
import {
  Button,
  Popover,
  PopoverElement,
  PopoverProps,
  Text,
} from '@kitten/ui';

interface State {
  popoverVisible: boolean;
}

export class PopoverShowcase extends React.Component<PopoverProps, State> {

  public state: State = {
    popoverVisible: false,
  };

  private togglePopover = () => {
    const popoverVisible: boolean = !this.state.popoverVisible;

    this.setState({ popoverVisible });
  };

  private renderPopoverContent = (): React.ReactElement<ViewProps> => {
    return (
      <Text>
        Hi! I'm Popover!
      </Text>
    );
  };

  public render(): PopoverElement {
    return (
      <Popover
        {...this.props}
        visible={this.state.popoverVisible}
        content={this.renderPopoverContent()}
        onBackdropPress={this.togglePopover}>
        <Button onPress={this.togglePopover}>SHOW POPOVER</Button>
      </Popover>
    );
  }
}

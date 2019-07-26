import React from 'react';
import {
  Button,
  Tooltip,
  TooltipElement,
  TooltipProps,
} from '@kitten/ui';

interface State {
  tooltipVisible: boolean;
}

export class TooltipShowcase extends React.Component<TooltipProps, State> {

  public state: State = {
    tooltipVisible: false,
  };

  private toggleTooltip = () => {
    const tooltipVisible: boolean = !this.state.tooltipVisible;

    this.setState({ tooltipVisible });
  };

  public render(): TooltipElement {
    return (
      <Tooltip
        {...this.props}
        visible={this.state.tooltipVisible}
        text='Hi! I am Tooltip!'
        onBackdropPress={this.toggleTooltip}>
        <Button onPress={this.toggleTooltip}>SHOW TOOLTIP</Button>
      </Tooltip>
    );
  }
}

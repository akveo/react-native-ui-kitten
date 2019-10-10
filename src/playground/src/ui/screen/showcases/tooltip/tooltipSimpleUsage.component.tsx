import React from 'react';
import {
  Button,
  Tooltip,
} from 'react-native-ui-kitten';

export class TooltipSimpleUsageShowcase extends React.Component {

  state = {
    tooltipVisible: false,
  };

  onToggleButtonPress = () => {
    const tooltipVisible = !this.state.tooltipVisible;
    this.setState({ tooltipVisible });
  };

  render() {
    return (
      <Tooltip
        visible={this.state.tooltipVisible}
        text={'Hi! I\'m a Tooltip'}
        onBackdropPress={this.onToggleButtonPress}>
        <Button onPress={this.onToggleButtonPress}>
          TOGGLE TOOLTIP
        </Button>
      </Tooltip>
    );
  }
}

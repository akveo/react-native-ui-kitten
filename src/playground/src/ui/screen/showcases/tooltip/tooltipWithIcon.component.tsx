/**
 * IMPORTANT: To use Icon component make sure to follow this guide:
 * https://akveo.github.io/react-native-ui-kitten/docs/guides/eva-icons
 */

import React from 'react';
import {
  Button,
  Icon,
  Tooltip,
} from 'react-native-ui-kitten';

const InfoIcon = (style) => (
  <Icon {...style} name='info'/>
);

export class TooltipWithIconShowcase extends React.Component {

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
        icon={InfoIcon}
        onBackdropPress={this.onToggleButtonPress}>
        <Button onPress={this.onToggleButtonPress}>
          TOGGLE TOOLTIP
        </Button>
      </Tooltip>
    );
  }
}

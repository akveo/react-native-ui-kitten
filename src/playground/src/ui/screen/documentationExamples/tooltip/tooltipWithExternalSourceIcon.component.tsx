import React from 'react';
import { Image } from 'react-native';
import {
  Button,
  Tooltip,
} from 'react-native-ui-kitten';

const InfoIcon = (style) => (
  <Image
    style={style}
    source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/info.png' }}
  />
);

export class TooltipWithExternalSourceIconShowcase extends React.Component {

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

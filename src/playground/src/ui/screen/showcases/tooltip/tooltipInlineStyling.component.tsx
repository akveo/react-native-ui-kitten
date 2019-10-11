import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Button,
  Tooltip,
} from 'react-native-ui-kitten';

export class TooltipInlineStylingShowcase extends React.Component {

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
        textStyle={styles.tooltipText}
        onBackdropPress={this.onToggleButtonPress}>
        <Button onPress={this.onToggleButtonPress}>
          TOGGLE TOOLTIP
        </Button>
      </Tooltip>
    );
  }
}

const styles = StyleSheet.create({
  tooltipText: {
    color: 'white',
    fontSize: 18,
  },
});

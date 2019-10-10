import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {
  Tooltip,
  Button,
  Select,
} from 'react-native-ui-kitten';

export class TooltipPlacementShowcase extends React.Component {

  state = {
    visible: false,
    placement: { text: 'top' },
  };

  placements = [
    { text: 'top' },
    { text: 'top start' },
    { text: 'top end' },
    { text: 'left' },
    { text: 'left start' },
    { text: 'left end' },
    { text: 'right' },
    { text: 'right start' },
    { text: 'right end' },
    { text: 'bottom' },
    { text: 'bottom start' },
    { text: 'bottom end' },
  ];

  setVisible = () => {
    const visible = !this.state.visible;

    this.setState({ visible });
  };

  setPlacement = (placement) => {
    this.setState({ placement });
  };

  render() {
    return (
      <View style={styles.container}>
        <Select
          label='Select Tooltip Placement'
          data={this.placements}
          selectedOption={this.state.placement}
          onSelect={this.setPlacement}
        />
        <View style={styles.subContainer}>
          <Tooltip
            visible={this.state.visible}
            placement={this.state.placement.text}
            text='Hi! This is tooltip.'
            onBackdropPress={this.setVisible}>
            <Button
              size='giant'
              onPress={this.setVisible}>
              SHOW TOOLTIP
            </Button>
          </Tooltip>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  subContainer: {
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 150,
  },
  select: {
    position: 'absolute',
  },
});

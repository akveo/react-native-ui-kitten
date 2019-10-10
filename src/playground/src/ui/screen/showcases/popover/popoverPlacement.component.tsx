import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {
  Popover,
  Button,
  Text,
  Layout,
  Select,
} from 'react-native-ui-kitten';

export class PopoverPlacementShowcase extends React.Component {

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

  renderPopoverContent = () => (
    <Layout style={styles.popoverContent}>
      <Text>Hi! This is popover.</Text>
    </Layout>
  );

  render() {
    return (
      <View style={styles.container}>
        <Select
          label='Select Popover Placement'
          data={this.placements}
          selectedOption={this.state.placement}
          onSelect={this.setPlacement}
        />
        <View style={styles.subContainer}>
          <Popover
            visible={this.state.visible}
            placement={this.state.placement.text}
            content={this.renderPopoverContent()}
            onBackdropPress={this.setVisible}>
            <Button
              size='giant'
              onPress={this.setVisible}>
              SHOW POPOVER
            </Button>
          </Popover>
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
  popoverContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  select: {
    position: 'absolute',
  },
});

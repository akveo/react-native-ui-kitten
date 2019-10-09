import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Button,
  Layout,
  Popover,
  Text,
} from 'react-native-ui-kitten';

export class PopoverSimpleUsageShowcase extends React.Component {

  state = {
    popoverVisible: false,
  };

  onToggleButtonPress = () => {
    const popoverVisible = !this.state.popoverVisible;
    this.setState({ popoverVisible });
  };

  renderPopoverContent = () => (
    <Layout style={styles.popoverContent}>
      <Text>Hi! This is popover.</Text>
    </Layout>
  );

  render() {
    return (
      <Popover
        visible={this.state.popoverVisible}
        content={this.renderPopoverContent()}
        onBackdropPress={this.onToggleButtonPress}>
        <Button onPress={this.onToggleButtonPress}>
          TOGGLE POPOVER
        </Button>
      </Popover>
    );
  }
}

const styles = StyleSheet.create({
  popoverContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

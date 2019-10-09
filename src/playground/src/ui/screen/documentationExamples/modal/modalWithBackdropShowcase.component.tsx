import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Button,
  Layout,
  Modal,
  Text,
} from 'react-native-ui-kitten';

export class ModalWithBackdropShowcase extends React.Component {

  state = {
    modalVisible: false,
  };

  onToggleButtonPress = () => {
    const modalVisible: boolean = !this.state.modalVisible;
    this.setState({ modalVisible });
  };

  renderModal = () => (
    <Modal
      allowBackdrop={true}
      backdropStyle={styles.backdrop}
      onBackdropPress={this.onToggleButtonPress}
      visible={this.state.modalVisible}>
      <Layout
        level='3'
        style={styles.modalContentContainer}>
        <Text>Hi! I'm Modal</Text>
        <Button onPress={this.onToggleButtonPress}>
          TOGGLE MODAL
        </Button>
      </Layout>
    </Modal>
  );

  render() {
    return (
      <Layout style={styles.container}>
        <Button onPress={this.onToggleButtonPress}>
          TOGGLE MODAL
        </Button>
        {this.renderModal()}
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 256,
    height: 256,
    padding: 16,
  },
  modalContentContainer: {
    width: 192,
    height: 192,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    backgroundColor: 'black',
    opacity: 0.5,
  },
});

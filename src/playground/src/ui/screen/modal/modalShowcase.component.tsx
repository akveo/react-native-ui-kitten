import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {
  Button,
  Modal,
  ModalProps,
  Text,
} from 'react-native-ui-kitten';

interface State {
  modalVisible: boolean;
}

export class ModalShowcase extends React.Component<ModalProps, State> {

  public state: State = {
    modalVisible: false,
  };

  private toggleModal = (modalVisible: boolean) => {
    this.setState({ modalVisible });
  };

  public render(): React.ReactNode {
    return (
      <View style={styles.container}>
        <Button onPress={() => this.toggleModal(true)}>
          Show Modal
        </Button>
        <Modal
          {...this.props}
          visible={this.state.modalVisible}
          onBackdropPress={() => this.toggleModal(false)}>
          <Text>Hi! This is Modal</Text>
          <Button
            style={styles.button}
            onPress={() => this.toggleModal(false)}>
            Hide me
          </Button>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  button: {
    marginTop: 12,
  },
});

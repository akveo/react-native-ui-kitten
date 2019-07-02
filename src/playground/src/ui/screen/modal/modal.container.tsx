import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {
  Modal,
  Button,
  Text,
} from '@kitten/ui';

interface State {
  modalVisible: boolean;
}

export class ModalContainer extends React.Component<any, State> {

  public state: State = {
    modalVisible: false,
  };

  private setModalVisible = (modalVisible: boolean): void => {
    this.setState({ modalVisible });
  };

  public render(): React.ReactNode {
    return (
      <View style={styles.container}>
        <View style={[styles.innerContainer, styles.inner1]}>
          <Button
            style={styles.button}
            onPress={() => this.setModalVisible(true)}>
            Show Modal
          </Button>
        </View>
        <View style={[styles.innerContainer, styles.inner2]}>
          <Modal
            style={styles.modal}
            // backdropStyle={styles.backdropStyle}
            visible={this.state.modalVisible}>
            <Text>Hi! This is Modal</Text>
            <Button
              onPress={() => this.setModalVisible(false)}>
              Hide me
            </Button>
          </Modal>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  button: {
  },
  innerContainer: {
    flex: 1,
  },
  inner1: {
    backgroundColor: 'red',
    padding: 16,
    justifyContent: 'center',
  },
  inner2: {
    backgroundColor: 'yellow',
  },
  modal: {
    backgroundColor: 'white',
    width: 200,
    height: 200,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdropStyle: {
    // backgroundColor: 'black',
    // opacity: 0.5,
  },
});


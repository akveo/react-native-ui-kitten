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
} from '@ui-kitten/components';

export const ModalShowcase = (props: ModalProps): React.ReactElement => {

  const [visible, setVisible] = React.useState(false);

  const toggleModal = (): void => {
    setVisible(!visible);
  };

  return (
    <View style={styles.container}>
      <Button onPress={toggleModal}>
        Show Modal
      </Button>
      <Modal
        {...props}
        visible={visible}
        onBackdropPress={toggleModal}>
        <Text>Hi! This is Modal</Text>
        <Button
          style={styles.button}
          onPress={toggleModal}>
          Hide me
        </Button>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  button: {
    marginTop: 12,
  },
});

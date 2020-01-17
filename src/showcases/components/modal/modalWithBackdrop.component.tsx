import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Button,
  Layout,
  Modal,
  Text,
} from '@ui-kitten/components';

export const ModalWithBackdropShowcase = () => {

  const [visible, setVisible] = React.useState(false);

  const toggleModal = () => {
    setVisible(!visible);
  };

  const renderModalElement = () => (
    <Layout
      level='3'
      style={styles.modalContainer}>
      <Text>Hi! This is modal.</Text>
    </Layout>
  );

  return (
    <Layout style={styles.container}>
      <Button onPress={toggleModal}>
        TOGGLE MODAL
      </Button>
      <Modal
        backdropStyle={styles.backdrop}
        onBackdropPress={toggleModal}
        visible={visible}>
        {renderModalElement()}
      </Modal>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 256,
    padding: 16,
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 256,
    padding: 16,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Button,
  Layout,
  Modal,
  Text,
} from '@ui-kitten/components';

export const ModalSimpleUsageShowcase = () => {

  const [visible, setVisible] = React.useState(false);

  const toggleModal = () => {
    setVisible(!visible);
  };

  const renderModalElement = () => (
    <Layout
      level='3'
      style={styles.modalContainer}>
      <Text>Hi! This is modal</Text>
      <Button onPress={toggleModal}>
        DISMISS
      </Button>
    </Layout>
  );

  return (
    <Layout style={styles.container}>
      <Button onPress={toggleModal}>
        TOGGLE MODAL
      </Button>
      <Modal visible={visible}>
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
});

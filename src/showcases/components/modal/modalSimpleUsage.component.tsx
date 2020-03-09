import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Layout, Modal, Text } from '@ui-kitten/components';

export const ModalSimpleUsageShowcase = () => {

  const [visible, setVisible] = React.useState(false);

  return (
    <Layout style={styles.container}>

      <Button onPress={() => setVisible(true)}>
        TOGGLE MODAL
      </Button>

      <Modal visible={visible}>
        <Layout style={styles.modalContainer} level='3'>
          <Text>Hi! This is modal</Text>
          <Button onPress={() => setVisible(false)}>
            DISMISS
          </Button>
        </Layout>
      </Modal>

    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 256,
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 256,
    padding: 16,
  },
});

import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, Layout, Modal, Text } from '@ui-kitten/components';

export const ModalSimpleUsageShowcase = () => {

  const [visible, setVisible] = React.useState(false);

  return (
    <Layout style={styles.container} level='1'>

      <Button onPress={() => setVisible(true)}>
        TOGGLE MODAL
      </Button>

      <Modal visible={visible}>
        <Card disabled={true}>
          <Text>Welcome to UI Kitten 😻</Text>
          <Button onPress={() => setVisible(false)}>
            DISMISS
          </Button>
        </Card>
      </Modal>

    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 192,
  },
});

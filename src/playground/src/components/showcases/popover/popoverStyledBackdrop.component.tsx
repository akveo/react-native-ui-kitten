import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Button,
  Layout,
  Popover,
  Text,
} from '@ui-kitten/components';

const PopoverContent = () => (
  <Layout style={styles.popoverContent}>
    <Text>Hi!</Text>
  </Layout>
);

export const PopoverStyledBackdropShowcase = () => {

  const [visible, setVisible] = React.useState(false);

  const togglePopover = () => {
    setVisible(!visible);
  };

  return (
    <Popover
      backdropStyle={styles.backdrop}
      visible={visible}
      content={PopoverContent()}
      onBackdropPress={togglePopover}>
      <Button onPress={togglePopover}>
        TOGGLE POPOVER
      </Button>
    </Popover>
  );
};

const styles = StyleSheet.create({
  popoverContent: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

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

export const PopoverFullWidthShowcase = () => {

  const [visible, setVisible] = React.useState(false);

  const togglePopover = () => {
    setVisible(!visible);
  };

  return (
    <Popover
      visible={visible}
      content={PopoverContent()}
      fullWidth={true}
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
  },
});

import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Button,
  Layout,
  Popover,
  Text,
} from 'react-native-ui-kitten';

const PopoverContent = () => (
  <Layout style={styles.popoverContent}>
    <Text>Hi! This is popover.</Text>
  </Layout>
);

export const PopoverSimpleUsageShowcase = () => {

  const [visible, setVisible] = React.useState(false);

  const togglePopover = () => {
    setVisible(!visible);
  };

  return (
    <Popover
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
});

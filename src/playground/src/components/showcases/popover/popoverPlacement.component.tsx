import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {
  Button,
  Layout,
  Popover,
  Select,
  Text,
} from '@ui-kitten/components';

const PLACEMENTS = [
  { text: 'top' },
  { text: 'top start' },
  { text: 'top end' },
  { text: 'left' },
  { text: 'left start' },
  { text: 'left end' },
  { text: 'right' },
  { text: 'right start' },
  { text: 'right end' },
  { text: 'bottom' },
  { text: 'bottom start' },
  { text: 'bottom end' },
];

const PopoverContent = () => (
  <Layout style={styles.popoverContent}>
    <Text>Hi!</Text>
  </Layout>
);

export const PopoverPlacementShowcase = () => {

  const [visible, setVisible] = React.useState(false);
  const [placement, setPlacement] = React.useState(PLACEMENTS[0]);

  const togglePopover = () => {
    setVisible(!visible);
  };

  return (
    <Layout>

      <Select
        placeholder='Select Placement'
        data={PLACEMENTS}
        selectedOption={placement}
        onSelect={setPlacement}
      />

      <View style={styles.buttonContainer}>
        <Popover
          visible={visible}
          placement={placement.text}
          content={PopoverContent()}
          onBackdropPress={togglePopover}>
          <Button style={styles.button} onPress={togglePopover}>
            TOGGLE POPOVER
          </Button>
        </Popover>
      </View>

    </Layout>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 376,
  },
  button: {
    width: 192,
  },
  popoverContent: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
});

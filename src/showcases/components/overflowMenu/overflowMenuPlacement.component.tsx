import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {
  Button,
  Layout,
  OverflowMenu,
  Select,
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

const data = [
  { title: 'Menu Item 1' },
  { title: 'Menu Item 2' },
  { title: 'Menu Item 3' },
  { title: 'Menu Item 4' },
];

export const OverflowMenuPlacementShowcase = () => {

  const [visible, setVisible] = React.useState(false);
  const [placement, setPlacement] = React.useState(PLACEMENTS[0]);
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const toggleMenu = () => {
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
        <OverflowMenu
          data={data}
          visible={visible}
          placement={placement.text}
          selectedIndex={selectedIndex}
          onSelect={setSelectedIndex}
          onBackdropPress={toggleMenu}>
          <Button style={styles.button} onPress={toggleMenu}>
            TOGGLE MENU
          </Button>
        </OverflowMenu>
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
});

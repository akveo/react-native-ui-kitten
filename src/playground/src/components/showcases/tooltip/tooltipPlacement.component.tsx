import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {
  Button,
  Layout,
  Select,
  Tooltip,
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

export const TooltipPlacementShowcase = () => {

  const [visible, setVisible] = React.useState(false);
  const [placement, setPlacement] = React.useState(PLACEMENTS[0]);

  const toggleTooltip = () => {
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
        <Tooltip
          visible={visible}
          placement={placement.text}
          text='Hi!'
          onBackdropPress={toggleTooltip}>
          <Button style={styles.button} onPress={toggleTooltip}>
            TOGGLE TOOLTIP
          </Button>
        </Tooltip>
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

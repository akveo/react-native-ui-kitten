import React from 'react';
import {
  Button,
  Tooltip,
} from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

export const TooltipStyledBackdropShowcase = () => {

  const [visible, setVisible] = React.useState(false);

  const toggleTooltip = () => {
    setVisible(!visible);
  };

  return (
    <Tooltip
      backdropStyle={styles.backdrop}
      visible={visible}
      text='Hi!'
      onBackdropPress={toggleTooltip}>
      <Button onPress={toggleTooltip}>
        TOGGLE TOOLTIP
      </Button>
    </Tooltip>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Button,
  Tooltip,
} from '@ui-kitten/components';

export const TooltipInlineStylingShowcase = () => {

  const [visible, setVisible] = React.useState(false);

  const toggleTooltip = () => {
    setVisible(!visible);
  };

  return (
    <Tooltip
      visible={visible}
      text='Hi!'
      textStyle={styles.tooltipText}
      onBackdropPress={toggleTooltip}>
      <Button onPress={toggleTooltip}>
        TOGGLE TOOLTIP
      </Button>
    </Tooltip>
  );
};

const styles = StyleSheet.create({
  tooltipText: {
    color: 'white',
    fontSize: 18,
  },
});

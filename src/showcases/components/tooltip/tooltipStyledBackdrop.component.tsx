import React from 'react';
import { Button, Tooltip } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

export const TooltipStyledBackdropShowcase = () => {

  const [visible, setVisible] = React.useState(false);

  const renderToggleButton = () => (
    <Button onPress={() => setVisible(true)}>
      TOGGLE TOOLTIP
    </Button>
  );

  return (
    <Tooltip
      anchor={renderToggleButton}
      visible={visible}
      backdropStyle={styles.backdrop}
      onBackdropPress={() => setVisible(false)}>
      Welcome to UI Kitten 😻
    </Tooltip>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

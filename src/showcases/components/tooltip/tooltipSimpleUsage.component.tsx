import React from 'react';
import { Button, Tooltip } from '@ui-kitten/components';

export const TooltipSimpleUsageShowcase = (): React.ReactElement => {

  const [visible, setVisible] = React.useState(false);

  const renderToggleButton = (): React.ReactElement => (
    <Button onPress={() => setVisible(true)}>
      TOGGLE TOOLTIP
    </Button>
  );

  return (
    <Tooltip
      anchor={renderToggleButton}
      visible={visible}
      onBackdropPress={() => setVisible(false)}
    >
      Welcome to UI Kitten 😻
    </Tooltip>
  );
};

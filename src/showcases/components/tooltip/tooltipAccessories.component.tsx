import React from 'react';
import { Button, Icon, IconElement, Tooltip } from '@ui-kitten/components';

const InfoIcon = (props): IconElement => (
  <Icon
    {...props}
    name='info'
  />
);

export const TooltipAccessoriesShowcase = (): React.ReactElement => {

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
      accessoryLeft={InfoIcon}
      onBackdropPress={() => setVisible(false)}
    >
      Welcome to UI Kitten 😻
    </Tooltip>
  );
};

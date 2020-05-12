import React from 'react';
import { Button, Icon, Tooltip } from '@ui-kitten/components';

const InfoIcon = (props) => (
  <Icon {...props} name='info'/>
);

export const TooltipAccessoriesShowcase = () => {

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
      accessoryLeft={InfoIcon}
      onBackdropPress={() => setVisible(false)}>
      Welcome to UI Kitten 😻
    </Tooltip>
  );
};

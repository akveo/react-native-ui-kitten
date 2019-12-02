import React from 'react';
import {
  Button,
  Tooltip,
  TooltipElement,
  TooltipProps,
} from '@ui-kitten/components';

export const TooltipShowcase = (props: TooltipProps): TooltipElement => {

  const [visible, setVisible] = React.useState<boolean>(false);

  const toggleTooltip = (): void => {
    setVisible(!visible);
  };

  return (
    <Tooltip
      {...props}
      visible={visible}
      text='Hi! I am Tooltip!'
      onBackdropPress={toggleTooltip}>
      <Button onPress={toggleTooltip}>
        SHOW TOOLTIP
      </Button>
    </Tooltip>
  );
};

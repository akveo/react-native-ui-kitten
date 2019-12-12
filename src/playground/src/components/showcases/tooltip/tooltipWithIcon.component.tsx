/**
 * IMPORTANT: To use Icon component make sure to follow this guide:
 * https://akveo.github.io/react-native-ui-kitten/docs/guides/icon-packages
 */

import React from 'react';
import {
  Button,
  Icon,
  Tooltip,
} from '@ui-kitten/components';

const InfoIcon = (style) => (
  <Icon {...style} name='info'/>
);

export const TooltipWithIconShowcase = () => {

  const [visible, setVisible] = React.useState(false);

  const toggleTooltip = () => {
    setVisible(!visible);
  };

  return (
    <Tooltip
      visible={visible}
      text='Hi!'
      icon={InfoIcon}
      onBackdropPress={toggleTooltip}>
      <Button onPress={toggleTooltip}>
        TOGGLE TOOLTIP
      </Button>
    </Tooltip>
  );
};

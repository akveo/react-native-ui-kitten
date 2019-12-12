import React from 'react';
import { Image } from 'react-native';
import {
  Button,
  Tooltip,
} from '@ui-kitten/components';

const InfoIcon = (style) => (
  <Image
    style={style}
    source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/info.png' }}
  />
);

export const TooltipWithExternalSourceIconShowcase = () => {

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

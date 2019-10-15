import React from 'react';
import {
  Button,
  ButtonElement,
  ButtonProps,
} from 'react-native-ui-kitten';

export const DrawerShowcase = (props?: ButtonProps): ButtonElement => {
  return (
    <Button
      {...props}>
      TOGGLE DRAWER
    </Button>
  );
};

import React from 'react';
import {
  Button,
  ButtonElement,
  ButtonProps,
} from '@ui-kitten/components';

export const DrawerShowcase = (props?: ButtonProps): ButtonElement => {
  return (
    <Button
      {...props}>
      TOGGLE DRAWER
    </Button>
  );
};

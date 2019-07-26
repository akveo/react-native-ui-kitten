import React from 'react';
import {
  Button,
  ButtonElement,
  ButtonProps,
} from '@kitten/ui';

export const ButtonShowcase = (props?: ButtonProps): ButtonElement => {
  return (
    <Button
      {...props}>
      BUTTON
    </Button>
  );
};

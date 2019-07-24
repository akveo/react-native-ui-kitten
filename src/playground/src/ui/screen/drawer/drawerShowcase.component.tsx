import React from 'react';
import {
  Button,
  ButtonProps,
} from '@kitten/ui';

export const DrawerShowcase = (props?: ButtonProps): React.ReactElement<ButtonProps> => {
  return (
    <Button
      {...props}>
      TOGGLE DRAWER
    </Button>
  );
};

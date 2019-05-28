import React from 'react';
import {
  Button,
  ButtonProps,
} from '@kitten/ui';

export const ButtonShowcase = (props?: ButtonProps): React.ReactElement<ButtonProps> => {
  return (
    <Button
      {...props}>
      BUTTON
    </Button>
  );
};

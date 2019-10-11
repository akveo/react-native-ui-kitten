import React from 'react';
import {
  Button,
  ButtonElement,
  ButtonProps,
} from 'react-native-ui-kitten';

export const ButtonShowcase = (props?: ButtonProps): ButtonElement => {
  return (
    <Button
      {...props}>
      BUTTON
    </Button>
  );
};

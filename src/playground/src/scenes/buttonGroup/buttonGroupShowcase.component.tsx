import React from 'react';
import {
  Button,
  ButtonGroup,
  ButtonGroupElement,
  ButtonGroupProps,
} from 'react-native-ui-kitten';

export const ButtonGroupShowcase = (props?: ButtonGroupProps): ButtonGroupElement => (
  <ButtonGroup {...props}>
    <Button>L</Button>
    <Button>M</Button>
    <Button>R</Button>
  </ButtonGroup>
);

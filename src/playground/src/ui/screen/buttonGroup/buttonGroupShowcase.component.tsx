import React from 'react';
import {
  Button,
  ButtonGroup,
  ButtonGroupElement,
  ButtonGroupProps,
} from '@kitten/ui';

export const ButtonGroupShowcase = (props?: ButtonGroupProps): ButtonGroupElement => {
  return (
    <ButtonGroup {...props}>
      <Button>L</Button>
      <Button>M</Button>
      <Button>R</Button>
    </ButtonGroup>
  );
};

import React from 'react';
import {
  Button,
  ButtonGroup,
  ButtonGroupProps,
} from '@kitten/ui';

export const ButtonGroupShowcase = (props?: ButtonGroupProps): React.ReactElement<ButtonGroupProps> => {
  return (
    <ButtonGroup {...props}>
      <Button>L</Button>
      <Button>M</Button>
      <Button>R</Button>
    </ButtonGroup>
  );
};

import React from 'react';
import { Button, Text } from '@ui-kitten/components';

const MyButton = (props) => (
  <Button {...props}>
    {evaProps => <Text {...evaProps}>{props.children}</Text>}
  </Button>
);

export const ButtonStylingShowcase = () => (
  <MyButton>
    BUTTON
  </MyButton>
);

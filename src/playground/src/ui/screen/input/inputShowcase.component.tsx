import React from 'react';
import {
  Input,
  InputProps,
} from '@kitten/ui';

export const InputShowcase = (props?: InputProps): React.ReactElement<InputProps> => {
  return (
    <Input
      {...props}
      placeholder='Place your Text'
    />
  );
};

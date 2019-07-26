import React from 'react';
import {
  Input,
  InputElement,
  InputProps,
} from '@kitten/ui';

export const InputShowcase = (props?: InputProps): InputElement => {
  return (
    <Input
      {...props}
      placeholder='Place your Text'
    />
  );
};

import React from 'react';
import {
  Input,
  InputElement,
  InputProps,
} from 'react-native-ui-kitten';

export const InputShowcase = (props?: InputProps): InputElement => {
  return (
    <Input
      {...props}
      placeholder='Place your Text'
    />
  );
};

import React from 'react';
import {
  Input,
  InputElement,
  InputProps,
} from 'react-native-ui-kitten';

export const InputShowcase = (props?: InputProps): InputElement => {

  const [value, setValue] = React.useState(null);

  return (
    <Input
      {...props}
      value={value}
      onChangeText={setValue}
      placeholder='Place your Text'
    />
  );
};

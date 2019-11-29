import React from 'react';
import { Input } from 'react-native-ui-kitten';

export const InputSimpleUsageShowcase = () => {

  const [value, setValue] = React.useState('');

  return (
    <Input
      placeholder='Place your Text'
      value={value}
      onChangeText={setValue}
    />
  );
};

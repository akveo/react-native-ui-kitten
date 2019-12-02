import React from 'react';
import { Input } from '@ui-kitten/components';

export const InputWithLabelShowcase = () => {

  const [value, setValue] = React.useState('');

  return (
    <Input
      label='Email'
      placeholder='john.doe@example.com'
      value={value}
      onChangeText={setValue}
    />
  );
};

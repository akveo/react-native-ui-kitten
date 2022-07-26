import React from 'react';
import { Input } from '@ui-kitten/components';

export const InputFloatingUsageShowcase = () => {

  const [value, setValue] = React.useState('');

  return (
    <Input
      floatingLabel='Floating Label'
      value={value}
      onChangeText={nextValue => setValue(nextValue)}
    />
  );
};

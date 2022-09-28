import React from 'react';
import { Input } from '@ui-kitten/components';

export const InputSimpleUsageShowcase = (): React.ReactElement => {

  const [value, setValue] = React.useState('');

  return (
    <Input
      placeholder='Place your Text'
      value={value}
      onChangeText={nextValue => setValue(nextValue)}
    />
  );
};

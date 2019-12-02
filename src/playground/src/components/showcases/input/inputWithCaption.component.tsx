import React from 'react';
import { Input } from '@ui-kitten/components';

export const InputWithCaptionShowcase = () => {

  const [value, setValue] = React.useState('');
  const isNotEmpty = value && value.length > 0;

  return (
    <Input
      placeholder='Place your Text'
      status={isNotEmpty ? 'success' : 'danger'}
      caption={isNotEmpty ? '' : 'Can not be empty'}
      value={value}
      onChangeText={setValue}
    />
  );
};

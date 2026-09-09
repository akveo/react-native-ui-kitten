import React from 'react';
import { Input, Select } from '@ui-kitten/components';

export const Form = (): React.ReactElement => {
  const inputRef = React.useRef<Input>(null);
  const selectRef: React.RefObject<Select> = React.createRef();

  return (
    <Input
      ref={inputRef}
      onFocus={() => selectRef.current?.focus()}
    />
  );
};

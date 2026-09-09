import React from 'react';
import { Input, Select, InputRef, SelectRef } from '@ui-kitten/components';

export const Form = (): React.ReactElement => {
  const inputRef = React.useRef<InputRef>(null);
  const selectRef: React.RefObject<SelectRef> = React.createRef();

  return (
    <Input
      ref={inputRef}
      onFocus={() => selectRef.current?.focus()}
    />
  );
};

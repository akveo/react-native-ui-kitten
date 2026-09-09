// Same names, different package.
import React from 'react';
import { Input, Button, Card } from 'react-native-paper';
import { Select } from 'some-other-ui-kit';

export const inputRef = React.useRef<Input>(null);
export const buttonRef = React.useRef<Button>(null);
export const selectRef = React.useRef<Select>(null);

export const Screen = (): React.ReactElement => (
  <Card>
    <Input ref={inputRef} />
  </Card>
);

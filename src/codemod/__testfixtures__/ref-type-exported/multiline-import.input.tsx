// Multi-line imports are the dominant style in both v5 templates.
import React from 'react';
import {
  Autocomplete,
  Button,
  Input,
  Layout,
} from '@ui-kitten/components';

export const autocompleteRef = React.useRef<Autocomplete>(null);
export const inputRef = React.useRef<Input>(null);

export const Screen = (): React.ReactElement => (
  <Layout>
    <Autocomplete ref={autocompleteRef} />
    <Input ref={inputRef} />
    <Button>Go</Button>
  </Layout>
);

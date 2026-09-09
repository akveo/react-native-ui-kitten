// Rewriting one rule at a time naturally produces duplicate declarations; merging happens once,
// after everything else has run.
import React from 'react';
import { Layout, Text, InputRef } from '@ui-kitten/components';

export const ref = React.useRef<InputRef>(null);

export const Screen = (): React.ReactElement => (
  <Layout>
    <Text>Hello</Text>
  </Layout>
);

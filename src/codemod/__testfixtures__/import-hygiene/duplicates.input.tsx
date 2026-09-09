// Rewriting one rule at a time naturally produces duplicate declarations; merging happens once,
// after everything else has run.
import React from 'react';
import { Layout } from '@ui-kitten/components';
import { Text } from '@ui-kitten/components';
import { InputRef } from '@ui-kitten/components';

export const ref = React.useRef<InputRef>(null);

export const Screen = (): React.ReactElement => (
  <Layout>
    <Text>Hello</Text>
  </Layout>
);

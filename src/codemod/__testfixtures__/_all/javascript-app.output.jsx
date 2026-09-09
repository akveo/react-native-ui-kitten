// v5 had plenty of JavaScript users. Type-position rules find nothing here; import rules still fire.
import React from 'react';
import * as eva from '@ui-kitten/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import merge from 'lodash.merge';

const customMapping = merge({}, eva.mapping, {});

export default () => (
  <ApplicationProvider
    mapping={customMapping}
    theme={eva.light}
  >
    <Layout>
      <Text>Hello</Text>
    </Layout>
  </ApplicationProvider>
);

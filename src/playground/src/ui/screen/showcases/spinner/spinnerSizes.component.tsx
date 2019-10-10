import React from 'react';
import {
  Layout,
  Spinner,
} from 'react-native-ui-kitten';

export const SpinnerSizesShowcase = () => (
  <Layout>
    <Spinner size='tiny'/>
    <Spinner size='small'/>
    <Spinner size='medium'/>
    <Spinner size='large'/>
    <Spinner size='giant'/>
  </Layout>
);

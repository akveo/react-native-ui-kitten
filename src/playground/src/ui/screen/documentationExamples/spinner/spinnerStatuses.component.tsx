import React from 'react';
import {
  Layout,
  Spinner,
} from 'react-native-ui-kitten';

export const SpinnerStatusesShowcase = () => (
  <Layout>
    <Spinner status='primary'/>
    <Spinner status='success'/>
    <Spinner status='info'/>
    <Spinner status='warning'/>
    <Spinner status='danger'/>
    <Spinner status='alternative'/>
  </Layout>
);

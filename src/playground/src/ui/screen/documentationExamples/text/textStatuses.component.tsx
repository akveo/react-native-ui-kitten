import React from 'react';
import {
  Layout,
  Text,
} from 'react-native-ui-kitten';

export const TextStatusesShowcase = () => (
  <Layout>
    <Text status='primary'>PRIMARY</Text>
    <Text status='success'>SUCCESS</Text>
    <Text status='info'>INFO</Text>
    <Text status='warning'>WARNING</Text>
    <Text status='danger'>DANGER</Text>
  </Layout>
);

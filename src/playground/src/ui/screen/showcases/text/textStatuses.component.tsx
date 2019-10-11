import React from 'react';
import {
  Layout,
  Text,
} from 'react-native-ui-kitten';

export const TextStatusesShowcase = () => (
  <Layout>
    <Text status='primary'>Primary</Text>
    <Text status='success'>Success</Text>
    <Text status='info'>Info</Text>
    <Text status='warning'>Warning</Text>
    <Text status='danger'>Danger</Text>
  </Layout>
);

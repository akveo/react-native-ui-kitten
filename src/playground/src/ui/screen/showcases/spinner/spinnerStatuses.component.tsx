import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Spinner,
} from 'react-native-ui-kitten';

export const SpinnerStatusesShowcase = () => (
  <Layout style={styles.container}>
    <Spinner status='primary'/>
    <Spinner status='success'/>
    <Spinner status='info'/>
    <Spinner status='warning'/>
    <Spinner status='danger'/>
    <Spinner status='alternative'/>
  </Layout>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    minHeight: 256,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
});

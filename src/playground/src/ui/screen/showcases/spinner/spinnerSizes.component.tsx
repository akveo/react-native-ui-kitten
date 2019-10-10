import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Spinner,
} from 'react-native-ui-kitten';

export const SpinnerSizesShowcase = () => (
  <Layout style={styles.container}>
    <Spinner size='tiny'/>
    <Spinner size='small'/>
    <Spinner size='medium'/>
    <Spinner size='large'/>
    <Spinner size='giant'/>
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

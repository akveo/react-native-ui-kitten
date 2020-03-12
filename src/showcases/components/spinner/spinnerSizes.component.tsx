import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Spinner } from '@ui-kitten/components';

export const SpinnerSizesShowcase = () => (
  <Layout style={styles.container} level='1'>

    <Spinner size='tiny'/>

    <Spinner size='small'/>

    <Spinner size='medium'/>

    <Spinner size='large'/>

    <Spinner size='giant'/>

  </Layout>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});

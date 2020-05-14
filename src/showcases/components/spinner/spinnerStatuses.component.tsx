import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout, Spinner } from '@ui-kitten/components';

export const SpinnerStatusesShowcase = () => (
  <Layout style={styles.container} level='1'>

    <Spinner status='primary'/>

    <Spinner status='success'/>

    <Spinner status='info'/>

    <Spinner status='warning'/>

    <Spinner status='danger'/>

    <Spinner status='basic'/>

    <View style={styles.controlContainer}>
      <Spinner status='control'/>
    </View>

  </Layout>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  controlContainer: {
    borderRadius: 4,
    padding: 12,
    backgroundColor: '#3366FF',
  },
});

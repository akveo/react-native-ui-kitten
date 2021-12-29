import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, CircularProgressBar } from '@ui-kitten/components';

export const CircularProgressBarStatesShowcase = () => {
  return (
    <Layout style={styles.container} level='1'>

      <CircularProgressBar progress={0.33}/>

      <CircularProgressBar progress={1} state='success'/>

      <CircularProgressBar progress={0.81} state='error'/>

    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});

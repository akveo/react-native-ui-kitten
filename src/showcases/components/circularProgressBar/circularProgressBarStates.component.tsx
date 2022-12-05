import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, CircularProgressBar } from '@ui-kitten/components';

export const CircularProgressBarStatesShowcase = (): React.ReactElement => {
  return (
    <Layout
      style={styles.container}
      level='1'
    >
      <CircularProgressBar progress={0.33} />
      <CircularProgressBar
        progress={1}
        status='success'
      />
      <CircularProgressBar
        progress={0.81}
        status='danger'
      />
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

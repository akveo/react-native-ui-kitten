import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, CircularProgressBar } from '@ui-kitten/components';
import { useProgress } from '../../helpers/progress.hook';

export const CircularProgressBarStatesShowcase = (): React.ReactElement => {
  const progress = useProgress();
  return (
    <Layout
      style={styles.container}
      level='1'
    >
      <CircularProgressBar progress={progress} />
      <CircularProgressBar
        progress={progress}
        status='success'
      />
      <CircularProgressBar
        progress={progress}
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

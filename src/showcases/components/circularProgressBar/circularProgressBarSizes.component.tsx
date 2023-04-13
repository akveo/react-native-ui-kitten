import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, CircularProgressBar } from '@ui-kitten/components';
import { useProgress } from '../../helpers/progress.hook';

export const CircularProgressBarSizesShowcase = (): React.ReactElement => {
  const progress = useProgress();
  return (
    <Layout
      style={styles.container}
      level='1'
    >
      <CircularProgressBar
        progress={progress}
        size='tiny'
      />
      <CircularProgressBar
        progress={progress}
        size='small'
      />
      <CircularProgressBar
        progress={progress}
        size='medium'
      />
      <CircularProgressBar
        progress={progress}
        size='large'
      />
      <CircularProgressBar
        progress={progress}
        size='giant'
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

import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, CircularProgressBar } from '@ui-kitten/components';

let timeoutId;
const getRandomNum = (min: number, max: number): number => Math.random() * (max - min) + min;

export const CircularProgressBarSizesShowcase = (): React.ReactElement => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    timeoutId = setTimeout(() => {
      clearTimeout(timeoutId);

      if (progress < 1) {
        const load = getRandomNum(0.1, 0.4);
        setProgress(progress + load);
      } else {
        setProgress(0);
      }
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [progress]);

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

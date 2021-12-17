import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout, ProgressBar } from '@ui-kitten/components';

let timeoutId;
const getRandomNum = (min: number, max: number): number => Math.random() * (max - min) + min;

export const ProgressBarStatusesShowcase = () => {
  const [ progress, setProgress ] = React.useState(0);

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
  }, [ progress ]);

  return (
    <Layout style={styles.container} level='1'>

      <View style={styles.divider} />
      <ProgressBar progress={progress} status='primary'/>
      <View style={styles.divider} />
      <ProgressBar progress={progress} status='success'/>
      <View style={styles.divider} />
      <ProgressBar progress={progress} status='info'/>
      <View style={styles.divider} />
      <ProgressBar progress={progress} status='warning'/>
      <View style={styles.divider} />
      <ProgressBar progress={progress} status='danger'/>
      <View style={styles.divider} />
      <ProgressBar progress={progress} status='basic'/>
      <View style={styles.divider} />
      <View style={styles.controlContainer}>
        <ProgressBar progress={progress} status='control'/>
      </View>

    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
  },
  controlContainer: {
    borderRadius: 4,
    padding: 12,
    backgroundColor: '#3366FF',
  },
  divider: {
    marginVertical: 5,
  },
});

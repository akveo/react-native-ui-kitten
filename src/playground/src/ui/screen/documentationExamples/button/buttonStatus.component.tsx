import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Button,
} from 'react-native-ui-kitten';

export const ButtonStatusShowcase = (): React.ReactElement => {
  return (
    <Layout style={styles.container}>
      <Button style={styles.button} status='primary'>BUTTON</Button>
      <Button style={styles.button} status='success'>BUTTON</Button>
      <Button style={styles.button} status='info'>BUTTON</Button>
      <Button style={styles.button} status='warning'>BUTTON</Button>
      <Button style={styles.button} status='danger'>BUTTON</Button>
      <Button style={styles.button} status='basic'>BUTTON</Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  button: {
    marginBottom: 10,
  },
});

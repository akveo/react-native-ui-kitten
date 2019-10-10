import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Button,
  Layout,
} from 'react-native-ui-kitten';

export const ButtonSimpleUsageShowcase = () => (
  <Layout style={styles.container}>
    <Button style={styles.button}>BUTTON</Button>
    <Button style={styles.button} disabled={true}>DISABLED BUTTON</Button>
  </Layout>
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  button: {
    marginVertical: 8,
  },
});

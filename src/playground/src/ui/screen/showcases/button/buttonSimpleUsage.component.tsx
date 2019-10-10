import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Button,
  Layout,
} from 'react-native-ui-kitten';

export const ButtonSimpleUsageShowcase = () => (
  <Layout style={styles.container}>
    <Button style={styles.button}>ACTIVE</Button>
    <Button style={styles.button} disabled={true}>DISABLED</Button>
  </Layout>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  button: {
    marginHorizontal: 4,
  },
});

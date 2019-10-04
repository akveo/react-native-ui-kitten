import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Button,
} from 'react-native-ui-kitten';

export const ButtonSimpleUsageShowcase = (): React.ReactElement => {
  return (
    <Layout style={styles.container}>
      <Button style={styles.button}>BUTTON</Button>
      <Button style={styles.button} disabled>BUTTON</Button>
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

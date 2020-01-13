import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Button,
  Layout,
} from '@ui-kitten/components';

export const ButtonStatesShowcase = () => (
  <Layout style={styles.container}>

    <Button style={styles.button}>ACTIVE</Button>

    <Button style={styles.button} disabled={true}>DISABLED</Button>

  </Layout>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    margin: 8,
  },
});

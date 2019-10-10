import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Button,
  Layout,
} from 'react-native-ui-kitten';

export const ButtonAppearancesShowcase = () => (
  <Layout style={styles.container}>
    <Button style={styles.button} appearance='filled'>FILLED</Button>
    <Button style={styles.button} appearance='outline'>OUTLINE</Button>
    <Button style={styles.button} appearance='ghost'>GHOST</Button>
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

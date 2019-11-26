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
    flexWrap: 'wrap',
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  button: {
    marginVertical: 4,
    marginHorizontal: 4,
  },
});

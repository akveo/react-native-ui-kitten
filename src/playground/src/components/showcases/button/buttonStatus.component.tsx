import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Button,
  Layout,
} from 'react-native-ui-kitten';

export const ButtonStatusShowcase = () => (
  <Layout style={styles.container}>
    <Button style={styles.button} status='primary'>PRIMARY</Button>
    <Button style={styles.button} status='success'>SUCCESS</Button>
    <Button style={styles.button} status='info'>INFO</Button>
    <Button style={styles.button} status='warning'>WARNING</Button>
    <Button style={styles.button} status='danger'>DANGER</Button>
    <Button style={styles.button} status='basic'>BASIC</Button>
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

import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Button,
  Layout,
} from 'react-native-ui-kitten';

export const ButtonOutlineShowcase = () => (
  <Layout style={styles.container}>
    <Button style={styles.button} appearance='outline' status='primary'>PRIMARY</Button>
    <Button style={styles.button} appearance='outline' status='success'>SUCCESS</Button>
    <Button style={styles.button} appearance='outline' status='info'>INFO</Button>
    <Button style={styles.button} appearance='outline' status='warning'>WARNING</Button>
    <Button style={styles.button} appearance='outline' status='danger'>DANGER</Button>
    <Button style={styles.button} appearance='outline' status='basic'>BASIC</Button>
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

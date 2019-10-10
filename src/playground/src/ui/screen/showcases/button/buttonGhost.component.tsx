import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Button,
  Layout,
} from 'react-native-ui-kitten';

export const ButtonGhostShowcase = () => (
  <Layout style={styles.container}>
    <Button style={styles.button} appearance='ghost' status='primary'>PRIMARY</Button>
    <Button style={styles.button} appearance='ghost' status='success'>SUCCESS</Button>
    <Button style={styles.button} appearance='ghost' status='info'>INFO</Button>
    <Button style={styles.button} appearance='ghost' status='warning'>WARNING</Button>
    <Button style={styles.button} appearance='ghost' status='danger'>DANGER</Button>
    <Button style={styles.button} appearance='ghost' status='basic'>BASIC</Button>
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

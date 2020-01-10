import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {
  Button,
  Layout,
} from '@ui-kitten/components';

export const ButtonGhostShowcase = () => (
  <Layout style={styles.container}>

    <Button style={styles.button} appearance='ghost' status='primary'>PRIMARY</Button>

    <Button style={styles.button} appearance='ghost' status='success'>SUCCESS</Button>

    <Button style={styles.button} appearance='ghost' status='info'>INFO</Button>

    <Button style={styles.button} appearance='ghost' status='warning'>WARNING</Button>

    <Button style={styles.button} appearance='ghost' status='danger'>DANGER</Button>

    <Button style={styles.button} appearance='ghost' status='basic'>BASIC</Button>

    <View style={styles.controlContainer}>
      <Button style={styles.button} appearance='ghost' status='control'>CONTROL</Button>
    </View>

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
  controlContainer: {
    borderRadius: 4,
    margin: 8,
    backgroundColor: '#3366FF',
  },
});

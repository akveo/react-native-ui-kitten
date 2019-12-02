import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {
  Button,
  Layout,
} from '@ui-kitten/components';

export const ButtonStatusShowcase = () => (
  <Layout style={styles.container}>

    <Button style={styles.button} status='primary'>PRIMARY</Button>

    <Button style={styles.button} status='success'>SUCCESS</Button>

    <Button style={styles.button} status='info'>INFO</Button>

    <Button style={styles.button} status='warning'>WARNING</Button>

    <Button style={styles.button} status='danger'>DANGER</Button>

    <Button style={styles.button} status='basic'>BASIC</Button>

    <View style={styles.controlContainer}>
      <Button style={styles.button} status='control'>CONTROL</Button>
    </View>

  </Layout>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
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

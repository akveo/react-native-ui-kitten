import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { Button } from 'react-native-ui-kitten';

export const ButtonStatusShowcase = () => {
  return (
    <View style={styles.container}>
      <Button style={styles.button} status='primary'>BUTTON</Button>
      <Button style={styles.button} status='success'>BUTTON</Button>
      <Button style={styles.button} status='info'>BUTTON</Button>
      <Button style={styles.button} status='warning'>BUTTON</Button>
      <Button style={styles.button} status='danger'>BUTTON</Button>
      <Button style={styles.button} status='basic'>BUTTON</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  button: {
    marginBottom: 10,
  },
});

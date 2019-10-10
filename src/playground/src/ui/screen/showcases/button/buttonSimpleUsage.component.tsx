import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Button } from 'react-native-ui-kitten';

export const ButtonSimpleUsageShowcase = () => {
  return (
    <View style={styles.container}>
      <Button style={styles.button}>BUTTON</Button>
      <Button style={styles.button} disabled>BUTTON</Button>
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

import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Button } from 'react-native-ui-kitten';

export const ButtonSimpleUsageShowcase = () => {
  return (
    <View>
      <Button style={styles.button}>BUTTON</Button>
      <Button style={styles.button} disabled>BUTTON</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 10,
  },
});

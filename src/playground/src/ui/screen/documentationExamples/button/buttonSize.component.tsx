import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Button } from 'react-native-ui-kitten';

export const ButtonSizeShowcase = (): React.ReactElement => {
  return (
    <View style={styles.container}>
      <Button style={styles.button} size='tiny'>BUTTON</Button>
      <Button style={styles.button} size='small'>BUTTON</Button>
      <Button style={styles.button} size='medium'>BUTTON</Button>
      <Button style={styles.button} size='large'>BUTTON</Button>
      <Button style={styles.button} size='giant'>BUTTON</Button>
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

import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {
  Button,
  ButtonGroup,
} from 'react-native-ui-kitten';

export const ButtonGroupInlineStylingShowcase = () => (
  <View style={styles.container}>
    <ButtonGroup style={styles.buttonGroup}>
      <Button style={styles.button}>Left</Button>
      <Button style={styles.button}>Mid</Button>
      <Button style={styles.button}>Right</Button>
    </ButtonGroup>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  buttonGroup: {
    borderRadius: 8,
  },
  button: {
    flex: 1,
  },
});

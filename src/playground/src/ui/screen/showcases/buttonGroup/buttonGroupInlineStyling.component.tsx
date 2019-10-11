import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Button,
  ButtonGroup,
} from 'react-native-ui-kitten';

export const ButtonGroupInlineStylingShowcase = () => (
  <ButtonGroup style={styles.buttonGroup}>
    <Button style={styles.button}>L</Button>
    <Button style={styles.button}>M</Button>
    <Button style={styles.button}>R</Button>
  </ButtonGroup>
);

const styles = StyleSheet.create({
  buttonGroup: {
    margin: 16,
    borderRadius: 8,
  },
  button: {
    flex: 1,
  },
});

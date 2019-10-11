import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Button,
  ButtonGroup,
} from 'react-native-ui-kitten';

export const ButtonGroupSimpleUsageShowcase = () => (
  <ButtonGroup style={styles.container}>
    <Button style={styles.button}>L</Button>
    <Button style={styles.button}>M</Button>
    <Button style={styles.button}>R</Button>
  </ButtonGroup>
);

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  button: {
    flex: 1,
  },
});

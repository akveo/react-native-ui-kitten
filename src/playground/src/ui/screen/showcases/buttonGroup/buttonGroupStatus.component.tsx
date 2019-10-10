import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {
  Button,
  ButtonGroup,
} from 'react-native-ui-kitten';

export const ButtonGroupStatusShowcase = () => (
  <View style={styles.container}>
    <ButtonGroup
      style={styles.group}
      status='primary'>
      <Button style={styles.button}>Left</Button>
      <Button style={styles.button}>Mid</Button>
      <Button style={styles.button}>Right</Button>
    </ButtonGroup>
    <ButtonGroup
      style={styles.group}
      status='success'>
      <Button style={styles.button}>Left</Button>
      <Button style={styles.button}>Mid</Button>
      <Button style={styles.button}>Right</Button>
    </ButtonGroup>
    <ButtonGroup
      style={styles.group}
      status='info'>
      <Button style={styles.button}>Left</Button>
      <Button style={styles.button}>Mid</Button>
      <Button style={styles.button}>Right</Button>
    </ButtonGroup>
    <ButtonGroup
      style={styles.group}
      status='warning'>
      <Button style={styles.button}>Left</Button>
      <Button style={styles.button}>Mid</Button>
      <Button style={styles.button}>Right</Button>
    </ButtonGroup>
    <ButtonGroup
      style={styles.group}
      status='danger'>
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
  group: {
    marginBottom: 10,
  },
  button: {
    flex: 1,
  },
});

import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {
  Button,
  ButtonGroup,
} from 'react-native-ui-kitten';

export const ButtonGroupSizeShowcase = () => (
  <View style={styles.container}>
    <ButtonGroup
      style={styles.group}
      size='tiny'>
      <Button style={styles.button}>Left</Button>
      <Button style={styles.button}>Mid</Button>
      <Button style={styles.button}>Right</Button>
    </ButtonGroup>
    <ButtonGroup
      style={styles.group}
      size='small'>
      <Button style={styles.button}>Left</Button>
      <Button style={styles.button}>Mid</Button>
      <Button style={styles.button}>Right</Button>
    </ButtonGroup>
    <ButtonGroup
      style={styles.group}
      size='medium'>
      <Button style={styles.button}>Left</Button>
      <Button style={styles.button}>Mid</Button>
      <Button style={styles.button}>Right</Button>
    </ButtonGroup>
    <ButtonGroup
      style={styles.group}
      size='large'>
      <Button style={styles.button}>Left</Button>
      <Button style={styles.button}>Mid</Button>
      <Button style={styles.button}>Right</Button>
    </ButtonGroup>
    <ButtonGroup
      style={styles.group}
      size='giant'>
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

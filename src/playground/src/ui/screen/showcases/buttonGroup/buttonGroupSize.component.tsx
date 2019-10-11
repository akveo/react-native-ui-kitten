import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Button,
  ButtonGroup,
  Layout,
} from 'react-native-ui-kitten';

export const ButtonGroupSizeShowcase = () => (
  <Layout style={styles.container}>
    <ButtonGroup
      style={styles.buttonGroup}
      size='tiny'>
      <Button style={styles.button}>L</Button>
      <Button style={styles.button}>M</Button>
      <Button style={styles.button}>R</Button>
    </ButtonGroup>
    <ButtonGroup
      style={styles.buttonGroup}
      size='small'>
      <Button style={styles.button}>L</Button>
      <Button style={styles.button}>M</Button>
      <Button style={styles.button}>R</Button>
    </ButtonGroup>
    <ButtonGroup
      style={styles.buttonGroup}
      size='medium'>
      <Button style={styles.button}>L</Button>
      <Button style={styles.button}>M</Button>
      <Button style={styles.button}>R</Button>
    </ButtonGroup>
    <ButtonGroup
      style={styles.buttonGroup}
      size='large'>
      <Button style={styles.button}>L</Button>
      <Button style={styles.button}>M</Button>
      <Button style={styles.button}>R</Button>
    </ButtonGroup>
    <ButtonGroup
      style={styles.buttonGroup}
      size='giant'>
      <Button style={styles.button}>L</Button>
      <Button style={styles.button}>M</Button>
      <Button style={styles.button}>R</Button>
    </ButtonGroup>
  </Layout>
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonGroup: {
    marginVertical: 8,
  },
  button: {
    flex: 1,
  },
});

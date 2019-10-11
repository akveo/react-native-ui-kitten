import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Button,
  ButtonGroup,
  Layout,
} from 'react-native-ui-kitten';

export const ButtonGroupStatusShowcase = () => (
  <Layout style={styles.container}>
    <ButtonGroup
      style={styles.buttonGroup}
      status='primary'>
      <Button style={styles.button}>L</Button>
      <Button style={styles.button}>M</Button>
      <Button style={styles.button}>R</Button>
    </ButtonGroup>
    <ButtonGroup
      style={styles.buttonGroup}
      status='success'>
      <Button style={styles.button}>L</Button>
      <Button style={styles.button}>M</Button>
      <Button style={styles.button}>R</Button>
    </ButtonGroup>
    <ButtonGroup
      style={styles.buttonGroup}
      status='info'>
      <Button style={styles.button}>L</Button>
      <Button style={styles.button}>M</Button>
      <Button style={styles.button}>R</Button>
    </ButtonGroup>
    <ButtonGroup
      style={styles.buttonGroup}
      status='warning'>
      <Button style={styles.button}>L</Button>
      <Button style={styles.button}>M</Button>
      <Button style={styles.button}>R</Button>
    </ButtonGroup>
    <ButtonGroup
      style={styles.buttonGroup}
      status='danger'>
      <Button style={styles.button}>L</Button>
      <Button style={styles.button}>M</Button>
      <Button style={styles.button}>R</Button>
    </ButtonGroup>
  </Layout>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  buttonGroup: {
    marginBottom: 10,
  },
  button: {
    flex: 1,
  },
});

import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Button,
  ButtonGroup,
  Layout,
} from 'react-native-ui-kitten';

export const ButtonGroupAppearanceShowcase = () => (
  <Layout style={styles.container}>
    <ButtonGroup
      style={styles.buttonGroup}
      appearance='filled'>
      <Button style={styles.button}>L</Button>
      <Button style={styles.button}>M</Button>
      <Button style={styles.button}>R</Button>
    </ButtonGroup>
    <ButtonGroup
      style={styles.buttonGroup}
      appearance='outline'>
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

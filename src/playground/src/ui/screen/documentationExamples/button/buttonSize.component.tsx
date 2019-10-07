import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Button,
} from 'react-native-ui-kitten';

export const ButtonSizeShowcase = (): React.ReactElement => {
  return (
    <Layout style={styles.container}>
      <Button style={styles.button} size='tiny'>BUTTON</Button>
      <Button style={styles.button} size='small'>BUTTON</Button>
      <Button style={styles.button} size='medium'>BUTTON</Button>
      <Button style={styles.button} size='large'>BUTTON</Button>
      <Button style={styles.button} size='giant'>BUTTON</Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  button: {
    marginBottom: 10,
  },
});

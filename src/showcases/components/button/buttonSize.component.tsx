import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Layout } from '@ui-kitten/components';

export const ButtonSizeShowcase = () => (
  <Layout style={styles.container} level='1'>

    <Button style={styles.button} size='tiny'>
      TINY
    </Button>

    <Button style={styles.button} size='small'>
      SMALL
    </Button>

    <Button style={styles.button} size='medium'>
      MEDIUM
    </Button>

    <Button style={styles.button} size='large'>
      LARGE
    </Button>

    <Button style={styles.button} size='giant'>
      GIANT
    </Button>

  </Layout>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  button: {
    margin: 2,
  },
});

import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Layout } from '@ui-kitten/components';

export const ButtonAppearancesShowcase = () => (
  <Layout style={styles.container} level='1'>

    <Button style={styles.button} appearance='filled'>
      FILLED
    </Button>

    <Button style={styles.button} appearance='outline'>
      OUTLINE
    </Button>

    <Button style={styles.button} appearance='ghost'>
      GHOST
    </Button>

  </Layout>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    margin: 2,
  },
});

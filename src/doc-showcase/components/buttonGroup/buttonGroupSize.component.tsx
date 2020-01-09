import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Button,
  ButtonGroup,
  Layout,
} from '@ui-kitten/components';

export const ButtonGroupSizeShowcase = () => (
  <Layout style={styles.container}>

    <ButtonGroup style={styles.buttonGroup} size='tiny'>
      <Button>L</Button>
      <Button>R</Button>
    </ButtonGroup>

    <ButtonGroup style={styles.buttonGroup} size='small'>
      <Button>L</Button>
      <Button>R</Button>
    </ButtonGroup>

    <ButtonGroup style={styles.buttonGroup} size='medium'>
      <Button>L</Button>
      <Button>R</Button>
    </ButtonGroup>

    <ButtonGroup style={styles.buttonGroup} size='large'>
      <Button>L</Button>
      <Button>R</Button>
    </ButtonGroup>

    <ButtonGroup style={styles.buttonGroup} size='giant'>
      <Button>L</Button>
      <Button>R</Button>
    </ButtonGroup>

  </Layout>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: 8,
  },
  buttonGroup: {
    margin: 8,
  },
});

import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {
  Button,
  ButtonGroup,
  Layout,
} from '@ui-kitten/components';

export const ButtonGroupStatusShowcase = () => (
  <Layout style={styles.container}>

    <ButtonGroup style={styles.buttonGroup} status='primary'>
      <Button>L</Button>
      <Button>R</Button>
    </ButtonGroup>

    <ButtonGroup style={styles.buttonGroup} status='success'>
      <Button>L</Button>
      <Button>R</Button>
    </ButtonGroup>

    <ButtonGroup style={styles.buttonGroup} status='info'>
      <Button>L</Button>
      <Button>R</Button>
    </ButtonGroup>

    <ButtonGroup style={styles.buttonGroup} status='warning'>
      <Button>L</Button>
      <Button>R</Button>
    </ButtonGroup>

    <ButtonGroup style={styles.buttonGroup} status='danger'>
      <Button>L</Button>
      <Button>R</Button>
    </ButtonGroup>

    <ButtonGroup style={styles.buttonGroup} status='basic'>
      <Button>L</Button>
      <Button>R</Button>
    </ButtonGroup>

    <View style={styles.controlContainer}>
      <ButtonGroup style={styles.buttonGroup} status='control'>
        <Button>L</Button>
        <Button>R</Button>
      </ButtonGroup>
    </View>

  </Layout>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  buttonGroup: {
    margin: 8,
  },
  controlContainer: {
    borderRadius: 4,
    margin: 8,
    backgroundColor: '#3366FF',
  },
});

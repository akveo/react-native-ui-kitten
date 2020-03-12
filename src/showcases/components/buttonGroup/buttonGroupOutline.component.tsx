import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, ButtonGroup, Layout } from '@ui-kitten/components';

export const ButtonGroupOutlineShowcase = () => (
  <Layout style={styles.container} level='1'>

    <ButtonGroup style={styles.buttonGroup} appearance='outline' status='primary'>
      <Button>L</Button>
      <Button>R</Button>
    </ButtonGroup>

    <ButtonGroup style={styles.buttonGroup} appearance='outline' status='success'>
      <Button>L</Button>
      <Button>R</Button>
    </ButtonGroup>

    <ButtonGroup style={styles.buttonGroup} appearance='outline' status='info'>
      <Button>L</Button>
      <Button>R</Button>
    </ButtonGroup>

    <ButtonGroup style={styles.buttonGroup} appearance='outline' status='warning'>
      <Button>L</Button>
      <Button>R</Button>
    </ButtonGroup>

    <ButtonGroup style={styles.buttonGroup} appearance='outline' status='danger'>
      <Button>L</Button>
      <Button>R</Button>
    </ButtonGroup>

    <ButtonGroup style={styles.buttonGroup} appearance='outline' status='basic'>
      <Button>L</Button>
      <Button>R</Button>
    </ButtonGroup>

    <View style={styles.controlContainer}>
      <ButtonGroup style={styles.buttonGroup} appearance='outline' status='control'>
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
  },
  buttonGroup: {
    margin: 2,
  },
  controlContainer: {
    borderRadius: 4,
    margin: 2,
    padding: 6,
    justifyContent: 'center',
    backgroundColor: '#3366FF',
  },
});

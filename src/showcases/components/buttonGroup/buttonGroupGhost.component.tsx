import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, ButtonGroup, Layout } from '@ui-kitten/components';

export const ButtonGroupGhostShowcase = () => (
  <Layout style={styles.container} level='1'>
    <ButtonGroup style={styles.buttonGroup} appearance='ghost' status='primary'>
      <Button>L</Button>
      <Button>R</Button>
    </ButtonGroup>

    <ButtonGroup style={styles.buttonGroup} appearance='ghost' status='success'>
      <Button>L</Button>
      <Button>R</Button>
    </ButtonGroup>

    <ButtonGroup style={styles.buttonGroup} appearance='ghost' status='info'>
      <Button>L</Button>
      <Button>R</Button>
    </ButtonGroup>

    <ButtonGroup style={styles.buttonGroup} appearance='ghost' status='warning'>
      <Button>L</Button>
      <Button>R</Button>
    </ButtonGroup>

    <ButtonGroup style={styles.buttonGroup} appearance='ghost' status='danger'>
      <Button>L</Button>
      <Button>R</Button>
    </ButtonGroup>

    <ButtonGroup style={styles.buttonGroup} appearance='ghost' status='basic'>
      <Button>L</Button>
      <Button>R</Button>
    </ButtonGroup>

    <View style={styles.controlContainer}>
      <ButtonGroup style={styles.buttonGroup} appearance='ghost' status='control'>
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
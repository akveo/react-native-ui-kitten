import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Button,
  ButtonGroup,
} from '@ui-kitten/components';

export const ButtonGroupInlineStylingShowcase = () => (
  <ButtonGroup style={styles.buttonGroup}>
    <Button>L</Button>
    <Button>M</Button>
    <Button>R</Button>
  </ButtonGroup>
);

const styles = StyleSheet.create({
  buttonGroup: {
    margin: 16,
    borderRadius: 8,
  },
});

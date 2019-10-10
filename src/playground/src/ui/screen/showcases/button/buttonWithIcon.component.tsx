/**
 * IMPORTANT: To use Icon component make sure to follow this guide:
 * https://akveo.github.io/react-native-ui-kitten/docs/guides/eva-icons
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Button,
  Icon,
} from 'react-native-ui-kitten';

const StarIcon = (style) => (
  <Icon {...style} name='star'/>
);

export const ButtonWithIconShowcase = () => (
  <Button
    style={styles.button}
    icon={StarIcon}>
    BUTTON
  </Button>
);

const styles = StyleSheet.create({
  button: {
    margin: 16,
  },
});

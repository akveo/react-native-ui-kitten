import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Text,
} from '@ui-kitten/components';

export const LayoutInlineStylingShowcase = () => (
  <Layout style={styles.container}>
    <Text>Welcome To React Native UI Kitten!</Text>
  </Layout>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderColor: 'red',
    borderWidth: 2,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Text,
} from '@ui-kitten/components';

export const LayoutSimpleUsageShowcase = () => (
  <Layout style={styles.container}>
    <Text>Welcome To React Native UI Kitten!</Text>
  </Layout>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

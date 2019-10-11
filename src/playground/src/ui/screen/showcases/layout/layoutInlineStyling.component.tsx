import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Text,
} from 'react-native-ui-kitten';

export const LayoutInlineStylingShowcase = () => {

  return (
    <Layout style={[styles.container, styles.additionalContainerStyle]}>
      <Text>Welcome To React Native UI Kitten!</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  additionalContainerStyle: {
    borderColor: 'red',
    borderWidth: 2,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

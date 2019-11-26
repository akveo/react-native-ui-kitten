import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Text,
} from 'react-native-ui-kitten';

export const LayoutLevelShowcase = () => {

  return (
    <Layout style={styles.container} level='4'>
      <Layout style={styles.container} level='3'>
        <Layout style={styles.container} level='2'>
          <Layout style={[styles.container, styles.contentContainer]}>
            <Text>Welcome To React Native UI Kitten!</Text>
          </Layout>
        </Layout>
      </Layout>
    </Layout>

  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

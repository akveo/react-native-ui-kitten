import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Avatar,
  Layout,
} from 'react-native-ui-kitten';

export const AvatarShapeShowcase = () => (
  <Layout style={styles.container}>
    <Avatar
      style={styles.item}
      shape='round'
      source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' }}
    />
    <Avatar
      style={styles.item}
      shape='rounded'
      source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' }}
    />
    <Avatar
      style={styles.item}
      shape='square'
      source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' }}
    />
  </Layout>
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  item: {
    marginVertical: 8,
  },
});

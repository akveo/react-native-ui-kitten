import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Avatar,
  Layout,
} from 'react-native-ui-kitten';

export const AvatarSizeShowcase = () => (
  <Layout style={styles.container}>
    <Avatar
      style={styles.item}
      size='tiny'
      source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' }}
    />
    <Avatar
      style={styles.item}
      size='small'
      source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' }}
    />
    <Avatar
      style={styles.item}
      size='medium'
      source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' }}
    />
    <Avatar
      style={styles.item}
      size='large'
      source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' }}
    />
    <Avatar
      style={styles.item}
      size='giant'
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

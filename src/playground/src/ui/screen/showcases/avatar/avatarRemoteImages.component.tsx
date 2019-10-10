import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Avatar,
  Layout,
} from 'react-native-ui-kitten';

export const AvatarRemoteImagesShowcase = () => (
  <Layout style={styles.container}>
    <Avatar source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' }}/>
  </Layout>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

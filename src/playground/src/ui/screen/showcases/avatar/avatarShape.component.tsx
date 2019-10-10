import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { Avatar } from 'react-native-ui-kitten';

export const AvatarShapeShowcase = () => {

  return (
    <View style={styles.container}>
      <Avatar
        shape='round'
        style={styles.item}
        source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' }}
      />
      <Avatar
        shape='rounded'
        style={styles.item}
        source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' }}
      />
      <Avatar
        shape='square'
        style={styles.item}
        source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  item: {
    marginBottom: 16,
  },
});

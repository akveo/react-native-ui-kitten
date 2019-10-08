import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { Avatar } from 'react-native-ui-kitten';

export const AvatarSizeShowcase = () => {

  return (
    <View style={styles.container}>
      <Avatar
        size='tiny'
        style={styles.item}
        source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' }}
      />
      <Avatar
        size='small'
        style={styles.item}
        source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' }}
      />
      <Avatar
        size='medium'
        style={styles.item}
        source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' }}
      />
      <Avatar
        size='large'
        style={styles.item}
        source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' }}
      />
      <Avatar
        size='giant'
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

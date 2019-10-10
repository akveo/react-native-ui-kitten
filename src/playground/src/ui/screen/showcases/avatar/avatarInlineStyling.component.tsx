import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { Avatar } from 'react-native-ui-kitten';

export const AvatarInlineStylingShowcase = () => {

  return (
    <View style={styles.container}>
      <Avatar
        style={styles.avatar}
        source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 16,
  },
});

import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { Avatar } from 'react-native-ui-kitten';

export const AvatarRemoteImagesShowcase = () => {

  return (
    <View style={styles.container}>
      <Avatar source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' }}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

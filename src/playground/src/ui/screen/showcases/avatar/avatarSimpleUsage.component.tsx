import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { Avatar } from 'react-native-ui-kitten';

export const AvatarSimpleUsageShowcase = () => {

  return (
    <View style={styles.container}>
      <Avatar source={require('../../../../assets/brand-logo.png')}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

import React from 'react';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';
import { Button } from 'react-native-ui-kitten';

export const ButtonIconShowcase = () => {

  const renderIcon = (style) => {
    return (
      <Image
        source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' }}
        style={style}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Button
        icon={renderIcon}
        style={styles.button}>
        BUTTON
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  button: {
    marginBottom: 10,
  },
});

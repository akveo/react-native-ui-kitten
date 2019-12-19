import React from 'react';
import { View } from 'react-native';
import { Text, useStyleSheet } from '@ui-kitten/components';

export const UseStyleSheetScreen = () => {

  const styles = StyleSheet.create();

  return (
    <View style={styles.container}>
      <Text category='h4' status='control'>
        I useStyleSheet to set background color.
      </Text>
    </View>
  );
};

const StyleSheet = useStyleSheet({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'color-primary-default',
  },
});

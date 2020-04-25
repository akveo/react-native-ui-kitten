import React from 'react';
import { View } from 'react-native';
import { StyleService, Text, useStyleSheet } from '@ui-kitten/components';

export const UseStyleSheetSimpleUsageShowcase = () => {
  const styles = useStyleSheet(themedStyles);

  return (
    <View style={styles.container}>
      <Text category='h4' status='control'>
        I use success color as background!
      </Text>
    </View>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'color-success-default',
  },
});

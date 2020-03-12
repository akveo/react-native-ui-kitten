import React from 'react';
import { View } from 'react-native';
import { Text, withStyles } from '@ui-kitten/components';

const ThemedComponent = ({ eva }) => (
  <View style={eva.style.container}>
    <Text
      style={{ color: eva.theme['color-success-default'] }}
      category='h4'>
      I use info as background color and success as text color!
    </Text>
  </View>
);

export const WithStylesSimpleUsageShowcase = withStyles(ThemedComponent, theme => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme['color-info-default'],
  },
}));


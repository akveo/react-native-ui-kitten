import React from 'react';
import {
  Layout,
  Text,
  withStyles,
} from '@ui-kitten/components';

const ThemedComponent = ({ themedStyle, theme }) => (
  <Layout style={themedStyle.container}>
    <Text
      style={{ color: theme['color-success-default'] }}
      category='h4'>
      I use info as background color and success as text color!
    </Text>
  </Layout>
);

export const WithStylesSimpleUsageShowcase = withStyles(ThemedComponent, theme => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme['color-info-default'],
  },
}));


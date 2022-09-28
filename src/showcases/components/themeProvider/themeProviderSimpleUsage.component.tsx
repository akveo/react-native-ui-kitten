import React from 'react';
import { StyleSheet } from 'react-native';
import { dark, light } from '@eva-design/eva';
import { Card, Text, ThemeProvider } from '@ui-kitten/components';

export const ThemeProviderSimpleUsageShowcase = (): React.ReactElement => (
  <>

    <ThemeProvider theme={light}>
      <Card style={styles.cardStyle}>
        <Text>
I use light theme
        </Text>
      </Card>
    </ThemeProvider>

    <ThemeProvider theme={dark}>
      <Card style={styles.cardStyle}>
        <Text>
I use dark theme
        </Text>
      </Card>
    </ThemeProvider>

    <ThemeProvider theme={{ ...light, 'color-primary-default': 'red' }}>
      <Card style={styles.cardStyle}>
        <Text status='primary'>
I use custom light theme
        </Text>
      </Card>
    </ThemeProvider>

  </>
);

const styles = StyleSheet.create({
  cardStyle: {
    marginVertical: 8,
  },
});

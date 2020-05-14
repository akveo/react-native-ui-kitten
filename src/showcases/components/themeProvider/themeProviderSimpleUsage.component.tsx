import React from 'react';
import { dark, light } from '@eva-design/eva';
import { Card, Layout, Text, ThemeProvider } from '@ui-kitten/components';

export const ThemeProviderSimpleUsageShowcase = () => (
  <React.Fragment>

    <ThemeProvider theme={light}>
      <Card style={{ marginVertical: 8 }}>
        <Text>I use light theme</Text>
      </Card>
    </ThemeProvider>

    <ThemeProvider theme={dark}>
      <Card style={{ marginVertical: 8 }}>
        <Text>I use dark theme</Text>
      </Card>
    </ThemeProvider>

    <ThemeProvider theme={{ ...light, 'color-primary-default': 'red' }}>
      <Card style={{ marginVertical: 8 }}>
        <Text status='primary'>I use custom light theme</Text>
      </Card>
    </ThemeProvider>

  </React.Fragment>
);

import React from 'react';
import { light, dark } from '@eva-design/eva';
import { ThemeProvider, Card, Layout, Text } from '@ui-kitten/components';

export const ThemeProviderSimpleUsageShowcase = () => (
  <Layout>

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

  </Layout>
);

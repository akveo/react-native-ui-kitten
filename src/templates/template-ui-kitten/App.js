/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import { ApplicationProvider, Layout, Text } from 'react-native-ui-kitten';
import { mapping, light as theme } from '@eva-design/eva';

const App = () => (
  <ApplicationProvider mapping={mapping} theme={theme}>
    <Layout style={styles.container}>
      <Text style={styles.text} category='h1'>
        Welcome to UI Kitten 😻
      </Text>
      <Text style={styles.text} category='s1'>
        Start with editing App.js to configure your App
      </Text>
      <Text style={styles.text} appearance='hint'>
        For example, try changing theme to Dark by simply changing an import
      </Text>
    </Layout>
  </ApplicationProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
});

export default App;

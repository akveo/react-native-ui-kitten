import React from 'react';
import { ApplicationProvider } from 'react-native-ui-kitten';
import {
  light as theme,
  mapping,
} from '@eva-design/eva';
import { Router } from './src/router';

const App = () => (
  <ApplicationProvider mapping={mapping} theme={theme}>
    <Router/>
  </ApplicationProvider>
);

export default App;

import React from 'react';
import { default as mapping } from '@eva/eva';
import { default as theme } from '@eva/theme-eva';
import { ApplicationProvider } from '@kitten/theme';
import { withNavigation } from './navigation';
import * as Screens from './ui/screen';

export default class App extends React.Component {

  public render(): React.ReactNode {
    const { Home: RootScreen, ...screens } = Screens;
    const Router: React.ComponentClass = withNavigation(RootScreen, screens);

    return (
      <ApplicationProvider
        mapping={mapping}
        theme={theme}>
        <Router/>
      </ApplicationProvider>
    );
  }
}

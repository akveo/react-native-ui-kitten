import React from 'react';
import { style } from 'eva/packages/mapping-kitten/eva';
import { theme } from 'eva/packages/theme/eva';
import { ApplicationProvider } from '@kitten/theme';
import { withNavigation } from './navigation';
import * as Screens from './ui/screen';

export default class App extends React.Component {

  public render(): React.ReactNode {
    const { HomeScreen: RootScreen, ...screens } = Screens;
    const Router: React.ComponentClass = withNavigation(RootScreen, screens);

    return (
      <ApplicationProvider
        styles={style}
        theme={theme}>
        <Router/>
      </ApplicationProvider>
    );
  }
}

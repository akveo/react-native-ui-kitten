import React from 'react';
import {
  ThemeMappingType,
  ThemeMapType,
} from 'eva/packages/common';
import {
  ApplicationProvider,
  ThemeType,
} from '@kitten/theme';
import { withNavigation } from './navigation';
import * as Screens from './ui/screen';

interface State {
  mapping: ThemeMappingType;
  styles: ThemeMapType;
  theme: ThemeType;
}

export default class App extends React.Component<any, State> {

  constructor(props) {
    super(props);
    this.state = {
      mapping: props.mapping,
      styles: props.style,
      theme: props.theme,
    };
  }

  public render(): React.ReactNode {
    const { HomeScreen: RootScreen, ...screens } = Screens;
    const Router: React.ComponentClass = withNavigation(RootScreen, screens);

    return (
      <ApplicationProvider
        styles={this.state.styles}
        theme={this.state.theme}
        mapping={this.state.mapping}
      >
        <Router/>
      </ApplicationProvider>
    );
  }
}

import React from 'react';
import {
  ThemeProvider,
  ThemeType,
} from '../theme';
import {
  ThemeMappingProvider,
  ThemeMappingType,
} from '../mapping';

export interface Props {
  mapping: ThemeMappingType[];
  theme: ThemeType;
  children: JSX.Element | React.ReactNode;
}

interface State {
  mapping: ThemeMappingType[];
  theme: ThemeType;
}

export class StyleProvider extends React.Component<Props, State> {

  static getDerivedStateFromProps(props: Props): State {
    return {
      mapping: props.mapping,
      theme: props.theme,
    };
  }

  state: State = {
    mapping: [],
    theme: {},
  };

  render() {
    return (
      <ThemeMappingProvider mapping={this.state.mapping}>
        <ThemeProvider theme={this.state.theme}>
          {this.props.children}
        </ThemeProvider>
      </ThemeMappingProvider>
    );
  }
}

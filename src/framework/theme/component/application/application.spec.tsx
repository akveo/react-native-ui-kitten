import React from 'react';
import { render } from 'react-native-testing-library';
import {
  View,
  Text,
} from 'react-native';
import {
  ApplicationProvider,
  Props as ApplicationProps,
} from './applicationProvider.component';
import {
  mapping,
  theme,
} from './application.spec.config';
import {
  ThemeMappingType,
  ThemeMapType,
} from 'eva/packages/common';
import { ThemeType } from '../../type';

describe('@app: application wrapper check', () => {

  interface ApplicationState {
    mapping: ThemeMappingType;
    styles: ThemeMapType;
    theme: ThemeType;
  }

  class TestApplicationWrapper extends React.Component<ApplicationProps, ApplicationState> {

    constructor(props) {
      super(props);
      this.state = {
        mapping: props.mapping,
        styles: props.style,
        theme: props.theme,
      };
    }

    render() {
     return (
       <ApplicationProvider
         mapping={this.state.mapping}
         styles={this.state.styles}
         theme={this.state.theme}>
         <View><Text>Application Provider</Text></View>
       </ApplicationProvider>
     );
    }
  }

  it('* renders properly', () => {
    const component = render(
      <TestApplicationWrapper mapping={mapping} styles={{}} theme={theme}>
        <View><Text>Test</Text></View>
      </TestApplicationWrapper>,
    );

    expect(component).toMatchSnapshot();
  });

});

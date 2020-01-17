import React from 'react';
import {
  View,
  Button,
} from 'react-native';
import {
  fireEvent,
  render,
  RenderAPI,
  shallow,
} from 'react-native-testing-library';
import { ReactTestInstance } from 'react-test-renderer';
import {
  ApplicationProvider,
  ApplicationProviderProps,
} from './applicationProvider.component';
import { ThemeType } from '../theme/theme.service';
import {
  mapping,
  theme,
  themeInverse,
} from '../support/tests';

describe('@app: application wrapper check', () => {

  interface TestAppState {
    theme: ThemeType;
  }

  class TestApp extends React.Component<any, TestAppState> {

    public state: TestAppState = {
      theme: theme,
    };

    private onSwitchTheme = (): void => {
      this.setState({ theme: themeInverse });
    };

    public render(): React.ReactNode {
      return (
        <View>
          <Button title='Switch Theme' onPress={this.onSwitchTheme}/>
          <Mock
            mapping={mapping}
            theme={this.state.theme}
          />
        </View>
      );
    }
  }

  const Mock = (props?: ApplicationProviderProps): React.ReactElement<ApplicationProviderProps> => {
    return (
      <ApplicationProvider {...props} />
    );
  };

  it('* renders properly', () => {
    const component: RenderAPI = render(
      <Mock
        mapping={mapping}
        theme={theme}
      />,
    );

    const { output } = shallow(component.getByType(ApplicationProvider));

    expect(output).toMatchSnapshot();
  });

  it('* contains style property in state', () => {
    const component: RenderAPI = render(
      <Mock
        mapping={mapping}
        theme={theme}
      />,
    );

    const componentInstance: ReactTestInstance = component.getByType(ApplicationProvider);
    const { state } = componentInstance.instance;

    expect(state.styles).toMatchSnapshot();
  });


  it('* theme switching checks', () => {
    const application: RenderAPI = render(<TestApp/>);
    fireEvent(application.getByType(Button), 'press');
    const { output } = shallow(application.getByType(ApplicationProvider));

    const stringify = (obj: any): string => {
      return JSON.stringify(obj);
    };

    // @ts-ignore just for theme prop changing
    expect(stringify(output.props.theme)).toBe(JSON.stringify(themeInverse));
  });

});

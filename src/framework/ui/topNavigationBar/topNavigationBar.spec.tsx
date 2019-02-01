import React from 'react';
import { View } from 'react-native';
import {
  render,
  fireEvent,
} from 'react-native-testing-library';
import {
  styled,
  StyleProvider,
  StyleProviderProps,
} from '@kitten/theme';
import {
  TopNavigationBar as TopNavigationBarComponent,
  Props as TopNavigationBarProps,
} from './topNavigationBar.component';
import * as config from './topNavigationBar.spec.config';

const TopNavigationBar = styled<TopNavigationBarComponent, TopNavigationBarProps>(TopNavigationBarComponent);

const Mock = (props?: TopNavigationBarProps): React.ReactElement<StyleProviderProps> => (
  <StyleProvider mapping={config.mapping} theme={config.theme} styles={{}}>
    <TopNavigationBar {...props} />
  </StyleProvider>
);

describe('@top-navigation-bar', () => {

  it('* title', () => {
    const component = render(<Mock title='Test'/>);
    expect(component).toMatchSnapshot();
  });

  it('* appearance: subtitle', () => {
    const component = render(<Mock appearance='subtitle' title='Test' subtitle='Subtitle'/>);
    expect(component).toMatchSnapshot();
  });

  it('* appearance: title-centered', () => {
    const component = render(<Mock appearance='title-centered' title='Test'/>);
    expect(component).toMatchSnapshot();
  });

  it('* appearance: title-centered-subtitle', () => {
    const component = render(<Mock appearance='title-centered-subtitle' title='Test' subtitle='Subtitle'/>);
    expect(component).toMatchSnapshot();
  });

  it('* actions checks', () => {
    const onLeftControl = jest.fn();
    const onRightControl1 = jest.fn();
    const onRightControl2 = jest.fn();
    const onRightControl3 = jest.fn();

    const component = render(
      <Mock
        appearance='title-centered-subtitle'
        title='Test'
        subtitle='Subtitle'
        leftControl={<View style={{ width: 20, height: 20, backgroundColor: 'white' }}/>}
        rightControls={[
          <View style={{ width: 20, height: 20, backgroundColor: 'white' }}/>,
          <View style={{ width: 20, height: 20, backgroundColor: 'red' }}/>,
          <View style={{ width: 20, height: 20, backgroundColor: 'green' }}/>,
        ]}
        onLeftControl={onLeftControl}
        onRightControls={[onRightControl1, onRightControl2, onRightControl3]}
      />,
    );

    expect(component).toMatchSnapshot();

    fireEvent.press(component.getByTestId('@top-navbar-left'));
    fireEvent.press(component.getByTestId('@top-navbar-right-0'));
    fireEvent.press(component.getByTestId('@top-navbar-right-1'));
    fireEvent.press(component.getByTestId('@top-navbar-right-2'));

    expect(onLeftControl).toHaveBeenCalled();
    expect(onRightControl1).toHaveBeenCalled();
    expect(onRightControl2).toHaveBeenCalled();
    expect(onRightControl3).toHaveBeenCalled();
  });

});

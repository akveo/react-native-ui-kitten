import React from 'react';
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
import {
  TopNavigationBarAction as TopNavigationBarActionComponent,
  Props as TopNavigationBaActionProps,
} from './topNavigationBarAction.component';
import * as config from './topNavigationBar.spec.config';
import * as actionConfig from './topNavigationBarAction.spec.config';

const TopNavigationBar = styled<TopNavigationBarComponent, TopNavigationBarProps>(TopNavigationBarComponent);
const TopNavigationBarAction =
  styled<TopNavigationBarActionComponent, TopNavigationBaActionProps>(TopNavigationBarActionComponent);

const Mock = (props?: TopNavigationBarProps): React.ReactElement<StyleProviderProps> => (
  <StyleProvider mapping={config.mapping} theme={config.theme} styles={{}}>
    <TopNavigationBar {...props} />
  </StyleProvider>
);

const ActionMock = (props?: TopNavigationBaActionProps): React.ReactElement<StyleProviderProps> => (
  <StyleProvider mapping={actionConfig.mapping} theme={actionConfig.theme} styles={{}}>
    <TopNavigationBarAction {...props} />
  </StyleProvider>
);

const iconSourceUri: string = 'https://pngimage.net/wp-content/uploads/2018/05/back-icon-png-6.png';
const testIdLeftAction: string = '@top-navbar-left';
const testIdRightAction1: string = '@top-navbar-right-1';
const testIdRightAction2: string = '@top-navbar-right-2';
const testIdRightAction3: string = '@top-navbar-right-3';

describe('@top-navigation-bar', () => {

  it('* title', () => {
    const component = render(<Mock title='Test'/>);
    expect(component).toMatchSnapshot();
  });

  it('* subtitle', () => {
    const component = render(<Mock title='Test' subtitle='Subtitle'/>);
    expect(component).toMatchSnapshot();
  });

  it('* appearance: title-centered', () => {
    const component = render(<Mock appearance='title-centered' title='Test'/>);
    expect(component).toMatchSnapshot();
  });

  it('* with actions', () => {
    const onLeftControl = jest.fn();
    const onRightControl1 = jest.fn();
    const onRightControl2 = jest.fn();
    const onRightControl3 = jest.fn();

    const component = render(
      <Mock
        title='Test'
        subtitle='Subtitle'
        leftControl={
          <ActionMock testID={testIdLeftAction} iconSource={{ uri: iconSourceUri }} onPress={onLeftControl}/>
        }
        rightControls={[
          <ActionMock testID={testIdRightAction1} iconSource={{ uri: iconSourceUri }} onPress={onRightControl1}/>,
          <ActionMock testID={testIdRightAction2} iconSource={{ uri: iconSourceUri }} onPress={onRightControl2}/>,
          <ActionMock testID={testIdRightAction3} iconSource={{ uri: iconSourceUri }} onPress={onRightControl3}/>,
        ]}
      />,
    );

    expect(component).toMatchSnapshot();
    fireEvent.press(component.getByTestId(testIdLeftAction));
    fireEvent.press(component.getByTestId(testIdRightAction1));
    fireEvent.press(component.getByTestId(testIdRightAction2));
    fireEvent.press(component.getByTestId(testIdRightAction3));
    expect(onLeftControl).toHaveBeenCalled();
    expect(onRightControl1).toHaveBeenCalled();
    expect(onRightControl2).toHaveBeenCalled();
    expect(onRightControl3).toHaveBeenCalled();
  });

});

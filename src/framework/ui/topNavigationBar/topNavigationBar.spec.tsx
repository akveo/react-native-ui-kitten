import React from 'react';
import {
  render,
  fireEvent,
  shallow,
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
import { TouchableWithoutFeedback } from 'react-native';

const TopNavigationBar = styled<TopNavigationBarComponent, TopNavigationBarProps>(TopNavigationBarComponent);
const TopNavigationBarAction =
  styled<TopNavigationBarActionComponent, TopNavigationBaActionProps>(TopNavigationBarActionComponent);

const Mock = (props?: TopNavigationBarProps): React.ReactElement<StyleProviderProps> => (
  <StyleProvider mapping={config.mapping} theme={config.theme} styles={{}}>
    <TopNavigationBar {...props} />
  </StyleProvider>
);

const ActionMock = (props?: TopNavigationBaActionProps): React.ReactElement<StyleProviderProps> => (
  <StyleProvider mapping={config.mapping} theme={config.theme} styles={{}}>
    <TopNavigationBarAction {...props} />
  </StyleProvider>
);

const iconSourceUri: string = 'https://pngimage.net/wp-content/uploads/2018/05/back-icon-png-6.png';
const testIdLeftAction: string = '@top-navbar-left';
const testIdRightAction1: string = '@top-navbar-right-1';
const testIdRightAction2: string = '@top-navbar-right-2';
const testIdRightAction3: string = '@top-navbar-right-3';

describe('@top-navigation-bar/action', () => {

  it('* bar/title', () => {
    const { output } = shallow(<Mock title='Test'/>);
    expect(output).toMatchSnapshot();
  });

  it('* bar/subtitle', () => {
    const { output } = shallow(<Mock title='Test' subtitle='Subtitle'/>);
    expect(output).toMatchSnapshot();
  });

  it('* bar/appearance: title-centered', () => {
    const { output } = shallow(<Mock appearance='title-centered' title='Test'/>);
    expect(output).toMatchSnapshot();
  });

  it('* bar/with actions', () => {
    const onLeftControl = jest.fn();
    const onRightControl1 = jest.fn();
    const onRightControl2 = jest.fn();
    const onRightControl3 = jest.fn();

    const component =
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
      />;
    const renderedComponent = render(component);
    const { output } = shallow(component);

    expect(output).toMatchSnapshot();
    fireEvent.press(renderedComponent.getByTestId(testIdLeftAction));
    fireEvent.press(renderedComponent.getByTestId(testIdRightAction1));
    fireEvent.press(renderedComponent.getByTestId(testIdRightAction2));
    fireEvent.press(renderedComponent.getByTestId(testIdRightAction3));
    expect(onLeftControl).toHaveBeenCalled();
    expect(onRightControl1).toHaveBeenCalled();
    expect(onRightControl2).toHaveBeenCalled();
    expect(onRightControl3).toHaveBeenCalled();
  });

  it('* action/with icon uri', () => {
    const { output } = shallow(<ActionMock iconSource={{uri: iconSourceUri}}/>);
    expect(output).toMatchSnapshot();
  });

  it('* action/is last item check (true)', () => {
    const { output } = shallow(<ActionMock iconSource={{uri: iconSourceUri}} isLastItem={true}/>);
    expect(output).toMatchSnapshot();
  });

  it('* action/is last item check (false)', () => {
    const { output } = shallow(<ActionMock iconSource={{uri: iconSourceUri}} isLastItem={false}/>);
    expect(output).toMatchSnapshot();
  });

  it('* action/on press check', () => {
    const onPress = jest.fn();
    const component = <ActionMock iconSource={{uri: iconSourceUri}} onPress={onPress}/>;
    const renderedComponent = render(component);
    const { output } = shallow(component);

    fireEvent.press(renderedComponent.getByType(TouchableWithoutFeedback));
    expect(onPress).toHaveBeenCalled();
    expect(output).toMatchSnapshot();
  });

});

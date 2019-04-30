import React from 'react';
import {
  Image,
  ImageProps,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';
import {
  render,
  fireEvent,
  shallow,
  RenderAPI,
} from 'react-native-testing-library';
import {
  styled,
  ApplicationProvider,
  ApplicationProviderProps,
  StyleType,
} from '@kitten/theme';
import {
  TopNavigation as TopNavigationComponent,
  Props as TopNavigationProps,
} from './topNavigation.component';
import {
  TopNavigationAction as TopNavigationActionComponent,
  Props as TopNavigationActionProps,
} from './topNavigationAction.component';
import { default as mapping } from '../common/mapping.json';
import { default as theme } from '../common/theme.json';

const TopNavigation = styled<TopNavigationProps>(TopNavigationComponent);
const TopNavigationAction = styled<TopNavigationActionProps>(TopNavigationActionComponent);

const Mock = (props?: TopNavigationProps): React.ReactElement<ApplicationProviderProps> => {
  return (
    <ApplicationProvider
      mapping={mapping}
      theme={theme}>
      <TopNavigation {...props} />
    </ApplicationProvider>
  );
};

const ActionMock = (props?: TopNavigationActionProps): React.ReactElement<ApplicationProviderProps> => {
  return (
    <ApplicationProvider
      mapping={mapping}
      theme={theme}>
      <TopNavigationAction {...props} />
    </ApplicationProvider>
  );
};

const icon = (style: StyleType): React.ReactElement<ImageProps> => {
  return (
    <Image
      style={style}
      source={iconSource}
    />
  );
};

const iconSource: ImageSourcePropType = { uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' };
const testIdLeftAction: string = '@top-navbar-left';
const testIdRightAction1: string = '@top-navbar-right-1';
const testIdRightAction2: string = '@top-navbar-right-2';
const testIdRightAction3: string = '@top-navbar-right-3';

describe('@top-navigation-bar/action', () => {

  it('* bar/title', () => {
    const component: RenderAPI = render(
      <Mock title='Test'/>,
    );

    const { output } = shallow(component.getByType(TopNavigationComponent));

    expect(output).toMatchSnapshot();
  });

  it('* bar/subtitle', () => {
    const component: RenderAPI = render(
      <Mock
        title='Test'
        subtitle='Subtitle'
      />,
    );

    const { output } = shallow(component.getByType(TopNavigationComponent));

    expect(output).toMatchSnapshot();
  });

  it('* texts (styled)', () => {
    const component: RenderAPI = render(
      <Mock
        title='Test'
        titleStyle={{ fontSize: 24 }}
        subtitle='Subtitle'
        subtitleStyle={{ color: 'red' }}
      />,
    );

    const { output } = shallow(component.getByType(TopNavigationComponent));

    expect(output).toMatchSnapshot();
  });

  it('* bar/alignment: center', () => {
    const component: RenderAPI = render(
      <Mock
        alignment='center'
        title='Test'
      />,
    );

    const { output } = shallow(component.getByType(TopNavigationComponent));

    expect(output).toMatchSnapshot();
  });

  it('* bar/with actions', () => {
    const onLeftControl = jest.fn();
    const onRightControl1 = jest.fn();
    const onRightControl2 = jest.fn();
    const onRightControl3 = jest.fn();


    const component: RenderAPI = render(
      <Mock
        title='Test'
        subtitle='Subtitle'
        leftControl={
          <ActionMock
            testID={testIdLeftAction}
            icon={icon}
            onPress={onLeftControl}
          />
        }
        rightControls={[
          <ActionMock
            testID={testIdRightAction1}
            icon={icon}
            onPress={onRightControl1}
          />,
          <ActionMock
            testID={testIdRightAction2}
            icon={icon}
            onPress={onRightControl2}
          />,
          <ActionMock
            testID={testIdRightAction3}
            icon={icon}
            onPress={onRightControl3}
          />,
        ]}
      />,
    );
    const { output } = shallow(component.getByType(TopNavigationComponent));

    expect(output).toMatchSnapshot();

    fireEvent.press(component.getByTestId(testIdLeftAction));
    fireEvent.press(component.getByTestId(testIdRightAction1));
    fireEvent.press(component.getByTestId(testIdRightAction2));
    fireEvent.press(component.getByTestId(testIdRightAction3));

    expect(onLeftControl).toHaveBeenCalled();
    expect(onRightControl1).toHaveBeenCalled();
    expect(onRightControl2).toHaveBeenCalled();
    expect(onRightControl3).toHaveBeenCalled();
  });

  it('* action/with icon uri', () => {
    const component: RenderAPI = render(
      <ActionMock
        icon={icon}
      />,
    );

    const { output } = shallow(component.getByType(TopNavigationActionComponent));

    expect(output).toMatchSnapshot();
  });

  it('* action/on press check', () => {
    const onPress = jest.fn();

    const component: RenderAPI = render(
      <ActionMock
        icon={icon}
        onPress={onPress}
      />,
    );

    const { output } = shallow(component.getByType(TopNavigationActionComponent));

    fireEvent.press(component.getByType(TouchableOpacity));

    expect(onPress).toHaveBeenCalled();
    expect(output).toMatchSnapshot();
  });

});

import React from 'react';
import {
  TouchableWithoutFeedback,
  Image,
  ImageProps,
  ImageSourcePropType,
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
  TopNavigationBar as TopNavigationBarComponent,
  Props as TopNavigationBarProps,
} from './topNavigationBar.component';
import {
  TopNavigationBarAction as TopNavigationBarActionComponent,
  Props as TopNavigationBaActionProps,
} from './topNavigationBarAction.component';
import { default as mapping } from '../common/mapping.json';
import { default as theme } from '../common/theme.json';

const TopNavigationBar = styled<TopNavigationBarProps>(TopNavigationBarComponent);
const TopNavigationBarAction = styled<TopNavigationBaActionProps>(TopNavigationBarActionComponent);

const Mock = (props?: TopNavigationBarProps): React.ReactElement<ApplicationProviderProps> => {
  return (
    <ApplicationProvider
      mapping={mapping}
      theme={theme}>
      <TopNavigationBar {...props} />
    </ApplicationProvider>
  );
};

const ActionMock = (props?: TopNavigationBaActionProps): React.ReactElement<ApplicationProviderProps> => {
  return (
    <ApplicationProvider
      mapping={mapping}
      theme={theme}>
      <TopNavigationBarAction {...props} />
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

    const { output } = shallow(component.getByType(TopNavigationBarComponent));

    expect(output).toMatchSnapshot();
  });

  it('* bar/subtitle', () => {
    const component: RenderAPI = render(
      <Mock
        title='Test'
        subtitle='Subtitle'
      />,
    );

    const { output } = shallow(component.getByType(TopNavigationBarComponent));

    expect(output).toMatchSnapshot();
  });

  it('* bar/appearance: title-centered', () => {
    const component: RenderAPI = render(
      <Mock
        appearance='titleCentered'
        title='Test'
      />,
    );

    const { output } = shallow(component.getByType(TopNavigationBarComponent));

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
    const { output } = shallow(component.getByType(TopNavigationBarComponent));

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

    const { output } = shallow(component.getByType(TopNavigationBarActionComponent));

    expect(output).toMatchSnapshot();
  });

  it('* action/is last item check (true)', () => {
    const component: RenderAPI = render(
      <ActionMock
        icon={icon}
        isLastItem={true}
      />,
    );

    const { output } = shallow(component.getByType(TopNavigationBarActionComponent));

    expect(output).toMatchSnapshot();
  });

  it('* action/is last item check (false)', () => {
    const component: RenderAPI = render(
      <ActionMock
        icon={icon}
        isLastItem={false}
      />,
    );

    const { output } = shallow(component.getByType(TopNavigationBarActionComponent));

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

    const { output } = shallow(component.getByType(TopNavigationBarActionComponent));

    fireEvent.press(component.getByType(TouchableWithoutFeedback));

    expect(onPress).toHaveBeenCalled();
    expect(output).toMatchSnapshot();
  });

});

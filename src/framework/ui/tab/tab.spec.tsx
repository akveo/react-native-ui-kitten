import React from 'react';
import {
  View,
  ScrollView,
} from 'react-native';
import {
  fireEvent,
  render,
} from 'react-native-testing-library';
import { ReactTestInstance } from 'react-test-renderer';
import {
  styled,
  StyleProvider,
  StyleProviderProps,
} from '@kitten/theme';
import {
  Tab as TabComponent,
  Props as TabProps,
} from './tab.component';
import {
  TabBar as TabBarComponent,
  Props as TabBarProps,
} from './tabBar.component';
import {
  TabView,
  Props as TabViewProps,
  ChildProps as TabViewChildProps,
} from './tabView.component';
import * as config from './tab.spec.contig';

const Tab = styled<TabComponent, TabProps>(TabComponent);
const TabBar = styled<TabBarComponent, TabBarProps>(TabBarComponent);

describe('@tab: component checks', () => {

  const Mock = (props?: TabProps): React.ReactElement<StyleProviderProps> => (
    <StyleProvider mapping={config.mapping} theme={config.theme} styles={{}}>
      <Tab {...props} />
    </StyleProvider>
  );

  it('* empty', () => {
    const component = render(
      <Mock/>,
    );

    expect(component).toMatchSnapshot();
  });

  it('* title', () => {
    const component = render(
      <Mock
        title='title'
      />,
    );

    expect(component).toMatchSnapshot();
  });

  it('* icon', () => {
    const component = render(
      <Mock
        icon={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
      />,
    );

    expect(component).toMatchSnapshot();
  });

});

describe('@tab-bar: component checks', () => {

  const childTestId0: string = '@tab-bar/child-0';
  const childTestId1: string = '@tab-bar/child-1';

  const Mock = (props?: TabBarProps): React.ReactElement<StyleProviderProps> => (
    <StyleProvider mapping={config.mapping} theme={config.theme} styles={{}}>
      <TabBar {...props}>{props.children}</TabBar>
    </StyleProvider>
  );

  const ChildMock = Tab;

  it('* emits onSelect with correct args', () => {
    const onSelect = jest.fn();

    const component = render(
      <Mock onSelect={onSelect}>
        <ChildMock testID={childTestId0}/>
        <ChildMock testID={childTestId1}/>
      </Mock>,
    );

    const child1 = component.getByTestId(childTestId1);

    fireEvent.press(child1);

    expect(onSelect).toBeCalledWith(1);
  });

});

describe('@tab-view: component checks', () => {

  const Mock = (props?: TabViewProps): React.ReactElement<TabViewProps> => (
    <StyleProvider mapping={config.mapping} theme={config.theme} styles={{}}>
      <TabView {...props}>{props.children}</TabView>
    </StyleProvider>
  );

  const ChildMock = (props?: TabViewChildProps): React.ReactElement<TabViewChildProps> => (
    <Tab {...props} />
  );

  it('* emits onSelect with correct args', () => {
    const onSelect = jest.fn();

    const component = render(
      <Mock contentWidth={375} onSelect={onSelect}>
        <ChildMock>
          <View/>
        </ChildMock>
        <ChildMock>
          <View/>
        </ChildMock>
      </Mock>,
    );

    const scrollView: ReactTestInstance = component.getByType(ScrollView);

    fireEvent(scrollView, 'momentumScrollEnd', {
      nativeEvent: {
        contentOffset: {
          x: 375,
        },
      },
    });

    expect(onSelect).toBeCalledWith(1);
  });

  it('* shouldLoadComponent disables child loading', () => {
    const disabledComponentIndex: number = 1;

    const shouldLoadComponent = jest.fn((...args: any[]) => {
      const index: number = args[0];
      return index !== disabledComponentIndex;
    });

    const component = render(
      <Mock contentWidth={375} shouldLoadComponent={shouldLoadComponent}>
        <ChildMock>
          <View/>
        </ChildMock>
        <ChildMock>
          <View/>
        </ChildMock>
      </Mock>,
    );

    const scrollView: ReactTestInstance = component.getByType(ScrollView);

    const unloadedChild = scrollView.props.children[disabledComponentIndex];

    expect(unloadedChild.props.children).toEqual(undefined);
  });

});


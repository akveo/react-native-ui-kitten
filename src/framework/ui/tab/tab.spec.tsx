import React from 'react';
import {
  View,
  ScrollView,
  ImageProps,
  ImageSourcePropType,
  Image,
  Animated,
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
  StyleType,
} from '@kitten/theme';
import {
  Tab,
  TabProps,
} from './tab.component';
import {
  TabBar,
  TabBarProps,
} from './tabBar.component';
import {
  TabView,
  TabViewProps,
} from './tabView.component';
import {
  mapping,
  theme,
} from '../support/tests';
import { ViewPager } from '@kitten/ui';

describe('@tab: component checks', () => {

  const Mock = (props?: TabProps): React.ReactElement<ApplicationProviderProps> => {
    return (
      <ApplicationProvider
        mapping={mapping}
        theme={theme}>
        <Tab {...props} />
      </ApplicationProvider>
    );
  };

  it('* empty', () => {
    const component: RenderAPI = render(
      <Mock/>,
    );

    const { output } = shallow(component.getByType(Tab));

    expect(output).toMatchSnapshot();
  });

  it('* title', () => {
    const component: RenderAPI = render(
      <Mock title='title'/>,
    );

    const { output } = shallow(component.getByType(Tab));

    expect(output).toMatchSnapshot();
  });

  it('* icon', () => {
    const iconSource: ImageSourcePropType = { uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' };

    const icon = (style: StyleType): React.ReactElement<ImageProps> => {
      return (
        <Image
          style={style}
          source={iconSource}
        />
      );
    };

    const component: RenderAPI = render(
      <Mock icon={icon}/>,
    );

    const { output } = shallow(component.getByType(Tab));

    expect(output).toMatchSnapshot();
  });

  it('* title (styled)', () => {
    const component: RenderAPI = render(
      <Mock
        title='title'
        titleStyle={{
          fontSize: 24,
          color: 'tomato',
        }}
      />,
    );

    const { output } = shallow(component.getByType(Tab));

    expect(output).toMatchSnapshot();
  });

});

describe('@tab-bar: component checks', () => {

  const childTestId0: string = '@tab-bar/child-0';
  const childTestId1: string = '@tab-bar/child-1';

  const Mock = (props?: TabBarProps): React.ReactElement<ApplicationProviderProps> => {
    return (
      <ApplicationProvider
        mapping={mapping}
        theme={theme}>
        <TabBar {...props}>
          {props.children}
        </TabBar>
      </ApplicationProvider>
    );
  };

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

    fireEvent(child1, 'select');

    expect(onSelect).toBeCalledWith(1);
  });

});

describe('@tab-view: component checks', () => {

  const Mock = (props?: TabViewProps): React.ReactElement<ApplicationProviderProps> => {
    return (
      <ApplicationProvider
        mapping={mapping}
        theme={theme}>
        <TabView {...props}>
          {props.children}
        </TabView>
      </ApplicationProvider>
    );
  };

  const ChildMock = (props?: TabProps): React.ReactElement<TabProps> => {
    return (
      <Tab {...props} />
    );
  };

  it('* shouldLoadComponent disables child loading', () => {
    const disabledComponentIndex: number = 1;

    const shouldLoadComponent = jest.fn((...args: any[]) => {
      const index: number = args[0];
      return index !== disabledComponentIndex;
    });

    const component: RenderAPI = render(
      <Mock shouldLoadComponent={shouldLoadComponent}>
        <ChildMock>
          <View/>
        </ChildMock>
        <ChildMock>
          <View/>
        </ChildMock>
      </Mock>,
    );

    const viewPager: ReactTestInstance = component.getByType(ViewPager);
    const containerView: ReactTestInstance = viewPager.findByType(Animated.View);
    const unloadedChild: ReactTestInstance = containerView.props.children[disabledComponentIndex];

    expect(unloadedChild.props.children).toBeNull();
  });
});


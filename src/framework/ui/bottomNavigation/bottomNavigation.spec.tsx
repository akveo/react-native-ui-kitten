import React from 'react';
import {
  Image,
  ImageProps,
  ImageSourcePropType,
} from 'react-native';
import {
  fireEvent,
  render,
  RenderAPI,
  shallow,
} from 'react-native-testing-library';
import { ReactTestInstance } from 'react-test-renderer';
import {
  styled,
  ApplicationProvider,
  ApplicationProviderProps,
  StyleType,
} from '@kitten/theme';
import {
  BottomNavigation as BottomTabNavigatorComponent,
  Props as BottomTabNavigatorProps,
} from './bottomNavigation.component';
import {
  BottomNavigationTab as BottomNavigatorTabComponent,
  Props as BottomNavigatorTabProps,
} from './bottomNavigationTab.component';
import { default as mapping } from '../common/mapping.json';
import { default as theme } from '../common/theme.json';

const BottomNavigation = styled<BottomTabNavigatorProps>(BottomTabNavigatorComponent);
const BottomNavigationTab = styled<BottomNavigatorTabProps>(BottomNavigatorTabComponent);

describe('@bottom-navigation-tab: component checks', () => {

  const iconSource: ImageSourcePropType = { uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' };

  const Mock = (props?: BottomNavigatorTabProps): React.ReactElement<ApplicationProviderProps> => {
    return (
      <ApplicationProvider
        mapping={mapping}
        theme={theme}>
        <BottomNavigationTab {...props}/>
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

  it('* empty', () => {
    const component: RenderAPI = render(
      <Mock/>,
    );

    const { output } = shallow(component.getByType(BottomNavigatorTabComponent));

    expect(output).toMatchSnapshot();
  });

  it('* with icon', () => {
    const component: RenderAPI = render(
      <Mock icon={icon}/>,
    );

    const { output } = shallow(component.getByType(BottomNavigatorTabComponent));

    expect(output).toMatchSnapshot();
  });

  it('* text/selected', () => {
    const component: RenderAPI = render(
      <Mock
        title='Test'
        selected={true}
      />,
    );

    const { output } = shallow(component.getByType(BottomNavigatorTabComponent));

    expect(output).toMatchSnapshot();
  });

  it('* text/unselected', () => {
    const component: RenderAPI = render(
      <Mock
        title='Test'
        selected={false}
      />,
    );

    const { output } = shallow(component.getByType(BottomNavigatorTabComponent));

    expect(output).toMatchSnapshot();
  });

  it('* text (styled)', () => {
    const component: RenderAPI = render(
      <Mock
        title='Test'
        titleStyle={{ fontSize: 22, color: 'yellow' }}
      />,
    );

    const { output } = shallow(component.getByType(BottomNavigatorTabComponent));

    expect(output).toMatchSnapshot();
  });

});

describe('@bottom-navigation: component checks', () => {

  const Mock = (props?: BottomTabNavigatorProps): React.ReactElement<ApplicationProviderProps> => {
    return (
      <ApplicationProvider
        mapping={mapping}
        theme={theme}>
        <BottomNavigation {...props} />
      </ApplicationProvider>
    );
  };

  const ChildMock = (props: BottomNavigatorTabProps): React.ReactElement<BottomNavigatorTabProps> => {
    return (
      <BottomNavigationTab {...props} />
    );
  };

  const tabTestId: string = '@tab/last';

  it('* empty', () => {
    const component: RenderAPI = render(
      <Mock children={[]}/>,
    );

    const { output } = shallow(component.getByType(BottomTabNavigatorComponent));

    expect(output).toMatchSnapshot();
  });

  it('* with routes', () => {
    const indicatorStyle: StyleType = { backgroundColor: 'red' };
    const component: RenderAPI = render(
      <Mock indicatorStyle={indicatorStyle}>
        <ChildMock
          title='Screen 1'
          selected={false}
        />
        <ChildMock
          title='Screen 2'
          selected={true}
        />
        <ChildMock
          title='Screen 3'
          selected={false}
        />
      </Mock>,
    );

    const { output } = shallow(component.getByType(BottomTabNavigatorComponent));

    expect(output).toMatchSnapshot();
  });

  it('* current index', () => {
    const component: RenderAPI = render(
      <Mock selectedIndex={1}>
        <ChildMock
          title='Screen 1'
          selected={false}
        />
        <ChildMock
          title='Screen 2'
          selected={true}
        />
        <ChildMock
          title='Screen 3'
          selected={false}
        />
      </Mock>,
    );

    const componentInstance: ReactTestInstance = component.getByType(BottomTabNavigatorComponent);

    expect(componentInstance.props.selectedIndex).toBe(1);
  });

  it('* tab choose', () => {
    const onSelect = jest.fn();

    const component: RenderAPI = render(
      <Mock
        selectedIndex={1}
        onSelect={onSelect}>
        <ChildMock
          title='Screen 1'
          selected={false}
        />
        <ChildMock
          title='Screen 2'
          selected={true}
        />
        <ChildMock
          testID={tabTestId}
          title='Screen 3'
          selected={false}
        />
      </Mock>,
    );

    fireEvent(component.getByTestId(tabTestId), 'select');

    expect(onSelect).toHaveBeenCalled();
  });

  it('* choose selected tab', () => {
    const onSelect = jest.fn();

    const component: RenderAPI = render(
      <Mock
        selectedIndex={1}
        onSelect={onSelect}>
        <ChildMock
          title='Screen 1'
          selected={false}
        />
        <ChildMock
          testID={tabTestId}
          title='Screen 2'
          selected={true}
        />
        <ChildMock
          title='Screen 3'
          selected={false}
        />
      </Mock>,
    );

    fireEvent(component.getByTestId(tabTestId), 'select');

    expect(onSelect).not.toHaveBeenCalled();
  });

  it('* additional appearance', () => {
    const component: RenderAPI = render(
      <Mock appearance='noIndicator'>
        <ChildMock
          title='Screen 1'
          selected={false}
        />
        <ChildMock
          title='Screen 2'
          selected={true}
        />
        <ChildMock
          testID={tabTestId}
          title='Screen 3'
          selected={false}
        />
      </Mock>,
    );

    const { output } = shallow(component.getByType(BottomTabNavigatorComponent));

    expect(output).toMatchSnapshot();
  });

});


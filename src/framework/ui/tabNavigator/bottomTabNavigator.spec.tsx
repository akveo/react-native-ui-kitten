import React from 'react';
import { View } from 'react-native';
import {
  fireEvent,
  render,
} from 'react-native-testing-library';
import {
  styled,
  StyleProvider,
  StyleProviderProps,
} from '@kitten/theme';
import * as config from './bottomTabNavigator.spec.config';
import {
  BottomTabNavigator as BottomTabNavigatorComponent,
  Props as BottomTabNavigatorProps,
  TabRoute,
  TAB_TEST_ID,
} from './bottomTabNavigator.component';

const BottomTabNavigator = styled<BottomTabNavigatorComponent, BottomTabNavigatorProps>(BottomTabNavigatorComponent);

describe('@bottom-tab-navigator: component checks', () => {

  const Mock = (props?: BottomTabNavigatorProps): React.ReactElement<StyleProviderProps> => (
    <StyleProvider mapping={config.mapping} theme={config.theme} styles={{}}>
      <BottomTabNavigator {...props} />
    </StyleProvider>
  );

  const routes: TabRoute[] = [
    { routeName: 'Screen1', routeImage: <View style={{width: 20, height: 20, backgroundColor: 'red'}}/> },
    { routeName: 'Screen2', routeImage: <View style={{width: 20, height: 20, backgroundColor: 'red'}}/> },
    { routeName: 'Screen3', routeImage: <View style={{width: 20, height: 20, backgroundColor: 'red'}}/> },
  ];

  it('* empty', () => {
    const component = render(<Mock routes={[]}/>);
    expect(component).toMatchSnapshot();
  });

  it('* with routes', () => {
    const component = render(<Mock routes={routes}/>);
    expect(component).toMatchSnapshot();
  });

  it('* current index', () => {
    const component = render(<Mock routes={routes} currentIndex={1}/>);
    expect(component).toMatchSnapshot();
  });

  it('* tab choose', () => {
    const onTabChoose = jest.fn();
    const component = render(<Mock routes={routes} onTabChoose={onTabChoose}/>);
    fireEvent.press(component.getByTestId(TAB_TEST_ID + '1'));
    expect(component).toMatchSnapshot();
    expect(onTabChoose).toHaveBeenCalled();
  });

  it('* different appearances', () => {
    const component1 = render(<Mock routes={routes} appearance='text'/>);
    const component2 = render(<Mock routes={routes} appearance='highlight'/>);
    const component3 = render(<Mock routes={routes} appearance='text-highlight'/>);
    expect(component1).toMatchSnapshot();
    expect(component2).toMatchSnapshot();
    expect(component3).toMatchSnapshot();
  });

});


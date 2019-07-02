import React from 'react';
import {
  View,
  ScrollView,
  ViewProps,
  Animated,
} from 'react-native';
import {
  fireEvent,
  render,
  RenderAPI,
} from 'react-native-testing-library';
import { ReactTestInstance } from 'react-test-renderer';
import {
  ViewPager,
  ViewPagerProps,
} from './viewPager.component';

describe('@view-pager: component checks', () => {

  const Mock = (props?: ViewPagerProps): React.ReactElement<ViewPagerProps> => (
    <ViewPager {...props}/>
  );

  const ChildMock = (props?: ViewProps): React.ReactElement<ViewProps> => (
    <View {...props}/>
  );

  it('* shouldLoadComponent called for each child', () => {
    const shouldLoadComponent = jest.fn();

    render(
      <Mock shouldLoadComponent={shouldLoadComponent}>
        <ChildMock/>
        <ChildMock/>
      </Mock>,
    );

    expect(shouldLoadComponent).toBeCalledTimes(2);
  });

  it('* shouldLoadComponent disables child loading', () => {
    const disabledComponentIndex: number = 1;

    const shouldLoadComponent = jest.fn((...args: any[]) => {
      const index: number = args[0];
      return index !== disabledComponentIndex;
    });

    const component: RenderAPI = render(
      <Mock shouldLoadComponent={shouldLoadComponent}>
        <ChildMock/>
        <ChildMock/>
      </Mock>,
    );

    const scrollView: ReactTestInstance = component.getByType(Animated.View);

    const unloadedChild = scrollView.props.children[disabledComponentIndex];

    expect(unloadedChild.props.children).toBeNull();
  });

});


import React from 'react';
import {
  View,
  ScrollView,
  ViewProps,
} from 'react-native';
import {
  fireEvent,
  render,
  RenderAPI,
} from 'react-native-testing-library';
import { ReactTestInstance } from 'react-test-renderer';
import {
  ViewPager,
  Props as ViewPagerProps,
} from './viewPager.component';

describe('@view-pager: component checks', () => {

  const Mock = (props?: ViewPagerProps): React.ReactElement<ViewPagerProps> => (
    <ViewPager {...props}/>
  );

  const ChildMock = (props?: ViewProps): React.ReactElement<ViewProps> => (
    <View {...props}/>
  );

  it('* emits onSelect with correct args', () => {
    const onSelect = jest.fn();

    const component: RenderAPI = render(
      <Mock
        contentWidth={375}
        onSelect={onSelect}>
        <ChildMock/>
        <ChildMock/>
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

  it('* emits onOffsetChange with correct args', () => {
    const onOffsetChange = jest.fn();

    const component: RenderAPI = render(
      <Mock
        contentWidth={375}
        onOffsetChange={onOffsetChange}>
        <ChildMock/>
        <ChildMock/>
      </Mock>,
    );
    const scrollView: ReactTestInstance = component.getByType(ScrollView);

    fireEvent.scroll(scrollView, {
      nativeEvent: {
        contentOffset: {
          x: 375,
        },
      },
    });

    expect(onOffsetChange).toBeCalledWith(375);
  });

  it('* shouldLoadComponent called for each child', () => {
    const shouldLoadComponent = jest.fn();

    render(
      <Mock
        contentWidth={375}
        shouldLoadComponent={shouldLoadComponent}>
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
      <Mock
        contentWidth={375}
        shouldLoadComponent={shouldLoadComponent}>
        <ChildMock/>
        <ChildMock/>
      </Mock>,
    );

    const scrollView: ReactTestInstance = component.getByType(ScrollView);

    const unloadedChild = scrollView.props.children[disabledComponentIndex];

    expect(unloadedChild.props.children).toEqual(undefined);
  });

});


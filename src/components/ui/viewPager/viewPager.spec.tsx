/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import { Text } from 'react-native';
import { render } from 'react-native-testing-library';
import {
  ViewPager,
  ViewPagerProps,
} from './viewPager.component';

describe('@view-pager: component checks', () => {

  const getComponentProps = (component) => {
    return component._fiber.pendingProps;
  };

  const TestViewPager = (props?: ViewPagerProps): React.ReactElement<ViewPagerProps> => (
    <ViewPager {...props}/>
  );

  it('should render two tabs', () => {
    const component = render(
      <TestViewPager>
        <Text>Tab 0</Text>
        <Text>Tab 1</Text>
      </TestViewPager>,
    );

    expect(component.queryByText('Tab 0')).toBeTruthy();
    expect(component.queryByText('Tab 1')).toBeTruthy();
  });

  it('should call shouldLoadComponent for each child', () => {
    const shouldLoadComponent = jest.fn();
    render(
      <TestViewPager shouldLoadComponent={shouldLoadComponent}>
        <Text>Tab 0</Text>
        <Text>Tab 1</Text>
      </TestViewPager>,
    );

    expect(shouldLoadComponent).toBeCalledTimes(2);
  });

  it('should not render child if disabled by shouldLoadComponent', () => {
    const component = render(
      <TestViewPager shouldLoadComponent={index => index !== 1}>
        <Text>Tab 0</Text>
        <Text>Tab 1</Text>
      </TestViewPager>,
    );

    expect(component.queryByText('Tab 0')).toBeTruthy();
    expect(component.queryByText('Tab 1')).toBeFalsy();
  });

  it('should disable swipe gesture when swipeEnabled is false', () => {
    const component = render(
      <TestViewPager swipeEnabled={false}>
        <Text>Tab 0</Text>
        <Text>Tab 1</Text>
      </TestViewPager>,
    );

    const viewPager = component.UNSAFE_queryByType(ViewPager);

    expect(getComponentProps(viewPager).onStartShouldSetResponder).toBeFalsy();
    expect(getComponentProps(viewPager).onMoveShouldSetResponder).toBeFalsy();
    expect(getComponentProps(viewPager).onMoveShouldSetResponderCapture).toBeFalsy();
    expect(getComponentProps(viewPager).onResponderGrant).toBeFalsy();
    expect(getComponentProps(viewPager).onResponderReject).toBeFalsy();
    expect(getComponentProps(viewPager).onResponderRelease).toBeFalsy();
    expect(getComponentProps(viewPager).onResponderStart).toBeFalsy();
    expect(getComponentProps(viewPager).onResponderMove).toBeFalsy();
    expect(getComponentProps(viewPager).onResponderEnd).toBeFalsy();
    expect(getComponentProps(viewPager).onResponderTerminate).toBeFalsy();
    expect(getComponentProps(viewPager).onResponderTerminationRequest).toBeFalsy();
  });

});


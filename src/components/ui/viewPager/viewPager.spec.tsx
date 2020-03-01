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

});


/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  fireEvent,
  render,
} from 'react-native-testing-library';
import {
  light,
  mapping,
} from '@eva-design/eva';
import { ApplicationProvider } from '../../theme';
import {
  Card,
  CardProps,
} from './card.component';

describe('@card: component checks', () => {

  const TestCard = (props?: Partial<CardProps>) => (
    <ApplicationProvider
      mapping={mapping}
      theme={light}>
      <Card {...props} />
    </ApplicationProvider>
  );

  it('should render component passed to children', () => {
    const component = render(
      <TestCard>
        <Text>I love Babel</Text>
      </TestCard>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render component passed to header prop', () => {
    const component = render(
      <TestCard header={props => <Text {...props}>Test Card Header</Text>}/>,
    );

    expect(component.queryByText('Test Card Header')).toBeTruthy();
  });

  it('should render component passed to footer prop', () => {
    const component = render(
      <TestCard footer={props => <Text {...props}>Test Card Footer</Text>}/>,
    );

    expect(component.queryByText('Test Card Footer')).toBeTruthy();
  });

  it('should call onPress', () => {
    const onPress = jest.fn();
    const component = render(
      <TestCard onPress={onPress}/>,
    );

    fireEvent.press(component.queryByType(TouchableOpacity));
    expect(onPress).toBeCalled();
  });

  it('should call onPressIn', () => {
    const onPressIn = jest.fn();
    const component = render(
      <TestCard onPressIn={onPressIn}/>,
    );

    fireEvent(component.queryByType(TouchableOpacity), 'pressIn');
    expect(onPressIn).toBeCalled();
  });

  it('should call onPressOut', () => {
    const onPressOut = jest.fn();
    const component = render(
      <TestCard onPressOut={onPressOut}/>,
    );

    fireEvent(component.queryByType(TouchableOpacity), 'pressOut');
    expect(onPressOut).toBeCalled();
  });
});



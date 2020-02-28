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
  Radio,
  RadioProps,
} from './radio.component';

describe('@radio: component checks', () => {

  const TestRadio = (props?: RadioProps) => (
    <ApplicationProvider
      mapping={mapping}
      theme={light}>
      <Radio {...props} />
    </ApplicationProvider>
  );

  it('should request checking', () => {
    const onCheckedChange = jest.fn();

    const component = render(
      <TestRadio
        checked={false}
        onChange={onCheckedChange}
      />,
    );

    fireEvent.press(component.getByType(TouchableOpacity));

    expect(onCheckedChange).toBeCalledWith(true);
  });

  it('should request unchecking', () => {
    const onCheckedChange = jest.fn();

    const component = render(
      <TestRadio
        checked={true}
        onChange={onCheckedChange}
      />,
    );

    fireEvent.press(component.getByType(TouchableOpacity));

    expect(onCheckedChange).toBeCalledWith(false);
  });

  it('should render text', () => {
    const component = render(
      <TestRadio text='I love Babel'/>,
    );

    const text = component.getByText('I love Babel');

    expect(text).toBeTruthy();
  });

  it('should render text as component', () => {
    const component = render(
      <TestRadio text={props => <Text {...props}>I love Babel</Text>}/>,
    );

    const text = component.getByText('I love Babel');

    expect(text).toBeTruthy();
  });

  it('should call onPressIn', () => {
    const onPressIn = jest.fn();

    const component = render(
      <TestRadio onPressIn={onPressIn}/>,
    );

    fireEvent(component.getByType(TouchableOpacity), 'pressIn');

    expect(onPressIn).toBeCalled();
  });

  it('should call onPressOut', () => {
    const onPressOut = jest.fn();

    const component = render(
      <TestRadio onPressOut={onPressOut}/>,
    );

    fireEvent(component.getByType(TouchableOpacity), 'pressOut');

    expect(onPressOut).toBeCalled();
  });

});

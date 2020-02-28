/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  Image,
  ImageProps,
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
  Button,
  ButtonProps,
} from './button.component';

describe('@button: component checks', () => {

  const TestButton = (props?: ButtonProps) => (
    <ApplicationProvider
      mapping={mapping}
      theme={light}>
      <Button {...props}/>
    </ApplicationProvider>
  );

  it('should render text passed to children', () => {
    const component = render(
      <TestButton>I love Babel</TestButton>,
    );

    const text = component.getByText('I love Babel');

    expect(text).toBeTruthy();
  });

  it('should render component passed to children', () => {
    const component = render(
      <TestButton>
        {props => <Text {...props}>I love Babel</Text>}
      </TestButton>,
    );

    const textAsComponent = component.getByText('I love Babel');

    expect(textAsComponent).toBeTruthy();
  });

  it('should render components passed to accessoryLeft or accessoryRight props', () => {
    const AccessoryLeft = (props?: ImageProps) => (
      <Image
        {...props}
        source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' }}
      />
    );

    const AccessoryRight = (props?: ImageProps) => (
      <Image
        {...props}
        source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/home.png' }}
      />
    );

    const component = render(
      <TestButton
        accessoryLeft={AccessoryLeft}
        accessoryRight={AccessoryRight}
      />,
    );

    const [accessoryLeft, accessoryRight] = component.getAllByType(Image);

    expect(accessoryLeft).toBeTruthy();
    expect(accessoryRight).toBeTruthy();

    expect(accessoryLeft.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/star.png');
    expect(accessoryRight.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/home.png');
  });

  it('should call onPress', () => {
    const onPress = jest.fn();

    const component = render(
      <TestButton onPress={onPress}/>,
    );

    fireEvent.press(component.getByType(TouchableOpacity));

    expect(onPress).toBeCalled();
  });

  it('should call onPressIn', () => {
    const onPressIn = jest.fn();

    const component = render(
      <TestButton onPressIn={onPressIn}/>,
    );

    fireEvent(component.getByType(TouchableOpacity), 'pressIn');

    expect(onPressIn).toBeCalled();
  });

  it('should call onPressOut', () => {
    const onPressOut = jest.fn();

    const component = render(
      <TestButton onPressOut={onPressOut}/>,
    );

    fireEvent(component.getByType(TouchableOpacity), 'pressOut');

    expect(onPressOut).toBeCalled();
  });

});

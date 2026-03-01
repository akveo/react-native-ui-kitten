/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  Image,
  ImageProps,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  fireEvent,
  render,
} from '@testing-library/react-native';
import {
  light,
  mapping,
} from '@ui-kitten/eva';
import { ApplicationProvider } from '../../theme';
import {
  Button,
  ButtonProps,
} from './button.component';

describe('@button: component checks', () => {

  const TestButton = (props?: ButtonProps): React.ReactElement => (
    <ApplicationProvider
      mapping={mapping}
      theme={light}
    >
      <Button {...props} />
    </ApplicationProvider>
  );

  it('should render text passed to children', () => {
    const component = render(
      <TestButton>
I love Babel
      </TestButton>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render component passed to children', () => {
    const component = render(
      <TestButton>
        {props => (
          <Text {...props}>
            I love Babel
          </Text>
        )}
      </TestButton>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render components passed to accessoryLeft or accessoryRight props', () => {
    const AccessoryLeft = (props?: Partial<ImageProps>): React.ReactElement => (
      <Image
        {...props}
        source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' }}
      />
    );

    const AccessoryRight = (props?: Partial<ImageProps>): React.ReactElement => (
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

    const [accessoryLeft, accessoryRight] = component.UNSAFE_queryAllByType(Image);

    expect(accessoryLeft).toBeTruthy();
    expect(accessoryRight).toBeTruthy();

    expect(accessoryLeft.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/star.png');
    expect(accessoryRight.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/home.png');
  });

  it('should render accessory from prop as pure JSX element', () => {
    const accessoryLeft = (
      <Text>
        Left accessory
      </Text>
    );
    const accessoryRight = (
      <Text>
        Right accessory
      </Text>
    );

    const component = render(
      <TestButton
        accessoryLeft={accessoryLeft}
        accessoryRight={accessoryRight}
      />
    );

    expect(component.queryByText('Left accessory')).toBeTruthy();
    expect(component.queryByText('Right accessory')).toBeTruthy();
  });

  it('should render children from prop as pure JSX element', () => {
    const children = (
      <View>
        <Text>
          Children component
        </Text>
      </View>
    );

    const component = render(
      <TestButton>
        {children}
      </TestButton>
    );

    expect(component.queryByText('Children component')).toBeTruthy();
  });

  it('should call onPress', () => {
    const onPress = jest.fn();

    const component = render(
      <TestButton onPress={onPress} />,
    );

    fireEvent.press(component.UNSAFE_queryByType(TouchableOpacity));
    expect(onPress).toBeCalled();
  });

  it('should call onPressIn', () => {
    const onPressIn = jest.fn();

    const component = render(
      <TestButton onPressIn={onPressIn} />,
    );

    fireEvent(component.UNSAFE_queryByType(TouchableOpacity), 'pressIn');
    expect(onPressIn).toBeCalled();
  });

  it('should call onPressOut', () => {
    const onPressOut = jest.fn();

    const component = render(
      <TestButton onPressOut={onPressOut} />,
    );

    fireEvent(component.UNSAFE_queryByType(TouchableOpacity), 'pressOut');
    expect(onPressOut).toBeCalled();
  });

  it('should call onMouseEnter', () => {
    const onMouseEnter = jest.fn();

    const component = render(
      <TestButton onMouseEnter={onMouseEnter} />,
    );

    fireEvent(component.UNSAFE_queryByType(TouchableOpacity), 'mouseEnter');
    expect(onMouseEnter).toBeCalled();
  });

  it('should call onMouseLeave', () => {
    const onMouseLeave = jest.fn();

    const component = render(
      <TestButton onMouseLeave={onMouseLeave} />,
    );

    fireEvent(component.UNSAFE_queryByType(TouchableOpacity), 'mouseLeave');
    expect(onMouseLeave).toBeCalled();
  });

  it('should call onFocus', () => {
    const onFocus = jest.fn();

    const component = render(
      <TestButton onFocus={onFocus} />,
    );

    fireEvent(component.UNSAFE_queryByType(TouchableOpacity), 'focus');
    expect(onFocus).toBeCalled();
  });

  it('should call onBlur', () => {
    const onBlur = jest.fn();

    const component = render(
      <TestButton onBlur={onBlur} />,
    );

    fireEvent(component.UNSAFE_queryByType(TouchableOpacity), 'blur');
    expect(onBlur).toBeCalled();
  });

});

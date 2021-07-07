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
  View,
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

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render component passed to children', () => {
    const component = render(
      <TestButton>
        {props => <Text {...props}>I love Babel</Text>}
      </TestButton>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render components passed to accessoryLeft or accessoryRight props', () => {
    const AccessoryLeft = (props?: Partial<ImageProps>) => (
      <Image
        {...props}
        source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' }}
      />
    );

    const AccessoryRight = (props?: Partial<ImageProps>) => (
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

    const [accessoryLeft, accessoryRight] = component.queryAllByType(Image);

    expect(accessoryLeft).toBeTruthy();
    expect(accessoryRight).toBeTruthy();

    expect(accessoryLeft.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/star.png');
    expect(accessoryRight.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/home.png');
  });

  it('should render accessory from prop as pure JSX element', () => {
    const accessoryLeft = <Text>Left accessory</Text>;
    const accessoryRight = <Text>Right accessory</Text>;

    const component = render(
      <TestButton accessoryLeft={accessoryLeft} accessoryRight={accessoryRight} />
    );
    
    expect(component.queryByText('Left accessory')).toBeTruthy();
    expect(component.queryByText('Right accessory')).toBeTruthy();
  })

  it('should render children from prop as pure JSX element', () => {
    const children = (
      <View>
        <Text>
          Children component
        </Text>
      </View>
    );

    const component = render(
      <TestButton children={children} />
    );

    expect(component.queryByText('Children component')).toBeTruthy();
  })

  it('should call onPress', () => {
    const onPress = jest.fn();

    const component = render(
      <TestButton onPress={onPress}/>,
    );

    fireEvent.press(component.queryByType(TouchableOpacity));
    expect(onPress).toBeCalled();
  });

  it('should call onPressIn', () => {
    const onPressIn = jest.fn();

    const component = render(
      <TestButton onPressIn={onPressIn}/>,
    );

    fireEvent(component.queryByType(TouchableOpacity), 'pressIn');
    expect(onPressIn).toBeCalled();
  });

  it('should call onPressOut', () => {
    const onPressOut = jest.fn();

    const component = render(
      <TestButton onPressOut={onPressOut}/>,
    );

    fireEvent(component.queryByType(TouchableOpacity), 'pressOut');
    expect(onPressOut).toBeCalled();
  });

  it('should call onMouseEnter', () => {
    const onMouseEnter = jest.fn();

    const component = render(
      <TestButton onMouseEnter={onMouseEnter}/>,
    );

    fireEvent(component.queryByType(TouchableOpacity), 'mouseEnter');
    expect(onMouseEnter).toBeCalled();
  });

  it('should call onMouseLeave', () => {
    const onMouseLeave = jest.fn();

    const component = render(
      <TestButton onMouseLeave={onMouseLeave}/>,
    );

    fireEvent(component.queryByType(TouchableOpacity), 'mouseLeave');
    expect(onMouseLeave).toBeCalled();
  });

  it('should call onFocus', () => {
    const onFocus = jest.fn();

    const component = render(
      <TestButton onFocus={onFocus}/>,
    );

    fireEvent(component.queryByType(TouchableOpacity), 'focus');
    expect(onFocus).toBeCalled();
  });

  it('should call onBlur', () => {
    const onBlur = jest.fn();

    const component = render(
      <TestButton onBlur={onBlur}/>,
    );

    fireEvent(component.queryByType(TouchableOpacity), 'blur');
    expect(onBlur).toBeCalled();
  });

});

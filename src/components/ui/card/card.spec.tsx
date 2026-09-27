/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import { TouchableWeb } from '../../devsupport';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {
  fireEvent,
  render,
} from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import {
  light,
  mapping,
} from '@ui-kitten/eva';
import { ApplicationProvider } from '../../theme';
import {
  Card,
  CardProps,
} from './card.component';

describe('@card: component checks', () => {

  const TestCard = (props?: Partial<CardProps>): React.ReactElement => (
    <ApplicationProvider
      mapping={mapping}
      theme={light}
    >
      <Card {...props} />
    </ApplicationProvider>
  );

  it('should render component passed to children', () => {
    const component = render(
      <TestCard>
        <Text>
          I love Babel
        </Text>
      </TestCard>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  // The body is the closest host View above the children that carries the mapping padding.
  const findBodyStyle = (child: ReactTestInstance): ViewStyle => {
    let node: ReactTestInstance | null = child.parent;
    while (node) {
      const style = StyleSheet.flatten(node.props.style as StyleProp<ViewStyle>) as ViewStyle | undefined;
      if (String(node.type) === 'View' && style?.paddingVertical !== undefined) {
        return style;
      }
      node = node.parent;
    }
    throw new Error('card body not found');
  };

  it('should pad the body from the mapping', () => {
    const component = render(
      <TestCard>
        <Text>
          I love Babel
        </Text>
      </TestCard>,
    );

    const style = findBodyStyle(component.getByText('I love Babel'));

    expect(style.paddingHorizontal).toEqual(24);
    expect(style.paddingVertical).toEqual(16);
  });

  it('should style the body with contentContainerStyle', () => {
    const component = render(
      <TestCard contentContainerStyle={{ flexDirection: 'row', paddingHorizontal: 0, paddingVertical: 4 }}>
        <View testID='cover' />
        <Text>
          I love Babel
        </Text>
      </TestCard>,
    );

    const style = findBodyStyle(component.getByText('I love Babel'));

    expect(style.flexDirection).toEqual('row');
    expect(style.paddingHorizontal).toEqual(0);
    expect(style.paddingVertical).toEqual(4);
  });

  it('should render function component passed to header prop', () => {
    const component = render(
      <TestCard header={props => (
        <Text {...props}>
          Test Card Header
        </Text>
      )}
      />,
    );

    expect(component.queryByText('Test Card Header')).toBeTruthy();
  });

  it('should render JSX component passed to header prop', () => {
    const component = render(
      <TestCard header={(
        <Text>
          Test Card Header
        </Text>
      )}
      />,
    );

    expect(component.queryByText('Test Card Header')).toBeTruthy();
  });

  it('should render function component passed to footer prop', () => {
    const component = render(
      <TestCard footer={props => (
        <Text {...props}>
          Test Card Footer
        </Text>
      )}
      />,
    );

    expect(component.queryByText('Test Card Footer')).toBeTruthy();
  });

  it('should render JSX component passed to footer prop', () => {
    const component = render(
      <TestCard footer={(
        <Text>
          Test Card Footer
        </Text>
      )}
      />,
    );

    expect(component.queryByText('Test Card Footer')).toBeTruthy();
  });

  it('should render function component passed to accent prop', () => {
    const component = render(
      <TestCard accent={props => (
        <Text {...props}>
          Test Card Accent
        </Text>
      )}
      />,
    );

    expect(component.queryByText('Test Card Accent')).toBeTruthy();
  });

  it('should render JSX component passed to accent prop', () => {
    const component = render(
      <TestCard footer={(
        <Text>
          Test Card Accent
        </Text>
      )}
      />,
    );

    expect(component.queryByText('Test Card Accent')).toBeTruthy();
  });

  it('should call onPress', () => {
    const onPress = jest.fn();
    const component = render(
      <TestCard onPress={onPress} />,
    );

    fireEvent.press(component.UNSAFE_queryByType(TouchableWeb));
    expect(onPress).toBeCalled();
  });

  it('should call onPressIn', () => {
    const onPressIn = jest.fn();
    const component = render(
      <TestCard onPressIn={onPressIn} />,
    );

    fireEvent(component.UNSAFE_queryByType(TouchableWeb), 'pressIn');
    expect(onPressIn).toBeCalled();
  });

  it('should call onPressOut', () => {
    const onPressOut = jest.fn();
    const component = render(
      <TestCard onPressOut={onPressOut} />,
    );

    fireEvent(component.UNSAFE_queryByType(TouchableWeb), 'pressOut');
    expect(onPressOut).toBeCalled();
  });
});



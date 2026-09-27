/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import { TouchableWeb } from '../../devsupport';
import {
  Image,
  ImageProps,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {
  fireEvent,
  render,
  within,
} from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import {
  light,
  mapping,
} from '@ui-kitten/eva';
import { ApplicationProvider } from '../../theme';
import {
  TopNavigation,
  TopNavigationProps,
} from './topNavigation.component';
import {
  TopNavigationAction,
  TopNavigationActionProps,
} from './topNavigationAction.component';

describe('@top-navigation-action: component checks', () => {

  const TestTopNavigationAction = (props?: TopNavigationActionProps): React.ReactElement => (
    <ApplicationProvider
      mapping={mapping}
      theme={light}
    >
      <TopNavigationAction {...props} />
    </ApplicationProvider>
  );

  it('should render function image component passed to icon prop', () => {
    const Icon = (props): React.ReactElement<ImageProps> => (
      <Image
        {...props}
        source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' }}
      />
    );

    const component = render(
      <TestTopNavigationAction icon={Icon} />,
    );

    const image = component.UNSAFE_queryByType(Image);

    expect(image).toBeTruthy();
    expect(image.props.source).toEqual({ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' });
  });

  it('should render JSX image component passed to icon prop', () => {
    const Icon = (
      <Image
        source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' }}
      />
    );

    const component = render(
      <TestTopNavigationAction icon={Icon} />,
    );

    const image = component.UNSAFE_queryByType(Image);

    expect(image).toBeTruthy();
    expect(image.props.source).toEqual({ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' });
  });

  it('should call onPress', () => {
    const onPress = jest.fn();
    const component = render(
      <TestTopNavigationAction onPress={onPress} />,
    );

    fireEvent.press(component.UNSAFE_queryByType(TouchableWeb));
    expect(onPress).toBeCalled();
  });

  it('should call onPressIn', () => {
    const onPressIn = jest.fn();
    const component = render(
      <TestTopNavigationAction onPressIn={onPressIn} />,
    );

    fireEvent(component.UNSAFE_queryByType(TouchableWeb), 'pressIn');
    expect(onPressIn).toBeCalled();
  });

  it('should call onPressOut', () => {
    const onPressOut = jest.fn();
    const component = render(
      <TestTopNavigationAction onPressOut={onPressOut} />,
    );

    fireEvent(component.UNSAFE_queryByType(TouchableWeb), 'pressOut');
    expect(onPressOut).toBeCalled();
  });

  it('should call onMouseEnter', () => {
    const onMouseEnter = jest.fn();

    const component = render(
      <TestTopNavigationAction onMouseEnter={onMouseEnter} />,
    );

    fireEvent(component.UNSAFE_queryByType(TouchableWeb), 'mouseEnter');
    expect(onMouseEnter).toBeCalled();
  });

  it('should call onMouseLeave', () => {
    const onMouseLeave = jest.fn();

    const component = render(
      <TestTopNavigationAction onMouseLeave={onMouseLeave} />,
    );

    fireEvent(component.UNSAFE_queryByType(TouchableWeb), 'mouseLeave');
    expect(onMouseLeave).toBeCalled();
  });

  it('should call onFocus', () => {
    const onFocus = jest.fn();

    const component = render(
      <TestTopNavigationAction onFocus={onFocus} />,
    );

    fireEvent(component.UNSAFE_queryByType(TouchableWeb), 'focus');
    expect(onFocus).toBeCalled();
  });

  it('should call onBlur', () => {
    const onBlur = jest.fn();

    const component = render(
      <TestTopNavigationAction onBlur={onBlur} />,
    );

    fireEvent(component.UNSAFE_queryByType(TouchableWeb), 'blur');
    expect(onBlur).toBeCalled();
  });

});

describe('@top-navigation: component checks', () => {

  const TestTopNavigation = (props?: Partial<TopNavigationProps>): React.ReactElement => (
    <ApplicationProvider
      mapping={mapping}
      theme={light}
    >
      <TopNavigation {...props} />
    </ApplicationProvider>
  );

  it('should render text passed to title prop', () => {
    const component = render(
      <TestTopNavigation title='I love Babel' />,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render function component passed to title prop', () => {
    const component = render(
      <TestTopNavigation title={props => (
        <Text {...props}>
          I love Babel
        </Text>
      )}
      />,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render JSX component passed to title prop', () => {
    const component = render(
      <TestTopNavigation title={(
        <Text>
          I love Babel
        </Text>
      )}
      />,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render text passed to subtitle prop', () => {
    const component = render(
      <TestTopNavigation subtitle='I love Babel' />,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render function component passed to subtitle prop', () => {
    const component = render(
      <TestTopNavigation subtitle={props => (
        <Text {...props}>
          I love Babel
        </Text>
      )}
      />,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render JSX component passed to subtitle prop', () => {
    const component = render(
      <TestTopNavigation subtitle={(
        <Text>
          I love Babel
        </Text>
      )}
      />,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should stack the subtitle below the title for every alignment', () => {
    const titleContainerStyle = (alignment?: 'start' | 'center'): ViewStyle => {
      const component = render(
        <TestTopNavigation
          alignment={alignment}
          title='I love Babel'
          subtitle='I love Jest'
        />,
      );
      // Both texts share the title container; walk up from the subtitle to the host view
      // that also contains the title.
      let node: ReactTestInstance | null = component.getByText('I love Jest').parent;
      while (node && !(String(node.type) === 'View' && within(node).queryByText('I love Babel'))) {
        node = node.parent;
      }
      expect(node).toBeTruthy();
      return StyleSheet.flatten(node.props.style as StyleProp<ViewStyle>) as ViewStyle;
    };

    expect(titleContainerStyle().flexDirection).not.toEqual('row');
    expect(titleContainerStyle('start').flexDirection).not.toEqual('row');
    expect(titleContainerStyle('center').flexDirection).not.toEqual('row');
  });

  it('should render function component passed to accessoryLeft prop', () => {
    const component = render(
      <TestTopNavigation subtitle={props => (
        <Text {...props}>
          I love Babel
        </Text>
      )}
      />,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render JSX component passed to accessoryLeft prop', () => {
    const component = render(
      <TestTopNavigation subtitle={(
        <Text>
          I love Babel
        </Text>
      )}
      />,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render component passed to accessoryRight prop', () => {
    const component = render(
      <TestTopNavigation subtitle={props => (
        <Text {...props}>
          I love Babel
        </Text>
      )}
      />,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render JSX component passed to accessoryRight prop', () => {
    const component = render(
      <TestTopNavigation subtitle={(
        <Text>
          I love Babel
        </Text>
      )}
      />,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });
});

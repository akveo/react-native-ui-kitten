/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  fireEvent,
  render,
  RenderAPI,
  waitFor,
} from '@testing-library/react-native';
import {
  light,
  mapping,
} from '@ui-kitten/eva';
import { ApplicationProvider } from '../../theme';
import {
  Tooltip,
  TooltipProps,
} from './tooltip.component';

/*
 * Mock UIManager since Tooltip relies on native measurements
 */
jest.mock('react-native', () => {
  const ActualReactNative = jest.requireActual('react-native');

  ActualReactNative.UIManager.measureInWindow = (node, callback) => {
    callback(0, 0, 42, 42);
  };

  return ActualReactNative;
});

describe('@tooltip: component checks', () => {

  afterAll(() => {
    jest.clearAllMocks();
  });

  const TestTooltip = (props: Partial<TooltipProps>): React.ReactElement => {

    const [visible, setVisible] = React.useState(props.visible || false);

    const toggleTooltip = (): void => {
      setVisible(!visible);
    };

    return (
      <ApplicationProvider
        mapping={mapping}
        theme={light}
      >
        <Tooltip
          visible={visible}
          anchor={() => (
            <Button
              testID='@tooltip/toggle-button'
              title=''
              onPress={toggleTooltip}
            />
          )}
          {...props}
        >
          {props.children}
        </Tooltip>
      </ApplicationProvider>
    );
  };

  TestTooltip.displayName = 'TestTooltip';

  /*
   * In this test:
   * [0] for `anchor` component
   * [1] for modal backdrop
   */
  const touchables = {
    findToggleButton: (api: RenderAPI) => api.queryByTestId('@tooltip/toggle-button'),
    findBackdropTouchable: (api: RenderAPI) => api.queryByTestId('@backdrop'),
  };

  it('should render function element passed to `anchor` prop', () => {
    const component = render(
      <TestTooltip />,
    );

    expect(touchables.findToggleButton(component)).toBeTruthy();
  });

  it('should not render content when not visible', async () => {
    const component = render(
      <TestTooltip visible={false}>
        I love Babel
      </TestTooltip>,
    );

    const text = await waitFor(() => component.queryByText('I love Babel'));
    expect(text).toBeFalsy();
  });

  it('should render content when becomes visible', async () => {
    const component = render(
      <TestTooltip>
        I love Babel
      </TestTooltip>,
    );

    fireEvent.press(touchables.findToggleButton(component));

    const text = await waitFor(() => component.queryByText('I love Babel'));
    expect(text).toBeTruthy();
  });

  it('should render content as component when becomes visible', async () => {
    const component = render(
      <TestTooltip>
        {props => (
          <Text {...props}>
            I love Babel
          </Text>
        )}
      </TestTooltip>,
    );

    fireEvent.press(touchables.findToggleButton(component));

    const text = await waitFor(() => component.queryByText('I love Babel'));
    expect(text).toBeTruthy();
  });

  it('should render content as pure JSX component when becomes visible', async () => {
    const childrenComponent = (
      <View>
        <Text>
          I love Babel
        </Text>
      </View>
    );

    const component = render(
      <TestTooltip>
        {childrenComponent}
      </TestTooltip>,
    );

    fireEvent.press(touchables.findToggleButton(component));

    const text = await waitFor(() => component.queryByText('I love Babel'));
    expect(text).toBeTruthy();
  });

  it('should render component passed to accessoryLeft prop when visible', async () => {
    const component = render(
      <TestTooltip accessoryLeft={props => (
        <View
          {...props}
          testID='@tooltip/accessory-left'
        />
      )}
      >
        I love Babel
      </TestTooltip>,
    );

    fireEvent.press(touchables.findToggleButton(component));

    const accessoryLeft = await waitFor(() => component.queryByTestId('@tooltip/accessory-left'));
    expect(accessoryLeft).toBeTruthy();
  });

  it('should render component passed to accessoryRight prop when visible', async () => {
    const component = render(
      <TestTooltip accessoryRight={props => (
        <View
          {...props}
          testID='@tooltip/accessory-right'
        />
      )}
      >
        I love Babel
      </TestTooltip>,
    );

    fireEvent.press(touchables.findToggleButton(component));

    const accessoryRight = await waitFor(() => component.queryByTestId('@tooltip/accessory-right'));
    expect(accessoryRight).toBeTruthy();
  });

  it('should call onBackdropPress', async () => {
    const onBackdropPress = jest.fn();
    const component = render(
      <TestTooltip onBackdropPress={onBackdropPress} />,
    );

    fireEvent.press(touchables.findToggleButton(component));
    const backdrop = await waitFor(() => touchables.findBackdropTouchable(component));
    // Backdrop uses PanResponder - call the handler directly
    const responderRelease = backdrop.props.onResponderRelease;
    if (responderRelease) {
      responderRelease({ nativeEvent: {} });
    }

    expect(onBackdropPress).toBeCalled();
  });

  it('should style backdrop with backdropStyle prop', async () => {
    const styles = { backgroundColor: 'red' };
    const component = render(
      <TestTooltip backdropStyle={styles} />,
    );

    fireEvent.press(touchables.findToggleButton(component));
    const backdrop = await waitFor(() => touchables.findBackdropTouchable(component));

    expect(StyleSheet.flatten(backdrop.props.style).backgroundColor).toEqual('red');
  });

});

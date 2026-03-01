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
  TouchableOpacity,
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
  OverflowMenu,
  OverflowMenuProps,
} from './overflowMenu.component';
import { MenuItem } from '../menu/menuItem.component';

/*
 * Mock UIManager since OverflowMenu relies on native measurements
 */
jest.mock('react-native', () => {
  const ActualReactNative = jest.requireActual('react-native');

  ActualReactNative.UIManager.measureInWindow = (node, callback) => {
    callback(0, 0, 42, 42);
  };

  return ActualReactNative;
});

describe('@overflow-menu: component checks', () => {

  afterAll(() => {
    jest.clearAllMocks();
  });

  /*
   * In this test:
   * [0] for `anchor` component
   * [1] for modal backdrop
   */
  const touchables = {
    findToggleButton: (api: RenderAPI) => api.queryByTestId('@overflow-menu/toggle-button'),
    findBackdropTouchable: (api: RenderAPI) => api.queryByTestId('@backdrop'),
  };

  const TestOverflowMenu = React.forwardRef((props: Partial<OverflowMenuProps>,
    ref: React.Ref<OverflowMenu>) => {

    const [visible, setVisible] = React.useState(props.visible || false);

    const toggleOverflowMenu = (): void => {
      setVisible(!visible);
    };

    return (
      <ApplicationProvider
        mapping={mapping}
        theme={light}
      >
        <OverflowMenu
          ref={ref}
          visible={visible}
          anchor={() => (
            <Button
              testID='@overflow-menu/toggle-button'
              title=''
              onPress={toggleOverflowMenu}
            />
          )}
          {...props}
        >
          <MenuItem title='Option 1' />
          <MenuItem title='Option 2' />
        </OverflowMenu>
      </ApplicationProvider>
    );
  });

  TestOverflowMenu.displayName = 'TestOverflowMenu';

  it('should render element passed to `anchor` prop', () => {
    const component = render(
      <TestOverflowMenu />,
    );

    expect(touchables.findToggleButton(component)).toBeTruthy();
  });

  it('should not render content when not visible', async () => {
    const component = render(
      <TestOverflowMenu visible={false} />,
    );

    const options = await waitFor(() => component.UNSAFE_queryAllByType(MenuItem));
    expect(options.length).toEqual(0);
  });

  it('should render content when becomes visible', async () => {
    const component = render(
      <TestOverflowMenu visible={true} />,
    );

    fireEvent.press(touchables.findToggleButton(component));

    const options = await waitFor(() => component.UNSAFE_queryAllByType(MenuItem));
    expect(options.length).toEqual(2);
  });

  it('should call onBackdropPress', async () => {
    const onBackdropPress = jest.fn();

    const component = render(
      <TestOverflowMenu onBackdropPress={onBackdropPress} />,
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
      <TestOverflowMenu backdropStyle={styles} />,
    );

    fireEvent.press(touchables.findToggleButton(component));
    const backdrop = await waitFor(() => touchables.findBackdropTouchable(component));

    expect(StyleSheet.flatten(backdrop.props.style).backgroundColor).toEqual('red');
  });

  /*  it('should be able to show with ref', async () => {
    const componentRef = React.createRef<OverflowMenu>();

    const component = render(
      <TestOverflowMenu ref={componentRef} />,
    );

    componentRef.current.show();

    const options = await waitFor(() => component.UNSAFE_queryAllByType(MenuItem));
    expect(options.length).toEqual(2);
  });*/

  /*  it('should be able to hide with ref', async () => {
    const componentRef = React.createRef<OverflowMenu>();

    const component = render(
      <TestOverflowMenu ref={componentRef} />,
    );

    componentRef.current.show();
    await waitFor(() => null);

    componentRef.current.hide();

    const options = await waitFor(() => component.UNSAFE_queryAllByType(MenuItem));
    expect(options.length).toEqual(0);
  });*/

});

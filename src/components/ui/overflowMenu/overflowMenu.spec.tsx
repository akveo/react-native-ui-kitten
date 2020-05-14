/**
 * @license
 * Copyright Akveo. All Rights Reserved.
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
  waitForElement,
} from 'react-native-testing-library';
import {
  light,
  mapping,
} from '@eva-design/eva';
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
    findBackdropTouchable: (api: RenderAPI) => api.queryAllByType(TouchableOpacity)[1],
  };

  const TestOverflowMenu = React.forwardRef((props: Partial<OverflowMenuProps>,
                                             ref: React.Ref<OverflowMenu>) => {

    const [visible, setVisible] = React.useState(props.visible);

    const toggleOverflowMenu = (): void => {
      setVisible(!visible);
    };

    return (
      <ApplicationProvider mapping={mapping} theme={light}>
        <OverflowMenu
          ref={ref}
          visible={visible}
          anchor={() => <Button testID='@overflow-menu/toggle-button' title='' onPress={toggleOverflowMenu}/>}
          {...props}>
          <MenuItem title='Option 1'/>
          <MenuItem title='Option 2'/>
        </OverflowMenu>
      </ApplicationProvider>
    );
  });

  it('should render element passed to `anchor` prop', () => {
    const component = render(
      <TestOverflowMenu/>,
    );

    expect(touchables.findToggleButton(component)).toBeTruthy();
  });

  it('should not render content when not visible', async () => {
    const component = render(
      <TestOverflowMenu visible={false}/>,
    );

    const options = await waitForElement(() => component.queryAllByType(MenuItem));
    expect(options.length).toEqual(0);
  });

  it('should render content when becomes visible', async () => {
    const component = render(
      <TestOverflowMenu visible={true}/>,
    );

    fireEvent.press(touchables.findToggleButton(component));

    const options = await waitForElement(() => component.queryAllByType(MenuItem));
    expect(options.length).toEqual(2);
  });

  it('should call onBackdropPress', async () => {
    const onBackdropPress = jest.fn();

    const component = render(
      <TestOverflowMenu onBackdropPress={onBackdropPress}/>,
    );

    fireEvent.press(touchables.findToggleButton(component));

    await waitForElement(() => {
      fireEvent.press(touchables.findBackdropTouchable(component));
    });

    expect(onBackdropPress).toBeCalled();
  });

  it('should style backdrop with backdropStyle prop', async () => {
    const component = render(
      <TestOverflowMenu backdropStyle={{ backgroundColor: 'red' }}/>,
    );

    fireEvent.press(touchables.findToggleButton(component));
    const backdrop = await waitForElement(() => touchables.findBackdropTouchable(component));

    expect(StyleSheet.flatten(backdrop.props.style).backgroundColor).toEqual('red');
  });

  it('should be able to show with ref', async () => {
    const componentRef = React.createRef<OverflowMenu>();

    const component = render(
      <TestOverflowMenu ref={componentRef}/>,
    );

    componentRef.current.show();

    const options = await waitForElement(() => component.queryAllByType(MenuItem));
    expect(options.length).toEqual(2);
  });

  it('should be able to hide with ref', async () => {
    const componentRef = React.createRef<OverflowMenu>();

    const component = render(
      <TestOverflowMenu ref={componentRef}/>,
    );

    componentRef.current.show();
    await waitForElement(() => null);

    componentRef.current.hide();

    const options = await waitForElement(() => component.queryAllByType(MenuItem));
    expect(options.length).toEqual(0);
  });

});

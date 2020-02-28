/**
 * @license
 * Copyright Akveo. All Rights Reserved.
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
  waitForElement,
} from 'react-native-testing-library';
import {
  light,
  mapping,
} from '@eva-design/eva';
import { ApplicationProvider } from '../../theme';
import {
  Tooltip,
  TooltipComponent,
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

describe('@popover: component checks', () => {

  afterAll(() => {
    jest.clearAllMocks();
  });

  /*
   * In this test:
   * [0] for `anchor` component
   * [1] for modal backdrop
   */
  const touchables = {
    findBackdropTouchable: (api: RenderAPI) => api.queryAllByType(TouchableOpacity)[1],
  };

  const TestTooltip = React.forwardRef((props: Partial<TooltipProps>,
                                        ref: React.Ref<TooltipComponent>) => {
    const [visible, setVisible] = React.useState(props.visible);

    const toggleTooltip = (): void => {
      setVisible(!visible);
    };

    return (
      <ApplicationProvider mapping={mapping} theme={light}>
        <Tooltip
          ref={ref}
          visible={visible}
          anchor={() => <Button testID='@popover/toggle-button' title='' onPress={toggleTooltip}/>}
          {...props}>
          {props.children}
        </Tooltip>
      </ApplicationProvider>
    );
  });

  it('should render element passed to `anchor` prop', () => {
    const component = render(
      <TestTooltip/>,
    );

    expect(component.getByTestId('@popover/toggle-button')).toBeTruthy();
  });

  it('should not render content when not visible', async () => {
    const component = render(
      <TestTooltip visible={false}>
        I love Babel
      </TestTooltip>,
    );

    const text = await waitForElement(() => component.queryByText('I love Babel'));

    expect(text).toBeFalsy();
  });

  it('should render content when becomes visible', async () => {
    const component = render(
      <TestTooltip>
        I love Babel
      </TestTooltip>,
    );

    fireEvent.press(component.getByTestId('@popover/toggle-button'));
    const text = await waitForElement(() => component.queryByText('I love Babel'));

    expect(text).toBeTruthy();
  });

  it('should render content as component when becomes visible', async () => {
    const component = render(
      <TestTooltip>
        {props => <Text {...props}>I love Babel</Text>}
      </TestTooltip>,
    );

    fireEvent.press(component.getByTestId('@popover/toggle-button'));
    const text = await waitForElement(() => component.queryByText('I love Babel'));

    expect(text).toBeTruthy();
  });

  it('should render component passed to accessoryLeft prop when visible', async () => {
    const component = render(
      <TestTooltip accessoryLeft={props => <View {...props} testID='@tooltip/accessory-left'/>}>
        I love Babel
      </TestTooltip>,
    );

    fireEvent.press(component.getByTestId('@popover/toggle-button'));
    const accessoryLeft = await waitForElement(() => component.queryByTestId('@tooltip/accessory-left'));

    expect(accessoryLeft).toBeTruthy();
  });

  it('should render component passed to accessoryRight prop when visible', async () => {
    const component = render(
      <TestTooltip accessoryRight={props => <View {...props} testID='@tooltip/accessory-right'/>}>
        I love Babel
      </TestTooltip>,
    );

    fireEvent.press(component.getByTestId('@popover/toggle-button'));
    const accessoryRight = await waitForElement(() => component.queryByTestId('@tooltip/accessory-right'));

    expect(accessoryRight).toBeTruthy();
  });

  it('should call onBackdropPress', async () => {
    const onBackdropPress = jest.fn();

    const component = render(
      <TestTooltip onBackdropPress={onBackdropPress}/>,
    );

    fireEvent.press(component.getByTestId('@popover/toggle-button'));

    const backdrop = await waitForElement(() => touchables.findBackdropTouchable(component));
    fireEvent.press(backdrop);

    expect(onBackdropPress).toBeCalled();
  });

  it('should style backdrop with backdropStyle prop', async () => {
    const component = render(
      <TestTooltip backdropStyle={{ backgroundColor: 'red' }}/>,
    );

    fireEvent.press(component.getByTestId('@popover/toggle-button'));
    const backdrop = await waitForElement(() => touchables.findBackdropTouchable(component));

    expect(StyleSheet.flatten(backdrop.props.style).backgroundColor).toEqual('red');
  });

  it('should be able to show with ref', async () => {
    const componentRef = React.createRef<TooltipComponent>();

    const component = render(
      <TestTooltip ref={componentRef}>
        I love Babel
      </TestTooltip>,
    );

    componentRef.current.show();
    const text = await waitForElement(() => component.queryByText('I love Babel'));

    expect(text).toBeTruthy();
  });

  it('should be able to hide with ref', async () => {
    const componentRef = React.createRef<TooltipComponent>();

    const component = render(
      <TestTooltip ref={componentRef}>
        I love Babel
      </TestTooltip>,
    );

    componentRef.current.show();
    await waitForElement(() => null);

    componentRef.current.hide();
    const text = await waitForElement(() => component.queryByText('I love Babel'));

    expect(text).toBeFalsy();
  });

});

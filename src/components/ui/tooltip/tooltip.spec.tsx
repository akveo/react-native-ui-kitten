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

  const TestTooltip = React.forwardRef((props: Partial<TooltipProps>,
                                        ref: React.Ref<Tooltip>) => {

    const [visible, setVisible] = React.useState(props.visible);

    const toggleTooltip = (): void => {
      setVisible(!visible);
    };

    return (
      <ApplicationProvider mapping={mapping} theme={light}>
        <Tooltip
          ref={ref}
          visible={visible}
          anchor={() => <Button testID='@tooltip/toggle-button' title='' onPress={toggleTooltip}/>}
          {...props}>
          {props.children}
        </Tooltip>
      </ApplicationProvider>
    );
  });

  /*
   * In this test:
   * [0] for `anchor` component
   * [1] for modal backdrop
   */
  const touchables = {
    findToggleButton: (api: RenderAPI) => api.queryByTestId('@tooltip/toggle-button'),
    findBackdropTouchable: (api: RenderAPI) => api.queryAllByType(TouchableOpacity)[1],
  };

  it('should render function element passed to `anchor` prop', () => {
    const component = render(
      <TestTooltip/>,
    );

    expect(touchables.findToggleButton(component)).toBeTruthy();
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

    fireEvent.press(touchables.findToggleButton(component));

    const text = await waitForElement(() => component.queryByText('I love Babel'));
    expect(text).toBeTruthy();
  });

  it('should render content as component when becomes visible', async () => {
    const component = render(
      <TestTooltip>
        {props => <Text {...props}>I love Babel</Text>}
      </TestTooltip>,
    );

    fireEvent.press(touchables.findToggleButton(component));

    const text = await waitForElement(() => component.queryByText('I love Babel'));
    expect(text).toBeTruthy();
  });

  it('should render content as pure JSX component when becomes visible', async () => {
    const childrenComponent = (
      <View>
        <Text>I love Babel</Text>
      </View>
    )

    const component = render(
      <TestTooltip>
        {childrenComponent}
      </TestTooltip>,
    );

    fireEvent.press(touchables.findToggleButton(component));

    const text = await waitForElement(() => component.queryByText('I love Babel'));
    expect(text).toBeTruthy();
  });

  it('should render component passed to accessoryLeft prop when visible', async () => {
    const component = render(
      <TestTooltip accessoryLeft={props => <View {...props} testID='@tooltip/accessory-left'/>}>
        I love Babel
      </TestTooltip>,
    );

    fireEvent.press(touchables.findToggleButton(component));

    const accessoryLeft = await waitForElement(() => component.queryByTestId('@tooltip/accessory-left'));
    expect(accessoryLeft).toBeTruthy();
  });

  it('should render component passed to accessoryRight prop when visible', async () => {
    const component = render(
      <TestTooltip accessoryRight={props => <View {...props} testID='@tooltip/accessory-right'/>}>
        I love Babel
      </TestTooltip>,
    );

    fireEvent.press(touchables.findToggleButton(component));

    const accessoryRight = await waitForElement(() => component.queryByTestId('@tooltip/accessory-right'));
    expect(accessoryRight).toBeTruthy();
  });

  it('should call onBackdropPress', async () => {
    const onBackdropPress = jest.fn();
    const component = render(
      <TestTooltip onBackdropPress={onBackdropPress}/>,
    );

    fireEvent.press(touchables.findToggleButton(component));
    await waitForElement(() => {
      fireEvent.press(touchables.findBackdropTouchable(component));
    });

    expect(onBackdropPress).toBeCalled();
  });

  it('should style backdrop with backdropStyle prop', async () => {
    const component = render(
      <TestTooltip backdropStyle={{ backgroundColor: 'red' }}/>,
    );

    fireEvent.press(touchables.findToggleButton(component));
    const backdrop = await waitForElement(() => touchables.findBackdropTouchable(component));

    expect(StyleSheet.flatten(backdrop.props.style).backgroundColor).toEqual('red');
  });

  it('should be able to show with ref', async () => {
    const componentRef = React.createRef<Tooltip>();
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
    const componentRef = React.createRef<Tooltip>();
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

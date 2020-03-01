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
  Modal,
  ModalProps,
} from './modal.component';

describe('@modal: component checks', () => {

  const TestModal = (props: Partial<ModalProps>) => {
    const [visible, setVisible] = React.useState(props.visible);
    const [text, setText] = React.useState('I love Babel');

    const toggleVisible = (): void => {
      setVisible(!visible);
    };

    const changeText = (): void => {
      setText('I love Jest');
    };

    return (
      <ApplicationProvider mapping={mapping} theme={light}>
        <React.Fragment>
          <Modal {...props} visible={visible}>
            <Text>{text}</Text>
            <Button testID='@modal/change-text-button' title='' onPress={changeText}/>
          </Modal>
          <Button testID='@modal/toggle-button' title='' onPress={toggleVisible}/>
        </React.Fragment>
      </ApplicationProvider>
    );
  };

  /*
   * In this test:
   * [0] for @modal/toggle-button,
   * [1] for backdrop
   * [2] for @modal/change-text-button
   */
  const touchables = {
    findToggleButton: (api: RenderAPI) => api.queryByTestId('@modal/toggle-button'),
    findBackdropTouchable: (api: RenderAPI) => api.queryAllByType(TouchableOpacity)[1],
    findChangeTextButton: (api: RenderAPI) => api.queryByTestId('@modal/change-text-button'),
  };

  it('should render nothing when invisible', async () => {
    const component = render(
      <TestModal/>,
    );

    expect(component.queryByText('I love Babel')).toBeFalsy();
  });

  it('should render element passed to children when becomes visible', async () => {
    const component = render(
      <TestModal/>,
    );

    fireEvent.press(touchables.findToggleButton(component));

    const text = await waitForElement(() => component.queryByText('I love Babel'));
    expect(text).toBeTruthy();
  });

  it('should render nothing when becomes invisible', async () => {
    const component = render(
      <TestModal/>,
    );

    fireEvent.press(touchables.findToggleButton(component));
    await waitForElement(() => {
      fireEvent.press(touchables.findToggleButton(component));
    });

    const text = await waitForElement(() => component.queryByText('I love Babel'));
    expect(text).toBeFalsy();
  });

  it('should be able to interact with content element passed to children', async () => {
    const component = render(
      <TestModal/>,
    );

    fireEvent.press(touchables.findToggleButton(component));
    await waitForElement(() => {
      fireEvent.press(touchables.findChangeTextButton(component));
    });

    const text = await waitForElement(() => component.queryByText('I love Jest'));
    expect(text).toBeTruthy();
  });

  it('should call onBackdropPress', async () => {
    const onBackdropPress = jest.fn();
    const component = render(
      <TestModal onBackdropPress={onBackdropPress}/>,
    );

    fireEvent.press(touchables.findToggleButton(component));
    await waitForElement(() => {
      fireEvent.press(touchables.findBackdropTouchable(component));
    });

    expect(onBackdropPress).toBeCalled();
  });

  it('should style backdrop with backdropStyle prop', async () => {
    const component = render(
      <TestModal backdropStyle={{ backgroundColor: 'red' }}/>,
    );

    fireEvent.press(touchables.findToggleButton(component));
    const backdrop = await waitForElement(() => touchables.findBackdropTouchable(component));

    expect(StyleSheet.flatten(backdrop.props.style).backgroundColor).toEqual('red');
  });

});

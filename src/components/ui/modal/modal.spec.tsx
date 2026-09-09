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
  Modal,
  ModalProps,
} from './modal.component';

describe('@modal: component checks', () => {

  const TestModal = (props: Partial<ModalProps>): React.ReactElement => {
    const [visible, setVisible] = React.useState(props.visible || false);
    const [text, setText] = React.useState('I love Babel');

    const toggleVisible = (): void => {
      setVisible(!visible);
    };

    const changeText = (): void => {
      setText('I love Jest');
    };

    return (
      <ApplicationProvider
        mapping={mapping}
        theme={light}
      >
        <>
          <Modal
            {...props}
            visible={visible}
          >
            <Text>
              {text}
            </Text>
            <Button
              testID='@modal/change-text-button'
              title=''
              onPress={changeText}
            />
          </Modal>
          <Button
            testID='@modal/toggle-button'
            title=''
            onPress={toggleVisible}
          />
        </>
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
    // `includeHiddenElements` is required because the modal content sets
    // `aria-modal`, which hides its siblings — the backdrop among them — from
    // assistive technology. That is the intended iOS behaviour; the backdrop is
    // still present and still receives touches.
    findBackdropTouchable: (api: RenderAPI) => api.queryByTestId('@backdrop', { includeHiddenElements: true }),
    findChangeTextButton: (api: RenderAPI) => api.queryByTestId('@modal/change-text-button'),
  };

  it('should render nothing when invisible', async () => {
    const component = render(
      <TestModal />,
    );

    expect(component.queryByText('I love Babel')).toBeFalsy();
  });

  it('should render element passed to children when becomes visible', async () => {
    const component = render(
      <TestModal />,
    );

    fireEvent.press(touchables.findToggleButton(component));

    const text = await waitFor(() => component.queryByText('I love Babel'));
    expect(text).toBeTruthy();
  });

  it('should render nothing when becomes invisible', async () => {
    const component = render(
      <TestModal />,
    );

    fireEvent.press(touchables.findToggleButton(component));
    await waitFor(() => {
      fireEvent.press(touchables.findToggleButton(component));
    });

    const text = await waitFor(() => component.queryByText('I love Babel'));
    expect(text).toBeFalsy();
  });

  it('should be able to interact with content element passed to children', async () => {
    const component = render(
      <TestModal />,
    );

    fireEvent.press(touchables.findToggleButton(component));
    await waitFor(() => {
      fireEvent.press(touchables.findChangeTextButton(component));
    });

    const text = await waitFor(() => component.queryByText('I love Jest'));
    expect(text).toBeTruthy();
  });

  it('should call onBackdropPress', async () => {
    const onBackdropPress = jest.fn();
    const component = render(
      <TestModal onBackdropPress={onBackdropPress} />,
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
      <TestModal backdropStyle={styles} />,
    );

    fireEvent.press(touchables.findToggleButton(component));
    const backdrop = await waitFor(() => touchables.findBackdropTouchable(component));

    expect(StyleSheet.flatten(backdrop.props.style).backgroundColor).toEqual('red');
  });


  describe('accessibility', () => {

    it('should mark the content as a modal so siblings are hidden', () => {
      const component = render(<TestModal visible={true} />);

      // `aria-modal` scopes VoiceOver to the content; the backdrop is a
      // sibling and is therefore hidden from assistive technology.
      expect(component.getByText('I love Babel')).toBeTruthy();
      expect(component.queryByTestId('@backdrop')).toBeFalsy();
      expect(component.queryByTestId('@backdrop', { includeHiddenElements: true })).toBeTruthy();
    });

    it('should name the backdrop only when a label is given', () => {
      const withoutLabel = render(<TestModal visible={true} />);

      expect(
        withoutLabel.getByTestId('@backdrop', { includeHiddenElements: true }).props.accessible,
      ).toBeUndefined();

      const withLabel = render(
        <TestModal
          visible={true}
          backdropAccessibilityLabel='Close'
        />,
      );
      const backdrop = withLabel.getByTestId('@backdrop', { includeHiddenElements: true });

      expect(backdrop.props.accessible).toEqual(true);
      expect(backdrop.props['aria-label']).toEqual('Close');
    });
  });

});

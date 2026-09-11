/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  Button,
  Modal as RNModal,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  act,
  fireEvent,
  render,
  RenderAPI,
  waitFor,
  within,
} from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import {
  light,
  mapping,
} from '@ui-kitten/eva';
import {
  ApplicationProvider,
  ModalPanelContext,
  ModalPanelRegistry,
  ThemeProvider,
  useTheme,
} from '../../theme';
import { Popover } from '../popover/popover.component';
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

describe('@modal: panel checks', () => {

  const hasAncestorOfType = (instance: ReactTestInstance, type: React.ElementType): boolean => {
    let node: ReactTestInstance | null = instance.parent;
    while (node) {
      if (node.type === type) {
        return true;
      }
      node = node.parent;
    }
    return false;
  };

  const isDescendantOf = (instance: ReactTestInstance, ancestor: ReactTestInstance): boolean => {
    let node: ReactTestInstance | null = instance.parent;
    while (node) {
      if (node === ancestor) {
        return true;
      }
      node = node.parent;
    }
    return false;
  };

  const Provider = ({ children }: { children: React.ReactNode }): React.ReactElement => (
    <ApplicationProvider
      mapping={mapping}
      theme={light}
    >
      {children}
    </ApplicationProvider>
  );

  it('should present the native modal outside of the enclosing ScrollView', () => {
    const component = render(
      <Provider>
        <ScrollView testID='host-list'>
          <Modal visible={true}>
            <Text>content</Text>
          </Modal>
        </ScrollView>
      </Provider>,
    );

    const modal = component.UNSAFE_getByType(RNModal);
    expect(component.getByText('content')).toBeTruthy();
    expect(hasAncestorOfType(modal, ScrollView)).toBe(false);
  });

  it('should render inline without ApplicationProvider and warn once', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);

    const component = render(
      <ScrollView testID='host-list'>
        <Modal visible={true}>
          <Text>content</Text>
        </Modal>
      </ScrollView>,
    );

    const modal = component.UNSAFE_getByType(RNModal);
    expect(component.getByText('content')).toBeTruthy();
    expect(hasAncestorOfType(modal, ScrollView)).toBe(true);
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0][0]).toMatch(/ApplicationProvider/);

    render(
      <Modal visible={true}>
        <Text>another</Text>
      </Modal>,
    );
    expect(warn).toHaveBeenCalledTimes(1);

    warn.mockRestore();
  });

  it('should render inline when renderInline is set', () => {
    const component = render(
      <Provider>
        <ScrollView testID='host-list'>
          <Modal
            visible={true}
            renderInline={true}
          >
            <Text>content</Text>
          </Modal>
        </ScrollView>
      </Provider>,
    );

    const modal = component.UNSAFE_getByType(RNModal);
    expect(hasAncestorOfType(modal, ScrollView)).toBe(true);
  });

  it('should render inline below an explicit null panel context', () => {
    const component = render(
      <Provider>
        <ModalPanelContext.Provider value={null}>
          <ScrollView testID='host-list'>
            <Modal visible={true}>
              <Text>content</Text>
            </Modal>
          </ScrollView>
        </ModalPanelContext.Provider>
      </Provider>,
    );

    const modal = component.UNSAFE_getByType(RNModal);
    expect(hasAncestorOfType(modal, ScrollView)).toBe(true);
  });

  it('should bridge the theme of the call site into the presented content', () => {
    const ThemeProbe = (): React.ReactElement => {
      const theme = useTheme();
      return <Text>{theme['color-primary-500']}</Text>;
    };

    const component = render(
      <Provider>
        <ThemeProvider theme={{ ...light, 'color-primary-500': '#123456' }}>
          <Modal visible={true}>
            <ThemeProbe />
          </Modal>
        </ThemeProvider>
      </Provider>,
    );

    expect(component.getByText('#123456')).toBeTruthy();
  });

  it('should render two visible modals in show order and keep the second when the first hides', () => {
    const Harness = (): React.ReactElement => {
      const [firstVisible, setFirstVisible] = React.useState(true);
      return (
        <Provider>
          <Modal visible={firstVisible}>
            <Text>first</Text>
          </Modal>
          <Modal visible={true}>
            <Text>second</Text>
          </Modal>
          <Button
            testID='hide-first'
            title=''
            onPress={() => setFirstVisible(false)}
          />
        </Provider>
      );
    };

    const component = render(<Harness />);

    let modals = component.UNSAFE_getAllByType(RNModal);
    expect(modals).toHaveLength(2);
    expect(within(modals[0]).getByText('first')).toBeTruthy();
    expect(within(modals[1]).getByText('second')).toBeTruthy();

    fireEvent.press(component.getByTestId('hide-first'));

    modals = component.UNSAFE_getAllByType(RNModal);
    expect(modals).toHaveLength(1);
    expect(component.queryByText('first')).toBeFalsy();
    expect(within(modals[0]).getByText('second')).toBeTruthy();
  });

  it('should keep the position of a re-pushed modal among its siblings', () => {
    const Harness = (): React.ReactElement => {
      const [label, setLabel] = React.useState('first');
      return (
        <Provider>
          <Modal visible={true}>
            <Text>{label}</Text>
          </Modal>
          <Modal visible={true}>
            <Text>second</Text>
          </Modal>
          <Button
            testID='rename'
            title=''
            onPress={() => setLabel('renamed')}
          />
        </Provider>
      );
    };

    const component = render(<Harness />);
    fireEvent.press(component.getByTestId('rename'));

    const modals = component.UNSAFE_getAllByType(RNModal);
    expect(modals).toHaveLength(2);
    expect(within(modals[0]).getByText('renamed')).toBeTruthy();
    expect(within(modals[1]).getByText('second')).toBeTruthy();
  });

  it('should remove the item when a visible modal unmounts', () => {
    const Harness = (): React.ReactElement => {
      const [mounted, setMounted] = React.useState(true);
      return (
        <Provider>
          {mounted && (
            <Modal visible={true}>
              <Text>content</Text>
            </Modal>
          )}
          <Button
            testID='unmount'
            title=''
            onPress={() => setMounted(false)}
          />
        </Provider>
      );
    };

    const component = render(<Harness />);
    expect(component.getByText('content')).toBeTruthy();

    fireEvent.press(component.getByTestId('unmount'));

    expect(component.queryByText('content')).toBeFalsy();
    expect(component.UNSAFE_queryAllByType(RNModal)).toHaveLength(0);
  });

  it('should not re-render the app subtree when a modal is pushed', () => {
    let renders = 0;
    const Counter = (): React.ReactElement => {
      renders++;
      return <Text>counter</Text>;
    };
    const Harness = (): React.ReactElement => {
      const [visible, setVisible] = React.useState(false);
      return (
        <Provider>
          <Counter />
          <Modal visible={visible}>
            <Text>content</Text>
          </Modal>
          <Button
            testID='show'
            title=''
            onPress={() => setVisible(true)}
          />
        </Provider>
      );
    };

    const component = render(<Harness />);
    const rendersAfterMount = renders;

    fireEvent.press(component.getByTestId('show'));
    expect(component.getByText('content')).toBeTruthy();

    // One re-render comes from the Harness state change itself; the panel's own
    // update must bail out of the app subtree.
    expect(renders).toBe(rendersAfterMount + 1);
  });

  it('should ignore a late update after hide and a hide of an unknown id', () => {
    let registry: ModalPanelRegistry | null | undefined;
    const Grabber = (): null => {
      registry = React.useContext(ModalPanelContext);
      return null;
    };

    const component = render(
      <Provider>
        <Grabber />
      </Provider>,
    );

    expect(registry).toBeTruthy();

    act(() => registry.show('ghost', <Text>ghost</Text>, null));
    expect(component.getByText('ghost')).toBeTruthy();

    act(() => registry.hide('ghost'));
    expect(component.queryByText('ghost')).toBeFalsy();

    act(() => registry.update('ghost', <Text>revived</Text>));
    expect(component.queryByText('revived')).toBeFalsy();

    act(() => registry.hide('never-shown'));
    expect(component.queryByText('ghost')).toBeFalsy();
  });

  describe('nesting', () => {

    const NestedHarness = ({ inline }: { inline?: boolean }): React.ReactElement => {
      const [outerVisible, setOuterVisible] = React.useState(true);
      const [innerVisible, setInnerVisible] = React.useState(false);
      return (
        <Provider>
          <Modal
            visible={outerVisible}
            renderInline={inline}
          >
            <ScrollView testID='outer-content'>
              <Text>outer</Text>
              <Popover
                visible={innerVisible}
                anchor={() => (
                  <Button
                    testID='open-inner'
                    title=''
                    onPress={() => setInnerVisible(true)}
                  />
                )}
                onBackdropPress={() => setInnerVisible(false)}
              >
                <Text>inner</Text>
              </Popover>
            </ScrollView>
          </Modal>
          <Button
            testID='hide-outer'
            title=''
            onPress={() => setOuterVisible(false)}
          />
        </Provider>
      );
    };

    it('should present a popover opened from inside a modal as a descendant of that modal', () => {
      const component = render(<NestedHarness />);

      fireEvent.press(component.getByTestId('open-inner'));

      const modals = component.UNSAFE_getAllByType(RNModal);
      expect(modals).toHaveLength(2);

      const outer = modals.find((modal) => within(modal).queryByText('outer'));
      const inner = modals.find((modal) => within(modal).queryByText('inner') && !within(modal).queryByText('outer'));
      expect(outer).toBeTruthy();
      expect(inner).toBeTruthy();
      expect(isDescendantOf(inner, outer)).toBe(true);
      expect(hasAncestorOfType(inner, ScrollView)).toBe(false);

      fireEvent.press(component.getByTestId('hide-outer'));

      expect(component.queryByText('outer')).toBeFalsy();
      expect(component.queryByText('inner')).toBeFalsy();
      expect(component.UNSAFE_queryAllByType(RNModal)).toHaveLength(0);
    });

    it('should keep a popover opened from inside an inline modal inline as well', () => {
      const component = render(<NestedHarness inline={true} />);

      fireEvent.press(component.getByTestId('open-inner'));

      const modals = component.UNSAFE_getAllByType(RNModal);
      expect(modals).toHaveLength(2);

      const outer = modals.find((modal) => within(modal).queryByText('outer'));
      const inner = modals.find((modal) => within(modal).queryByText('inner') && !within(modal).queryByText('outer'));
      expect(isDescendantOf(inner, outer)).toBe(true);
      expect(hasAncestorOfType(inner, ScrollView)).toBe(true);
    });

    it('should render through a nested ApplicationProvider inside a consumer RN Modal', () => {
      const component = render(
        <Provider>
          <RNModal
            visible={true}
            testID='consumer-modal'
          >
            <Provider>
              <ScrollView>
                <Modal visible={true}>
                  <Text>content</Text>
                </Modal>
              </ScrollView>
            </Provider>
          </RNModal>
        </Provider>,
      );

      const modals = component.UNSAFE_getAllByType(RNModal);
      expect(modals).toHaveLength(2);
      const consumer = modals.find((modal) => modal.props.testID === 'consumer-modal');
      const presented = modals.find((modal) => modal.props.testID !== 'consumer-modal');
      expect(isDescendantOf(presented, consumer)).toBe(true);
      expect(hasAncestorOfType(presented, ScrollView)).toBe(false);
    });

    it('should render at the call site inside a consumer RN Modal with renderInline', () => {
      const component = render(
        <Provider>
          <RNModal
            visible={true}
            testID='consumer-modal'
          >
            <View testID='call-site'>
              <Modal
                visible={true}
                renderInline={true}
              >
                <Text>content</Text>
              </Modal>
            </View>
          </RNModal>
        </Provider>,
      );

      const modals = component.UNSAFE_getAllByType(RNModal);
      const presented = modals.find((modal) => modal.props.testID !== 'consumer-modal');
      const callSite = component.getByTestId('call-site');
      expect(isDescendantOf(presented, callSite)).toBe(true);
    });
  });

  describe('StrictMode', () => {

    const StrictHarness = ({
      initialVisible,
      log,
    }: { initialVisible: boolean; log: string[] }): React.ReactElement => {
      const [visible, setVisible] = React.useState(initialVisible);

      const Sibling = (): React.ReactElement => {
        React.useEffect(() => {
          log.push('mount');
          return () => {
            log.push('cleanup');
          };
        }, []);
        return <Text>sibling</Text>;
      };

      return (
        <Provider>
          <ScrollView>
            <Sibling />
            <Modal visible={visible}>
              <Text>content</Text>
            </Modal>
            <Button
              testID='show'
              title=''
              onPress={() => setVisible(true)}
            />
          </ScrollView>
        </Provider>
      );
    };

    it('should present exactly one item through the panel after a simulated remount', () => {
      const log: string[] = [];
      const component = render(
        <React.StrictMode>
          <StrictHarness
            initialVisible={false}
            log={log}
          />
        </React.StrictMode>,
      );

      // Proves the double-invoke happened: the sibling's cleanup ran during mount.
      expect(log).toEqual(['mount', 'cleanup', 'mount']);

      fireEvent.press(component.getByTestId('show'));

      const modals = component.UNSAFE_getAllByType(RNModal);
      expect(modals).toHaveLength(1);
      expect(component.getAllByText('content')).toHaveLength(1);
      expect(hasAncestorOfType(modals[0], ScrollView)).toBe(false);
    });

    it('should render a modal visible at mount exactly once', () => {
      const log: string[] = [];
      const component = render(
        <React.StrictMode>
          <StrictHarness
            initialVisible={true}
            log={log}
          />
        </React.StrictMode>,
      );

      expect(log).toEqual(['mount', 'cleanup', 'mount']);

      const modals = component.UNSAFE_getAllByType(RNModal);
      expect(modals).toHaveLength(1);
      expect(component.getAllByText('content')).toHaveLength(1);
      expect(hasAncestorOfType(modals[0], ScrollView)).toBe(false);
    });
  });

});

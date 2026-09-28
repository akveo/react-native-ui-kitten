import React from 'react';
import { DeviceEventEmitter, Text, View } from 'react-native';
import {
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react-native';
import { light, mapping } from '@ui-kitten/eva';
import { ApplicationProvider } from '../../theme';
import { Popover } from './popover.component';
import { PopoverView } from './popoverView.component';

type MeasureCallback = (x: number, y: number, width: number, height: number) => void;

declare global {
  // eslint-disable-next-line no-var
  var measureCalls: MeasureCallback[];
}

/*
 * The placement bounds shrink by the software keyboard and a non-blocking popover follows an
 * anchor that moves while it is open (#1919). The jest window is 750 x 1334.
 */
jest.mock('react-native', () => {
  const ActualReactNative = jest.requireActual('react-native');

  ActualReactNative.UIManager.measureInWindow = (node, callback) => {
    global.measureCalls.push(callback);
  };
  Object.defineProperty(ActualReactNative, 'findNodeHandle', { value: () => 1 });

  return ActualReactNative;
});

describe('@popover: keyboard and anchor tracking', () => {

  beforeEach(() => {
    global.measureCalls = [];
  });

  afterEach(() => {
    DeviceEventEmitter.emit('keyboardDidHide', {});
  });

  const TestPopover = (props: { visible: boolean; blocking?: boolean }): React.ReactElement => (
    <ApplicationProvider mapping={mapping} theme={light}>
      <Popover
        visible={props.visible}
        blocking={props.blocking}
        anchor={() => <View testID='anchor' />}
      >
        <Text>content</Text>
      </Popover>
    </ApplicationProvider>
  );

  const contentPosition = (component: ReturnType<typeof render>): { left: number; top: number } => {
    const view = component.UNSAFE_getByType(PopoverView);
    const style = Object.assign({}, ...[view.props.contentContainerStyle].flat(Infinity).filter(Boolean));
    return { left: style.left, top: style.top };
  };

  // Opens the popover with a 200 x 40 anchor at (10, 900) and a 100 x 300 content.
  const open = async (blocking?: boolean): Promise<ReturnType<typeof render>> => {
    const component = render(<TestPopover visible={false} blocking={blocking} />);
    component.rerender(<TestPopover visible={true} blocking={blocking} />);
    await waitFor(() => expect(component.getByText('content')).toBeTruthy());

    // Every queued call so far measures the anchor (the forced one, plus one per frame while a
    // non-blocking popover tracks it); the content's own call is queued by its layout event.
    global.measureCalls.shift()(10, 900, 200, 40);
    fireEvent(component.UNSAFE_getByType(PopoverView), 'layout', {
      nativeEvent: { layout: { x: 0, y: 0, width: 100, height: 300 } },
    });
    global.measureCalls.pop()(-999, -999, 100, 300);
    // Below the anchor, centered: (10 + (200 - 100) / 2, 900 + 40).
    await waitFor(() => expect(contentPosition(component)).toEqual({ left: 60, top: 940 }));
    return component;
  };

  it('should flip above the anchor when the keyboard covers the space below', async () => {
    const component = await open();

    // 940 + 300 no longer fits above the keyboard (1334 - 300 = 1034): the content flips on top.
    DeviceEventEmitter.emit('keyboardDidShow', { endCoordinates: { height: 300, screenY: 1034, screenX: 0, width: 750 } });
    await waitFor(() => expect(contentPosition(component)).toEqual({ left: 60, top: 600 }));

    DeviceEventEmitter.emit('keyboardDidHide', {});
    await waitFor(() => expect(contentPosition(component)).toEqual({ left: 60, top: 940 }));
  });

  it('should keep the content above the keyboard when the anchor is covered by it', async () => {
    const component = await open();

    // The anchor moves under a 300 point keyboard (window bottom is 1334): no placement fits, so
    // the preferred one is clamped to the bounds, right above the keyboard.
    DeviceEventEmitter.emit('keyboardDidShow', { endCoordinates: { height: 300, screenY: 1034, screenX: 0, width: 750 } });
    fireEvent(component.getByTestId('anchor'), 'layout', {
      nativeEvent: { layout: { x: 10, y: 1200, width: 200, height: 40 } },
    });
    global.measureCalls.pop()(10, 1200, 200, 40);
    await waitFor(() => expect(contentPosition(component)).toEqual({ left: 60, top: 734 }));
  });

  it('should measure the anchor again when the keyboard changes', async () => {
    await open();
    global.measureCalls.length = 0;

    DeviceEventEmitter.emit('keyboardDidShow', { endCoordinates: { height: 300, screenY: 1034, screenX: 0, width: 750 } });

    expect(global.measureCalls.length).toBeGreaterThan(0);
  });

  it('should not track the anchor of a blocking popover', async () => {
    await open(true);
    global.measureCalls.length = 0;

    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(global.measureCalls.length).toEqual(0);
  });

  it('should follow the anchor of a non-blocking popover between frames', async () => {
    const component = await open(false);

    // The next frame's measurement reports the anchor 300 points higher (its list scrolled).
    await waitFor(() => expect(global.measureCalls.length).toBeGreaterThan(0));
    global.measureCalls.pop()(10, 700, 200, 40);
    await waitFor(() => expect(contentPosition(component)).toEqual({ left: 60, top: 740 }));

    // The anchor leaves the window: the content goes off screen instead of sticking to the edge.
    await waitFor(() => expect(global.measureCalls.length).toBeGreaterThan(0));
    global.measureCalls.pop()(10, -100, 200, 40);
    await waitFor(() => expect(contentPosition(component)).toEqual({ left: -999, top: -999 }));

    // And comes back.
    await waitFor(() => expect(global.measureCalls.length).toBeGreaterThan(0));
    global.measureCalls.pop()(10, 500, 200, 40);
    await waitFor(() => expect(contentPosition(component)).toEqual({ left: 60, top: 540 }));

    component.rerender(<TestPopover visible={false} blocking={false} />);
    global.measureCalls.length = 0;
    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(global.measureCalls.length).toEqual(0);
  });
});

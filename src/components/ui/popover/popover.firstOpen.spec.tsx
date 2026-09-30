import React from 'react';
import { Modal as RNModal, Text, View } from 'react-native';
import {
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react-native';
import { light, mapping } from '@ui-kitten/eva';
import { ApplicationProvider } from '../../theme';
import { MeasureElement } from '../../devsupport';
import { Popover } from './popover.component';
import { PopoverView } from './popoverView.component';

type MeasureCallback = (x: number, y: number, width: number, height: number) => void;

declare global {
  // eslint-disable-next-line no-var
  var measureCalls: MeasureCallback[];
}

/*
 * Every `measureInWindow` call is queued so that a test decides in which order the anchor and
 * the content are measured (#1910).
 */
jest.mock('react-native', () => {
  const ActualReactNative = jest.requireActual('react-native');

  ActualReactNative.UIManager.measureInWindow = (node, callback) => {
    global.measureCalls.push(callback);
  };
  // The test renderer has no native tags; any truthy handle lets `MeasureElement` reach the mock.
  // (`react-native` exposes its exports through getters, hence `defineProperty`.)
  Object.defineProperty(ActualReactNative, 'findNodeHandle', { value: () => 1 });

  return ActualReactNative;
});

describe('@popover: first open', () => {

  beforeEach(() => {
    global.measureCalls = [];
  });

  const mounts: string[] = [];

  // The anchor is a host view (so that `MeasureElement` can attach its ref) with a child that
  // records its mounts.
  const MountProbe = (): null => {
    React.useEffect(() => {
      mounts.push('anchor');
    }, []);
    return null;
  };

  const TestPopover = (props: { visible: boolean }): React.ReactElement => (
    <ApplicationProvider mapping={mapping} theme={light}>
      <Popover
        visible={props.visible}
        anchor={() => (
          <View testID='anchor'>
            <MountProbe />
          </View>
        )}
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

  it('should measure the anchor before the popover has ever been visible', () => {
    const component = render(<TestPopover visible={false} />);

    expect(component.UNSAFE_queryAllByType(MeasureElement).length).toEqual(1);
    expect(component.UNSAFE_queryAllByType(RNModal).length).toEqual(0);
  });

  it('should not remount the anchor on the first open', async () => {
    mounts.length = 0;
    const component = render(<TestPopover visible={false} />);
    expect(mounts).toEqual(['anchor']);

    component.rerender(<TestPopover visible={true} />);
    await waitFor(() => expect(component.getByText('content')).toBeTruthy());

    expect(mounts).toEqual(['anchor']);
    expect(component.getByTestId('anchor')).toBeTruthy();
  });

  it('should keep the content off screen until the anchor is measured, then place it', async () => {
    const component = render(<TestPopover visible={false} />);
    component.rerender(<TestPopover visible={true} />);
    await waitFor(() => expect(component.getByText('content')).toBeTruthy());

    // The forced anchor measurement is queued first; the content is measured from its layout.
    const anchorMeasure = global.measureCalls.shift();
    expect(anchorMeasure).toBeDefined();

    fireEvent(component.UNSAFE_getByType(PopoverView), 'layout', {
      nativeEvent: { layout: { x: 0, y: 0, width: 100, height: 50 } },
    });
    const contentMeasure = global.measureCalls.shift();
    expect(contentMeasure).toBeDefined();

    // Content measured while the anchor frame is still unknown: nothing to place it against.
    contentMeasure(-999, -999, 100, 50);
    await waitFor(() => expect(contentPosition(component)).toEqual({ left: -999, top: -999 }));

    // The anchor frame arrives afterwards: the content is placed below it, centered.
    anchorMeasure(10, 300, 200, 40);
    await waitFor(() => expect(contentPosition(component)).toEqual({ left: 60, top: 340 }));
  });

  it('should follow the anchor when its frame changes while open', async () => {
    const component = render(<TestPopover visible={false} />);
    component.rerender(<TestPopover visible={true} />);
    await waitFor(() => expect(component.getByText('content')).toBeTruthy());

    const anchorMeasure = global.measureCalls.shift();
    anchorMeasure(10, 300, 200, 40);
    fireEvent(component.UNSAFE_getByType(PopoverView), 'layout', {
      nativeEvent: { layout: { x: 0, y: 0, width: 100, height: 50 } },
    });
    global.measureCalls.shift()(-999, -999, 100, 50);
    await waitFor(() => expect(contentPosition(component)).toEqual({ left: 60, top: 340 }));

    // The anchor is laid out again lower on the screen (its list scrolled, the keyboard closed).
    fireEvent(component.getByTestId('anchor'), 'layout', {
      nativeEvent: { layout: { x: 10, y: 400, width: 200, height: 40 } },
    });
    global.measureCalls.shift()(10, 400, 200, 40);
    await waitFor(() => expect(contentPosition(component)).toEqual({ left: 60, top: 440 }));
  });
});

import React from 'react';
import {
  NativeModules,
  Platform,
  StatusBar,
  UIManager,
  View,
} from 'react-native';
import {
  render,
  waitFor,
} from '@testing-library/react-native';
import {
  MeasureElement,
  MeasureElementProps,
} from './measure.component';
import {
  Frame,
  Point,
  Size,
} from './type';

/*
 * The test renderer has no native nodes, so give MeasureElement a node handle
 * to measure through the (mocked) UIManager.
 */
jest.mock('react-native/Libraries/ReactNative/RendererProxy', () => ({
  ...jest.requireActual('react-native/Libraries/ReactNative/RendererProxy'),
  findNodeHandle: () => 1,
}));

describe('@measure: frame class instance checks', () => {

  const lhsFrame: Frame = new Frame(2, 2, 2, 2);
  const rhsFrame: Frame = new Frame(4, 4, 2, 2);

  it('left of', () => {
    const { origin: { x, y } } = rhsFrame.leftOf(lhsFrame);

    expect(x).toEqual(0);
    expect(y).toEqual(4);
  });

  it('top of', () => {
    const { origin: { x, y } } = rhsFrame.topOf(lhsFrame);

    expect(x).toEqual(4);
    expect(y).toEqual(0);
  });

  it('right of', () => {
    const { origin: { x, y } } = rhsFrame.rightOf(lhsFrame);

    expect(x).toEqual(4);
    expect(y).toEqual(4);
  });

  it('bottom of', () => {
    const { origin: { x, y } } = rhsFrame.bottomOf(lhsFrame);

    expect(x).toEqual(4);
    expect(y).toEqual(4);
  });

  it('center horizontal of', () => {
    const { origin: { x, y } } = rhsFrame.centerHorizontalOf(lhsFrame);

    expect(x).toEqual(2);
    expect(y).toEqual(4);
  });

  it('center vertical of', () => {
    const { origin: { x, y } } = rhsFrame.centerVerticalOf(lhsFrame);

    expect(x).toEqual(4);
    expect(y).toEqual(2);
  });

  it('center of', () => {
    const { origin: { x, y } } = rhsFrame.centerOf(lhsFrame);

    expect(x).toEqual(2);
    expect(y).toEqual(2);
  });

  it('point equals', () => {
    expect(Point.zero().equals(new Point(0, 0))).toBeTruthy();
    expect(Point.zero().equals(new Point(0, 1))).toBeFalsy();
    expect(Point.zero().equals(null)).toBeFalsy();
  });

  it('size equals', () => {
    expect(Size.zero().equals(new Size(0, 0))).toBeTruthy();
    expect(Size.zero().equals(new Size(0, 1))).toBeFalsy();
    expect(Size.zero().equals(null)).toBeFalsy();
  });

  it('frame equals', () => {
    expect(Frame.zero().equals(new Frame(0, 0, 0, 0))).toBeTruthy();
    expect(Frame.zero().equals(new Frame(0, 0, 0, 1))).toBeFalsy();
    expect(Frame.zero().equals(null)).toBeFalsy();
  });

  it('point is near', () => {
    expect(new Point(89, 289).isNear(new Point(90, 289))).toBeTruthy();
    expect(new Point(89, 289).isNear(new Point(90, 290))).toBeTruthy();
    expect(new Point(89, 289).isNear(new Point(91, 289))).toBeFalsy();
    expect(new Point(89, 289).isNear(new Point(89, 291))).toBeFalsy();
    expect(new Point(89, 289).isNear(new Point(92, 289), 3)).toBeTruthy();
    expect(Point.outscreen().isNear(new Point(0, 0))).toBeFalsy();
    expect(Point.zero().isNear(null)).toBeFalsy();
  });

});

describe('@measure: element position checks', () => {

  const DeviceInfo = { getConstants: () => ({ isEdgeToEdge: true }) };

  type MeasureInWindowCallback = (x: number, y: number, width: number, height: number) => void;

  const measureInWindowOriginal = UIManager.measureInWindow;
  const statusBarHeightOriginal = StatusBar.currentHeight;
  const deviceInfoOriginal = NativeModules.DeviceInfo;

  const mockDeviceInfo = (module: typeof DeviceInfo | null): void => {
    NativeModules.DeviceInfo = module;
  };

  const mockMeasureInWindow = (x: number, y: number, width: number, height: number): void => {
    UIManager.measureInWindow = (_node: number, callback: MeasureInWindowCallback): void => {
      callback(x, y, width, height);
    };
  };

  const renderAndMeasure = async (props: Partial<MeasureElementProps> = {}): Promise<Frame> => {
    const onMeasure = jest.fn();
    render(
      <MeasureElement
        force={true}
        onMeasure={onMeasure}
        {...props}
      >
        <View />
      </MeasureElement>,
    );
    await waitFor(() => expect(onMeasure).toHaveBeenCalled());
    return onMeasure.mock.calls[onMeasure.mock.calls.length - 1][0];
  };

  const mockReactNativeVersion = (version: { major: number; minor: number } | undefined): void => {
    jest.spyOn(Platform, 'constants', 'get').mockReturnValue({
      ...Platform.constants,
      reactNativeVersion: version,
    } as typeof Platform.constants);
  };

  afterEach(() => {
    UIManager.measureInWindow = measureInWindowOriginal;
    StatusBar.currentHeight = statusBarHeightOriginal;
    NativeModules.DeviceInfo = deviceInfoOriginal;
    jest.restoreAllMocks();
  });

  it('should report window coordinates as is', async () => {
    mockMeasureInWindow(16, 413, 379, 46);

    const frame = await renderAndMeasure();

    expect(frame.origin.x).toEqual(16);
    expect(frame.origin.y).toEqual(413);
    expect(frame.size.width).toEqual(379);
    expect(frame.size.height).toEqual(46);
  });

  it('should round the measured frame to whole points', async () => {
    mockMeasureInWindow(89.9047622680664, 289.1428527832031, 231.61904907226562, 259.4285583496094);

    const frame = await renderAndMeasure();

    expect(frame.origin.x).toEqual(90);
    expect(frame.origin.y).toEqual(289);
    expect(frame.size.width).toEqual(232);
    expect(frame.size.height).toEqual(259);
  });

  it('should add status bar height on edge-to-edge android before react native 0.86', async () => {
    jest.replaceProperty(Platform, 'OS', 'android');
    mockDeviceInfo(DeviceInfo);
    mockReactNativeVersion({ major: 0, minor: 81 });
    StatusBar.currentHeight = 52;
    mockMeasureInWindow(16, 413, 379, 46);

    const frame = await renderAndMeasure();

    expect(frame.origin.x).toEqual(16);
    expect(frame.origin.y).toEqual(465);
  });

  it('should add status bar height on edge-to-edge android when the version is unknown', async () => {
    jest.replaceProperty(Platform, 'OS', 'android');
    mockDeviceInfo(DeviceInfo);
    mockReactNativeVersion(undefined);
    StatusBar.currentHeight = 52;
    mockMeasureInWindow(16, 413, 379, 46);

    const frame = await renderAndMeasure();

    expect(frame.origin.y).toEqual(465);
  });

  it('should not add status bar height on edge-to-edge android since react native 0.86', async () => {
    jest.replaceProperty(Platform, 'OS', 'android');
    mockDeviceInfo(DeviceInfo);
    mockReactNativeVersion({ major: 0, minor: 86 });
    StatusBar.currentHeight = 52;
    mockMeasureInWindow(16, 413, 379, 46);

    const frame = await renderAndMeasure();

    expect(frame.origin.y).toEqual(413);
  });

  it('should still add status bar height with shouldUseTopInsets since react native 0.86', async () => {
    jest.replaceProperty(Platform, 'OS', 'android');
    mockDeviceInfo(null);
    mockReactNativeVersion({ major: 0, minor: 86 });
    StatusBar.currentHeight = 52;
    mockMeasureInWindow(16, 413, 379, 46);

    const frame = await renderAndMeasure({ shouldUseTopInsets: true });

    expect(frame.origin.y).toEqual(465);
  });

  it('should not add status bar height on android without edge-to-edge', async () => {
    jest.replaceProperty(Platform, 'OS', 'android');
    mockDeviceInfo(null);
    StatusBar.currentHeight = 52;
    mockMeasureInWindow(16, 413, 379, 46);

    const frame = await renderAndMeasure();

    expect(frame.origin.y).toEqual(413);
  });

  it('should ignore a missing status bar height with shouldUseTopInsets', async () => {
    StatusBar.currentHeight = undefined;
    mockMeasureInWindow(16, 413, 379, 46);

    const frame = await renderAndMeasure({ shouldUseTopInsets: true });

    expect(frame.origin.y).toEqual(413);
  });

});

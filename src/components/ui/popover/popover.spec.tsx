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
import { Frame } from '../../devsupport';
import {
  Popover,
  PopoverProps,
} from './popover.component';
import {
  PlacementOptions,
  PopoverPlacement,
  PopoverPlacements,
} from './type';

/*
 * Mock UIManager since Popover relies on native measurements
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
   * [0] for popover anchor
   * [1] for modal backdrop
   */
  const touchables = {
    findToggleButton: (api: RenderAPI) => api.queryByTestId('@popover/toggle-button'),
    findBackdropTouchable: (api: RenderAPI) => api.queryAllByType(TouchableOpacity)[1],
  };

  const TestPopover = React.forwardRef((props: Partial<PopoverProps>, ref: React.Ref<Popover>) => {
    const [visible, setVisible] = React.useState(props.visible);

    const togglePopover = () => {
      setVisible(!visible);
    };

    const AnchorButton = () => (
      <Button testID='@popover/toggle-button' title='' onPress={togglePopover}/>
    );

    return (
      <ApplicationProvider mapping={mapping} theme={light}>
        <Popover
          ref={ref}
          visible={visible}
          anchor={AnchorButton}
          {...props}>
          <Text>I love Babel</Text>
        </Popover>
      </ApplicationProvider>
    );
  });

  it('should render element passed to `anchor` prop', () => {
    const component = render(
      <TestPopover/>,
    );

    expect(touchables.findToggleButton(component)).toBeTruthy();
  });

  it('should not render content when not visible', () => {
    const component = render(
      <TestPopover visible={false}/>,
    );

    expect(component.queryByText('I love Babel')).toBeFalsy();
  });

  it('should render content when becomes visible', async () => {
    const component = render(
      <TestPopover/>,
    );


    fireEvent.press(component.queryByTestId('@popover/toggle-button'));
    const text = await waitForElement(() => component.queryByText('I love Babel'));

    expect(text).toBeTruthy();
  });

  it('should call onBackdropPress', async () => {
    const onBackdropPress = jest.fn();
    const component = render(
      <TestPopover onBackdropPress={onBackdropPress}/>,
    );

    fireEvent.press(touchables.findToggleButton(component));
    await waitForElement(() => {
      fireEvent.press(touchables.findBackdropTouchable(component));
    });

    expect(onBackdropPress).toBeCalled();
  });

  it('should style backdrop with backdropStyle prop', async () => {
    const component = render(
      <TestPopover backdropStyle={{ backgroundColor: 'red' }}/>,
    );

    fireEvent.press(touchables.findToggleButton(component));
    const backdrop = await waitForElement(() => touchables.findBackdropTouchable(component));

    expect(StyleSheet.flatten(backdrop.props.style).backgroundColor).toEqual('red');
  });

  it('should be able to show with ref', async () => {
    const componentRef = React.createRef<Popover>();
    const component = render(
      <TestPopover ref={componentRef}/>,
    );

    componentRef.current.show();
    const text = await waitForElement(() => component.queryByText('I love Babel'));

    expect(text).toBeTruthy();
  });

  it('should be able to hide with ref', async () => {
    const componentRef = React.createRef<Popover>();
    const component = render(
      <TestPopover ref={componentRef}/>,
    );

    componentRef.current.show();
    await waitForElement(() => null);

    componentRef.current.hide();
    const text = await waitForElement(() => component.queryByText('I love Babel'));

    expect(text).toBeFalsy();
  });
});

describe('@popover: service checks', () => {


  const options: PlacementOptions = {
    source: new Frame(6, 6, 2, 2),
    other: new Frame(2, 2, 4, 4),
    offsets: Frame.zero(),
    bounds: Frame.zero(),
  };

  it('* left', () => {
    const { origin: { x, y } } = PopoverPlacements.LEFT.frame(options);

    expect(x).toEqual(0);
    expect(y).toEqual(3);
  });

  it('* left start', () => {
    const { origin: { x, y } } = PopoverPlacements.LEFT_START.frame(options);

    expect(x).toEqual(0);
    expect(y).toEqual(2);
  });

  it('* left end', () => {
    const { origin: { x, y } } = PopoverPlacements.LEFT_END.frame(options);

    expect(x).toEqual(0);
    expect(y).toEqual(4);
  });

  it('* top', () => {
    const { origin: { x, y } } = PopoverPlacements.TOP.frame(options);

    expect(x).toEqual(3);
    expect(y).toEqual(0);
  });

  it('* top start', () => {
    const { origin: { x, y } } = PopoverPlacements.TOP_START.frame(options);

    expect(x).toEqual(2);
    expect(y).toEqual(0);
  });

  it('* top end', () => {
    const { origin: { x, y } } = PopoverPlacements.TOP_END.frame(options);

    expect(x).toEqual(4);
    expect(y).toEqual(0);
  });

  it('* right', () => {
    const { origin: { x, y } } = PopoverPlacements.RIGHT.frame(options);

    expect(x).toEqual(6);
    expect(y).toEqual(3);
  });

  it('* right start', () => {
    const { origin: { x, y } } = PopoverPlacements.RIGHT_START.frame(options);

    expect(x).toEqual(6);
    expect(y).toEqual(2);
  });

  it('* right end', () => {
    const { origin: { x, y } } = PopoverPlacements.RIGHT_END.frame(options);

    expect(x).toEqual(6);
    expect(y).toEqual(4);
  });

  it('* bottom', () => {
    const { origin: { x, y } } = PopoverPlacements.BOTTOM.frame(options);

    expect(x).toEqual(3);
    expect(y).toEqual(6);
  });

  it('* bottom start', () => {
    const { origin: { x, y } } = PopoverPlacements.BOTTOM_START.frame(options);

    expect(x).toEqual(2);
    expect(y).toEqual(6);
  });

  it('* bottom end', () => {
    const { origin: { x, y } } = PopoverPlacements.BOTTOM_END.frame(options);

    expect(x).toEqual(4);
    expect(y).toEqual(6);
  });

});

describe('* placement - offset', () => {

  const options: PlacementOptions = {
    source: new Frame(6, 6, 2, 2),
    other: new Frame(2, 2, 4, 4),
    bounds: Frame.zero(),
    offsets: new Frame(2, 2, 2, 2),
  };

  it('* left', () => {
    const { origin: { x, y } } = PopoverPlacements.LEFT.frame(options);

    expect(x).toEqual(2);
    expect(y).toEqual(3);
  });

  it('* left start', () => {
    const { origin: { x, y } } = PopoverPlacements.LEFT_START.frame(options);

    expect(x).toEqual(2);
    expect(y).toEqual(4);
  });

  it('* left end', () => {
    const { origin: { x, y } } = PopoverPlacements.LEFT_END.frame(options);

    expect(x).toEqual(2);
    expect(y).toEqual(2);
  });

  it('* top', () => {
    const { origin: { x, y } } = PopoverPlacements.TOP.frame(options);

    expect(x).toEqual(3);
    expect(y).toEqual(2);
  });

  it('* top start', () => {
    const { origin: { x, y } } = PopoverPlacements.TOP_START.frame(options);

    expect(x).toEqual(4);
    expect(y).toEqual(2);
  });

  it('* top end', () => {
    const { origin: { x, y } } = PopoverPlacements.TOP_END.frame(options);

    expect(x).toEqual(2);
    expect(y).toEqual(2);
  });

  it('* right', () => {
    const { origin: { x, y } } = PopoverPlacements.RIGHT.frame(options);

    expect(x).toEqual(4);
    expect(y).toEqual(3);
  });

  it('* right start', () => {
    const { origin: { x, y } } = PopoverPlacements.RIGHT_START.frame(options);

    expect(x).toEqual(4);
    expect(y).toEqual(4);
  });

  it('* right end', () => {
    const { origin: { x, y } } = PopoverPlacements.RIGHT_END.frame(options);

    expect(x).toEqual(4);
    expect(y).toEqual(2);
  });

  it('* bottom', () => {
    const { origin: { x, y } } = PopoverPlacements.BOTTOM.frame(options);

    expect(x).toEqual(3);
    expect(y).toEqual(4);
  });

  it('* bottom start', () => {
    const { origin: { x, y } } = PopoverPlacements.BOTTOM_START.frame(options);

    expect(x).toEqual(4);
    expect(y).toEqual(4);
  });

  it('* bottom end', () => {
    const { origin: { x, y } } = PopoverPlacements.BOTTOM_END.frame(options);

    expect(x).toEqual(2);
    expect(y).toEqual(4);
  });

});

describe('* placement - reverse', () => {

  const options: PlacementOptions = {
    source: new Frame(6, 6, 2, 2),
    other: new Frame(2, 2, 4, 4),
    bounds: Frame.zero(),
    offsets: Frame.zero(),
  };

  it('* left', () => {
    const { origin: { x, y } } = PopoverPlacements.LEFT.reverse().frame(options);

    expect(x).toEqual(6);
    expect(y).toEqual(3);
  });

  it('* left start', () => {
    const { origin: { x, y } } = PopoverPlacements.LEFT_START.reverse().frame(options);

    expect(x).toEqual(6);
    expect(y).toEqual(2);
  });

  it('* left end', () => {
    const { origin: { x, y } } = PopoverPlacements.LEFT_END.reverse().frame(options);

    expect(x).toEqual(6);
    expect(y).toEqual(4);
  });

  it('* top', () => {
    const { origin: { x, y } } = PopoverPlacements.TOP.reverse().frame(options);

    expect(x).toEqual(3);
    expect(y).toEqual(6);
  });

  it('* top start', () => {
    const { origin: { x, y } } = PopoverPlacements.TOP_START.reverse().frame(options);

    expect(x).toEqual(2);
    expect(y).toEqual(6);
  });

  it('* top end', () => {
    const { origin: { x, y } } = PopoverPlacements.TOP_END.reverse().frame(options);

    expect(x).toEqual(4);
    expect(y).toEqual(6);
  });

  it('* right', () => {
    const { origin: { x, y } } = PopoverPlacements.RIGHT.reverse().frame(options);

    expect(x).toEqual(0);
    expect(y).toEqual(3);
  });

  it('* right start', () => {
    const { origin: { x, y } } = PopoverPlacements.RIGHT_START.reverse().frame(options);

    expect(x).toEqual(0);
    expect(y).toEqual(2);
  });

  it('* right end', () => {
    const { origin: { x, y } } = PopoverPlacements.RIGHT_END.reverse().frame(options);

    expect(x).toEqual(0);
    expect(y).toEqual(4);
  });

  it('* bottom', () => {
    const { origin: { x, y } } = PopoverPlacements.BOTTOM.reverse().frame(options);

    expect(x).toEqual(3);
    expect(y).toEqual(0);
  });

  it('* bottom start', () => {
    const { origin: { x, y } } = PopoverPlacements.BOTTOM_START.reverse().frame(options);

    expect(x).toEqual(2);
    expect(y).toEqual(0);
  });

  it('* bottom end', () => {
    const { origin: { x, y } } = PopoverPlacements.BOTTOM_END.reverse().frame(options);

    expect(x).toEqual(4);
    expect(y).toEqual(0);
  });

});

describe('* raw constructor', () => {

  it('* left', () => {
    const placement: PopoverPlacement = PopoverPlacements.parse('left');

    expect(placement.rawValue).toEqual(PopoverPlacements.LEFT.rawValue);
  });

  it('* left start', () => {
    const placement: PopoverPlacement = PopoverPlacements.parse('left start');

    expect(placement.rawValue).toEqual(PopoverPlacements.LEFT_START.rawValue);
  });

  it('* left end', () => {
    const placement: PopoverPlacement = PopoverPlacements.parse('left end');

    expect(placement.rawValue).toEqual(PopoverPlacements.LEFT_END.rawValue);
  });

  it('* top', () => {
    const placement: PopoverPlacement = PopoverPlacements.parse('top');

    expect(placement.rawValue).toEqual(PopoverPlacements.TOP.rawValue);
  });

  it('* top start', () => {
    const placement: PopoverPlacement = PopoverPlacements.parse('top start');

    expect(placement.rawValue).toEqual(PopoverPlacements.TOP_START.rawValue);
  });

  it('* top end', () => {
    const placement: PopoverPlacement = PopoverPlacements.parse('top end');

    expect(placement.rawValue).toEqual(PopoverPlacements.TOP_END.rawValue);
  });

  it('* right', () => {
    const placement: PopoverPlacement = PopoverPlacements.parse('right');

    expect(placement.rawValue).toEqual(PopoverPlacements.RIGHT.rawValue);
  });

  it('* right start', () => {
    const placement: PopoverPlacement = PopoverPlacements.parse('right start');

    expect(placement.rawValue).toEqual(PopoverPlacements.RIGHT_START.rawValue);
  });

  it('* right end', () => {
    const placement: PopoverPlacement = PopoverPlacements.parse('right end');

    expect(placement.rawValue).toEqual(PopoverPlacements.RIGHT_END.rawValue);
  });

  it('* bottom', () => {
    const placement: PopoverPlacement = PopoverPlacements.parse('bottom');

    expect(placement.rawValue).toEqual(PopoverPlacements.BOTTOM.rawValue);
  });

  it('* bottom start', () => {
    const placement: PopoverPlacement = PopoverPlacements.parse('bottom start');

    expect(placement.rawValue).toEqual(PopoverPlacements.BOTTOM_START.rawValue);
  });

  it('* bottom end', () => {
    const placement: PopoverPlacement = PopoverPlacements.parse('bottom end');

    expect(placement.rawValue).toEqual(PopoverPlacements.BOTTOM_END.rawValue);
  });

  it('* fallback', () => {
    const placement: PopoverPlacement = PopoverPlacements.parse('undefined', PopoverPlacements.BOTTOM);

    expect(placement.rawValue).toEqual(PopoverPlacements.BOTTOM.rawValue);
  });

});

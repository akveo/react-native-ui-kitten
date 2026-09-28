import React from 'react';
import { Text, View } from 'react-native';
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
 * The indicator keeps pointing at the anchor when the content had to move to stay on screen
 * (#1920). The jest window is 750 x 1334.
 */
jest.mock('react-native', () => {
  const ActualReactNative = jest.requireActual('react-native');

  ActualReactNative.UIManager.measureInWindow = (node, callback) => {
    global.measureCalls.push(callback);
  };
  Object.defineProperty(ActualReactNative, 'findNodeHandle', { value: () => 1 });

  return ActualReactNative;
});

describe('@popover: indicator offset', () => {

  beforeEach(() => {
    global.measureCalls = [];
  });

  const TestPopover = (props: { visible: boolean; placement?: string }): React.ReactElement => (
    <ApplicationProvider mapping={mapping} theme={light}>
      <Popover
        visible={props.visible}
        placement={props.placement}
        anchor={() => <View testID='anchor' />}
      >
        <Text>content</Text>
      </Popover>
    </ApplicationProvider>
  );

  const popoverView = (component: ReturnType<typeof render>) => component.UNSAFE_getByType(PopoverView);

  const contentPosition = (component: ReturnType<typeof render>): { left: number; top: number } => {
    const style = Object.assign({}, ...[popoverView(component).props.contentContainerStyle].flat(Infinity).filter(Boolean));
    return { left: style.left, top: style.top };
  };

  const open = async (
    anchor: [number, number, number, number],
    content: [number, number],
    placement?: string,
  ): Promise<ReturnType<typeof render>> => {
    const component = render(<TestPopover visible={false} placement={placement} />);
    component.rerender(<TestPopover visible={true} placement={placement} />);
    await waitFor(() => expect(component.getByText('content')).toBeTruthy());

    global.measureCalls.shift()(...anchor);
    fireEvent(popoverView(component), 'layout', {
      nativeEvent: { layout: { x: 0, y: 0, width: content[0], height: content[1] } },
    });
    global.measureCalls.pop()(-999, -999, ...content);
    await waitFor(() => expect(contentPosition(component).top).not.toEqual(-999));
    return component;
  };

  it('should keep the indicator centred when the content is centred on the anchor', async () => {
    const component = await open([300, 300, 100, 40], [200, 50]);

    expect(contentPosition(component)).toEqual({ left: 250, top: 340 });
    expect(popoverView(component).props.indicatorOffset).toEqual(0);
  });

  it('should move the indicator to the anchor when the content is pushed back on screen', async () => {
    // Anchor near the right edge: a centred 400 wide content would end at 880, so the placement
    // falls back to `bottom end` (content right edge on the anchor's right edge, 710) and the
    // content centre sits 170 points left of the anchor centre.
    const component = await open([650, 300, 60, 40], [400, 50]);

    expect(contentPosition(component)).toEqual({ left: 310, top: 340 });
    expect(popoverView(component).props.indicatorOffset).toEqual(170);
  });

  it('should keep the indicator inside the content', async () => {
    // A narrow content next to an anchor at the very edge: the anchor centre is beyond the content
    // edge, so the indicator stops at the edge margin instead.
    const component = await open([730, 300, 20, 40], [60, 50]);

    expect(contentPosition(component).left).toEqual(690);
    expect(popoverView(component).props.indicatorOffset).toEqual(16);
  });

  it('should measure the offset vertically for a side placement', async () => {
    // Right placement, anchor near the bottom: `right end` keeps the content inside the window,
    // its centre 140 points above the anchor centre; the indicator stops at the edge margin (136).
    const component = await open([100, 1300, 60, 20], [100, 300], 'right');

    expect(contentPosition(component)).toEqual({ left: 160, top: 1020 });
    expect(popoverView(component).props.indicatorOffset).toEqual(136);
  });
});

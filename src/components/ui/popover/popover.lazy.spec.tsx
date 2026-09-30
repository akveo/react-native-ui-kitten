import React from 'react';
import { Modal as RNModal, Text, View } from 'react-native';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { light, mapping } from '@ui-kitten/eva';
import { ApplicationProvider } from '../../theme';
import { MeasureElement } from '../../devsupport';
import { Popover } from './popover.component';
import { Modal } from '../modal/modal.component';

declare global {
  // eslint-disable-next-line no-var
  var anchorMeasureCount: number;
}

// Count `measureInWindow` calls; the test renderer has no native tags, so any truthy handle lets
// `MeasureElement` reach the mock (`react-native` exposes its exports through getters).
jest.mock('react-native', () => {
  const ActualReactNative = jest.requireActual('react-native');
  ActualReactNative.UIManager.measureInWindow = (): void => {
    global.anchorMeasureCount += 1;
  };
  Object.defineProperty(ActualReactNative, 'findNodeHandle', { value: () => 1 });
  return ActualReactNative;
});

/*
 * A popover that has never been visible renders its anchor inside an idle measurement wrapper:
 * the tree already has its final shape (the anchor is not remounted on the first open) but nothing
 * is measured. Once shown it measures the anchor, mounts the modal machinery and keeps it mounted
 * after hiding, so re-opening stays cheap.
 */
describe('@popover: lazy overlay', () => {

  const TestPopover = (props: { visible: boolean }): React.ReactElement => (
    <ApplicationProvider mapping={mapping} theme={light}>
      <Popover
        visible={props.visible}
        anchor={() => <View testID='anchor' />}
      >
        <Text>content</Text>
      </Popover>
    </ApplicationProvider>
  );

  it('should render only the measured anchor while it has never been visible', () => {
    const component = render(<TestPopover visible={false} />);

    expect(component.getByTestId('anchor')).toBeTruthy();
    expect(component.UNSAFE_queryAllByType(MeasureElement).length).toEqual(1);
    expect(component.UNSAFE_queryAllByType(RNModal).length).toEqual(0);
    expect(component.queryByText('content')).toBeNull();
  });

  it('should mount measurement and modal once visible', async () => {
    const component = render(<TestPopover visible={false} />);
    component.rerender(<TestPopover visible={true} />);

    await waitFor(() => expect(component.getByText('content')).toBeTruthy());
    expect(component.UNSAFE_queryAllByType(MeasureElement).length).toBeGreaterThan(1);
    expect(component.getByTestId('anchor')).toBeTruthy();
  });

  it('should keep the machinery mounted after hiding', async () => {
    const component = render(<TestPopover visible={true} />);
    await waitFor(() => expect(component.getByText('content')).toBeTruthy());

    component.rerender(<TestPopover visible={false} />);

    expect(component.queryByText('content')).toBeNull();
    expect(component.UNSAFE_queryAllByType(Modal).length).toEqual(1);
  });

  it('should not measure the anchor while it has never been visible', () => {
    global.anchorMeasureCount = 0;

    const component = render(<TestPopover visible={false} />);
    fireEvent(component.getByTestId('anchor'), 'layout', {
      nativeEvent: { layout: { x: 0, y: 0, width: 100, height: 40 } },
    });

    expect(component.getByTestId('anchor').props.onLayout).toBeUndefined();
    expect(global.anchorMeasureCount).toEqual(0);
  });

  it('should measure the anchor on the first open without remounting it', async () => {
    global.anchorMeasureCount = 0;

    const component = render(<TestPopover visible={false} />);
    const anchorBefore = component.getByTestId('anchor');
    component.rerender(<TestPopover visible={true} />);

    await waitFor(() => expect(global.anchorMeasureCount).toBeGreaterThan(0));
    expect(component.getByTestId('anchor')).toBe(anchorBefore);
    expect(component.getByTestId('anchor').props.onLayout).toEqual(expect.any(Function));
  });
});

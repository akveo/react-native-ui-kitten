import React from 'react';
import { Modal as RNModal, Text, View } from 'react-native';
import { render, waitFor } from '@testing-library/react-native';
import { light, mapping } from '@ui-kitten/eva';
import { ApplicationProvider } from '../../theme';
import { MeasureElement } from '../../devsupport';
import { Popover } from './popover.component';
import { Modal } from '../modal/modal.component';

/*
 * A popover that has never been visible renders its anchor and the anchor measurement only.
 * Once shown it mounts the modal machinery and keeps it mounted after hiding, so re-opening
 * stays cheap.
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
});

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import {
  fireEvent,
  render,
  RenderAPI,
  waitFor,
} from '@testing-library/react-native';
import { ReactTestInstance } from 'react-test-renderer';
import {
  light,
  mapping,
} from '@ui-kitten/eva';
import { ApplicationProvider } from '../../theme';
import {
  Toggle,
  ToggleProps,
} from './toggle.component';

describe('@toggle: component checks', () => {

  const TestToggle = (props?: ToggleProps): React.ReactElement => (
    <ApplicationProvider
      mapping={mapping}
      theme={light}
    >
      <Toggle {...props} />
    </ApplicationProvider>
  );

  const touchables = {
    findRootTouchable: (api: RenderAPI) => api.UNSAFE_queryByType(TouchableOpacity) as ReactTestInstance,
  };

  it('should request checking', async () => {
    const onCheckedChange = jest.fn();
    const component = render(
      <TestToggle
        checked={false}
        onChange={onCheckedChange}
      />,
    );

    fireEvent.press(touchables.findRootTouchable(component));
    await waitFor(() => {
      expect(onCheckedChange).toBeCalledWith(true);
    });
  });

  it('should request unchecking', async () => {
    const onCheckedChange = jest.fn();
    const component = render(
      <TestToggle
        checked={true}
        onChange={onCheckedChange}
      />,
    );

    fireEvent.press(touchables.findRootTouchable(component));
    await waitFor(() => {
      expect(onCheckedChange).toBeCalledWith(false);
    });
  });

  it('should render text', () => {
    const component = render(
      <TestToggle>
        I love Babel
      </TestToggle>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render text as function component', () => {
    const component = render(
      <TestToggle>
        {props => (
          <Text {...props}>
            I love Babel
          </Text>
        )}
      </TestToggle>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render pure JSX component', () => {
    const component = render(
      <TestToggle>
        <View>
          <Text>
            I love Babel
          </Text>
        </View>
      </TestToggle>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });


  describe('accessibility', () => {

    it('should expose the switch role', () => {
      const component = render(<TestToggle />);

      expect(component.getByRole('switch')).toBeTruthy();
    });

    it('should expose checked state', () => {
      const component = render(<TestToggle checked={true} />);

      expect(component.getByRole('switch')).toBeChecked();
    });

    it('should expose unchecked state', () => {
      const component = render(<TestToggle checked={false} />);

      expect(component.getByRole('switch')).not.toBeChecked();
    });

    it('should expose disabled state', () => {
      const component = render(<TestToggle disabled={true} />);

      expect(component.getByRole('switch')).toBeDisabled();
    });

    it('should name itself from a string label rendered outside the touchable', () => {
      const component = render(<TestToggle>Dark mode</TestToggle>);

      expect(component.getByRole('switch')).toHaveAccessibleName('Dark mode');
    });

    it('should let a consumer label override a string label', () => {
      const component = render(<TestToggle aria-label='Custom'>Dark mode</TestToggle>);

      expect(component.getByRole('switch')).toHaveAccessibleName('Custom');
    });
  });

});

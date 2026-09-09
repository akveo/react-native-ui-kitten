/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  fireEvent,
  render,
} from '@testing-library/react-native';
import {
  light,
  mapping,
} from '@ui-kitten/eva';
import { ApplicationProvider } from '../../theme';
import {
  Radio,
  RadioProps,
} from './radio.component';

describe('@radio: component checks', () => {

  const TestRadio = (props?: RadioProps): React.ReactElement => (
    <ApplicationProvider
      mapping={mapping}
      theme={light}
    >
      <Radio {...props} />
    </ApplicationProvider>
  );

  it('should request checking', () => {
    const onCheckedChange = jest.fn();
    const component = render(
      <TestRadio
        checked={false}
        onChange={onCheckedChange}
      />,
    );

    fireEvent.press(component.UNSAFE_queryByType(TouchableOpacity));
    expect(onCheckedChange).toBeCalledWith(true);
  });

  it('should request unchecking', () => {
    const onCheckedChange = jest.fn();
    const component = render(
      <TestRadio
        checked={true}
        onChange={onCheckedChange}
      />,
    );

    fireEvent.press(component.UNSAFE_queryByType(TouchableOpacity));
    expect(onCheckedChange).toBeCalledWith(false);
  });

  it('should render text', () => {
    const component = render(
      <TestRadio>
I love Babel
      </TestRadio>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render text from function component', () => {
    const component = render(
      <TestRadio>
        {props => (
          <Text {...props}>
I love Babel
          </Text>
        )}
      </TestRadio>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render text from JSX component', () => {
    const component = render(
      <TestRadio>
        <Text>
I love Babel
        </Text>
      </TestRadio>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should call onPressIn', () => {
    const onPressIn = jest.fn();
    const component = render(
      <TestRadio onPressIn={onPressIn} />,
    );

    fireEvent(component.UNSAFE_queryByType(TouchableOpacity), 'pressIn');
    expect(onPressIn).toBeCalled();
  });

  it('should call onPressOut', () => {
    const onPressOut = jest.fn();
    const component = render(
      <TestRadio onPressOut={onPressOut} />,
    );

    fireEvent(component.UNSAFE_queryByType(TouchableOpacity), 'pressOut');
    expect(onPressOut).toBeCalled();
  });
  it('should call onMouseEnter', () => {
    const onMouseEnter = jest.fn();

    const component = render(
      <TestRadio onMouseEnter={onMouseEnter} />,
    );

    fireEvent(component.UNSAFE_queryByType(TouchableOpacity), 'mouseEnter');
    expect(onMouseEnter).toBeCalled();
  });

  it('should call onMouseLeave', () => {
    const onMouseLeave = jest.fn();

    const component = render(
      <TestRadio onMouseLeave={onMouseLeave} />,
    );

    fireEvent(component.UNSAFE_queryByType(TouchableOpacity), 'mouseLeave');
    expect(onMouseLeave).toBeCalled();
  });

  it('should call onFocus', () => {
    const onFocus = jest.fn();

    const component = render(
      <TestRadio onFocus={onFocus} />,
    );

    fireEvent(component.UNSAFE_queryByType(TouchableOpacity), 'focus');
    expect(onFocus).toBeCalled();
  });

  it('should call onBlur', () => {
    const onBlur = jest.fn();

    const component = render(
      <TestRadio onBlur={onBlur} />,
    );

    fireEvent(component.UNSAFE_queryByType(TouchableOpacity), 'blur');
    expect(onBlur).toBeCalled();
  });


  describe('accessibility', () => {

    it('should expose the radio role', () => {
      const component = render(<TestRadio />);

      expect(component.getByRole('radio')).toBeTruthy();
    });

    it('should expose checked state', () => {
      const component = render(<TestRadio checked={true} />);

      expect(component.getByRole('radio')).toBeChecked();
    });

    it('should expose unchecked state', () => {
      const component = render(<TestRadio checked={false} />);

      expect(component.getByRole('radio')).not.toBeChecked();
    });

    it('should expose disabled state', () => {
      const component = render(<TestRadio disabled={true} />);

      expect(component.getByRole('radio')).toBeDisabled();
    });

    it('should derive the accessible name from the label', () => {
      const component = render(<TestRadio>Option A</TestRadio>);

      expect(component.getByRole('radio')).toHaveAccessibleName('Option A');
    });

    it('should let a consumer override the label', () => {
      const component = render(<TestRadio aria-label='Custom' />);

      expect(component.getByRole('radio')).toHaveAccessibleName('Custom');
    });
  });

});

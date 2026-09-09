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
  CheckBox,
  CheckBoxProps,
} from './checkbox.component';

describe('@checkbox component checks', () => {

  const TestCheckBox = (props?: CheckBoxProps): React.ReactElement => (
    <ApplicationProvider
      mapping={mapping}
      theme={light}
    >
      <CheckBox {...props} />
    </ApplicationProvider>
  );

  it('should request checking', () => {
    const onCheckedChange = jest.fn();
    const component = render(
      <TestCheckBox
        checked={false}
        onChange={onCheckedChange}
      />,
    );

    fireEvent.press(component.UNSAFE_queryByType(TouchableOpacity));
    expect(onCheckedChange).toBeCalledWith(true, false);
  });

  it('should request unchecking', () => {
    const onCheckedChange = jest.fn();
    const component = render(
      <TestCheckBox
        checked={true}
        onChange={onCheckedChange}
      />,
    );

    fireEvent.press(component.UNSAFE_queryByType(TouchableOpacity));
    expect(onCheckedChange).toBeCalledWith(false, false);
  });

  it('should request clearing indeterminate and checking', () => {
    const onCheckedChange = jest.fn();
    const component = render(
      <TestCheckBox
        checked={false}
        indeterminate={true}
        onChange={onCheckedChange}
      />,
    );

    fireEvent.press(component.UNSAFE_queryByType(TouchableOpacity));
    expect(onCheckedChange).toBeCalledWith(true, false);
  });

  it('should request clearing indeterminate and unchecking', () => {
    const onCheckedChange = jest.fn();
    const component = render(
      <TestCheckBox
        checked={true}
        indeterminate={true}
        onChange={onCheckedChange}
      />,
    );

    fireEvent.press(component.UNSAFE_queryByType(TouchableOpacity));
    expect(onCheckedChange).toBeCalledWith(false, false);
  });

  it('should render text', () => {
    const component = render(
      <TestCheckBox>
        I love Babel
      </TestCheckBox>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render text as component', () => {
    const component = render(
      <TestCheckBox>
        {props => (
          <Text {...props}>
            I love Babel
          </Text>
        )}
      </TestCheckBox>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render ReactElement passed to prop', () => {
    const renderComponent = (
      <Text>
        I love Babel
      </Text>
    );

    const component = render(
      <TestCheckBox>
        {renderComponent}
      </TestCheckBox>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should call onPressIn', () => {
    const onPressIn = jest.fn();
    const component = render(
      <TestCheckBox onPressIn={onPressIn} />,
    );

    fireEvent(component.UNSAFE_queryByType(TouchableOpacity), 'pressIn');
    expect(onPressIn).toBeCalled();
  });

  it('should call onPressOut', () => {
    const onPressOut = jest.fn();
    const component = render(
      <TestCheckBox onPressOut={onPressOut} />,
    );

    fireEvent(component.UNSAFE_queryByType(TouchableOpacity), 'pressOut');
    expect(onPressOut).toBeCalled();
  });

  it('should call onMouseEnter', () => {
    const onMouseEnter = jest.fn();

    const component = render(
      <TestCheckBox onMouseEnter={onMouseEnter} />,
    );

    fireEvent(component.UNSAFE_queryByType(TouchableOpacity), 'mouseEnter');
    expect(onMouseEnter).toBeCalled();
  });

  it('should call onMouseLeave', () => {
    const onMouseLeave = jest.fn();

    const component = render(
      <TestCheckBox onMouseLeave={onMouseLeave} />,
    );

    fireEvent(component.UNSAFE_queryByType(TouchableOpacity), 'mouseLeave');
    expect(onMouseLeave).toBeCalled();
  });

  it('should call onFocus', () => {
    const onFocus = jest.fn();

    const component = render(
      <TestCheckBox onFocus={onFocus} />,
    );

    fireEvent(component.UNSAFE_queryByType(TouchableOpacity), 'focus');
    expect(onFocus).toBeCalled();
  });

  it('should call onBlur', () => {
    const onBlur = jest.fn();

    const component = render(
      <TestCheckBox onBlur={onBlur} />,
    );

    fireEvent(component.UNSAFE_queryByType(TouchableOpacity), 'blur');
    expect(onBlur).toBeCalled();
  });


  describe('accessibility', () => {

    it('should expose the checkbox role', () => {
      const component = render(<TestCheckBox />);

      expect(component.getByRole('checkbox')).toBeTruthy();
    });

    it('should expose checked state', () => {
      const component = render(<TestCheckBox checked={true} />);

      expect(component.getByRole('checkbox')).toBeChecked();
    });

    it('should expose unchecked state', () => {
      const component = render(<TestCheckBox checked={false} />);

      expect(component.getByRole('checkbox')).not.toBeChecked();
    });

    it('should expose indeterminate state as partially checked', () => {
      const component = render(<TestCheckBox indeterminate={true} />);

      expect(component.getByRole('checkbox')).toBePartiallyChecked();
    });

    it('should expose disabled state', () => {
      const component = render(<TestCheckBox disabled={true} />);

      expect(component.getByRole('checkbox')).toBeDisabled();
    });

    it('should derive the accessible name from the label', () => {
      const component = render(<TestCheckBox>Remember me</TestCheckBox>);

      expect(component.getByRole('checkbox')).toHaveAccessibleName('Remember me');
    });

    it('should let a consumer override the role and label', () => {
      const component = render(
        <TestCheckBox
          role='switch'
          aria-label='Custom'
        />,
      );

      expect(component.getByRole('switch')).toBeTruthy();
      expect(component.getByRole('switch')).toHaveAccessibleName('Custom');
    });
  });

});

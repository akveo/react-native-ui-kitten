/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import { TouchableOpacity } from 'react-native';
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
  RadioGroup,
  RadioGroupProps,
} from './radioGroup.component';
import { Radio } from '../radio/radio.component';

describe('@radio-group: component checks', () => {

  const TestRadioGroup = (props?: Partial<RadioGroupProps>): React.ReactElement => {
    const [selectedIndex, setSelectedIndex] = React.useState(props.selectedIndex);

    const onCheckedChange = (index: number): void => {
      setSelectedIndex(index);
      props.onChange?.(index);
    };

    return (
      <ApplicationProvider
        mapping={mapping}
        theme={light}
      >
        <RadioGroup
          selectedIndex={selectedIndex}
          onChange={onCheckedChange}
        >
          <Radio>
            Option 1
          </Radio>
          <Radio>
            Option 2
          </Radio>
        </RadioGroup>
      </ApplicationProvider>
    );
  };

  it('should have 2 radios', () => {
    const component = render(
      <TestRadioGroup />,
    );

    expect(component.UNSAFE_queryAllByType(Radio).length).toEqual(2);
  });

  it('should set radio selected by passing selectedIndex prop', () => {
    const component = render(
      <TestRadioGroup selectedIndex={1} />,
    );

    expect(component.UNSAFE_queryAllByType(Radio)[1].props.checked).toEqual(true);
  });

  it('should set radio selected by pressing it', () => {
    const component = render(
      <TestRadioGroup selectedIndex={1} />,
    );

    fireEvent.press(component.UNSAFE_queryAllByType(TouchableOpacity)[0]);
    expect(component.UNSAFE_queryAllByType(Radio)[0].props.checked).toEqual(true);
  });

  it('should request selecting', () => {
    const onChange = jest.fn();
    const component = render(
      <TestRadioGroup onChange={onChange} />,
    );

    fireEvent.press(component.UNSAFE_queryAllByType(TouchableOpacity)[1]);
    expect(onChange).toHaveBeenCalledWith(1);
  });

});

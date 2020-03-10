/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  fireEvent,
  render,
} from 'react-native-testing-library';
import {
  light,
  mapping,
} from '@eva-design/eva';
import { ApplicationProvider } from '../../theme';
import {
  RadioGroup,
  RadioGroupProps,
} from './radioGroup.component';
import { Radio } from '../radio/radio.component';

describe('@radio-group: component checks', () => {

  const TestRadioGroup = (props?: Partial<RadioGroupProps>) => {
    const [selectedIndex, setSelectedIndex] = React.useState(props.selectedIndex);

    const onCheckedChange = (index: number): void => {
      setSelectedIndex(index);
      props.onChange && props.onChange(index);
    };

    return (
      <ApplicationProvider
        mapping={mapping}
        theme={light}>
        <RadioGroup
          selectedIndex={selectedIndex}
          onChange={onCheckedChange}>
          <Radio>Option 1</Radio>
          <Radio>Option 2</Radio>
        </RadioGroup>
      </ApplicationProvider>
    );
  };

  it('should have 2 radios', () => {
    const component = render(
      <TestRadioGroup/>,
    );

    expect(component.queryAllByType(Radio).length).toEqual(2);
  });

  it('should set radio selected by passing selectedIndex prop', () => {
    const component = render(
      <TestRadioGroup selectedIndex={1}/>,
    );

    expect(component.queryAllByType(Radio)[1].props.checked).toEqual(true);
  });

  it('should set radio selected by pressing it', () => {
    const component = render(
      <TestRadioGroup selectedIndex={1}/>,
    );

    fireEvent.press(component.queryAllByType(TouchableOpacity)[0]);
    expect(component.queryAllByType(Radio)[0].props.checked).toEqual(true);
  });

  it('should request selecting', () => {
    const onChange = jest.fn();
    const component = render(
      <TestRadioGroup onChange={onChange}/>,
    );

    fireEvent.press(component.queryAllByType(TouchableOpacity)[1]);
    expect(onChange).toHaveBeenCalledWith(1);
  });

});

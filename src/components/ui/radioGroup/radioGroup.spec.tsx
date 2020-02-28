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

    return (
      <ApplicationProvider
        mapping={mapping}
        theme={light}>
        <RadioGroup
          selectedIndex={selectedIndex}
          onChange={setSelectedIndex}>
          <Radio text='Option 0'/>
          <Radio text='Option 1'/>
        </RadioGroup>
      </ApplicationProvider>
    );
  };

  it('should have 2 radios', () => {
    const component = render(
      <TestRadioGroup/>,
    );

    const radios = component.getAllByType(Radio);

    expect(radios.length).toEqual(2);
  });

  it('should set radio selected by passing selectedIndex prop', () => {
    const component = render(
      <TestRadioGroup selectedIndex={1}/>,
    );

    const radios = component.getAllByType(Radio);

    expect(radios[1].props.checked).toEqual(true);
  });

  it('should set radio selected by pressing it', () => {
    const component = render(
      <TestRadioGroup selectedIndex={1}/>,
    );

    const touchables = component.getAllByType(TouchableOpacity);
    fireEvent.press(touchables[0]);

    const radios = component.getAllByType(Radio);

    expect(radios[0].props.checked).toEqual(true);
  });

});

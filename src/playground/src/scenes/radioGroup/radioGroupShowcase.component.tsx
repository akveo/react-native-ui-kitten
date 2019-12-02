import React from 'react';
import {
  Radio,
  RadioGroup,
  RadioGroupElement,
  RadioGroupProps,
} from '@ui-kitten/components';

export const RadioGroupShowcase = (props: RadioGroupProps): RadioGroupElement => {

  const [selectedIndex, setSelectedIndex] = React.useState(props.selectedIndex);

  return (
    <RadioGroup
      selectedIndex={selectedIndex}
      onChange={setSelectedIndex}>
      <Radio text='Option 1'/>
      <Radio text='Option 2'/>
      <Radio text='Option 3'/>
    </RadioGroup>
  );
};

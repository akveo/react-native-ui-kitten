import React from 'react';
import { Radio, RadioGroup, Text } from '@ui-kitten/components';

export const RadioGroupSimpleUsageShowcase = (): React.ReactElement => {

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <>

      <Text testID='radio-group-value' category='h6'>
        {`Selected Option: ${selectedIndex + 1}`}
      </Text>

      <RadioGroup
        testID='radio-group'
        selectedIndex={selectedIndex}
        onChange={index => setSelectedIndex(index)}
      >
        <Radio testID='radio-group-1'>
Option 1
        </Radio>
        <Radio testID='radio-group-2'>
Option 2
        </Radio>
        <Radio testID='radio-group-3'>
Option 3
        </Radio>
      </RadioGroup>

    </>
  );
};

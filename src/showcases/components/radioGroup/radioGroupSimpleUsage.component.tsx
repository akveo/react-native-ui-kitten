import React from 'react';
import { Radio, RadioGroup, Text } from '@ui-kitten/components';

export const RadioGroupSimpleUsageShowcase = () => {

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <React.Fragment>

      <Text category='h6'>
        {`Selected Option: ${selectedIndex + 1}`}
      </Text>

      <RadioGroup
        selectedIndex={selectedIndex}
        onChange={index => setSelectedIndex(index)}>
        <Radio>Option 1</Radio>
        <Radio>Option 2</Radio>
        <Radio>Option 3</Radio>
      </RadioGroup>

    </React.Fragment>
  );
};

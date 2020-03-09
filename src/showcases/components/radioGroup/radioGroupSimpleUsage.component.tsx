import React from 'react';
import { Layout, Radio, RadioGroup, Text } from '@ui-kitten/components';

export const RadioGroupSimpleUsageShowcase = () => {

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const onCheckedChange = (index) => {
    setSelectedIndex(index);
  };

  return (
    <Layout>

      <Text category='h6'>
        {`Selected Option: ${selectedIndex + 1}`}
      </Text>

      <RadioGroup
        selectedIndex={selectedIndex}
        onChange={onCheckedChange}>
        <Radio>Option 1</Radio>
        <Radio>Option 2</Radio>
        <Radio>Option 3</Radio>
      </RadioGroup>

    </Layout>
  );
};

import React from 'react';
import { Radio, Text } from '@ui-kitten/components';

const MyRadio = (props) => (
  <Radio {...props}>
    {evaProps => <Text {...evaProps}>{props.children}</Text>}
  </Radio>
);

export const RadioStylingShowcase = () => {

  const [checked, setChecked] = React.useState(false);

  const onCheckedChange = (isChecked) => {
    setChecked(isChecked);
  };

  return (
    <MyRadio checked={checked} onChange={onCheckedChange}>
      Place your Text
    </MyRadio>
  );
};

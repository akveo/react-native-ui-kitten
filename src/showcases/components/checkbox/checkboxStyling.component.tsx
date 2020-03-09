import React from 'react';
import { CheckBox, Text } from '@ui-kitten/components';

const MyCheckBox = (props) => (
  <CheckBox {...props}>
    {evaProps => <Text {...evaProps}>{props.children}</Text>}
  </CheckBox>
);

export const CheckboxStylingShowcase = () => {

  const [checked, setChecked] = React.useState(false);

  return (
    <MyCheckBox
      checked={checked}
      onChange={nextChecked => setChecked(nextChecked)}>
      Place your Text
    </MyCheckBox>
  );
};

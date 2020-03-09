import React from 'react';
import { Text, Toggle } from '@ui-kitten/components';

const MyToggle = (props) => (
  <Toggle {...props}>
    {evaProps => <Text {...evaProps}>{props.children}</Text>}
  </Toggle>
);

export const ToggleStylingShowcase = () => {

  const [checked, setChecked] = React.useState(false);

  const onCheckedChange = (isChecked) => {
    setChecked(isChecked);
  };

  return (
    <MyToggle checked={checked} onChange={onCheckedChange}>
      Place your Text
    </MyToggle>
  );
};

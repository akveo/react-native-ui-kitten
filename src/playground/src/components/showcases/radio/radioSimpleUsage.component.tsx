import React from 'react';
import { Radio } from 'react-native-ui-kitten';

export const RadioSimpleUsageShowcase = () => {

  const [checked, setChecked] = React.useState(false);

  const onCheckedChange = (isChecked) => {
    setChecked(isChecked);
  };

  return (
    <Radio
      text={`Checked: ${checked}`}
      checked={checked}
      onChange={onCheckedChange}
    />
  );
};

import React from 'react';
import { CheckBox } from 'react-native-ui-kitten';

export const CheckboxSimpleUsageShowcase = () => {

  const [checked, setChecked] = React.useState(false);

  const onCheckedChange = (isChecked) => {
    setChecked(isChecked);
  };

  return (
    <CheckBox
      text={`Checked: ${checked}`}
      checked={checked}
      onChange={onCheckedChange}
    />
  );
};

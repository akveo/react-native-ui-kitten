import React from 'react';
import { Toggle } from 'react-native-ui-kitten';

export const ToggleSimpleUsageShowcase = () => {

  const [checked, setChecked] = React.useState(false);

  const onCheckedChange = (isChecked) => {
    setChecked(isChecked);
  };

  return (
    <Toggle
      text={`Checked: ${checked}`}
      checked={checked}
      onChange={onCheckedChange}
    />
  );
};

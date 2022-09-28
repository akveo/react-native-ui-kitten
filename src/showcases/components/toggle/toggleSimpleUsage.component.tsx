import React from 'react';
import { Toggle } from '@ui-kitten/components';

export const ToggleSimpleUsageShowcase = (): React.ReactElement => {

  const [checked, setChecked] = React.useState(false);

  const onCheckedChange = (isChecked): void => {
    setChecked(isChecked);
  };

  return (
    <Toggle
      checked={checked}
      onChange={onCheckedChange}
    >
      {`Checked: ${checked}`}
    </Toggle>
  );
};

import React from 'react';
import { CheckBox } from '@ui-kitten/components';

export const CheckboxSimpleUsageShowcase = (): React.ReactElement => {

  const [checked, setChecked] = React.useState(false);

  return (
    <CheckBox
      checked={checked}
      onChange={nextChecked => setChecked(nextChecked)}
    >
      {`Checked: ${checked}`}
    </CheckBox>
  );
};

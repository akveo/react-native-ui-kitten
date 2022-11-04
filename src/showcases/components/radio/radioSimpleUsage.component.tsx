import React from 'react';
import { Radio } from '@ui-kitten/components';

export const RadioSimpleUsageShowcase = (): React.ReactElement => {

  const [checked, setChecked] = React.useState(false);

  return (
    <Radio
      checked={checked}
      onChange={nextChecked => setChecked(nextChecked)}
    >
      {`Checked: ${checked}`}
    </Radio>
  );
};

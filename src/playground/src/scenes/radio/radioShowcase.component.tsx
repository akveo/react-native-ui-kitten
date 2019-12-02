import React from 'react';
import {
  Radio,
  RadioElement,
  RadioProps,
} from '@ui-kitten/components';

export const RadioShowcase = (props: RadioProps): RadioElement => {

  const [checked, setChecked] = React.useState<boolean>(props.checked);

  return (
    <Radio
      {...props}
      checked={checked}
      onChange={setChecked}
    />
  );
};

import React from 'react';
import {
  Toggle,
  ToggleElement,
  ToggleProps,
} from '@ui-kitten/components';

export const ToggleShowcase = (props: ToggleProps): ToggleElement => {

  const [checked, setChecked] = React.useState<boolean>(props.checked);

  return (
    <Toggle
      {...props}
      checked={checked}
      onChange={setChecked}
    />
  );
};

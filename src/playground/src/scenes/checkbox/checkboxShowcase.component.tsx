import React from 'react';
import {
  CheckBox,
  CheckBoxElement,
  CheckBoxProps,
} from '@ui-kitten/components';

export const CheckBoxShowcase = (props: CheckBoxProps): CheckBoxElement => {

  const [checked, setChecked] = React.useState<boolean>(props.checked);
  const [indeterminate, setIndeterminate] = React.useState<boolean>(props.indeterminate);

  const onChange = (isChecked: boolean, isIndeterminate: boolean) => {
    setChecked(isChecked);
    setIndeterminate(isIndeterminate);
  };

  return (
    <CheckBox
      {...props}
      checked={checked}
      indeterminate={indeterminate}
      onChange={onChange}
    />
  );
};

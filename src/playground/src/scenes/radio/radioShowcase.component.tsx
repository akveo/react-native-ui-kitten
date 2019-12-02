import React from 'react';
import {
  Radio,
  RadioElement,
  RadioProps,
} from 'react-native-ui-kitten';

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

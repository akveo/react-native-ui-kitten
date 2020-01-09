import React from 'react';
import {
  CheckBox,
  ListItem,
} from '@ui-kitten/components';

export const ListItemWithAccessoryShowcase = () => {

  const [checked, setChecked] = React.useState(false);

  const onCheckBoxCheckedChange = (index) => {
    setChecked(!checked);
  };

  const renderAccessory = (style, index) => (
    <CheckBox
      style={style}
      checked={checked}
      onChange={() => onCheckBoxCheckedChange(index)}
    />
  );

  return (
    <ListItem
      title='Title'
      description='Description'
      accessory={renderAccessory}
    />
  );
};

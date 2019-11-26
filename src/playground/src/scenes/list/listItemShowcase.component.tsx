import React from 'react';
import {
  CheckBox,
  CheckBoxProps,
  ListItem,
  ListItemElement,
  ListItemProps,
  StyleType,
} from 'react-native-ui-kitten';
import { StarIcon } from '@pg/icons';

export const ListItemShowcase = (props?: ListItemProps): ListItemElement => (
  <ListItem {...props}/>
);

export const ListItemIconShowcase = (props?: ListItemProps): ListItemElement => (
  <ListItem {...props} icon={StarIcon}/>
);

export const ListItemAccessoryShowcase = (props?: ListItemProps): ListItemElement => {

  const AccessoryElement = (style: StyleType, index: number): React.ReactElement<CheckBoxProps> => (
    <CheckBox checked={index % 2 === 0}/>
  );

  return (
    <ListItem {...props} accessory={AccessoryElement}/>
  );
};

export const ListItemIconAccessoryShowcase = (props?: ListItemProps): ListItemElement => {

  const AccessoryElement = (style: StyleType, index: number): React.ReactElement<CheckBoxProps> => (
    <CheckBox checked={index % 2 === 0}/>
  );

  return (
    <ListItem {...props} icon={StarIcon} accessory={AccessoryElement}/>
  );
};

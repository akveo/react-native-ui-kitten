import React from 'react';
import {
  CheckBox,
  CheckBoxProps,
  Icon,
  ListItem,
  ListItemElement,
  ListItemProps,
  IconElement,
  StyleType,
} from 'react-native-ui-kitten';

export const ListItemShowcase = (props?: ListItemProps): ListItemElement => {
  return (
    <ListItem {...props}/>
  );
};

export const ListItemIconShowcase = (props?: ListItemProps): ListItemElement => {

  const StarIcon = (style: StyleType, index: number): IconElement => (
    <Icon name='star' {...style}/>
  );

  return (
    <ListItem {...props} icon={StarIcon}/>
  );
};

export const ListItemAccessoryShowcase = (props?: ListItemProps): ListItemElement => {

  const AccessoryElement = (style: StyleType, index: number): React.ReactElement<CheckBoxProps> => (
    <CheckBox checked={index % 2 === 0}/>
  );

  return (
    <ListItem {...props} accessory={AccessoryElement}/>
  );
};

export const ListItemIconAccessoryShowcase = (props?: ListItemProps): ListItemElement => {

  const StarIcon = (style: StyleType, index: number): IconElement => (
    <Icon {...style} name='star' />
  );

  const AccessoryElement = (style: StyleType, index: number): React.ReactElement<CheckBoxProps> => (
    <CheckBox checked={index % 2 === 0}/>
  );

  return (
    <ListItem {...props} icon={StarIcon} accessory={AccessoryElement}/>
  );
};

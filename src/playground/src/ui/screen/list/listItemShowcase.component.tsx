import React from 'react';
import {
  Image,
  ImageProps,
} from 'react-native';
import { StyleType } from '@kitten/theme';
import {
  CheckBox,
  CheckBoxProps,
  Icon,
  ListItem,
  ListItemElement,
  ListItemProps,
} from '@kitten/ui';

export const ListItemShowcase = (props?: ListItemProps): ListItemElement => {
  return (
    <ListItem {...props}/>
  );
};

export const ListItemIconShowcase = (props?: ListItemProps): ListItemElement => {

  const IconElement = (style: StyleType, index: number): React.ReactElement<ImageProps> => (
    <Icon name='star' {...style}/>
  );

  return (
    <ListItem {...props} icon={IconElement}/>
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

  const IconElement = (style: StyleType, index: number): React.ReactElement<ImageProps> => (
    <Icon name='star' {...style}/>
  );

  const AccessoryElement = (style: StyleType, index: number): React.ReactElement<CheckBoxProps> => (
    <CheckBox checked={index % 2 === 0}/>
  );

  return (
    <ListItem {...props} icon={IconElement} accessory={AccessoryElement}/>
  );
};

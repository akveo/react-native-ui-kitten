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
  ListItemProps,
} from '@kitten/ui';

export const ListItemShowcase = (props?: ListItemProps): React.ReactElement<ListItemProps> => {
  return (
    <ListItem {...props}/>
  );
};

export const ListItemIconShowcase = (props?: ListItemProps): React.ReactElement<ListItemProps> => {

  const IconElement = (style: StyleType, index: number): React.ReactElement<ImageProps> => (
    <Icon name='star' {...style}/>
  );

  return (
    <ListItem {...props} icon={IconElement}/>
  );
};

export const ListItemAccessoryShowcase = (props?: ListItemProps): React.ReactElement<ListItemProps> => {

  const AccessoryElement = (style: StyleType, index: number): React.ReactElement<CheckBoxProps> => (
    <CheckBox checked={index % 2 === 0}/>
  );

  return (
    <ListItem {...props} accessory={AccessoryElement}/>
  );
};

export const ListItemIconAccessoryShowcase = (props?: ListItemProps): React.ReactElement<ListItemProps> => {

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

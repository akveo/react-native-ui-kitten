import React from 'react';
import {
  Image,
  ImageProps,
} from 'react-native';
import { StyleType } from '@kitten/theme';
import {
  CheckBox,
  CheckBoxProps,
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

  const Icon = (style: StyleType, index: number): React.ReactElement<ImageProps> => (
    <Image source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' }}/>
  );

  return (
    <ListItem {...props} icon={Icon}/>
  );
};

export const ListItemAccessoryShowcase = (props?: ListItemProps): ListItemElement => {

  const Accessory = (style: StyleType, index: number): React.ReactElement<CheckBoxProps> => (
    <CheckBox checked={index % 2 === 0}/>
  );

  return (
    <ListItem {...props} accessory={Accessory}/>
  );
};

export const ListItemIconAccessoryShowcase = (props?: ListItemProps): ListItemElement => {

  const Icon = (style: StyleType, index: number): React.ReactElement<ImageProps> => (
    <Image source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' }}/>
  );

  const Accessory = (style: StyleType, index: number): React.ReactElement<CheckBoxProps> => (
    <CheckBox checked={index % 2 === 0}/>
  );

  return (
    <ListItem {...props} icon={Icon} accessory={Accessory}/>
  );
};

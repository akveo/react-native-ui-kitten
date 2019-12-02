import React from 'react';
import {
  Icon,
  IconElement,
  StyleType,
} from 'react-native-ui-kitten';

/**
 * Should contain all icon names used in app.
 * Needed to support compatible icon names between different icon packs.
 */
export interface AppIconRegistry {
  ['arrow-ios-downward']: string;
  ['arrow-ios-upward']: string;
  ['arrow-back']: string;
  ['color-palette']: string;
  ['grid']: string;
  ['list']: string;
  ['menu']: string;
  ['more-vertical']: string;
  ['search']: string;
  ['settings']: string;
  ['star']: string;
  ['trash']: string;
}

export const ArrowDownwardIcon = (style: StyleType): IconElement => (
  <Icon name='arrow-ios-downward' {...style}/>
);

export const ArrowUpwardIcon = (style: StyleType): IconElement => (
  <Icon name='arrow-ios-upward' {...style}/>
);

export const BackIcon = (style): IconElement => (
  <Icon {...style} name='arrow-back'/>
);

export const ColorPaletteIcon = (style: StyleType): IconElement => (
  <Icon name='color-palette' {...style}/>
);

export const GridIcon = (style: StyleType): IconElement => (
  <Icon name='grid' {...style}/>
);

export const ListIcon = (style: StyleType): IconElement => (
  <Icon name='list' {...style}/>
);

export const MenuIcon = (style): IconElement => (
  <Icon {...style} name='menu'/>
);

export const MoreVerticalIcon = (style): IconElement => (
  <Icon {...style} name='more-vertical'/>
);

export const SearchIcon = (style: StyleType): IconElement => (
  <Icon {...style} name='search' />
);

export const SettingsIcon = (style: StyleType): IconElement => (
  <Icon {...style} name='settings' />
);

export const StarIcon = (style: StyleType): IconElement => (
  <Icon name='star' {...style}/>
);

export const TrashIcon = (style: StyleType): IconElement => (
  <Icon {...style} name='trash' />
);



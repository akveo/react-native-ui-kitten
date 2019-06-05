import React from 'react';
import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
  ComponentShowcaseSetting,
} from '../common/type';
import { ListRenderItemInfo } from 'react-native';
import { ListItemProps } from '@kitten/ui';
import {
  ListItemAccessoryShowcase,
  ListItemIconAccessoryShowcase,
  ListItemIconShowcase,
  ListItemShowcase,
} from './listItemShowcase.component';

interface ListData {
  title: string;
  description: string;
}

const data: ListData[] = new Array(42).fill(  {
  title: 'Title',
  description: 'Description',
});

const renderListItem = (info: ListRenderItemInfo<ListData>): React.ReactElement<ListItemProps> => {
  return (
    <ListItemShowcase {...info.item}/>
  );
};

const renderIconListItem = (info: ListRenderItemInfo<ListData>): React.ReactElement<ListItemProps> => {
  return (
    <ListItemIconShowcase {...info.item}/>
  );
};

const renderAccessoryListItem = (info: ListRenderItemInfo<ListData>): React.ReactElement<ListItemProps> => {
  return (
    <ListItemAccessoryShowcase {...info.item}/>
  );
};

const renderIconAccessoryListItem = (info: ListRenderItemInfo<ListData>): React.ReactElement<ListItemProps> => {
  return (
    <ListItemIconAccessoryShowcase {...info.item}/>
  );
};

export const defaultList: ComponentShowcaseItem = {
  props: {
    data: data,
    renderItem: renderListItem,
  },
};

export const defaultSection: ComponentShowcaseSection = {
  title: 'Default',
  items: [
    defaultList,
  ],
};

export const listShowcase: ComponentShowcase = {
  sections: [
    defaultSection,
  ],
};

export const listSettings: ComponentShowcaseSetting[] = [
  {
    propertyName: 'renderItem',
    value: renderIconListItem,
    description: 'icon',
  },
  {
    propertyName: 'renderItem',
    value: renderAccessoryListItem,
    description: 'accessory',
  },
  {
    propertyName: 'renderItem',
    value: renderIconAccessoryListItem,
    description: 'icon accessory',
  },
];

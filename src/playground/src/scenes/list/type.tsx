import React from 'react';
import { ListRenderItemInfo } from 'react-native';
import { ListItemElement } from 'react-native-ui-kitten';
import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
  ComponentShowcaseSetting,
} from '@pg/model/componentShowcase.model';
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

const data: ListData[] = new Array(42).fill({
  title: 'Title',
  description: 'Description',
});

const renderListItem = (info: ListRenderItemInfo<ListData>): ListItemElement => (
  <ListItemShowcase {...info.item}/>
);

const renderIconListItem = (info: ListRenderItemInfo<ListData>): ListItemElement => (
  <ListItemIconShowcase {...info.item}/>
);

const renderAccessoryListItem = (info: ListRenderItemInfo<ListData>): ListItemElement => (
  <ListItemAccessoryShowcase {...info.item}/>
);

const renderIconAccessoryListItem = (info: ListRenderItemInfo<ListData>): ListItemElement => (
  <ListItemIconAccessoryShowcase {...info.item}/>
);

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
  title: 'List',
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

import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
} from '../common/type';
import { StyleType } from '@kitten/theme';
import { IconElement } from '@kitten/ui';
import React from 'react';

const now: Date = new Date();

const Icon = (style: StyleType): IconElement<any> => {
  return (
    <Icon name='calendar-outline' {...style}/>
  );
};


const defaultDatepicker: ComponentShowcaseItem = {
  title: 'Default',
  props: {
    min: new Date(now.getFullYear() - 12, 0, 1),
    max: new Date(now.getFullYear() + 12, 0, 1),
  },
};

const defaultSection: ComponentShowcaseSection = {
  title: 'Default',
  items: [
    defaultDatepicker,
  ],
};

export const datepickerShowcase: ComponentShowcase = {
  sections: [
    defaultSection,
  ],
};

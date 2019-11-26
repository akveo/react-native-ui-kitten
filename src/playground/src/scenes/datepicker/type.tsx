import React from 'react';
import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
} from '@pg/model/componentShowcase.model';

const now: Date = new Date();

const defaultDatepicker: ComponentShowcaseItem = {
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
  title: 'Date Picker',
  sections: [
    defaultSection,
  ],
};

import React from 'react';
import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
} from '../common/type';


const defaultDrawer: ComponentShowcaseItem = {
  title: 'Default',
  props: {},
};

const defaultSection: ComponentShowcaseSection = {
  title: 'Default',
  items: [
    defaultDrawer,
  ],
};

export const drawerShowcase: ComponentShowcase = {
  sections: [
    defaultSection,
  ],
};


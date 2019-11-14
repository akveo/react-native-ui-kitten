import React from 'react';
import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
  ComponentShowcaseSetting,
} from '../common/type';
import {
  CardBodyContent,
  CardFooter,
  CustomCardHeader,
  EvaCardHeader,
} from './cardExamples';

const defaultCard: ComponentShowcaseItem = {
  props: {
    children: <CardBodyContent/>,
  },
};

const defaultSection: ComponentShowcaseSection = {
  title: 'Default',
  items: [
    defaultCard,
  ],
};

const evaHeaderCard: ComponentShowcaseItem = {
  props: {
    children: <CardBodyContent/>,
    header: EvaCardHeader,
  },
};

const evaHeaderSection: ComponentShowcaseSection = {
  title: 'Eva Header',
  items: [
    evaHeaderCard,
  ],
};

const customHeaderCard: ComponentShowcaseItem = {
  props: {
    children: <CardBodyContent/>,
    header: CustomCardHeader,
  },
};

const customHeaderSection: ComponentShowcaseSection = {
  title: 'Custom Header',
  items: [
    customHeaderCard,
  ],
};

const footerCard: ComponentShowcaseItem = {
  props: {
    children: <CardBodyContent/>,
    footer: CardFooter,
  },
};

const footerSection: ComponentShowcaseSection = {
  title: 'Footer',
  items: [
    footerCard,
  ],
};

const headerFooterCard: ComponentShowcaseItem = {
  props: {
    children: <CardBodyContent/>,
    header: EvaCardHeader,
    footer: CardFooter,
  },
};

const headerFooterSection: ComponentShowcaseSection = {
  title: 'Header + Footer',
  items: [
    headerFooterCard,
  ],
};

export const cardShowcase: ComponentShowcase = {
  sections: [
    defaultSection,
    evaHeaderSection,
    customHeaderSection,
    footerSection,
    headerFooterSection,
  ],
};

export const cardSettings: ComponentShowcaseSetting[] = [
  {
    propertyName: 'appearance',
    value: 'outline',
  },
  {
    propertyName: 'appearance',
    value: 'filled',
  },
  {
    propertyName: 'status',
    value: 'basic',
  },
  {
    propertyName: 'status',
    value: 'primary',
  },
  {
    propertyName: 'status',
    value: 'success',
  },
  {
    propertyName: 'status',
    value: 'info',
  },
  {
    propertyName: 'status',
    value: 'warning',
  },
  {
    propertyName: 'status',
    value: 'danger',
  },
  {
    propertyName: 'status',
    value: 'control',
  },
];

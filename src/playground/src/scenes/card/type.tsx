import React from 'react';
import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
  ComponentShowcaseSetting,
} from '@pg/model/componentShowcase.model';
import {
  CardDefaultHeader,
  CardCustomHeader,
  CardBody,
  CardFooter,
} from './cardExamples';

const defaultCard: ComponentShowcaseItem = {
  props: {
    children: <CardBody/>,
  },
};

const defaultSection: ComponentShowcaseSection = {
  title: 'Default',
  items: [
    defaultCard,
  ],
};

const cardDefaultHeader: ComponentShowcaseItem = {
  props: {
    children: <CardBody/>,
    header: CardDefaultHeader,
  },
};

const cardDefaultHeaderSection: ComponentShowcaseSection = {
  title: 'Header',
  items: [
    cardDefaultHeader,
  ],
};

const cardCustomHeader: ComponentShowcaseItem = {
  props: {
    children: <CardBody/>,
    header: CardCustomHeader,
  },
};

const cardCustomHeaderSection: ComponentShowcaseSection = {
  title: 'Custom Header',
  items: [
    cardCustomHeader,
  ],
};

const footerCard: ComponentShowcaseItem = {
  props: {
    children: <CardBody/>,
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
    children: <CardBody/>,
    header: CardDefaultHeader,
    footer: CardFooter,
  },
};

const headerFooterSection: ComponentShowcaseSection = {
  title: 'Header & Footer',
  items: [
    headerFooterCard,
  ],
};

export const cardShowcase: ComponentShowcase = {
  title: 'Card',
  sections: [
    defaultSection,
    cardDefaultHeaderSection,
    cardCustomHeaderSection,
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

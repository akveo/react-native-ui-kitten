import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
  ComponentShowcaseSetting,
} from '../common/type';

const h1Text: ComponentShowcaseItem = {
  title: 'H1 Headline',
  props: {
    category: 'h1',
  },
};

const h2Text: ComponentShowcaseItem = {
  title: 'H2 Headline',
  props: {
    category: 'h2',
  },
};

const h3Text: ComponentShowcaseItem = {
  title: 'H3 Headline',
  props: {
    category: 'h3',
  },
};

const h4Text: ComponentShowcaseItem = {
  title: 'H4 Headline',
  props: {
    category: 'h4',
  },
};

const h5Text: ComponentShowcaseItem = {
  title: 'H5 Headline',
  props: {
    category: 'h5',
  },
};

const h6Text: ComponentShowcaseItem = {
  title: 'H6 Headline',
  props: {
    category: 'h6',
  },
};

const s1Text: ComponentShowcaseItem = {
  title: 'S1 Subtitle',
  props: {
    category: 's1',
  },
};

const s2Text: ComponentShowcaseItem = {
  title: 'S2 Subtitle',
  props: {
    category: 's2',
  },
};

const p1Text: ComponentShowcaseItem = {
  title: 'P1 Paragraph',
  props: {
    category: 'p1',
  },
};

const p2Text: ComponentShowcaseItem = {
  title: 'P2 Paragraph',
  props: {
    category: 'p2',
  },
};

const c1Text: ComponentShowcaseItem = {
  title: 'C1 Caption',
  props: {
    category: 'c1',
  },
};

const c2Text: ComponentShowcaseItem = {
  title: 'C2 Caption',
  props: {
    category: 'c2',
  },
};

const labelText: ComponentShowcaseItem = {
  title: 'Label',
  props: {
    category: 'label',
  },
};

const categorySection: ComponentShowcaseSection = {
  title: 'Category',
  items: [
    h1Text,
    h2Text,
    h3Text,
    h4Text,
    h5Text,
    h6Text,
    s1Text,
    s2Text,
    p1Text,
    p2Text,
    c1Text,
    c2Text,
    labelText,
  ],
};

export const textShowcase: ComponentShowcase = {
  sections: [
    categorySection,
  ],
};

export const textSettings: ComponentShowcaseSetting[] = [
  {
    propertyName: 'appearance',
    value: 'alternative',
  },
  {
    propertyName: 'appearance',
    value: 'hint',
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
];

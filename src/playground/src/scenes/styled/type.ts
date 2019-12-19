import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
} from '@pg/model/componentShowcase.model';

const defaultStyledComponent: ComponentShowcaseItem = {
  title: 'Default',
  props: {},
};

const primaryStyledComponent: ComponentShowcaseItem = {
  title: 'Primary',
  props: {
    ...defaultStyledComponent.props,
    status: 'primary',
  },
};

const dangerStyledComponent: ComponentShowcaseItem = {
  title: 'Danger',
  props: {
    ...defaultStyledComponent.props,
    status: 'danger',
  },
};

const defaultSection: ComponentShowcaseSection = {
  title: 'Default',
  items: [
    defaultStyledComponent,
  ],
};

const statusSection: ComponentShowcaseSection = {
  title: 'Status',
  items: [
    primaryStyledComponent,
    dangerStyledComponent,
  ],
};

export const styledComponentShowcase: ComponentShowcase = {
  title: 'Styled Component',
  sections: [
    defaultSection,
    statusSection,
  ],
};


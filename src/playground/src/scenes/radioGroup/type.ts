import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
} from '@pg/model/componentShowcase.model';

const defaultRadioGroup: ComponentShowcaseItem = {
  props: {},
};

const defaultSection: ComponentShowcaseSection = {
  title: 'Default',
  items: [
    defaultRadioGroup,
  ],
};

export const radioGroupShowcase: ComponentShowcase = {
  title: 'Radio Group',
  sections: [
    defaultSection,
  ],
};

import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
} from '../common/type';

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
  sections: [
    defaultSection,
  ],
};

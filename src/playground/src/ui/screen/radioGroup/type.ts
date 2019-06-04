import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
} from '../common/type';

const filledButtonGroup: ComponentShowcaseItem = {
  title: 'Filled',
  props: {
    appearance: 'filled',
  },
};

const outlineButtonGroup: ComponentShowcaseItem = {
  title: 'Outline',
  props: {
    appearance: 'outline',
  },
};

const giantButtonGroup: ComponentShowcaseItem = {
  title: 'Giant',
  props: {
    size: 'giant',
  },
};

const largeButtonGroup: ComponentShowcaseItem = {
  title: 'Large',
  props: {
    size: 'large',
  },
};

const mediumButtonGroup: ComponentShowcaseItem = {
  title: 'Medium',
  props: {
    size: 'medium',
  },
};

const smallButtonGroup: ComponentShowcaseItem = {
  title: 'Small',
  props: {
    size: 'small',
  },
};

const tinyButtonGroup: ComponentShowcaseItem = {
  title: 'Tiny',
  props: {
    size: 'tiny',
  },
};

const appearanceSection: ComponentShowcaseSection = {
  title: 'Appearance',
  items: [
    filledButtonGroup,
    outlineButtonGroup,
  ],
};

export const radioGroupShowcase: ComponentShowcase = {
  sections: [
    appearanceSection,
  ],
};

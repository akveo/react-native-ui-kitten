import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
} from '../common/type';

const giantAvatar: ComponentShowcaseItem = {
  title: 'Giant',
  props: {
    size: 'giant',
  },
};

const largeAvatar: ComponentShowcaseItem = {
  title: 'Large',
  props: {
    size: 'large',
  },
};

const mediumAvatar: ComponentShowcaseItem = {
  title: 'Medium',
  props: {
    size: 'medium',
  },
};

const smallAvatar: ComponentShowcaseItem = {
  title: 'Small',
  props: {
    size: 'small',
  },
};

const tinyAvatar: ComponentShowcaseItem = {
  title: 'Tiny',
  props: {
    size: 'tiny',
  },
};

const roundAvatar: ComponentShowcaseItem = {
  title: 'Round',
  props: {
    shape: 'round',
  },
};

const roundedAvatar: ComponentShowcaseItem = {
  title: 'Rounded',
  props: {
    shape: 'rounded',
  },
};

const squareAvatar: ComponentShowcaseItem = {
  title: 'Square',
  props: {
    shape: 'square',
  },
};

const shapeSection: ComponentShowcaseSection = {
  title: 'Shape',
  items: [
    roundAvatar,
    roundedAvatar,
    squareAvatar,
  ],
};

const sizeSection: ComponentShowcaseSection = {
  title: 'Size',
  items: [
    giantAvatar,
    largeAvatar,
    mediumAvatar,
    smallAvatar,
    tinyAvatar,
  ],
};

export const avatarShowcase: ComponentShowcase = {
  sections: [
    sizeSection,
    shapeSection,
  ],
};

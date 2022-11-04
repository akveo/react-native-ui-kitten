import React from 'react';
import { Icon, IconElement, SelectItem } from '@ui-kitten/components';

const StarIcon = (props): IconElement => (
  <Icon
    {...props}
    name='star'
  />
);

const ForwardIcon = (props): IconElement => (
  <Icon
    {...props}
    name='arrow-ios-forward'
  />
);

export const SelectItemSimpleUsageShowcase = (): React.ReactElement => (
  <SelectItem
    accessoryLeft={StarIcon}
    accessoryRight={ForwardIcon}
    title='Option 1'
  />
);

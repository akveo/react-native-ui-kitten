import React from 'react';
import { Icon, SelectItem } from '@ui-kitten/components';

const StarIcon = (props) => (
  <Icon {...props} name='star'/>
);

const ForwardIcon = (props) => (
  <Icon {...props} name='arrow-ios-forward'/>
);

export const SelectItemSimpleUsageShowcase = () => (
  <SelectItem
    accessoryLeft={StarIcon}
    accessoryRight={ForwardIcon}
    title='Option 1'
  />
);

import React from 'react';
import {
  TopNavigation,
  TopNavigationProps,
} from '@kitten/ui';

export const TopNavigationShowcase = (props?: TopNavigationProps): React.ReactElement<TopNavigationProps> => {

  return (
    <TopNavigation{...props}/>
  );
};

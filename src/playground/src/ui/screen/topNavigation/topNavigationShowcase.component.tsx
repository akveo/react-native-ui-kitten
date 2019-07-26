import React from 'react';
import {
  TopNavigation,
  TopNavigationElement,
  TopNavigationProps,
} from '@kitten/ui';

export const TopNavigationShowcase = (props?: TopNavigationProps): TopNavigationElement => {

  return (
    <TopNavigation{...props}/>
  );
};

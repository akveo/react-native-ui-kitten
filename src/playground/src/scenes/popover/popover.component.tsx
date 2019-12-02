import React from 'react';
import {
  PopoverElement,
  PopoverProps,
} from '@ui-kitten/components';
import { ShowcaseContainer } from '@pg/components/showcaseContainer.component';
import { PopoverShowcase } from './popoverShowcase.component';
import {
  popoverSettings,
  popoverShowcase,
} from './type';

export const PopoverScreen = ({ navigation }): React.ReactElement => {

  const renderItem = (props: PopoverProps): PopoverElement => (
    <PopoverShowcase {...props} />
  );

  return (
    <ShowcaseContainer
      showcase={popoverShowcase}
      settings={popoverSettings}
      renderItem={renderItem}
      onBackPress={() => navigation.goBack()}
    />
  );
};


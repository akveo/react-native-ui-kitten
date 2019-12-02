import React from 'react';
import {
  IconElement,
  IconProps,
} from '@ui-kitten/components';
import { ShowcaseContainer } from '@pg/components/showcaseContainer.component';
import { IconShowcase } from './iconShowcase.component';
import {
  iconSettings,
  iconShowcase,
} from './type';

export const IconScreen = ({ navigation }): React.ReactElement => {

  const renderItem = (props: IconProps): IconElement => (
    <IconShowcase {...props} />
  );

  return (
    <ShowcaseContainer
      showcase={iconShowcase}
      settings={iconSettings}
      renderItem={renderItem}
      onBackPress={() => navigation.goBack()}
    />
  );
};


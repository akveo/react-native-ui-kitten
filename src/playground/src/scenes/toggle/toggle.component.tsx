import React from 'react';
import {
  ToggleElement,
  ToggleProps,
} from '@ui-kitten/components';
import { ShowcaseContainer } from '@pg/components/showcaseContainer.component';
import { ToggleShowcase } from './toggleShowcase.component';
import {
  toggleSettings,
  toggleShowcase,
} from './type';

export const ToggleScreen = ({ navigation }): React.ReactElement => {

  const renderItem = (props: ToggleProps): ToggleElement => (
    <ToggleShowcase {...props} />
  );

  return (
    <ShowcaseContainer
      showcase={toggleShowcase}
      settings={toggleSettings}
      renderItem={renderItem}
      onBackPress={() => navigation.goBack()}
    />
  );
};

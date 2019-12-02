import React from 'react';
import {
  OverflowMenuElement,
  OverflowMenuProps,
} from 'react-native-ui-kitten';
import { ShowcaseContainer } from '@pg/components/showcaseContainer.component';
import { OverflowMenuShowcase } from './overflowMenuShowcase.component';
import {
  overflowMenuSettings,
  overflowMenuShowcase,
} from './type';

export const OverflowMenuScreen = ({ navigation }): React.ReactElement => {

  const renderItem = (props: OverflowMenuProps): OverflowMenuElement => (
    <OverflowMenuShowcase {...props} />
  );

  return (
    <ShowcaseContainer
      showcase={overflowMenuShowcase}
      settings={overflowMenuSettings}
      renderItem={renderItem}
      onBackPress={() => navigation.goBack()}
    />
  );
};


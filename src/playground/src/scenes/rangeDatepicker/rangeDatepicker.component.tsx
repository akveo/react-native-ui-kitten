import React from 'react';
import {
  RangeDatepickerElement,
  RangeDatepickerProps,
} from '@ui-kitten/components';
import { ShowcaseContainer } from '@pg/components/showcaseContainer.component';
import { RangeDatepickerShowcase } from './rangeDatepickerShowcase.component';
import { rangeDatepickerShowcase } from './type';

export const RangeDatepickerScreen = ({ navigation }): React.ReactElement => {

  const renderItem = (props: RangeDatepickerProps): RangeDatepickerElement => (
    <RangeDatepickerShowcase {...props} />
  );

  return (
    <ShowcaseContainer
      showcase={rangeDatepickerShowcase}
      renderItem={renderItem}
      onBackPress={() => navigation.goBack()}
    />
  );
};

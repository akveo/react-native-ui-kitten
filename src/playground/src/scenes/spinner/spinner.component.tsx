import React from 'react';
import { ShowcaseContainer } from '@pg/components/showcaseContainer.component';
import { SpinnerShowcase } from './spinnerShowcase.component';
import {
  spinnerSettings,
  spinnerShowcase,
} from './type';

export const SpinnerScreen = ({ navigation }): React.ReactElement => (
  <ShowcaseContainer
    showcase={spinnerShowcase}
    settings={spinnerSettings}
    renderItem={SpinnerShowcase}
    onBackPress={() => navigation.goBack()}
  />
);

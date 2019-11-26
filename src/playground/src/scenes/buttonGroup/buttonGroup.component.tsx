import React from 'react';
import { ShowcaseContainer } from '@pg/components/showcaseContainer.component';
import { ButtonGroupShowcase } from './buttonGroupShowcase.component';
import {
  buttonGroupSettings,
  buttonGroupShowcase,
} from './type';

export const ButtonGroupScreen = ({ navigation }): React.ReactElement => (
  <ShowcaseContainer
    showcase={buttonGroupShowcase}
    settings={buttonGroupSettings}
    renderItem={ButtonGroupShowcase}
    onBackPress={() => navigation.goBack()}
  />
);

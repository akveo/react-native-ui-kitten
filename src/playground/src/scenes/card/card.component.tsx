import React from 'react';
import { ShowcaseContainer } from '@pg/components/showcaseContainer.component';
import { CardShowcase } from './cardShowcase.component';
import {
  cardSettings,
  cardShowcase,
} from './type';

export const CardScreen = ({ navigation }): React.ReactElement => (
  <ShowcaseContainer
    showcase={cardShowcase}
    settings={cardSettings}
    renderItem={CardShowcase}
    onBackPress={() => navigation.goBack()}
  />
);

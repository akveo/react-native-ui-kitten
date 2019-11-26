import React from 'react';
import { ShowcaseContainer } from '@pg/components/showcaseContainer.component';
import { TextShowcase } from './textShowcase.component';
import {
  textSettings,
  textShowcase,
} from './type';

export const TextScreen = ({ navigation }): React.ReactElement => (
  <ShowcaseContainer
    showcase={textShowcase}
    settings={textSettings}
    renderItem={TextShowcase}
    onBackPress={() => navigation.goBack()}
  />
);

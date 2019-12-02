import React from 'react';
import { ShowcaseContainer } from '@pg/components/showcaseContainer.component';
import { ButtonShowcase } from './buttonShowcase.component';
import {
  buttonSettings,
  buttonShowcase,
} from './type';

export const ButtonScreen = ({ navigation }): React.ReactElement => (
  <ShowcaseContainer
    showcase={buttonShowcase}
    settings={buttonSettings}
    renderItem={ButtonShowcase}
    onBackPress={() => navigation.goBack()}>
  </ShowcaseContainer>
);


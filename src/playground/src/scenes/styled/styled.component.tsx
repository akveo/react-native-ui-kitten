import React from 'react';
import { SafeAreaLayoutElement } from '@pg/components/safeAreaLayout';
import {
  StyledComponentElement,
  StyledComponentProps,
  StyledComponentShowcase,
} from './styledComponentShowcase.component';
import { ShowcaseContainer } from '../../components/showcaseContainer.component';
import { styledComponentShowcase } from './type';

export const StyledComponentScreen = ({ navigation }): SafeAreaLayoutElement => {

  const renderItem = (props: StyledComponentProps): StyledComponentElement => (
    <StyledComponentShowcase {...props} />
  );

  return (
    <ShowcaseContainer
      showcase={styledComponentShowcase}
      renderItem={renderItem}
      onBackPress={() => navigation.goBack() }
    />
  );
};

import React from 'react';
import {
  ModalElement,
  ModalProps,
} from '@ui-kitten/components';
import { ShowcaseContainer } from '@pg/components/showcaseContainer.component';
import { ModalShowcase } from './modalShowcase.component';
import { modalShowcase } from './type';

export const ModalScreen = ({ navigation }): React.ReactElement => {

  const renderItem = (props: ModalProps): ModalElement => (
    <ModalShowcase {...props}/>
  );

  return (
    <ShowcaseContainer
      showcase={modalShowcase}
      renderItem={renderItem}
      onBackPress={() => navigation.goBack()}
    />
  );
};


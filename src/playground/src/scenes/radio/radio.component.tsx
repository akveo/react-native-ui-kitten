import React from 'react';
import {
  RadioElement,
  RadioProps,
} from 'react-native-ui-kitten';
import { ShowcaseContainer } from '@pg/components/showcaseContainer.component';
import { RadioShowcase } from './radioShowcase.component';
import {
  radioSettings,
  radioShowcase,
} from './type';

export const RadioScreen = ({ navigation }): React.ReactElement => {

  const renderItem = (props: RadioProps): RadioElement => {
    return (
      <RadioShowcase {...props}/>
    );
  };

  return (
    <ShowcaseContainer
      showcase={radioShowcase}
      settings={radioSettings}
      renderItem={renderItem}
      onBackPress={() => navigation.goBack()}
    />
  );
};

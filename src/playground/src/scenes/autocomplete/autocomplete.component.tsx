import React from 'react';
import {
  AutocompleteElement,
  AutocompleteProps,
} from '@ui-kitten/components';
import { ShowcaseContainer } from '@pg/components/showcaseContainer.component';
import { AutocompleteShowcase } from './autocompleteShowcase.component';
import {
  autocompleteSettings,
  autocompleteShowcase,
  AutocompleteShowcaseOption,
} from './type';

export const AutocompleteScreen = ({ navigation }): React.ReactElement => {

  const renderItem = (props: AutocompleteProps<AutocompleteShowcaseOption>): AutocompleteElement => {
    return (
      <AutocompleteShowcase
        {...props}
      />
    );
  };

  return (
    <ShowcaseContainer
      showcase={autocompleteShowcase}
      settings={autocompleteSettings}
      renderItem={renderItem}
      onBackPress={() => navigation.goBack()}
    />
  );
};

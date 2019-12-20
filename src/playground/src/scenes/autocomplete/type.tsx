import React from 'react';
import {
  Autocomplete,
  AutocompleteOption,
} from '@ui-kitten/components';
import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
  ComponentShowcaseSetting,
} from '@pg/model/componentShowcase.model';
import { StarIcon } from '@pg/icons';
import { CustomOptionsAutocompleteItem } from './autoCompleteShowcaseComponents';

// https://facebook.github.io/react-native/movies.json

export interface AutocompleteShowcaseOption extends AutocompleteOption {
  id: number;
  releaseYear: number;
}

const defaultData: AutocompleteShowcaseOption[] = [
  { id: 1, title: 'Star Wars', releaseYear: 1977 },
  { id: 2, title: 'Back to the Future', releaseYear: 1985 },
  { id: 3, title: 'The Matrix', releaseYear: 1999 },
  { id: 4, title: 'Inception', releaseYear: 2010 },
  { id: 5, title: 'Interstellar', releaseYear: 2014 },
];

const defaultAutocomplete: ComponentShowcaseItem = {
  title: 'Default',
  props: {
    placeholder: 'Place your text',
    data: defaultData,
  },
};

const disabledAutocomplete: ComponentShowcaseItem = {
  title: 'Disabled',
  props: {
    ...defaultAutocomplete.props,
    disabled: true,
  },
};

const labelAutocomplete: ComponentShowcaseItem = {
  title: 'Label',
  props: {
    ...defaultAutocomplete.props,
    label: 'Movies',
  },
};

const captionAutocomplete: ComponentShowcaseItem = {
  title: 'Caption',
  props: {
    ...defaultAutocomplete.props,
    caption: 'You should watch at least one',
  },
};

const captionIconAutocomplete: ComponentShowcaseItem = {
  title: 'Caption Icon',
  props: {
    ...captionAutocomplete.props,
    captionIcon: StarIcon,
  },
};

const iconAutocomplete: ComponentShowcaseItem = {
  title: 'Icon',
  props: {
    ...defaultAutocomplete.props,
    icon: StarIcon,
  },
};

const renderItemAutocomplete: ComponentShowcaseItem = {
  title: 'Render Item',
  props: {
    ...defaultAutocomplete.props,
    renderItem: CustomOptionsAutocompleteItem,
  },
};

const placeholderDataAutocomplete: ComponentShowcaseItem = {
  title: 'Placeholder Data',
  props: {
    ...defaultAutocomplete.props,
    placeholder: '123 for no results',
    placeholderData: [{ title: 'No Results 🙀' }],
  },
};

const defaultSection: ComponentShowcaseSection = {
  items: [
    defaultAutocomplete,
    disabledAutocomplete,
  ],
};

const accessoriesSection: ComponentShowcaseSection = {
  title: 'Accessories',
  items: [
    iconAutocomplete,
    labelAutocomplete,
    // captionAutocomplete,
    // captionIconAutocomplete,
  ],
};

const settingsSection: ComponentShowcaseSection = {
  title: 'Settings',
  items: [
    renderItemAutocomplete,
    placeholderDataAutocomplete,
  ],
};

export const autocompleteShowcase: ComponentShowcase = {
  title: 'Autocomplete',
  sections: [
    defaultSection,
    defaultSection,
    defaultSection,
    accessoriesSection,
    settingsSection,
  ],
};

export const autocompleteSettings: ComponentShowcaseSetting[] = [
  {
    propertyName: 'status',
    value: 'primary',
  },
  {
    propertyName: 'status',
    value: 'success',
  },
  {
    propertyName: 'status',
    value: 'info',
  },
  {
    propertyName: 'status',
    value: 'warning',
  },
  {
    propertyName: 'status',
    value: 'danger',
  },
  {
    propertyName: 'status',
    value: 'basic',
  },
  {
    propertyName: 'status',
    value: 'control',
  },
  {
    propertyName: 'size',
    value: 'small',
  },
  {
    propertyName: 'size',
    value: 'medium',
  },
  {
    propertyName: 'size',
    value: 'large',
  },
];

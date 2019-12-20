import React from 'react';
import {
  ListRenderItemInfo,
  View,
} from 'react-native';
import {
  Avatar,
  Text,
} from '@ui-kitten/components';
import { AutocompleteShowcaseOption } from './type';

type Option = AutocompleteShowcaseOption;

export const CustomOptionsAutocompleteItem = ({ item }: ListRenderItemInfo<Option>) => (
  <React.Fragment>
    <Avatar size='small' source={require('../../assets/images/brand-logo.png')} />
    <View style={{ marginHorizontal: 8 }}>
      <Text>{item.title}</Text>
      <Text appearance='hint' category='p2'>
        {`${item.releaseYear}`}
      </Text>
    </View>
  </React.Fragment>
);

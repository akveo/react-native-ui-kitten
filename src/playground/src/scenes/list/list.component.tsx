import React from 'react';
import { StyleSheet } from 'react-native';
import {
  ListElement,
  ListProps,
} from '@ui-kitten/components';
import { ShowcaseContainer } from '@pg/components/showcaseContainer.component';
import { ListShowcase } from './listShowcase';
import {
  listSettings,
  listShowcase,
} from './type';

export const ListScreen = ({ navigation }): React.ReactElement => {

  const renderItem = (props: ListProps): ListElement => (
    <ListShowcase
      {...props}
      style={[styles.component, props.style]}
    />
  );

  return (
    <ShowcaseContainer
      showcase={listShowcase}
      settings={listSettings}
      renderItem={renderItem}
      onBackPress={() => navigation.goBack()}
    />
  );
};

const styles = StyleSheet.create({
  component: {
    flex: 1,
  },
});


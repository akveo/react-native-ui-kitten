import React from 'react';
import { StyleSheet } from 'react-native';
import {
  TopNavigationElement,
  TopNavigationProps,
} from 'react-native-ui-kitten';
import { ShowcaseContainer } from '@pg/components/showcaseContainer.component';
import { TopNavigationShowcase } from './topNavigationShowcase.component';
import {
  topNavigationSettings,
  topNavigationShowcase,
} from './type';

export const TopNavigationScreen = ({ navigation }): React.ReactElement => {

  const renderItem = (props: TopNavigationProps): TopNavigationElement => (
    <TopNavigationShowcase
      {...props}
      style={[styles.component, props.style]}
    />
  );

  return (
    <ShowcaseContainer
      showcase={topNavigationShowcase}
      settings={topNavigationSettings}
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


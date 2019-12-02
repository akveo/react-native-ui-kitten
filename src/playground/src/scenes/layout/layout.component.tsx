import React from 'react';
import { StyleSheet } from 'react-native';
import {
  LayoutElement,
  LayoutProps,
} from '@ui-kitten/components';
import { ShowcaseContainer } from '@pg/components/showcaseContainer.component';
import { LayoutShowcase } from './layoutShowcase.component';
import {
  layoutSettings,
  layoutShowcase,
} from './type';

export const LayoutScreen = ({ navigation }) => {

  const renderItem = (props: LayoutProps): LayoutElement => (
    <LayoutShowcase
      {...props}
      style={[styles.component, props.style]}
    />
  );

  return (
    <ShowcaseContainer
      showcase={layoutShowcase}
      settings={layoutSettings}
      renderItem={renderItem}
      onBackPress={() => navigation.goBack()}
    />
  );
};

const styles = StyleSheet.create({
  component: {
    flex: 1,
    height: 256,
  },
});


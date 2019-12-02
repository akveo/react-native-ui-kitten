import React from 'react';
import { StyleSheet } from 'react-native';
import {
  TabViewElement,
  TabViewProps,
} from 'react-native-ui-kitten';
import { ShowcaseContainer } from '@pg/components/showcaseContainer.component';
import { TabViewShowcase } from './tabViewShowcase.component';
import { tabViewShowcase } from './type';

export const TabViewScreen = ({ navigation }): React.ReactElement => {

  const renderItem = (props: TabViewProps): TabViewElement => (
    <TabViewShowcase
      {...props}
      style={[styles.component, props.style]}
    />
  );

  return (
    <ShowcaseContainer
      showcase={tabViewShowcase}
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


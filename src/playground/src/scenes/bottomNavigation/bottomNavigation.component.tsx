import React from 'react';
import { StyleSheet } from 'react-native';
import {
  BottomNavigationElement,
  BottomNavigationProps,
} from 'react-native-ui-kitten';
import { ShowcaseContainer } from '@pg/components/showcaseContainer.component';
import { BottomNavigationShowcase } from './bottomNavigationShowcase.component';
import {
  bottomNavigationSettings,
  bottomNavigationShowcase,
} from './type';

export const BottomNavigationScreen = ({ navigation }): React.ReactElement => {

  const renderItem = (props: BottomNavigationProps): BottomNavigationElement => (
    <BottomNavigationShowcase
      {...props}
      style={styles.bottomNavigation}
    />
  );

  return (
    <ShowcaseContainer
      showcase={bottomNavigationShowcase}
      settings={bottomNavigationSettings}
      renderItem={renderItem}
      onBackPress={() => navigation.goBack()}>
    </ShowcaseContainer>
  );
};

const styles = StyleSheet.create({
  bottomNavigation: {
    flex: 1,
  },
});

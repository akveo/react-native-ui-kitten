import React from 'react';
import { StyleSheet } from 'react-native';
import {
  DrawerElement,
  DrawerProps,
} from 'react-native-ui-kitten';
import { ShowcaseContainer } from '@pg/components/showcaseContainer.component';
import { DrawerShowcase } from './drawerShowcase.component';
import { drawerShowcase } from './type';

export const DrawerScreen = ({ navigation }): React.ReactElement => {

  const renderItem = (props: DrawerProps): DrawerElement => (
    <DrawerShowcase
      {...props}
      style={[styles.component, props.style]}
      onPress={navigation.toggleDrawer}
    />
  );

  return (
    <ShowcaseContainer
      showcase={drawerShowcase}
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


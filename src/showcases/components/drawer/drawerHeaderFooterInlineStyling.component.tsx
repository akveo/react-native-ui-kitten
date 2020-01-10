import React from 'react';
import { StyleSheet } from 'react-native';
import { DrawerHeaderFooter } from '@ui-kitten/components';

export const DrawerHeaderFooterInlineStylingShowcase = () => (
  <DrawerHeaderFooter
    style={styles.drawerHeader}
    titleStyle={styles.drawerHeaderTitle}
    descriptionStyle={styles.drawerHeaderDescription}
    title='John Doe'
    description='React Native Developer'
  />
);

const styles = StyleSheet.create({
  drawerHeader: { backgroundColor: 'black' },
  drawerHeaderTitle: { color: 'white' },
  drawerHeaderDescription: { color: 'gray' },
});

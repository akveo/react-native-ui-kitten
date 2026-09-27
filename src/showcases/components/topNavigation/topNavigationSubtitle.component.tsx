import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon, IconElement, Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';

// #1824: with the default (start) alignment the subtitle used to render beside the title.

const MenuIcon = (props): IconElement => (
  <Icon
    {...props}
    name='menu'
  />
);

const MenuAction = (): React.ReactElement => (
  <TopNavigationAction icon={MenuIcon} />
);

export const TopNavigationSubtitleShowcase = (): React.ReactElement => (
  <Layout level='1'>
    <TopNavigation
      testID='top-navigation-subtitle-start'
      style={styles.bar}
      title='Welcome'
      subtitle='How are you doing today'
      accessoryRight={MenuAction}
    />
    <TopNavigation
      testID='top-navigation-subtitle-center'
      style={styles.bar}
      alignment='center'
      title='Welcome'
      subtitle='How are you doing today'
      accessoryLeft={MenuAction}
    />
  </Layout>
);

const styles = StyleSheet.create({
  bar: {
    marginBottom: 8,
  },
});

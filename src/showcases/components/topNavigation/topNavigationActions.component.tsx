/**
 * IMPORTANT: To use Icon component make sure to follow this guide:
 * https://akveo.github.io/react-native-ui-kitten/docs/guides/icon-packages
 */

import React from 'react';
import {
  Icon,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';

const BackIcon = (style) => (
  <Icon {...style} name='arrow-back'/>
);

const EditIcon = (style) => (
  <Icon {...style} name='edit'/>
);

const MenuIcon = (style) => (
  <Icon {...style} name='more-vertical'/>
);

const BackAction = (props) => (
  <TopNavigationAction {...props} icon={BackIcon}/>
);

const EditAction = (props) => (
  <TopNavigationAction {...props} icon={EditIcon}/>
);

const MenuAction = (props) => (
  <TopNavigationAction {...props} icon={MenuIcon}/>
);

export const TopNavigationActionsShowcase = () => {

  const onBackPress = () => {
  };

  const renderLeftControl = () => (
    <BackAction onPress={onBackPress}/>
  );

  const renderRightControls = () => [
    <EditAction/>,
    <MenuAction/>,
  ];

  return (
    <TopNavigation
      title='Application Title'
      leftControl={renderLeftControl()}
      rightControls={renderRightControls()}
    />
  );
};

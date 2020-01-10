import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Icon,
  Layout,
  OverflowMenu,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';

const BackIcon = (style) => (
  <Icon {...style} name='arrow-back'/>
);

const MenuIcon = (style) => (
  <Icon {...style} name='more-vertical'/>
);

const InfoIcon = (style) => (
  <Icon {...style} name='info'/>
);

const LogoutIcon = (style) => (
  <Icon {...style} name='log-out'/>
);

export const TopNavigationWithMenuShowcase = () => {

  const [menuVisible, setMenuVisible] = React.useState(false);

  const menuData = [
    {
      title: 'About',
      icon: InfoIcon,
    },
    {
      title: 'Logout',
      icon: LogoutIcon,
    },
  ];

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const onMenuItemSelect = (index) => {
    // Handle Item Select

    setMenuVisible(false);
  };

  const renderMenuAction = () => (
    <OverflowMenu
      visible={menuVisible}
      data={menuData}
      onSelect={onMenuItemSelect}
      onBackdropPress={toggleMenu}>
      <TopNavigationAction
        icon={MenuIcon}
        onPress={toggleMenu}
      />
    </OverflowMenu>
  );

  const renderBackAction = () => (
    <TopNavigationAction icon={BackIcon}/>
  );

  return (
    <Layout style={styles.container}>
      <TopNavigation
        title='Application Title'
        leftControl={renderBackAction()}
        rightControls={renderMenuAction()}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 192,
  },
});


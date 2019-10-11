import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Icon,
  Layout,
  OverflowMenu,
  TopNavigation,
  TopNavigationAction,
} from 'react-native-ui-kitten';

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

export class TopNavigationWithMenuShowcase extends React.Component {

  state = {
    menuVisible: false,
  };

  menuData = [
    { title: 'About', icon: InfoIcon },
    { title: 'Logout', icon: LogoutIcon },
  ];

  onMenuActionPress = () => {
    const menuVisible = !this.state.menuVisible;
    this.setState({ menuVisible });
  };

  onMenuItemSelect = (index) => {
    // Handle Item Select

    this.setState({ menuVisible: false });
  };

  renderMenuAction = () => (
    <OverflowMenu
      visible={this.state.menuVisible}
      data={this.menuData}
      placement='bottom end'
      onSelect={this.onMenuItemSelect}
      onBackdropPress={this.onMenuActionPress}>
      <TopNavigationAction
        icon={MenuIcon}
        onPress={this.onMenuActionPress}
      />
    </OverflowMenu>
  );

  renderBackAction = () => (
    <TopNavigationAction icon={BackIcon} />
  );

  render() {
    return (
      <Layout style={styles.container}>
        <TopNavigation
          title='Application Title'
          leftControl={this.renderBackAction()}
          rightControls={this.renderMenuAction()}
        />
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    minHeight: 192,
  },
});


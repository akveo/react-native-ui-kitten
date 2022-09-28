import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { Divider, Drawer, DrawerItem, Icon, IconElement } from '@ui-kitten/components';

const PersonIcon = (props): IconElement => (
  <Icon
    {...props}
    name='person-outline'
  />
);

const BellIcon = (props): IconElement => (
  <Icon
    {...props}
    name='bell-outline'
  />
);

const ForwardIcon = (props): IconElement => (
  <Icon
    {...props}
    name='arrow-ios-forward'
  />
);

const Header = (props): React.ReactElement => (
  <>
    <ImageBackground
      // eslint-disable-next-line react/prop-types
      style={[props.style, styles.header]}
      source={require('../../assets/icon.png')}
    />
    <Divider />
  </>
);

export const DrawerAccessoriesShowcase = (): React.ReactElement => {

  const [selectedIndex, setSelectedIndex] = React.useState(null);

  return (
    <Drawer
      header={Header}
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}
    >
      <DrawerItem
        title='Users'
        accessoryLeft={PersonIcon}
        accessoryRight={ForwardIcon}
      />
      <DrawerItem
        title='Orders'
        accessoryLeft={BellIcon}
        accessoryRight={ForwardIcon}
      />
    </Drawer>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 128,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

import React from 'react';
import { ImageProps, StyleSheet } from 'react-native';
import { Avatar, Button, ListItem, Text } from '@ui-kitten/components';

// Built once per press handler (outside render) so the accessory keeps a stable component type.
const createInstallAccessory = (onPress: () => void) => (): React.ReactElement => (
  <Button testID='list-item-install' size='tiny' onPress={onPress}>
    INSTALL
  </Button>
);

const ItemImage = (props: ImageProps): React.ReactElement => (
  <Avatar
    {...props}
    style={[props.style, styles.itemImage]}
    source={require('../../assets/icon.png')}
  />
);

export const ListItemSimpleUsageShowcase = (): React.ReactElement => {
  const [last, setLast] = React.useState('none');
  const installAccessory = React.useMemo(() => createInstallAccessory(() => setLast('install')), []);
  return (
    <>
      <Text testID='list-item-value'>{`Last press: ${last}`}</Text>
      <ListItem
        testID='list-item-row'
        title='UI Kitten'
        description='A set of React Native components'
        accessoryLeft={ItemImage}
        accessoryRight={installAccessory}
        onPress={() => setLast('row')}
      />
    </>
  );
};

const styles = StyleSheet.create({
  itemImage: {
    tintColor: null,
  },
});

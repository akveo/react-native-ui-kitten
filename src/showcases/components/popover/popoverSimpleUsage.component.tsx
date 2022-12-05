import React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, Button, Layout, Popover, Text } from '@ui-kitten/components';

export const PopoverSimpleUsageShowcase = (): React.ReactElement => {

  const [visible, setVisible] = React.useState(false);

  const renderToggleButton = (): React.ReactElement => (
    <Button onPress={() => setVisible(true)}>
      TOGGLE POPOVER
    </Button>
  );

  return (
    <Popover
      visible={visible}
      anchor={renderToggleButton}
      onBackdropPress={() => setVisible(false)}
    >
      <Layout style={styles.content}>
        <Avatar
          style={styles.avatar}
          source={require('../../assets/icon.png')}
        />
        <Text>
          Welcome to UI Kitten 😻
        </Text>
      </Layout>
    </Popover>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  avatar: {
    marginHorizontal: 4,
  },
});


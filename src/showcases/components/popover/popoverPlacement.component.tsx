import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Button, IndexPath, Layout, Popover, Select, SelectItem, Text } from '@ui-kitten/components';

const placements = [
  'top',
  'top start',
  'top end',
  'bottom',
  'bottom start',
  'bottom end',
  'left',
  'left start',
  'left end',
  'right',
  'right start',
  'right end',
  'inner',
  'inner bottom',
  'inner top',
];

export const PopoverPlacementShowcase = (): React.ReactElement => {

  const [visible, setVisible] = React.useState(false);
  const [placementIndex, setPlacementIndex] = React.useState(new IndexPath(4));
  const placement = placements[placementIndex.row];

  const onPlacementSelect = (index): void => {
    setPlacementIndex(index);
  };

  const renderToggleButton = (): React.ReactElement => (
    <Button onPress={() => setVisible(true)}>
      TOGGLE POPOVER
    </Button>
  );

  const renderPlacementItem = (title): React.ReactElement => (
    <SelectItem title={title} />
  );

  return (
    <>
      <Select
        placeholder='Select Placement'
        value={placement}
        selectedIndex={placementIndex}
        onSelect={onPlacementSelect}
      >
        {placements.map(renderPlacementItem)}
      </Select>

      <View style={styles.buttonContainer}>
        <Popover
          anchor={renderToggleButton}
          visible={visible}
          placement={placement}
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
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 64,
  },
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

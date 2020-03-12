import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, IndexPath, Layout, MenuItem, OverflowMenu, Select, SelectItem } from '@ui-kitten/components';

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
];

export const OverflowMenuPlacementShowcase = () => {

  const [visible, setVisible] = React.useState(false);
  const [placementIndex, setPlacementIndex] = React.useState(new IndexPath(1, 0));
  const placement = placements[placementIndex.row];

  const onPlacementSelect = (index) => {
    setPlacementIndex(index);
  };

  const renderToggleButton = () => (
    <Button onPress={() => setVisible(true)}>
      TOGGLE MENU
    </Button>
  );

  const renderPlacementItem = (title) => (
    <SelectItem title={title}/>
  );

  return (
    <React.Fragment>

      <Select
        placeholder='Select Placement'
        value={placement}
        selectedIndex={placementIndex}
        onSelect={onPlacementSelect}>
        {placements.map(renderPlacementItem)}
      </Select>

      <View style={styles.buttonContainer}>

        <OverflowMenu
          anchor={renderToggleButton}
          visible={visible}
          placement={placement}
          onBackdropPress={() => setVisible(false)}>
          <MenuItem title='Users'/>
          <MenuItem title='Orders'/>
          <MenuItem title='Transactions'/>
        </OverflowMenu>

      </View>

    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 80,
  },
});

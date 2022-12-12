import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, IndexPath, Layout, Select, SelectItem, Tooltip } from '@ui-kitten/components';

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

export const TooltipPlacementShowcase = (): React.ReactElement => {

  const [visible, setVisible] = React.useState(false);
  const [placementIndex, setPlacementIndex] = React.useState(new IndexPath(1, 0));
  const placement = placements[placementIndex.row];

  const onPlacementSelect = (index): void => {
    setPlacementIndex(index);
  };

  const renderToggleButton = (): React.ReactElement => (
    <Button onPress={() => setVisible(true)}>
      TOGGLE TOOLTIP
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

      <Layout
        style={styles.buttonContainer}
        level='1'
      >

        <Tooltip
          anchor={renderToggleButton}
          visible={visible}
          placement={placement}
          onBackdropPress={() => setVisible(false)}
        >
          Welcome to UI Kitten 😻
        </Tooltip>

      </Layout>

    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 64,
  },
});

import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon, Layout, Select, SelectItem } from '@ui-kitten/components';

const StarIcon = (props) => (
  <Icon {...props} name='star'/>
);

const ForwardIcon = (props) => (
  <Icon {...props} name='arrow-ios-forward'/>
);

export const SelectAccessoriesShowcase = () => {

  const [selectedIndex, setSelectedIndex] = React.useState();

  const onSelect = (index) => {
    setSelectedIndex(index);
  };

  return (
    <Layout style={styles.container}>
      <Select
        label='Label'
        caption='Caption'
        selectedIndex={selectedIndex}
        onSelect={onSelect}>
        <SelectItem
          title='Option 1'
          accessoryLeft={StarIcon}
          accessoryRight={ForwardIcon}
        />
        <SelectItem
          title='Option 2'
          accessoryLeft={StarIcon}
          accessoryRight={ForwardIcon}
        />
        <SelectItem
          title='Option 3'
          accessoryLeft={StarIcon}
          accessoryRight={ForwardIcon}
        />
      </Select>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 228,
  },
});


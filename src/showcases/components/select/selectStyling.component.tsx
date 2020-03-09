import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Select, SelectItem, Text } from '@ui-kitten/components';

const MySelectItem = (props) => (
  <SelectItem
    {...props}
    title={evaProps => <Text {...evaProps}>{props.title}</Text>}
  />
);

const MySelect = (props) => (
  <Select
    {...props}
    label={evaProps => <Text {...evaProps}>{props.label}</Text>}
    caption={evaProps => <Text {...evaProps}>{props.caption}</Text>}
    placeholder={evaProps => <Text {...evaProps}>{props.placeholder}</Text>}
  />
);

export const SelectStylingShowcase = () => {

  const [selectedIndex, setSelectedIndex] = React.useState();

  const onSelect = (index) => {
    setSelectedIndex(index);
  };

  return (
    <Layout style={styles.container}>
      <MySelect
        label='Label'
        caption='Caption'
        placeholder='Place your Text'
        selectedIndex={selectedIndex}
        onSelect={onSelect}>
        <MySelectItem title='Option 1'/>
        <MySelectItem title='Option 2'/>
        <MySelectItem title='Option 3'/>
      </MySelect>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 228,
  },
});


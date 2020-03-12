import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout, Select, SelectItem } from '@ui-kitten/components';

const useSelectState = (initialState = undefined) => {
  const [selectedIndex, setSelectedIndex] = React.useState(initialState);
  return { selectedIndex, onSelect: setSelectedIndex };
};

export const SelectStatusShowcase = () => {

  const primarySelectState = useSelectState();
  const successSelectState = useSelectState();
  const infoSelectState = useSelectState();
  const warningSelectState = useSelectState();
  const dangerSelectState = useSelectState();
  const basicSelectState = useSelectState();
  const controlSelectState = useSelectState();

  return (
    <React.Fragment>

      <Select
        style={styles.select}
        status='primary'
        placeholder='Primary'
        {...primarySelectState}>
        <SelectItem title='Option 1'/>
        <SelectItem title='Option 2'/>
        <SelectItem title='Option 3'/>
      </Select>

      <Layout style={styles.rowContainer} level='1'>

        <Select
          style={styles.select}
          status='success'
          placeholder='Success'
          {...successSelectState}>
          <SelectItem title='Option 1'/>
          <SelectItem title='Option 2'/>
          <SelectItem title='Option 3'/>
        </Select>

        <Select
          style={styles.select}
          status='info'
          placeholder='Info'
          {...infoSelectState}>
          <SelectItem title='Option 1'/>
          <SelectItem title='Option 2'/>
          <SelectItem title='Option 3'/>
        </Select>

      </Layout>

      <Layout style={styles.rowContainer} level='1'>

        <Select
          style={styles.select}
          status='warning'
          placeholder='Warning'
          {...warningSelectState}>
          <SelectItem title='Option 1'/>
          <SelectItem title='Option 2'/>
          <SelectItem title='Option 3'/>
        </Select>

        <Select
          style={styles.select}
          status='danger'
          placeholder='Danger'
          {...dangerSelectState}>
          <SelectItem title='Option 1'/>
          <SelectItem title='Option 2'/>
          <SelectItem title='Option 3'/>
        </Select>

      </Layout>

      <Layout style={styles.rowContainer} level='1'>

        <Select
          style={styles.select}
          status='basic'
          placeholder='Basic'
          {...basicSelectState}>
          <SelectItem title='Option 1'/>
          <SelectItem title='Option 2'/>
          <SelectItem title='Option 3'/>
        </Select>

        <View style={styles.controlContainer}>
          <Select
            style={styles.select}
            status='control'
            placeholder='Control'
            {...controlSelectState}>
            <SelectItem title='Option 1'/>
            <SelectItem title='Option 2'/>
            <SelectItem title='Option 3'/>
          </Select>
        </View>

      </Layout>

    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  select: {
    flex: 1,
    margin: 2,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  controlContainer: {
    borderRadius: 4,
    margin: 2,
    padding: 6,
    backgroundColor: '#3366FF',
  },
});

import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {
  Layout,
  Select,
} from '@ui-kitten/components';

const useSelectChanges = (initialSelection = null) => {
  const [selectedOption, setSelectedOption] = React.useState(initialSelection);
  return {
    selectedOption,
    onSelect: setSelectedOption,
  };
};

const data = [
  { text: 'Option 1' },
  { text: 'Option 2' },
  { text: 'Option 3' },
];

export const SelectStatusShowcase = () => {

  const primarySelectChanges = useSelectChanges();
  const successSelectChanges = useSelectChanges();
  const infoSelectChanges = useSelectChanges();
  const warningSelectChanges = useSelectChanges();
  const dangerSelectChanges = useSelectChanges();
  const basicSelectChanges = useSelectChanges();
  const controlSelectChanges = useSelectChanges();

  return (
    <Layout>

      <Select
        style={styles.select}
        data={data}
        status='primary'
        placeholder='Primary'
        {...primarySelectChanges}
      />

      <Select
        style={styles.select}
        data={data}
        status='success'
        placeholder='Success'
        {...successSelectChanges}
      />

      <Select
        style={styles.select}
        data={data}
        status='info'
        placeholder='Info'
        {...infoSelectChanges}
      />

      <Select
        style={styles.select}
        data={data}
        status='warning'
        placeholder='Warning'
        {...warningSelectChanges}
      />

      <Select
        style={styles.select}
        data={data}
        status='danger'
        placeholder='Danger'
        {...dangerSelectChanges}
      />

      <Select
        style={styles.select}
        data={data}
        status='basic'
        placeholder='Basic'
        {...basicSelectChanges}
      />

      <View style={styles.controlContainer}>
        <Select
          style={styles.select}
          data={data}
          status='control'
          placeholder='Control'
          {...controlSelectChanges}
        />
      </View>

    </Layout>
  );
};

const styles = StyleSheet.create({
  select: {
    margin: 8,
  },
  controlContainer: {
    borderRadius: 4,
    margin: 8,
    backgroundColor: '#3366FF',
  },
});

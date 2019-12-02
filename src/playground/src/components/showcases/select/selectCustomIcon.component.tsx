/**
 * IMPORTANT: To use Icon component make sure to follow this guide:
 * https://akveo.github.io/react-native-ui-kitten/docs/guides/icon-packages
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Icon,
  Layout,
  Select,
} from '@ui-kitten/components';

const data = [
  { text: 'Option 1' },
  { text: 'Option 2' },
  { text: 'Option 3' },
];

export const SelectCustomIconShowcase = () => {

  const [selectedOption, setSelectedOption] = React.useState(null);

  const renderIcon = (style, visible) => (
    <Icon {...style} name={visible ? 'arrow-ios-upward' : 'arrow-ios-downward'}/>
  );

  return (
    <Layout style={styles.container}>
      <Select
        data={data}
        icon={renderIcon}
        selectedOption={selectedOption}
        onSelect={setSelectedOption}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 228,
  },
});

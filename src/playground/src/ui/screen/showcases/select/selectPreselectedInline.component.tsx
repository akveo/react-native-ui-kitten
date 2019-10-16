/**
 * IMPORTANT: Do not forget to set keyExtractor property in such case!
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Select,
} from 'react-native-ui-kitten';

export class SelectPreselectedInlineShowcase extends React.Component {

  data = [
    { text: 'Option 1' },
    { text: 'Option 2' },
    { text: 'Option 3' },
  ];

  state = {
    selectedOption: { text: 'Option 2' },
  };

  onSelect = (selectedOption) => {
    this.setState({ selectedOption });
  };

  extractKey = (item) => {
    return item.text;
  };

  render() {
    return (
      <Layout style={styles.container}>
        <Select
          style={styles.select}
          data={this.data}
          selectedOption={this.state.selectedOption}
          keyExtractor={this.extractKey}
          onSelect={this.onSelect}
        />
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 230,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  select: {
    flex: 1,
    marginHorizontal: 4,
  },
});

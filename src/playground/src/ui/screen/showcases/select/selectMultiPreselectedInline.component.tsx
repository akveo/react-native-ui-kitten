/**
 * IMPORTANT: Do not forget to set keyExtractor property in such case!
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Select,
} from 'react-native-ui-kitten';

export class SelectMultiPreselectedInlineShowcase extends React.Component {

  data = [
    { text: 'Option 1' },
    { text: 'Option 2' },
    { text: 'Option 3' },
  ];

  state = {
    selectedOption: [
      { text: 'Option 2' },
      { text: 'Option 3' },
    ],
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
          data={this.data}
          multiSelect={true}
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
    height: 230,
    padding: 16,
  },
});


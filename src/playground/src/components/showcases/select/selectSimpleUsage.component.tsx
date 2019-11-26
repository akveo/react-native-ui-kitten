import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Select,
} from 'react-native-ui-kitten';

export class SelectSimpleUsageShowcase extends React.Component {

  data = [
    { text: 'Option 1' },
    { text: 'Option 2' },
    { text: 'Option 3', disabled: true },
    { text: 'Option 4' },
  ];

  state = {
    selectedOption: null,
  };

  onSelect = (selectedOption) => {
    this.setState({ selectedOption });
  };

  render() {
    return (
      <Layout style={styles.container}>
        <Select
          style={styles.select}
          data={this.data}
          placeholder='Active'
          selectedOption={this.state.selectedOption}
          onSelect={this.onSelect}
        />
        <Select
          style={styles.select}
          data={this.data}
          placeholder='Disabled'
          disabled={true}
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

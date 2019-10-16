import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Select,
} from 'react-native-ui-kitten';

export class SelectPreselectedReferenceShowcase extends React.Component {

  data = [
    { text: 'Option 1' },
    { text: 'Option 2' },
    { text: 'Option 3' },
  ];

  state = {
    selectedOption: this.data[1],
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
          selectedOption={this.state.selectedOption}
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

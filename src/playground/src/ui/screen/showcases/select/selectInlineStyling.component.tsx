import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Select,
} from 'react-native-ui-kitten';

export class SelectInlineStylingShowcase extends React.Component {

  private data = [
    { text: 'Option 1' },
    { text: 'Option 2', textStyle: styles.option2 },
    { text: 'Option 3' },
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
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          controlStyle={styles.controlStyle}
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
    height: 230,
    padding: 16,
  },
  labelStyle: {
    color: 'gray',
  },
  placeholderStyle: {
    color: 'gray',
  },
  controlStyle: {
    borderRadius: 8,
  },
  option2: {
    color: 'red',
    fontSize: 18,
  },
});

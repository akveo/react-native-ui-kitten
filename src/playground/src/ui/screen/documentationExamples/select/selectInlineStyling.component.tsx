import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { Select } from 'react-native-ui-kitten';

export class SelectInlineStylingShowcase extends React.Component {

  private items = [
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
      <View style={styles.container}>
        <Select
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          controlStyle={styles.controlStyle}
          data={this.items}
          selectedOption={this.state.selectedOption}
          onSelect={this.onSelect}
        />
      </View>
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

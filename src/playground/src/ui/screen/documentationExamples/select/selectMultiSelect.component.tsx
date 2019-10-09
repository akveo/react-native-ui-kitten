import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { Select } from 'react-native-ui-kitten';

export class SelectMultiSelectShowcase extends React.Component {

  items = [
    { text: 'Option 1' },
    { text: 'Option 2' },
    { text: 'Option 3' },
    { text: 'Option 4' },
  ];

  state = {
    selectedOption: [],
  };

  onSelect = (selectedOption) => {
    this.setState({ selectedOption });
  };

  render() {
    return (
      <View style={styles.container}>
        <Select
          data={this.items}
          multiSelect={true}
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
});


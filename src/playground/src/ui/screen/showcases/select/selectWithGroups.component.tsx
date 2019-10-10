import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { Select } from 'react-native-ui-kitten';

export class SelectWithGroupsShowcase extends React.Component {

  items = [
    { text: 'Option 1' },
    { text: 'Option 2' },
    {
      text: 'Option 3',
      items: [{ text: 'Option 31' }, { text: 'Option 32' }, { text: 'Option 33' }],
    },
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
      <View style={styles.container}>
        <Select
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
});


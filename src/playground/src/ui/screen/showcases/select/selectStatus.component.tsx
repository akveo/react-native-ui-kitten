import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { Select } from 'react-native-ui-kitten';

export class SelectStatusShowcase extends React.Component {

  items = [
    { text: 'Option 1' },
    { text: 'Option 2' },
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
          data={this.items}
          status='primary'
          selectedOption={this.state.selectedOption}
          onSelect={this.onSelect}
        />
        <Select
          data={this.items}
          status='success'
          selectedOption={this.state.selectedOption}
          onSelect={this.onSelect}
        />
        <Select
          data={this.items}
          status='info'
          selectedOption={this.state.selectedOption}
          onSelect={this.onSelect}
        />
        <Select
          data={this.items}
          status='warning'
          selectedOption={this.state.selectedOption}
          onSelect={this.onSelect}
        />
        <Select
          data={this.items}
          status='danger'
          selectedOption={this.state.selectedOption}
          onSelect={this.onSelect}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

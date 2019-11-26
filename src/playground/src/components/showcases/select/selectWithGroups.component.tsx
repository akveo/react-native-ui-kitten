import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Select,
} from 'react-native-ui-kitten';

export class SelectWithGroupsShowcase extends React.Component {

  items = [
    { text: 'Option 1' },
    { text: 'Option 2' },
    {
      text: 'Option 3',
      items: [
        { text: 'SubOption 1' },
        { text: 'SubOption 2' },
      ],
    },
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
          data={this.items}
          selectedOption={this.state.selectedOption}
          onSelect={this.onSelect}
        />
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 280,
    padding: 16,
  },
});


import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Select,
} from 'react-native-ui-kitten';

export class SelectStatusShowcase extends React.Component {

  data = [
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
      <Layout style={styles.container}>
        <Select
          data={this.data}
          status='primary'
          placeholder='Primary'
          selectedOption={this.state.selectedOption}
          onSelect={this.onSelect}
        />
        <Select
          data={this.data}
          status='success'
          placeholder='Success'
          selectedOption={this.state.selectedOption}
          onSelect={this.onSelect}
        />
        <Select
          data={this.data}
          status='info'
          placeholder='Info'
          selectedOption={this.state.selectedOption}
          onSelect={this.onSelect}
        />
        <Select
          data={this.data}
          status='warning'
          placeholder='Warning'
          selectedOption={this.state.selectedOption}
          onSelect={this.onSelect}
        />
        <Select
          data={this.data}
          status='danger'
          placeholder='Danger'
          selectedOption={this.state.selectedOption}
          onSelect={this.onSelect}
        />
        <Select
          data={this.data}
          status='basic'
          placeholder='Basic'
          selectedOption={this.state.selectedOption}
          onSelect={this.onSelect}
        />
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

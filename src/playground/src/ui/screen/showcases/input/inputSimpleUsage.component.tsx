import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Input,
  Layout,
} from 'react-native-ui-kitten';

export class InputSimpleUsageShowcase extends React.Component {

  state = {
    value: '',
  };

  onChangeText = (value) => {
    this.setState({ value });
  };

  render() {
    return (
      <Layout style={styles.container}>
        <Input
          style={styles.input}
          value={this.state.value}
          onChangeText={this.onChangeText}
          placeholder='Place your Text'
        />
        <Input
          style={styles.input}
          disabled={true}
          placeholder='Place your Text'
        />
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  input: {
    marginVertical: 4,
    marginHorizontal: 4,
  },
});


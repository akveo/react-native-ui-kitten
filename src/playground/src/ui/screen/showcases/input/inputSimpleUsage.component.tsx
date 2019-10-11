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
          placeholder='Active'
        />
        <Input
          style={styles.input}
          disabled={true}
          placeholder='Disabled'
        />
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  input: {
    flex: 1,
    marginHorizontal: 4,
  },
});


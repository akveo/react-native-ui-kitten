import React from 'react';
import { Input } from 'react-native-ui-kitten';

export class InputSimpleUsageShowcase extends React.Component {

  state = {
    value: '',
  };

  onChangeText = (value) => {
    this.setState({ value });
  };

  render() {
    return (
      <Input
        value={this.state.value}
        onChangeText={this.onChangeText}
        placeholder='Place your Text'
      />
    );
  }
}

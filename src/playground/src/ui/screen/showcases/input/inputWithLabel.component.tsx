import React from 'react';
import { Input } from 'react-native-ui-kitten';

export class InputWithLabelShowcase extends React.Component {

  state = {
    value: '',
  };

  onChangeText = (value) => {
    this.setState({ value });
  };

  render() {
    return (
      <Input
        label='LABEL'
        placeholder='Place your Text'
        value={this.state.value}
        onChangeText={this.onChangeText}
      />
    );
  }
}

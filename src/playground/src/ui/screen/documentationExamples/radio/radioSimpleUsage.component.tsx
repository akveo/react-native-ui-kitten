import React from 'react';
import { Radio } from 'react-native-ui-kitten';

export class RadioSimpleUsageShowcase extends React.Component {

  state = {
    checked: false,
  };

  onChange = (checked) => {
    this.setState({ checked });
  };

  render() {
    return (
      <Radio
        checked={this.state.checked}
        onChange={this.onChange}
      />
    );
  }
}

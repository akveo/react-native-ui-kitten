import React from 'react';
import { Toggle } from 'react-native-ui-kitten';

export class ToggleWithTextShowcase extends React.Component {

  state = {
    checked: false,
  };

  onChange = (checked) => {
    this.setState({ checked });
  };

  render() {
    return (
      <Toggle
        checked={this.state.checked}
        text='Place your Text'
        onChange={this.onChange}
      />
    );
  }
}

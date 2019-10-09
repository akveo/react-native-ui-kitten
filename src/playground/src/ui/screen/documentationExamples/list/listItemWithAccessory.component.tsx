import React from 'react';
import {
  CheckBox,
  ListItem,
} from 'react-native-ui-kitten';

export class ListItemWithAccessoryShowcase extends React.Component {

  state = {
    checked: false,
  };

  onCheckBoxCheckedChange = (index) => {
    const checked = !this.state.checked;
    this.setState({ checked });
  };

  renderAccessory = (style, index) => (
    <CheckBox
      style={style}
      checked={this.state.checked}
      onChange={() => this.onCheckBoxCheckedChange(index)}
    />
  );

  render() {
    return (
      <ListItem
        title='Title'
        description='Description'
        accessory={this.renderAccessory}
      />
    );
  }
}

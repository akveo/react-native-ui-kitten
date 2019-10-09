/**
 * IMPORTANT: To use Icon component make sure to follow this guide:
 * https://akveo.github.io/react-native-ui-kitten/docs/guides/eva-icons
 */

import React from 'react';
import {
  Icon,
  Input,
} from 'react-native-ui-kitten';

export class IconWithinInputShowcase extends React.Component {

  state = {
    value: '',
    secureTextEntry: true,
  };

  onChangeText = (value) => {
    this.setState({ value });
  };

  onIconPress = () => {
    const secureTextEntry = !this.state.secureTextEntry;
    this.setState({ secureTextEntry });
  };

  renderIcon = (style) => (
    <Icon
      {...style}
      name={!this.state.secureTextEntry ? 'eye' : 'eye-off'}
    />
  );

  render() {
    return (
      <Input
        placeholder='Password'
        value={this.state.value}
        secureTextEntry={this.state.secureTextEntry}
        onChangeText={this.onChangeText}
        icon={this.renderIcon}
        onIconPress={this.onIconPress}
      />
    );
  }
}

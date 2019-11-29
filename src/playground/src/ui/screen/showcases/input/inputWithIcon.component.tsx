/**
 * IMPORTANT: To use Icon component make sure to follow this guide:
 * https://akveo.github.io/react-native-ui-kitten/docs/guides/icon-packages
 */

import React from 'react';
import { Icon, Input } from 'react-native-ui-kitten';

export class InputWithIconShowcase extends React.Component {

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

  renderIcon = (style) => {
    const iconName = this.state.secureTextEntry ? 'eye-off' : 'eye';
    return (
      <Icon {...style} name={iconName}/>
    );
  };

  render() {
    return (
      <Input
        value={this.state.value}
        placeholder='Place your Text'
        icon={this.renderIcon}
        secureTextEntry={this.state.secureTextEntry}
        onIconPress={this.onIconPress}
        onChangeText={this.onChangeText}
      />
    );
  }
}

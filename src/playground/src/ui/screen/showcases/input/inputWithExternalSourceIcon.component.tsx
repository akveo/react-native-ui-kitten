/**
 * IMPORTANT: To use Icon component make sure to follow this guide:
 * https://akveo.github.io/react-native-ui-kitten/docs/guides/eva-icons
 */

import React from 'react';
import { Icon, Input } from 'react-native-ui-kitten';
import { Image } from 'react-native';

export class InputWithExternalSourceIconShowcase extends React.Component {

  state = {
    value: '',
  };

  onChangeText = (value) => {
    this.setState({ value });
  };

  renderIcon = (style) => {
    return (
      <Image
        style={style}
        source={{uri: 'https://akveo.github.io/eva-icons/fill/png/128/eye-off.png'}}
      />
    );
  };

  render() {
    return (
      <Input
        value={this.state.value}
        placeholder='Place your Text'
        icon={this.renderIcon}
        secureTextEntry={true}
        onChangeText={this.onChangeText}
      />
    );
  }
}

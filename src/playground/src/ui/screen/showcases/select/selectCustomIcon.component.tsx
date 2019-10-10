// IMPORTANT: To use Icon component make sure to follow this guide:
// https://akveo.github.io/react-native-ui-kitten/docs/guides/eva-icons

import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {
  Select,
  Icon,
} from 'react-native-ui-kitten';

export class SelectCustomIconShowcase extends React.Component {

  items = [
    { text: 'Option 1' },
    { text: 'Option 2' },
    { text: 'Option 3' },
  ];

  state = {
    selectedOption: null,
  };

  onSelect = (selectedOption) => {
    this.setState({ selectedOption });
  };

  renderIcon = (style, visible) => {
    const iconName = visible ? 'arrow-ios-upward' : 'arrow-ios-downward';
    return (
      <Icon {...style} name={iconName}/>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Select
          data={this.items}
          selectedOption={this.state.selectedOption}
          icon={this.renderIcon}
          onSelect={this.onSelect}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 230,
    padding: 16,
  },
});

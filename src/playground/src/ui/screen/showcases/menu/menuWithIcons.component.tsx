// IMPORTANT: To use Icon component make sure to follow this guide:
// https://akveo.github.io/react-native-ui-kitten/docs/guides/eva-icons

import React from 'react';
import {
  View,
  StyleSheet,
  Image,
} from 'react-native';
import {
  Menu,
  Icon,
} from 'react-native-ui-kitten';

const StarIcon = (style) => (
  <Icon {...style} name='star'/>
);

const KittenIcon = (style) => (
  <Image style={style} source={require('../../../../assets/brand-logo.png')}/>
);

export class MenuWithIconsShowcase extends React.Component {

  state = {
    selectedIndex: null,
  };

  data = [
    { title: 'Item 1', icon: StarIcon },
    { title: 'Item 2', icon: KittenIcon },
    { title: 'Item 3', icon: StarIcon },
  ];

  onSelect = (selectedIndex) => {
    this.setState({ selectedIndex });
  };

  render() {
    return (
      <View style={styles.container}>
        <Menu
          data={this.data}
          selectedIndex={this.state.selectedIndex}
          onSelect={this.onSelect}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

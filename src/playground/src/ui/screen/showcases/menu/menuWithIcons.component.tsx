/**
 * IMPORTANT: To use Icon component make sure to follow this guide:
 * https://akveo.github.io/react-native-ui-kitten/docs/guides/icon-packages
 */

import React from 'react';
import {
  Icon,
  Menu,
} from 'react-native-ui-kitten';

const StarIcon = (style) => (
  <Icon {...style} name='star'/>
);

export class MenuWithIconsShowcase extends React.Component {

  state = {
    selectedIndex: null,
  };

  data = [
    {
      title: 'Item 1',
      icon: StarIcon,
    },
    {
      title: 'Item 2',
      icon: StarIcon,
    },
    {
      title: 'Item 3',
      icon: StarIcon,
    },
    {
      title: 'Item 4',
      icon: StarIcon,
    },
  ];

  onSelect = (selectedIndex) => {
    this.setState({ selectedIndex });
  };

  render() {
    return (
      <Menu
        data={this.data}
        selectedIndex={this.state.selectedIndex}
        onSelect={this.onSelect}
      />
    );
  }
}

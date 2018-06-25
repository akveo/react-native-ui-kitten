import React from 'react';
import { RkGallery } from 'react-native-ui-kitten';

export class GalleryScreen extends React.Component {
  static items = [
    require('../img/animal.jpeg'),
    require('../img/animal.jpeg'),
    require('../img/animal.jpeg'),
    require('../img/animal.jpeg'),
    require('../img/animal.jpeg'),
    require('../img/animal.jpeg'),
    require('../img/animal.jpeg'),
    require('../img/animal.jpeg'),
  ];

  render() {
    return (
      <RkGallery
        items={GalleryScreen.items}
        spanCount={4}
      />
    );
  }
}

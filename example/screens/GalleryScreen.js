import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RkGallery, RkText } from 'react-native-ui-kitten';

export class GalleryScreen extends React.Component {
  static navigationOptions = {
    title: 'Gallery',
  };

  static items = [
    require('../img/flowers.jpeg'),
    require('../img/animal.jpeg'),
    require('../img/bird.jpeg'),
    require('../img/clock.jpg'),
    require('../img/fireworks.jpeg'),
    require('../img/night.jpeg'),
    require('../img/river.jpeg'),
    require('../img/sea.jpg'),
    require('../img/sun.jpg'),
    require('../img/wood.jpeg'),
    require('../img/flowers.jpeg'),
    require('../img/tree.jpeg'),
  ];

  onGridItemClick = (item, index) => {
    console.log(`${this.constructor.name}: onGridItemClick: ${index}`);
  };

  onGalleryItemClick = (item, index) => {
    console.log(`${this.constructor.name}: onGalleryItemClick: ${index}`);
  };

  onGalleryItemChange = (change) => {
    console.log(`${this.constructor.name}: onGalleryItemChange: ${JSON.stringify(change, null, 2)}`);
  };

  onGalleryItemScaleChange = (item, index, change) => {
    console.log(`${this.constructor.name}: onGalleryItemScaleChange: ${JSON.stringify(change, null, 2)}`);
  };

  render() {
    return (
      <View style={styles.section}>
        <RkText style={styles.header} rkType='header'>Gallery Example</RkText>
        <RkGallery
          items={GalleryScreen.items}
          gridSpanCount={4}
          gridItemMargin={1}
          onGridItemClick={this.onGridItemClick}
          onGalleryItemClick={this.onGalleryItemClick}
          onGalleryItemChange={this.onGalleryItemChange}
          onGalleryItemScaleChange={this.onGalleryItemScaleChange}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 8,
  },
  section: {
    paddingHorizontal: 4,
  },
});

import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  RkGallery,
  RkText,
  RkButton,
} from 'react-native-ui-kitten';
import { UtilStyles } from '../style/styles';

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

  state = {
    customGallery: {
      previewImageIndex: undefined,
    },
  };

  // Customized gallery callbacks

  onGridItemClick = (item, index) => {
    console.log(`${this.constructor.name}: onGridItemClick: ${index}`);
  };

  onGalleryItemClick = (item, index) => {
    console.log(`${this.constructor.name}: onGalleryItemClick: ${index}`);
  };

  onGalleryItemChange = (change) => {
    this.state.customGallery.previewImageIndex = change.current;
    console.log(`${this.constructor.name}: onGalleryItemChange: ${JSON.stringify(change, null, 2)}`);
  };

  onGalleryItemScaleChange = (item, index, change) => {
    console.log(`${this.constructor.name}: onGalleryItemScaleChange: ${JSON.stringify(change, null, 2)}`);
  };

  renderGalleryHeader = (onRequestClose) => (
    <View style={styles.customizedGalleryHeader}>
      <RkButton
        rkType='clear'
        onPress={onRequestClose}
      >Back
      </RkButton>
      <RkText
        style={styles.customizedGalleryHeaderText}
        rkType='header'
      >{this.state.customGallery.previewImageIndex + 1}/{GalleryScreen.items.length}
      </RkText>
    </View>
  );

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={UtilStyles.container}>
          <View style={styles.section}>
            <RkText style={styles.header} rkType='header'>Default implementation</RkText>
            <RkGallery items={GalleryScreen.items} />
          </View>
          <View style={styles.section}>
            <RkText style={styles.header} rkType='header'>Customized implementation</RkText>
            <RkGallery
              items={GalleryScreen.items}
              gridSpanCount={4}
              gridItemMargin={1}
              renderGalleryHeader={this.renderGalleryHeader}
              onGridItemClick={this.onGridItemClick}
              onGalleryItemClick={this.onGalleryItemClick}
              onGalleryItemChange={this.onGalleryItemChange}
              onGalleryItemScaleChange={this.onGalleryItemScaleChange}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 8,
    fontSize: 16,
  },
  section: {
    paddingHorizontal: 4,
  },
  customizedGalleryHeader: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 16,
  },
  customizedGalleryHeaderText: {
    fontSize: 16,
    color: 'white',
  },
});

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
    <View style={customGalleryStyles.headerFooter}>
      <RkButton
        rkType='clear'
        onPress={onRequestClose}>
        Back
      </RkButton>
      <RkText
        style={customGalleryStyles.headerFooterText}
        rkType='header'>{this.state.customGallery.previewImageIndex + 1}/{GalleryScreen.items.length}
      </RkText>
    </View>
  );

  renderGalleryFooter = () => (
    <View style={customGalleryStyles.headerFooter}>
      <RkText
        rkType='header'
        style={customGalleryStyles.headerFooterText}>
        Likes
      </RkText>
      <RkText
        rkType='header'
        style={customGalleryStyles.headerFooterText}>
        Comments
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
              style={customGalleryStyles.container}
              itemStyle={customGalleryStyles.item}
              items={GalleryScreen.items}
              spanCount={4}
              renderGalleryHeader={this.renderGalleryHeader}
              renderGalleryFooter={this.renderGalleryFooter}
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
});

const customGalleryStyles = StyleSheet.create({
  container: {},
  item: {
    borderRadius: 8,
    margin: 1,
  },
  headerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 16,
  },
  headerFooterText: {
    fontSize: 16,
    color: 'white',
  },
});

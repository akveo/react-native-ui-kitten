import React from 'react';
import {
  View,
  ScrollView,
  FlatList,
  Alert,
  Dimensions,
} from 'react-native';
import {
  RkButton,
  RkModalImg,
  RkText,
  RkStyleSheet,
} from 'react-native-ui-kitten';
import Icon from 'react-native-vector-icons/FontAwesome';
import { UtilStyles } from '../style/styles';

export class ImageScreen extends React.Component {
  static navigationOptions = {
    title: 'Images',
  };

  items = [
    require('../img/animal.jpeg'),
    require('../img/bird.jpeg'),
    require('../img/clock.jpg'),
    require('../img/flowers.jpeg'),
    require('../img/fireworks.jpeg'),
    require('../img/night.jpeg'),
    require('../img/river.jpeg'),
    require('../img/sea.jpg'),
    require('../img/sun.jpg'),
    require('../img/wood.jpeg'),
    require('../img/flowers.jpeg'),
    require('../img/tree.jpeg'),
  ];
  imageSize = (Dimensions.get('window').width - 16) / 3;

  extractGalleryItemKey = (item, index) => index.toString();

  onFooterLikeButtonPress = () => {
    Alert.alert('I Like it!');
  };

  renderCustomHeader = (options) => (
    <View style={styles.customHeader}>
      <RkButton
        rkType='clear'
        onPress={options.closeImage}>Close
      </RkButton>
      <RkButton rkType='clear'>
        <Icon style={styles.dot} name="circle" />
        <Icon style={styles.dot} name="circle" />
        <Icon style={styles.dot} name="circle" />
      </RkButton>
    </View>
  );

  renderCustomFooter = () => (
    <View style={styles.customFooter}>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <RkButton
          rkType='clear small'
          onPress={this.onFooterLikeButtonPress}>
          <Icon style={styles.buttonIcon} name="heart" />
          <RkText rkType='inverse'>18</RkText>
        </RkButton>
      </View>
      <View style={{ flex: 1 }}>
        <RkButton rkType='clear small'>
          <Icon style={styles.buttonIcon} name="comment-o" />
          <RkText rkType='inverse'>2</RkText>
        </RkButton>
      </View>
      <View style={{ flex: 1 }}>
        <RkButton rkType='clear small'>
          <Icon style={styles.buttonIcon} name="send-o" />
          <RkText rkType='inverse'>7</RkText>
        </RkButton>
      </View>
    </View>
  );

  renderGalleryItemView = ({ item }) => (
    <RkModalImg
      style={{ width: this.imageSize, height: this.imageSize }}
      source={item}
    />
  );

  renderGallery = () => (
    <FlatList
      data={this.items}
      numColumns={3}
      renderItem={this.renderGalleryItemView}
      keyExtractor={this.extractGalleryItemKey}
    />
  );

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          automaticallyAdjustContentInsets={true}
          style={UtilStyles.container}>
          <View style={[UtilStyles.section, UtilStyles.bordered, styles.imagesContainer]}>
            <RkText rkType='header' style={styles.header}>Basic example</RkText>
            <View style={[UtilStyles.rowContainer, { paddingLeft: 2 }]}>
              <RkModalImg
                style={{ width: this.imageSize, height: this.imageSize }}
                source={require('../img/animal.jpeg')}
              />
              <RkModalImg
                style={{ width: this.imageSize, height: this.imageSize }}
                source={require('../img/clock.jpg')}
              />
              <RkModalImg
                style={{ width: this.imageSize, height: this.imageSize }}
                source={require('../img/post2.png')}
              />
            </View>
          </View>
          <View style={[UtilStyles.section, UtilStyles.bordered, styles.imagesContainer]}>
            <RkText rkType='header' style={styles.header}>Custom header and footer</RkText>
            <View style={[UtilStyles.rowContainer, { paddingLeft: 2 }]}>
              <RkModalImg
                style={{ width: this.imageSize, height: this.imageSize }}
                renderHeader={this.renderCustomHeader}
                renderFooter={this.renderCustomFooter}
                headerContentStyle={{ backgroundColor: 'red' }}
                source={require('../img/post1.png')}
              />
              <RkModalImg
                style={{ width: this.imageSize, height: this.imageSize }}
                renderHeader={this.renderCustomHeader}
                renderFooter={this.renderCustomFooter}
                source={require('../img/river.jpeg')}
              />
              <RkModalImg
                style={{ width: this.imageSize, height: this.imageSize }}
                renderHeader={this.renderCustomHeader}
                renderFooter={this.renderCustomFooter}
                source={require('../img/post3.png')}
              />
            </View>
          </View>
          <View style={[UtilStyles.section, UtilStyles.bordered, styles.imagesContainer]}>
            <RkText rkType='header' style={styles.header}>Gallery Example</RkText>
            <View style={[UtilStyles.rowContainer, { paddingLeft: 2 }]}>
              {this.renderGallery()}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

let styles = RkStyleSheet.create(theme => ({
  listContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  imagesContainer: {
    paddingHorizontal: 0,
  },
  header: {
    paddingHorizontal: 24,
  },
  customHeader: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  customFooter: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  dot: {
    fontSize: 6.5,
    marginLeft: 4,
    marginVertical: 6,
    color: theme.colors.text.inverse,
  },
  buttonIcon: {
    marginRight: 7,
    fontSize: 19.7,
    color: theme.colors.text.inverse,
  },
}));

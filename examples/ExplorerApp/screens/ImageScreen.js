import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ListView,
  Dimensions, Alert
} from 'react-native';
import {
  RkButton,
  RkModalImg,
  RkText,
  RkStyleSheet
} from 'react-native-ui-kitten';

import {UtilStyles} from '../style/styles';
import Icon from 'react-native-vector-icons/FontAwesome';

export class ImageScreen extends Component {
  static navigationOptions = {
    title: 'Images'
  };

  constructor(props) {
    super(props);

    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});
    this._images = [
      require('../img/animal.jpeg'),
      require('../img/bird.jpeg'),
      require('../img/clock.jpg'),
      require('../img/flowers.jpeg'),
      require('../img/fireworks.jpeg'),
      require('../img/night.jpeg'),
      require('../img/river.jpeg'),
      require('../img/sea.jpg'),
      require('../img/sun.jpg'),
    ];
    this.state = {
      ds: ds.cloneWithRows(this._images),
    };

    let {width} = Dimensions.get('window');
    this.imgSize = (width - 16) / 3;
  }

  _renderFooter(options) {
    return (
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 20
      }}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <RkButton rkType='clear small' onPress={(x) => Alert.alert('I Like it!')}>
            <Icon name={'heart'} style={styles.buttonIcon}/>
            <RkText rkType='inverse'>18</RkText>
          </RkButton>
        </View>
        <View style={{flex: 1}}>
          <RkButton rkType='clear small'>
            <Icon name={'comment-o'} style={styles.buttonIcon}/>
            <RkText rkType='inverse'>2</RkText>
          </RkButton>
        </View>
        <View style={{flex: 1}}>
          <RkButton rkType='clear small'>
            <Icon name={'send-o'} style={styles.buttonIcon}/>
            <RkText rkType='inverse'>7</RkText>
          </RkButton>
        </View>
      </View>
    );
  }

  _renderHeader(options) {
    return (
      <View style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
        <RkButton rkType='clear' onPress={options.closeImage}>Close</RkButton>
        <RkButton rkType='clear'>
          <Icon style={styles.dot} name={'circle'}/>
          <Icon style={styles.dot} name={'circle'}/>
          <Icon style={styles.dot} name={'circle'}/>
        </RkButton>
      </View>
    );
  }

  _renderGallery() {
    return (
      <ListView
        pageSize={3}
        contentContainerStyle={{
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          flexDirection: 'row',
          flexWrap: 'wrap'
        }}
        scrollRenderAheadDistance={500}
        dataSource={this.state.ds}
        renderRow={(rowData, sectionID, rowID) => {
          return (
            <RkModalImg
              style={{width: this.imgSize, height: this.imgSize}}
              source={this._images}
              index={rowID}/>
          )
        }}
      />
    )
  }

  render() {
    return (
      <View style={{flex: 1}}>

        <ScrollView
          automaticallyAdjustContentInsets={true}
          style={UtilStyles.container}>

          <View style={[UtilStyles.section, UtilStyles.bordered, styles.imagesContainer]}>
            <RkText style={styles.header} rkType='header'>Basic example</RkText>
            <View style={[UtilStyles.rowContainer, {paddingLeft: 2}]}>
              <RkModalImg style={{width: this.imgSize, height: this.imgSize}} source={require('../img/animal.jpeg')}/>
              <RkModalImg style={{width: this.imgSize, height: this.imgSize}} source={require('../img/clock.jpg')}/>
              <RkModalImg style={{width: this.imgSize, height: this.imgSize}} source={require('../img/post2.png')}/>
            </View>
          </View>
          <View style={[UtilStyles.section, UtilStyles.bordered, styles.imagesContainer]}>
            <RkText style={styles.header} rkType='header'>Custom header and footer</RkText>
            <View style={[UtilStyles.rowContainer, {paddingLeft: 2}]}>
              <RkModalImg style={{width: this.imgSize, height: this.imgSize}}
                          renderHeader={this._renderHeader}
                          renderFooter={this._renderFooter}
                          headerContentStyle={{backgroundColor: 'red'}}
                          source={require('../img/post1.png')}/>
              <RkModalImg style={{width: this.imgSize, height: this.imgSize}}
                          renderHeader={this._renderHeader}
                          renderFooter={this._renderFooter}
                          source={require('../img/river.jpeg')}/>
              <RkModalImg style={{width: this.imgSize, height: this.imgSize}}
                          renderHeader={this._renderHeader}
                          renderFooter={this._renderFooter}
                          source={require('../img/post3.png')}/>

            </View>
          </View>
          <View style={[UtilStyles.section, UtilStyles.bordered, styles.imagesContainer]}>
            <RkText style={styles.header} rkType='header'>Gallery Example</RkText>
            <View style={[UtilStyles.rowContainer, {paddingLeft: 2}]}>
              {this._renderGallery()}
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  imagesContainer: {
    paddingHorizontal: 0
  },
  header: {
    paddingHorizontal: 24,
  },
  dot: {
    fontSize: 6.5,
    marginLeft: 4,
    marginVertical: 6,
    color: theme.colors.text.inverse
  },
  buttonIcon: {
    marginRight: 7,
    fontSize: 19.7,
    color: theme.colors.text.inverse
  },
}));
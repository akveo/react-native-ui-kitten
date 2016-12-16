import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ListView,
  Dimensions,
  StatusBar
} from 'react-native';

import {RkButton, RkConfig, RkStyle, RkModalImg, RkTextInput, RkBarBg} from 'react-native-ui-kit';

import {UtilStyles} from '../utils/styles';
import Icon from 'react-native-vector-icons/Ionicons';

export class ImageScreen extends Component {

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
      require('../img/tree.jpeg'),
      require('../img/wood.jpeg'),
    ];
    this.state = {
      ds: ds.cloneWithRows(this._images),
    };

  }

  render() {
    return (
      <View style={{flex: 1}}>

        <ScrollView
          automaticallyAdjustContentInsets={true}
          style={[UtilStyles.container, {backgroundColor: RkConfig.colors.grey300}]}>

          <View style={UtilStyles.section}>
            <Text style={UtilStyles.titleText}>Basic example</Text>
            <View style={UtilStyles.rowContainer}>
              <RkModalImg
                style={{width: 100, height: 100, resizeMode: "cover"}}
                source={require('../img/river.jpeg')}/>
            </View>
          </View>
          <View style={UtilStyles.section}>
            <Text style={UtilStyles.titleText}>Custom header and footer</Text>
            <View style={UtilStyles.rowContainer}>
              <RkModalImg
                renderHeader={this._renderHeader}
                renderFooter={this._renderFooter}
                style={{width: 100, height: 100, resizeMode: "cover"}}
                source={require('../img/river.jpeg')}/>
            </View>
          </View>
          <View style={[UtilStyles.section]}>
            <Text style={UtilStyles.titleText}>Gallery example</Text>
            <View style={UtilStyles.rowContainer}>
              {this._renderGallery()}
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }

  _renderFooter(closeImage, pageNumber, totalPages, delimiter) {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' ,paddingVertical: 10, paddingHorizontal: 20}}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <RkButton rkType='clear' style={{paddingHorizontal: 5, paddingVertical: 5}}
                    innerStyle={{fontSize: 26, color: 'white'}}>
            <Icon name={'ios-heart'}/>
          </RkButton>
          <Text style={[RkStyle.whiteText, {fontSize: 16, marginTop: -3}]}>12</Text>
        </View>
        <View style={{flex: 1}}>
          <RkButton rkType='clear' style={{marginLeft: 10, paddingHorizontal: 5, paddingVertical: 5}}
                    innerStyle={{fontSize: 26, color: 'white'}}>
            <Icon name={'ios-chatboxes-outline'}/>
          </RkButton>
        </View>
        <View style={{flex: 1}}></View>
      </View>
    );
  }

  _renderHeader(closeImage, pageNumber, totalPages, delimiter) {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <RkButton innerStyle={{color: 'white'}} style={{width: 60}} type={'clear'}
                    onPress={closeImage}>Close</RkButton>
        </View>
        <View style={{flex: 1}}>
          <Text style={{textAlign: 'center', color: 'white'}}>header</Text>
        </View>
        <View style={{flex: 1}}></View>
      </View>
    );
  }

  _renderGallery() {
    let {width} = Dimensions.get('window');
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
              style={{width: (width-50)/3, height: 120 , resizeMode: "cover"}}
              source={this._images}
              index={rowID}/>
          )
        }}
        />
    )
  }

}
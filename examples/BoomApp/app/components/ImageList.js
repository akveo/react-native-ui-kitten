import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import {RkConfig, RkStyle, RkModalImg, RkButton} from 'react-native-ui-kit';

export default class ImageList extends Component {

  constructor(props){
    super(props);
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});
    this.state = {
      dataSource: ds.cloneWithRows(props.posts),
    };
  }

  render(){
    let {width} = Dimensions.get('window');
    return (
      <ListView
        horizontal
        style={[this.props.style]}
        dataSource={this.state.dataSource}
        renderRow={(rowData, sectionID, rowID) => this._renderImage(rowData, sectionID, rowID, width)}
        />
    )
  }

  _renderImage(post, sectionID, rowID, width) {
    return (
      <RkModalImg
        style={{width: 200, height: 180, margin: 5, resizeMode: "cover"}}
        imageInModalStyle={{width: width, flex: 1, resizeMode: "contain", margin: 0}}
        source={this.props.posts.map((p) => p.img)}
        index={rowID}/>
    );
  }

}
import React, {Component} from 'react';
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

  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});
    this.state = {
      dataSource: ds.cloneWithRows(props.posts),
    };
  }

  render() {
    let {width} = Dimensions.get('window');
    return (
      <ListView
        pageSize={3}
        contentContainerStyle={{
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          flexDirection: 'row',
          flexWrap: 'wrap',
          padding: 5
        }}
        dataSource={this.state.dataSource}
        renderRow={(rowData, sectionID, rowID) => this._renderImage(rowData, sectionID, rowID, width)}
      />
    )
  }

  _renderImage(post, sectionID, rowID, width) {
    let margin = 5;
    let rowSize = 3;
    let size = width/rowSize  - margin * 2 - 10/rowSize;
    return (
      <RkModalImg
        style={{width: size, height: size, resizeMode: "cover", margin}}
        imageInModalStyle={{margin: 0}}
        source={this.props.posts.map((p) => p.img)}
        index={rowID}/>
    );
  }

}
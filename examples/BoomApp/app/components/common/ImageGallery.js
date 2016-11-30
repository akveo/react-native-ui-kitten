import React, {Component} from 'react';
import {
  StyleSheet,
  ListView,
  Dimensions,
} from 'react-native';

import {RkModalImg} from 'react-native-ui-kit';

export default class ImageGallery extends Component {

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
        contentContainerStyle={[styles.listStyle, this.props.style]}
        dataSource={this.state.dataSource}
        renderRow={(rowData, sectionID, rowID) => this._renderImage(rowID, width)}
      />
    )
  }

  _renderImage(rowID, width) {
    let margin = 5;
    let rowSize = 3;
    let size = width/rowSize  - margin * 2 - 10/rowSize;
    return (
      <RkModalImg
        style={{width: size, height: size, resizeMode: "cover", margin}}
        imageInModalStyle={styles.modalStyle}
        source={this.props.posts.map((p) => p.img)}
        index={rowID}/>
    );
  }

}

const styles = StyleSheet.create({
  listStyle:{
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5
  },
  modalStyle:{
    margin: 0
  }
});
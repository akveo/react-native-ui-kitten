import React, {Component} from 'react';
import {
  ListView,
} from 'react-native';

import FollowerItem from "./common/FollowerItem";
import {RkSeparator}  from 'react-native-ui-kit';

export default class FriendList extends Component {

  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});
    this._data = props.friends;
    this.state = {
      dataSource: ds.cloneWithRows(this._data),
    };
  }

  render() {
    return (
      <ListView
        style={[this.props.style, {flex: 1}]}
        scrollEnabled={false}
        dataSource={this.state.dataSource}
        renderSeparator={(sId,rId) => <RkSeparator key={rId}/>}
        renderRow={(rowData) => <FollowerItem user={rowData}/>}
      />
    )
  }

}
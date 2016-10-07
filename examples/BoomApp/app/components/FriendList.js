import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  TouchableOpacity
} from 'react-native';

import {RkConfig, RkSeparator, RkStyle, RkButton} from 'react-native-ui-kit';
import Icon from '../../node_modules/react-native-vector-icons/Ionicons';

export default class FriendList extends Component {

  constructor(props){
    super(props);
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});
    this._data = props.friends;
    this.state = {
      dataSource: ds.cloneWithRows(this._data),
    };
  }

  render(){
    return (
      <ListView
        style={[this.props.style, {paddingLeft: 10}]}
        dataSource={this.state.dataSource}
        renderSeparator={(sID, rID) => this._renderSeparator(sID, rID)}
        renderRow={(rowData) => this._renderFriend(rowData)}
        />
    )
  }

  _renderSeparator(sectionID, rowID, highlited){
    if(rowID == this.state.dataSource.getRowCount() -1){
      return (<View key={`${sectionID}-${rowID}`}/>);
    }
    return (<RkSeparator key={`${sectionID}-${rowID}`} style={{marginVertical: 3}}/>);
  }

  _renderFriend(user) {
    return (
      <TouchableOpacity>
        <View style={[RkStyle.card.header,]}>
          <Image source={user.avatar} style={RkStyle.card.avatarSmallImg}/>
          <View style={RkStyle.card.titleContainer}>
            <Text style={RkStyle.card.title}>{user.name.first} {user.name.first}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
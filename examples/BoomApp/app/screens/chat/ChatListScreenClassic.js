import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  ScrollView,
  ListView,
  TouchableOpacity
} from 'react-native';

import {RkConfig, RkSeparator, RkStyle, RkButton} from 'react-native-ui-kit';
import Icon from '../../../node_modules/react-native-vector-icons/Ionicons';

import ScreenService from '../../ScreenService';

export default class ChatListScreen extends Component {

  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    let data = [
      {
        my: true,
        text: "Some test"
      },
      {
        my: false,
        text: "Some test"
      },
      {
        my: false,
        text: "Some test"
      },
      {
        my: true,
        text: "Some test"
      },
      {
        my: false,
        text: "Some test"
      },
      {
        my: true,
        text: "Some test"
      },
      {
        my: false,
        text: "Some test"
      },
      {
        my: true,
        text: "Some test"
      },
    ];
    this.state = {
      dataSource: ds.cloneWithRows(data)
    };
  }


  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView
          style={[RkStyle.lightGrayBg]}
          automaticallyAdjustContentInsets={true}>
          <ListView
            renderSeparator={()=> <RkSeparator/>}
            dataSource={this.state.dataSource}
            renderRow={(rowData) => this._renderRow(rowData)}
            />
        </ScrollView>
      </View>
    );
  }

  _renderRow() {
    return (
      <TouchableOpacity style={RkStyle.card.card} onPress={()=>{this._openChat()}}>
        <View style={RkStyle.card.header}>
          <Image source={require('../../../img/avatars/boy.jpeg')} style={RkStyle.card.avatarSmallImg}/>
          <View style={RkStyle.card.titleContainer}>
            <Text style={RkStyle.card.title}>Jesus Man</Text>
            <Text style={RkStyle.card.subTitle}>Hello, could you please...</Text>
          </View>
          <View style={RkStyle.card.headerControls}>
            <Text style={RkStyle.card.subTitle}>11 minuets ago</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  _openChat() {
    this.props.navigator.push({
      title: 'Jesus Man',
      component: ScreenService.getChatScreen(true),
      barTintColor: RkConfig.colors.primary,
      titleTextColor: RkConfig.colors.white,
      navigationBarHidden: false,
    });
  }
}

let styles = StyleSheet.create({});

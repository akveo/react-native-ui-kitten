import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ListView,
  Dimensions
} from 'react-native';

import {RkButton, RkConfig, RkStyle, RkBoardUpView, RkTextInput} from 'react-native-ui-kit';

import {UtilStyles} from '../utils/styles';
import Icon from 'react-native-vector-icons/Ionicons';

export class BoardUpScreen extends Component {

  constructor(props) {
    super(props);
    let {height} = Dimensions.get('window');
    let ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this._messages = []
    this._height = height - 52;
    this.state = {
      message: '',
      dataSource: ds.cloneWithRows(this._messages),
    };

  }

  render() {
    return (
      <View>
        <RkBoardUpView style={[RkStyle.lightGrayBg]}>
          <ScrollView
            automaticallyAdjustContentInsets={true}
            style={{height: this._height}}>
            <View style={{height: 550, justifyContent: 'flex-end'}}>
              <View>
                <ListView
                  scrollEnabled={false}
                  renderHeader={()=>this._renderHeader()}
                  enableEmptySections
                  dataSource={this.state.dataSource}
                  renderRow={(rowData) => this._renderRow(rowData)}
                  />
              </View>
            </View>
          </ScrollView>
          <View
            style={{height: 52, flexDirection: 'row',backgroundColor: 'white', paddingVertical: 10,paddingHorizontal: 5}}>
            <RkTextInput style={{height: 16}}
                         placeholder='Message...'
                         placeholderColor={RkConfig.colors.lightGray}
                         type='bordered'
                         onChangeText={message => this.setState({message})}
                         value={this.state.message}
                         clearButtonMode='while-editing'
                         containerStyle={{marginHorizontal: 20, paddingVertical: 1}}/>
            <RkButton type='clear' style={{paddingVertical: 5}} onPress={()=>this._sendMessage()}>Send</RkButton>
          </View>
        </RkBoardUpView>
      </View>
    )
  }

  _sendMessage() {
    if (this.state.message) {
      this._messages = this._messages.concat([this.state.message]);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this._messages),
        message: ''
      });
    }
  }

  _renderHeader() {
    return (
      <View style={{padding: 10}}>
        <Text style={{textAlign: 'center', color: RkConfig.colors.darkGray}}>RkBoardUpView provides you...</Text>
      </View>
    )
  }

  _renderRow(message) {
    let containerStyle = {
      backgroundColor: RkConfig.colors.primary,
      alignSelf: 'flex-end',
      marginLeft: 50,
      marginRight: 10,
    }
    return (
      <View style={[{padding: 10, borderRadius: 20, marginVertical: 5}, containerStyle]}>
        <View>
          <Text>{message}</Text>
        </View>
      </View>
    );
  }
}
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  ListView,
  ScrollView,
  Dimensions
} from 'react-native';

import {RkConfig, RkButton, RkSeparator, RkStyle, RkTextInput, RkBoardUpView, RkBarBg} from 'react-native-ui-kit';
import Icon from '../../../node_modules/react-native-vector-icons/Ionicons';

export default class ChatScreen extends Component {

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
        text: "Some test  dswfasdf asdf asdf asdf as asd aasdfasd fsdf:"
      },
      {
        my: false,
        text: "Some testd asdf asdf asdf asdfasdf"
      },
      {
        my: true,
        text: "Some test"
      },
      {
        my: false,
        text: "Some test sdf asdf asdfasd fasdf"
      },
      {
        my: true,
        text: "Some test asdf asdf sadf"
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
        my: true,
        text: "Some test"
      },
      {
        my: true,
        text: "Some test"
      },
      {
        my: true,
        text: "Some test"
      },
      {
        my: true,
        text: "Some test"
      },
      {
        my: true,
        text: "Some test"
      },
    ];
    this.state = {
      dataSource: ds.cloneWithRows(data),
      listHeight: Dimensions.get('window').height - 50
    };

  }


  render() {
    return (
      <View>
        <RkBoardUpView>
          <ListView
            style={[{padding: 15, height: this.state.listHeight}, RkStyle.lightGrayBg]}
            dataSource={this.state.dataSource}
            renderRow={(rowData) => this._renderRow(rowData)}
            />
          <View
            style={{flexDirection: 'row',backgroundColor: 'white', paddingVertical: 10,paddingHorizontal: 5}}>
            <RkTextInput style={{height: 16}}
                         placeholder='Message...'
                         placeholderColor={RkConfig.colors.lightGray}
                         type='bordered'
                         clearButtonMode='while-editing'
                         containerStyle={{marginHorizontal: 20, paddingVertical: 1}}/>
            <RkButton type='clear' style={{paddingVertical: 5}}>Send</RkButton>
          </View>
        </RkBoardUpView>
        <RkBarBg/>
      </View>
    );
  }

  _renderRow(message) {
    let containerStyle = message.my ? {
      backgroundColor: RkConfig.colors.primary,
      alignSelf: 'flex-end',
      marginLeft: 50,
    } : {
      backgroundColor: RkConfig.colors.white,
      alignSelf: 'flex-start',
      marginRight: 50,
    };
    return (
      <View style={[{padding: 10, borderRadius: 20, marginVertical: 5}, containerStyle]}>
        <View>
          <Text>{message.text}</Text>
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({});

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  TouchableOpacity
} from 'react-native';

import {RkConfig, RkSeparator, RkStyle} from 'react-native-ui-kit';

export default class ContactList extends Component {

  constructor(props){
    super(props);
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});
    this.state = {
      dataSource: ds.cloneWithRows(props.contacts),
    };
  }

  render(){
    return (
      <ListView
        style={[this.props.style]}
        dataSource={this.state.dataSource}
        renderSeparator={(sID, rID) => this._renderSeparator(sID, rID)}
        renderRow={(rowData) => this._renderContact(rowData)}
        />
    )
  }

  _renderSeparator(sectionID, rowID, highlited){
    if(rowID == this.state.dataSource.getRowCount() -1){
      return (<View key={`${sectionID}-${rowID}`}/>);
    }
    return (<RkSeparator key={`${sectionID}-${rowID}`} style={{marginVertical: 3}}/>);
  }

  _renderContact(contact) {
    return (
      <TouchableOpacity>
        <View style={{paddingHorizontal: 10, paddingVertical: 7}}>
          <Text style={{fontSize: 12, color: RkConfig.colors.primary, marginBottom: 5}}>{contact.label}</Text>
          <Text>{contact.value}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
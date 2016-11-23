import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  TouchableOpacity
} from 'react-native';

import {RkCard, RkConfig, RkText, RkButton} from 'react-native-ui-kit';
import Icon from '../../node_modules/react-native-vector-icons/Ionicons';

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
        renderRow={(rowData) => this._renderFriend(rowData)}
      />
    )
  }

  _renderFriend(user) {
    return (
      <TouchableOpacity>
        <RkCard rkCardFriendContainer>
          <View rkCardHeader rkCardFriendHeader>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={user.avatar} rkCardAvatarSmall/>
              <View>
                <RkText rkCardFriendTitle>{user.name.first} {user.name.last}</RkText>
              </View>
            </View>
            <RkButton><Icon rkCardIcon name='ios-person-add-outline'/></RkButton>
          </View>
        </RkCard>
      </TouchableOpacity>
    );
  }
}
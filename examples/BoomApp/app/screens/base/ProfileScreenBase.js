import React, {Component} from 'react';
import {
  View,
} from 'react-native';

import {RkText, RkTabView} from 'react-native-ui-kit';
import api from '../../util/ApiMock';
import FriendList from '../../components/FriendList';
import PostList from '../../components/PostList';
import ImageList from '../../components/ImageList';


export default class ProfileScreenBase extends Component {

  constructor(props) {
    super(props);
    this._friends = api.getUserFriends(api.userId).concat(api.getUserFriends(api.userId));
  }

  _renderTab(selected, tab, styles) {
    return (
      <View style={[styles.statContainer, selected ? styles.statContainerSelected : {}]}>
        <RkText style={[styles.statText, styles.titleStatText]}>{tab.value}</RkText>
        <RkText style={[styles.statText]}>{tab.name}</RkText>
      </View>
    )
  }

  _renderTabs(styles) {
    return (
      <RkTabView tabsContainerStyle={styles.tabView}>
        <RkTabView.Tab title={(selected) => this._renderTab(selected, {name: 'Posts', value: '62'}, styles)}>
          <PostList style={styles.tabContent}
                    posts={api.getUserPosts(api.userId)}
                    iconStyle={styles.postIconsStyle}/>
        </RkTabView.Tab>
        <RkTabView.Tab title={(selected) => this._renderTab(selected, {name: 'Followers', value: '124'}, styles)}>
          <View style={styles.tabContent}>
            <FriendList
              friends={this._friends}
              cardStyle={styles.friendCard}
              headerStyle={styles.friendHeader}
              iconStyle={styles.friendIcon}
            />
          </View>
        </RkTabView.Tab>
        <RkTabView.Tab title={(selected) => this._renderTab(selected, {name: 'Photo', value: '48'}, styles)}>
          <View style={[styles.tabContent]}>
            <ImageList posts={api.getUserPosts(api.userId)}/>
          </View>
        </RkTabView.Tab>
      </RkTabView>
    );
  }

}


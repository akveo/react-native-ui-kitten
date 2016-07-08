import React, {Component} from 'react';

import {
  View,
  TouchableOpacity,
  ListView,
  Text,
  Dimensions,
} from 'react-native';

import { RkConfig} from '../../config/config';
import {RkTab} from './Tab'

export class RkTabView extends Component {

  static Tab = RkTab;

  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      index: +props.index || 0,
      tabStore: ds
    }
  }

  render() {
    let scrollableHeader = !!this.props.maxVisibleTabs;
    let tabs = this._getTabs(this.props.children);
    let {width} = Dimensions.get('window');
    let tabWidth = width / (scrollableHeader ? this.props.maxVisibleTabs : tabs.length);
    return (
      <View style={{flex: 1}}>
        {this._renderTabs(tabs, tabWidth, scrollableHeader)}
        {tabs[this.state.index]}
      </View>
    );
  }

  _getTabs(child) {
    if (!Array.isArray(child)) child = [];
    return child.filter(elem => elem.type === RkTab)
  }

  _renderTabs(tabs, tabWidth, scrollableHeader) {
    return (
      <ListView
        scrollEnabled={scrollableHeader}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal
        dataSource={this.state.tabStore.cloneWithRows(tabs)}
        renderRow={(rowData, sectionID, rowID) => this._renderTab(rowData, rowID, tabWidth)}
        />
    )
  }

  _renderTab(tab, id, tabWidth) {
    let inner = tab.props.title;
    if (typeof inner === 'function') {
      inner = inner(this.state.index === +id);
    } else if (typeof inner === 'string') {
      inner = (
        <View style={{padding: 10, borderWidth: 0.5, borderColor: RkConfig.colors.primary, backgroundColor: this.state.index === +id? RkConfig.colors.primary : 'white'}}>
          <Text
            style={{textAlign: 'center', fontSize: 18, color: this.state.index === +id? 'white' : RkConfig.colors.primary}}>{inner}</Text>
        </View>
      )
    }
    return (
      <TouchableOpacity style={{width: tabWidth}} onPress={() => this._selectTab(id)}>
        {inner}
      </TouchableOpacity>
    )
  }

  _selectTab(id) {
    this.setState({
      index: +id
    })
  }


}

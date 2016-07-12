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
    return (
      <View style={[{flex: 1}, this.props.style]}>
        {this._renderTabs(tabs, scrollableHeader)}
        {tabs[this.state.index]}
      </View>
    );
  }

  _onContainerLayout(e, tabsCount){
    let width = e.nativeEvent.layout.width;
    let tabWidth = width / tabsCount;
    this.setState({tabWidth: tabWidth})
  }

  _getTabs(child) {
    if (!Array.isArray(child)) child = [];
    return child.filter(elem => elem.type === RkTab)
  }

  _renderTabs(tabs, scrollableHeader) {
    return (
      <ListView
        onLayout={(e)=>{this._onContainerLayout(e, scrollableHeader ? this.props.maxVisibleTabs : tabs.length)}}
        scrollEnabled={scrollableHeader}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal
        dataSource={this.state.tabStore.cloneWithRows(tabs)}
        renderRow={(rowData, sectionID, rowID) => this._renderTab(rowData, rowID)}
        />
    )
  }

  _renderTab(tab, id) {
    let inner = tab.props.title;
    if (typeof inner === 'function') {
      inner = inner(this.state.index === +id);
    } else if (typeof inner === 'string') {
      let{boxStyle, innerStyle} = this._defineStyles(this.state.index === +id);
      boxStyle.push(tab.props.style);
      innerStyle.push(tab.props.innerStyle);
      if(this.state.index === +id){
        boxStyle.push(tab.props.styleSelected);
        innerStyle.push(tab.props.innerStyleSelected);
      }
      inner = (
        <View style={boxStyle}>
          <Text
            style={innerStyle}>{inner}</Text>
        </View>
      )
    }
    return (
      <TouchableOpacity style={{width: this.state.tabWidth}} onPress={() => this._selectTab(id)}>
        {inner}
      </TouchableOpacity>
    )
  }

  _defineStyles(selected) {
    let types = this.props.type || (RkConfig.theme.tab? RkConfig.theme.tab.defaultType : '');
    types = types && types.length ? types.split(" ") : [];
    let boxStyle = [RkConfig.themes.styles.tab._container];
    let innerStyle = [RkConfig.themes.styles.tab._inner];
    if(selected) {
      boxStyle.push(RkConfig.themes.styles.tab._containerSelected);
      innerStyle.push(RkConfig.themes.styles.tab._innerSelected);
    }
    for (type of types) {
      boxStyle.push(RkConfig.themes.styles.tab[type].container);
      innerStyle.push(RkConfig.themes.styles.tab[type].inner);
      if(selected) {
        boxStyle.push(RkConfig.themes.styles.tab[type].containerSelected);
        innerStyle.push(RkConfig.themes.styles.tab[type].innerSelected);
      }
    }
    return {boxStyle, innerStyle}
  }

  _selectTab(id) {
    this.setState({
      index: +id
    })
  }


}

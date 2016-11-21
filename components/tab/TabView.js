import React, {Component} from 'react';

import {
  View,
  TouchableOpacity,
  ScrollView,
  Text,
  Dimensions,
} from 'react-native';

import { RkConfig} from '../../util/config';
import {RkTab} from './Tab'

export class RkTabView extends Component {

  static Tab = RkTab;
  static name = 'tabView';

  constructor(props) {
    super(props);
    this.state = {
      index: +props.index || 0
    }
  }

  render() {
    let scrollableHeader = !!this.props.maxVisibleTabs;
    let tabs = this._getTabs(this.props.children);
    return (
      <View style={[{flex: 1, justifyContent: 'flex-start'}, this.props.style]}>
        <View style={this.props.tabsContainerStyle}>
          {this._renderTabs(tabs, scrollableHeader)}
        </View>
        <View>
          {tabs[this.state.index]}
        </View>
      </View>
    );
  }

  _onContainerLayout(e, tabsCount) {
    let width = e.nativeEvent.layout.width;
    let tabWidth = width / tabsCount;
    this.setState({tabWidth: tabWidth})
  }

  _getTabs(child) {
    if (!Array.isArray(child)) child = [];
    return child.filter(elem => elem.type === RkTab)
  }

  _renderTabs(tabs, scrollableHeader) {
    let contentContainerStyle = scrollableHeader ? {} : {
      flex: 1,
      flexDirection: 'row',
      justifyContent: scrollableHeader ? 'flex-start' : 'center'
    };
    return (
      <ScrollView
        onLayout={(e)=>{this._onContainerLayout(e, this.props.maxVisibleTabs)}}
        scrollEnabled={scrollableHeader}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        bounces={false}
        horizontal={true}
        contentContainerStyle={contentContainerStyle}
        >
        {tabs.map((tab, i) => this._renderTab(tab, i, scrollableHeader))}
      </ScrollView>
    )
  }

  _renderTab(tab, id, scrollableHeader) {
    let inner = tab.props.title;
    if (typeof inner === 'function') {
      inner = inner(this.state.index === +id);
    } else if (typeof inner === 'string') {
      let {boxStyle, innerStyle} = this._defineStyles(this.state.index === +id);
      boxStyle.push(tab.props.style);
      innerStyle.push(tab.props.innerStyle);
      if (this.state.index === +id) {
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
    let containerStyle = [{flex: 1}];
    if (scrollableHeader) containerStyle.push({width: this.state.tabWidth});
    return (
      <TouchableOpacity style={containerStyle} key={id} onPress={() => this._selectTab(id)}>
        {inner}
      </TouchableOpacity>
    )
  }

  _defineStyles(selected) {
    let types = this.props.rkType || (RkConfig.theme.tab ? RkConfig.theme.tab.defaultType : '');
    types = types && types.length ? types.split(" ") : [];
    let boxStyle = [RkConfig.themes.styles.tab._container];
    let innerStyle = [RkConfig.themes.styles.tab._inner];
    if (selected) {
      boxStyle.push(RkConfig.themes.styles.tab._containerSelected);
      innerStyle.push(RkConfig.themes.styles.tab._innerSelected);
    }
    for (let type of types) {
      boxStyle.push(RkConfig.themes.styles.tab[type].container);
      innerStyle.push(RkConfig.themes.styles.tab[type].inner);
      if (selected) {
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

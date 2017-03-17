import React, {Component} from 'react';

import {
  View,
  TouchableOpacity,
  ScrollView,
  Text,
  Dimensions,
} from 'react-native';

import {RkComponent} from '../rkComponent';
import {RkTab} from './rkTab'

export class RkTabView extends RkComponent {

  static Tab = RkTab;
  componentName = 'RkTab';
  typeMapping = {
    container: {
      backgroundColor: 'backgroundColor',
      borderColor: 'borderColor',
      borderRadius: 'borderRadius',
      borderWidth: 'borderWidth',
      paddingVertical: 'paddingVertical',
      paddingHorizontal: 'paddingHorizontal'
    },
    inner: {
      color: 'color',
    }
  };
  selectedType = 'selected';

  constructor(props) {
    super(props);
    this.state = {
      index: +props.index || 0
    };
    if(this.props.rkTypeSelected){
      this.selectedType = this.props.rkTypeSelected
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
        onLayout={(e) => {
          this._onContainerLayout(e, this.props.maxVisibleTabs)
        }}
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
      let {container:boxStyle, inner:innerStyle} = this._defineStyles(this.state.index === +id);
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
    if (selected)
      return this.defineStyles(this.selectedType);
    return this.defineStyles();
  }

  _selectTab(id) {
    this.setState({
      index: +id
    })
  }


}

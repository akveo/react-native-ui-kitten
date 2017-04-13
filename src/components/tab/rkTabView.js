import React, {Component} from 'react';

import {
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';

import _ from 'lodash';
import {RkComponent} from '../rkComponent';
import {RkTab} from './rkTab'
import {RkText} from '../text/rkText'

export class RkTabView extends RkComponent {

  static Tab = RkTab;
  componentName = 'RkTabView';
  typeMapping = {
    container: {},
    headerContainer: {},
    tabContainer: {
      backgroundColor: 'backgroundColor',
      borderColor: 'borderColor',
      borderWidth: 'borderWidth',
    },
    content: {
      color: 'color',
    },
  };
  selectedType = 'selected';

  constructor(props) {
    super(props);
    this.state = {
      index: +props.index || 0
    };
    if (this.props.rkTypeSelected) {
      this.selectedType = this.props.rkTypeSelected
    }
    else {
      let base = this.props.rkType ? this.props.rkType.split(" ")[0] : undefined;
      if (base) {
        this.selectedType = `${base}${_.upperFirst(this.selectedType)}`;
      }
    }
  }

  render() {
    let scrollableHeader = !!this.props.maxVisibleTabs;
    let tabs = this._getTabs(this.props.children);
    let {headerContainer, container, ...otherStyles} = this.defineStyles();

    return (
      <View style={[{flex: 1, justifyContent: 'flex-start'}, container, this.props.style]}>
        <View style={[headerContainer, this.props.headerContainerStyle]}>
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
        justifyContent: scrollableHeader ? 'flex-start' : 'center',
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
    let content;
    let {tabContainer:boxStyle, content:innerStyle} = this._defineStyles(this.state.index === +id);
    if (typeof inner === 'function') {
      content = inner(this.state.index === +id);
    } else if (typeof inner === 'string') {
      boxStyle.push(tab.props.style);
      innerStyle.push(tab.props.contentStyle);
      if (this.state.index === +id) {
        boxStyle.push(tab.props.styleSelected);
        innerStyle.push(tab.props.contentStyleSelected);
      }
      content = (
        <RkText
          style={innerStyle}>{inner}</RkText>
      )
    }
    let containerStyle = [{flex: 1}];
    if (scrollableHeader) containerStyle.push({width: this.state.tabWidth});
    return (
      <TouchableOpacity style={[containerStyle, boxStyle]} key={id} onPress={() => this._selectTab(id)}>
        {content}
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

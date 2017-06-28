import React from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import _ from 'lodash';
import {RkComponent} from '../rkComponent';
import {RkTab} from './rkTab'
import {RkText} from '../text/rkText'

/**
 * `RkTabView` is a component to display tabs in your application.
 *
 * @example Usage example:
 *
 * ```
 * <RkTabView>
 *   <RkTabView.Tab title={'Tab 1'}>
 *     <Text>Tab 1 Content</Text>
 *   </RkTabView.Tab>
 *   <RkTabView.Tab title={'Tab 2'}>
 *     <Text>Tab 2 Content</Text>
 *   </RkTabView.Tab>
 *   <RkTabView.Tab title={'Tab 3'}>
 *     <Text>Tab 3 Content</Text>
 *   </RkTabView.Tab>
 * </RkTabView>
 * ```
 *
 * @example Custom tab titles
 *
 * Often there is need to put into header not only text but more complex view tree. In this case into `title` prop
 * should be passed a function which will render header.
 * Function can accept `isSelected` parameter in order to render selected or regular tab header.
 * Here is an example:
 *
 * ```
 * let renderTab = (isSelected, title, icon) => {
 *  let backgroundColor = isSelected ? 'cornflowerblue' : 'white';
 *  let color = (!isSelected) ? 'cornflowerblue' : 'white';
 *  return (
 *    <View
 *      style={{
 *        backgroundColor,
 *        justifyContent: 'center',
 *        flexDirection: 'row',
 *        alignItems: 'center',
 *        padding: 17,
 *      }}>
 *      <Icon name={icon} style={{color, fontSize: 16}}/>
 *      <RkText style={{color, marginLeft: 11}}>{title}</RkText>
 *    </View>);
 *};
 *
 * //...
 *
 * <RkTabView>
 *   <RkTabView.Tab title={(selected) => {
 *      return renderTab(selected, 'Bus', 'ios-bus');
 *    }}>
 *     <Text>Bus</Text>
 *   </RkTabView.Tab>
 *
 *   <RkTabView.Tab title={(selected) => {
 *      return renderTab(selected, 'Train', 'ios-train');
 *   }}>
 *     <Text>Train</Text>
 *   </RkTabView.Tab>
 *   <RkTabView.Tab title={(selected) => {
 *      return renderTab(selected, 'Plain', 'ios-plane');
 *    }}>
 *     <Text>Plain</Text>
 *   </RkTabView.Tab>
 * </RkTabView>
 * ```
 *
 * @example Using rkType prop
 *
 * `RkTabView` has `rkType` prop. This prop works similar to CSS-class in web. It's possible to set more than one type.
 * There are already some predefined types. Here is example of how to use rkType
 *
 * ```
 * <RkTabView rkType='material'>
 *   <RkTabView.Tab title={'Tab 1'}>
 *     <Text>Tab 1 Content</Text>
 *   </RkTabView.Tab>
 *   <RkTabView.Tab title={'Tab 2'}>
 *     <Text>Tab 2 Content</Text>
 *   </RkTabView.Tab>
 *   <RkTabView.Tab title={'Tab 3'}>
 *     <Text>Tab 3 Content</Text>
 *   </RkTabView.Tab>
 * </RkTabView>
 * ```
 *
 * @example Define new rkTypes
 *
 * It's easy and very common to create new types. Main point for all customization is `RkTheme` object.
 * New rkTypes are defined using `setType` method of `RkTheme`:
 *`RkTabView` is a component which style depends or it's internal state. There are 2 states for this component:
 * - unselected (base)
 * - selected
 * Each of this state can be configured using `rkTypes`. That means you can define set of correctly named `RkType`s
 * and `RkTabView` will apply them according to its state.
 * Use the following convention:
 * - `~name` : Unselected state.
 * - `~nameSelected` : Selected state.
 * Where `~name` is name of yours `rkType`.
 * One more note: during state change `RkTabView` not replace base `rkType` with new one. It just add correct.
 * So *selected* component will have actually two `rkType`s - base and selected.
 * To define new `rkType` you can use predefined properties which will passed to according element inside component:
 *
 * ```
 * RkTheme.setType('RkTabView', 'dark', {
 *   backgroundColor:'#778f9b',
 *   color:'white',
 *   borderColor:'#4a636d'
 * });
 *
 *  RkTheme.setType('RkTabView', 'darkSelected', {
 *   backgroundColor:'#4a636d',
 *   borderColor:'#4a636d'
 * });
 *
 *  //...
 *
 *  <RkTabView rkType='dark'>
 *    <RkTabView.Tab title={'Tab 1'}/>
 *    <RkTabView.Tab title={'Tab 2'}/>
 *    <RkTabView.Tab title={'Tab 3'}/>
 *  </RkTabView>
 * ```
 *
 * @styles Available properties:
 *  - `color` : Color of content in header of `RkTabView`. Applied for `content` property
 *  - `backgroundColor` : Background color of tab in header
 *  - `borderWidth` : Width of tab border
 *  - `borderColor` : Color of tab border
 *
 * @example Advanced Styling
 *
 * It's also possible to implement more detailed styling. `RkTabView` consists from couple of base react component.
 * It's easy to set styles for each component.
 *
 * ```
 * RkTheme.setType('RkTabView', 'rounded', {
 *   backgroundColor: 'transparent',
 *   color: 'white',
 *   borderColor: '#4a636d',
 *   tabContainer: {
 *     padding: 2,
 *     borderRadius: 30,
 *     overflow: 'hidden',
 *     borderWidth: 0,
 *     borderLeftWidth: 0,
 *     borderRightWidth: 0,
 *   },
 *   content: {
 *     padding: 7
 *   },
 *   container: {
 *     backgroundColor: '#a6bfcc',
 *     borderRadius: 20
 *   }
 * });
 *
 *  RkTheme.setType('RkTabView', 'roundedSelected', {
 *   backgroundColor: '#4a636d',
 *   borderColor: '#4a636d'
 * });
 *
 *
 *  <RkTabView rkType='rounded'>
 *    <RkTabView.Tab title={'Tab 1'}/>
 *    <RkTabView.Tab title={'Tab 2'}/>
 *    <RkTabView.Tab title={'Tab 3'}/>
 *  </RkTabView>
 * ```
 *
 * @styles Available components:
 * - `container` : `View` - root container of `RkTabView`
 * - `headerContainer` : `View` - container for tab headers
 * - `tabContainer` : `TouchableOpacity` - wraps each tab's header content
 * - `content` : `RkText` when `label` prop used as string
 *
 *
 * @example Inline styling
 *
 * It's possible to set styles inline. Use prop `style` of `RkTabView` for `container` component and
 * `headerContainerStyle` for `headerContainer` component.
 * Use prop `style` (unselected) and `styleSelected` (selected) of `RkTabView.Tab` for `tabContainer` component.
 * Use prop `contentStyle` (unselected) and `contentStyleSelected` (selected) of `RkTabView.Tab` for `contentStyleSelected` component.
 * Here is an example of inline styling:
 *
 * ```
 *  <RkTabView style={{
 *   padding: 10,
 *   backgroundColor: 'lightgray', borderRadius: 5
 *   }}>
 *    <RkTabView.Tab style={{backgroundColor: 'yellow'}}
 *      styleSelected={{backgroundColor: 'cyan'}}
 *      title={'Tab 1'}/>
 *    <RkTabView.Tab title={'Tab 2'}/>
 *    <RkTabView.Tab title={'Tab 3'}/>
 *  </RkTabView>
 * ```
 *
 * @property {string} rkType - Types for component stylization. By default RkTabView supports following types: `material`
 * @property {style} style - Style applied to RkTabView container (tabs & content)
 * @property {style} headerContainerStyle - Style applied to container wrapping tabs (not for the content)
 * @property {number} maxVisibleTabs - If set - tabs will be scrollable and only specified number of tabs will be visible.
 * @property {string} title - (RkTabView.Tab prop) When type of title is string, title is rendered like Text inside of View. Otherwise title is rendered using function passed to this prop, function can apply isSelected argument and should return React component
 * @property {style} style - (RkTabView.Tab prop) Style applied to RkTabView.Tab content container (used only when label is text)
 * @property {style} styleSelected - (RkTabView.Tab prop) Style applied to RkTabView.Tab label container when tab is selected (used only when label is text)
 * @property {style} innerStyle - (RkTabView.Tab prop) Style applied to RkTabView.Tab label (used only when label is text)
 * @property {style} innerStyleSelected - (RkTabView.Tab prop) Style applied to RkTabView.Tab label when tab is selected (used only when label is text)
 */

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
      let base = this.props.rkType ? this.props.rkType.split(' ')[0] : undefined;
      if (base) {
        this.selectedType = `${base}${_.upperFirst(this.selectedType)}`;
      }
    }
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
    let {tabContainer: boxStyle, content: innerStyle} = this._defineStyles(this.state.index === +id);
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
}

import React from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { RkComponent } from '../rkComponent';
import { RkTab } from './rkTab';
import { RkText } from '../text/rkText';

/**
 * `RkTabView` is a component to display tabs in your application.
 *
 * @extends React.Component
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
 * Often there is need to put into header not only text but more complex view tree.
 * In this case into `title` prop
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
 * `RkTabView` has `rkType` prop. This prop works similar to CSS-class in web.
 * It's possible to set more than one type.
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
 * It's easy and very common to create new types.
 * Main point for all customization is `RkTheme` object.
 * New rkTypes are defined using `setType` method of `RkTheme`:
 *`RkTabView` is a component which style depends or it's internal state.
 *  There are 2 states for this component:
 * - unselected (base)
 * - selected
 * Each of this state can be configured using `rkTypes`.
 * That means you can define set of correctly named `RkType`s
 * and `RkTabView` will apply them according to its state.
 * Use the following convention:
 * - `~name` : Unselected state.
 * - `~nameSelected` : Selected state.
 * Where `~name` is name of yours `rkType`.
 * One more note: during state change `RkTabView` not replace base `rkType` with new one.
 * It just add correct.
 * So *selected* component will have actually two `rkType`s - base and selected.
 * To define new `rkType` you can use predefined properties which
 * will passed to according element inside component:
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
 * @styles Available style properties:
 *  - `color` : Color of content in header of `RkTabView`.
 *     Applied for 'content' component.
 *  - `backgroundColor` : Background color of tab in header.
 *     Applied for 'tabContainer' component.
 *  - `borderWidth` : Width of tab border. Applied for 'tabContainer' component.
 *  - `borderColor` : Color of tab border. Applied for 'tabContainer' component.
 *  - ...: Any other style properties defined without specifying component explicitly
 *    will be applied to the default one.
 *
 * @example Advanced Styling
 *
 * It's also possible to implement more detailed styling.
 * `RkTabView` consists from couple of base react component.
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
 * - `container` (Default): `View` - root container of `RkTabView`
 * - `headerContainer` : `View` - container for tab headers
 * - `tabContainer` : `TouchableOpacity` - wraps each tab's header content
 * - `content` : `RkText` when `title` is simple text. Otherwise is not applied.
 * - `contentContainer` : `View` - container for tab content
 *
 * @example Inline styling
 *
 * It's possible to set styles inline. Use prop `style` of `RkTabView` for `container` component and
 * `headerContainerStyle` for `headerContainer` component.
 * Use prop `style` (unselected) and
 * `styleSelected` (selected) of `RkTabView.Tab` for `tabContainer` component.
 * Use prop `contentStyle` (unselected) and
 * `contentStyleSelected` (selected) of `RkTabView.Tab` for `contentStyleSelected` component.
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
 * @example Event of changing of active tab
 *
 * You can handle event of active tab changing by using `onTabChanged` function
 * ('index' arg is zero-based index of the activated tab):
 *
 * ```
 *  <RkTabView onTabChanged={(index) => doSomething(index))}>
 *    <RkTabView.Tab title={'Tab 1'}/>
 *    <RkTabView.Tab title={'Tab 2'}/>
 *    <RkTabView.Tab title={'Tab 3'}/>
 *  </RkTabView>
 * ```
 *
 * @property {string} rkType - Types for component stylization.
 * By default RkTabView supports following types: `material`
 * @property {style} style - Style applied to RkTabView container (tabs & content)
 * @property {style} headerContainerStyle
 * - Style applied to container wrapping tabs (not for the content)
 * @property {number} maxVisibleTabs
 * - If set - tabs will be scrollable and only specified number of tabs will be visible.
 * @property {number} index - If set - index of tab which will be active by default (zero-based).
 * @property {bool} tabsUnderContent - If set - content will be rendered above of the tabs.
 * @property {string} title -
 * (RkTabView.Tab prop) When type of title is string, title is rendered like Text inside of View.
 * Otherwise title is rendered using function passed to this prop,
 * function can apply isSelected argument and should return React component
 * @property {style} style
 * - (RkTabView.Tab prop) Style applied to RkTabView.Tab content container
 * (used only when label is text)
 * @property {style} styleSelected
 * - (RkTabView.Tab prop) Style applied to RkTabView.Tab label container when tab is selected
 * (used only when label is text)
 * @property {style} innerStyle
 * - (RkTabView.Tab prop) Style applied to RkTabView.Tab label (used only when label is text)
 * @property {style} innerStyleSelected
 * - (RkTabView.Tab prop) Style applied to RkTabView.Tab label when tab is selected
 * (used only when label is text)
 * @property {function} onTabChanged - Called when active tab was changed
 */
export class RkTabView extends RkComponent {
  static propTypes = {
    rkType: RkComponent.propTypes.rkType,
    rkTypeSelected: RkComponent.propTypes.rkType,
    index: PropTypes.number,
    maxVisibleTabs: PropTypes.number,
    tabsUnderContent: PropTypes.bool,
    onTabChanged: PropTypes.func,
    headerContainerStyle: ViewPropTypes.style,
    style: ViewPropTypes.style,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
  };
  static defaultProps = {
    rkType: RkComponent.defaultProps.rkType,
    rkTypeSelected: RkComponent.defaultProps.rkType,
    index: 0,
    maxVisibleTabs: undefined,
    tabsUnderContent: false,
    onTabChanged: (() => null),
    style: null,
    headerContainerStyle: null,
  };
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
    contentContainer: {},
  };

  state = {
    index: RkTabView.defaultProps.index,
  };

  selectedType = 'selected';

  constructor(props) {
    super(props);
    this.state.index = props.index;
    if (this.props.rkTypeSelected) {
      this.selectedType = this.props.rkTypeSelected;
    } else {
      const base = this.props.rkType ? this.props.rkType.split(' ')[0] : undefined;
      if (base) {
        this.selectedType = `${base}${_.upperFirst(this.selectedType)}`;
      }
    }
  }

  onContainerLayout = (e) => {
    this.setState({
      tabWidth: e.nativeEvent.layout.width / this.props.maxVisibleTabs,
    });
  };

  defineComponentStyles(selected) {
    if (selected) {
      return this.defineStyles(this.selectedType);
    }
    return this.defineStyles();
  }

  selectTab(id) {
    if (this.state.index !== id) {
      this.setState({ index: +id });
      this.props.onTabChanged(id);
    }
  }

  getTabs(child) {
    const tabs = Array.isArray(child) ? child : [];
    return tabs.filter(elem => elem.type === RkTab);
  }

  renderTab(tab, id, scrollableHeader) {
    const inner = tab.props.title;
    let content;
    const {
      tabContainer: boxStyle,
      content: innerStyle,
    } = this.defineComponentStyles(this.state.index === +id);
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
          style={innerStyle}>
          {inner}
        </RkText>
      );
    }
    const containerStyle = [{ flex: 1 }];
    if (scrollableHeader) containerStyle.push({ width: this.state.tabWidth });
    return (
      <TouchableOpacity
        style={[containerStyle, boxStyle]}
        key={id}
        onPress={() => this.selectTab(id)}>
        {content}
      </TouchableOpacity>
    );
  }

  renderTabs(tabs, scrollableHeader) {
    const contentContainerStyle = scrollableHeader ? {} : {
      flex: 1,
      flexDirection: 'row',
      justifyContent: scrollableHeader ? 'flex-start' : 'center',
    };
    return (
      <ScrollView
        onLayout={this.onContainerLayout}
        scrollEnabled={scrollableHeader}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        bounces={false}
        horizontal={true}
        contentContainerStyle={contentContainerStyle}>
        {tabs.map((tab, i) => this.renderTab(tab, i, scrollableHeader))}
      </ScrollView>
    );
  }

  render() {
    const scrollableHeader = !!this.props.maxVisibleTabs;
    const tabsUnderContent = !!this.props.tabsUnderContent;
    const tabs = this.getTabs(this.props.children);
    const {
      headerContainer,
      container,
      contentContainer,
    } = this.defineStyles();

    const tabsView = (
      <View key='tabsView' style={[headerContainer, this.props.headerContainerStyle]}>
        {this.renderTabs(tabs, scrollableHeader)}
      </View>
    );
    const contentView = (
      <View key='contentView' style={contentContainer}>
        {tabs[this.state.index]}
      </View>
    );
    return (
      <View style={[{ flex: 1, justifyContent: 'flex-start' }, container, this.props.style]}>
        {tabsUnderContent ? [contentView, tabsView] : [tabsView, contentView]}
      </View>
    );
  }
}

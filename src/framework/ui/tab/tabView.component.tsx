/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  StyleProp,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import { TabProps } from './tab.component';
import { TabBar } from './tabBar.component';
import { ViewPager } from '../viewPager/viewPager.component';

type TabContentElement = React.ReactElement<any>;
type TabElement = React.ReactElement<TabProps>;
type ChildrenProp = TabElement | TabElement[];

class TabViewChildElement {
  tab: TabElement;
  content: TabContentElement;
}

class TabViewChildren {
  tabs: TabElement[] = [];
  content: TabContentElement[] = [];
}

interface ComponentProps {
  children: ChildrenProp;
  selectedIndex?: number;
  indicatorStyle?: StyleProp<ViewStyle>;
  shouldLoadComponent?: (index: number) => boolean;
  onOffsetChange?: (offset: number) => void;
  onSelect?: (index: number) => void;
}

export type TabViewProps = ViewProps & ComponentProps;

/**
 * The `TabView` component that manages Tab components in whole view.
 *
 * @extends React.Component
 **
 * @type {React.ReactElement<TabProps>} ChildElement - Determines child of the component.
 *
 * @property {number} selectedIndex - Determines current tab index.
 *
 * @property {StyleProp<ViewStyle>} indicatorStyle - Determines style of selected tab indicator.
 *
 * @property {(index: number) => void} onSelect - Fires on onPress event and returns tab index.
 *
 * @property {ChildElement | ChildElement[]} children - Determines children of the component.
 *
 * @property {(index: number) => boolean} shouldLoadComponent - Determines should child mount before it
 * will be selected.
 *
 * @property {(offset: number) => void} onOffsetChange - Returns "offset" value on Scroll event.
 *
 * @property ViewProps
 *
 * @example TabView usage and API example
 *
 * ```
 * import {
 *   TabView,
 *   Tab,
 * } from '@kitten/ui';
 *
 * public state: State = {
 *   selectedIndex: 0,
 * };
 *
 * private onSelect = (selectedIndex: number) => {
 *   this.setState({ selectedIndex });
 * };
 *
 * public render(): React.ReactNode {
 *   return (
 *     <TabView
 *       style={styles.container}
 *       selectedIndex={this.state.selectedIndex}
 *       onSelect={this.onSelect}>
 *       <Tab
 *         title='TAB 1'
 *         icon={(style: StyleType) => <Image source={ICON1} style={style}/>}>
 *         <Text>Tab 1</Text>
 *       </Tab>
 *       <Tab
 *         title='TAB 2'
 *         icon={(style: StyleType) => <Image source={ICON2} style={style}/>}>
 *         <Text>Tab 2</Text>
 *       </Tab>
 *       <Tab
 *         title='TAB 3'
 *         icon={(style: StyleType) => <Image source={ICON3} style={style}/>}>
 *         <Text>Tab 3</Text>
 *       </Tab>
 *     </TabView>
 *   );
 * }
 * ```
 * */

export class TabView extends React.Component<TabViewProps> {

  static defaultProps: Partial<TabViewProps> = {
    selectedIndex: 0,
  };

  private viewPagerRef: React.RefObject<ViewPager> = React.createRef();
  private tabBarRef: React.RefObject<any> = React.createRef();

  private onBarSelect = (index: number) => {
    const { current: viewPager } = this.viewPagerRef;

    viewPager.scrollToIndex({ index });
  };

  private onPagerOffsetChange = (offset: number) => {
    const { current: tabBar } = this.tabBarRef;
    const tabCount: number = React.Children.count(tabBar.props.children);

    tabBar.scrollToOffset({ offset: offset / tabCount });
  };

  private onPagerSelect = (selectedIndex: number) => {
    if (this.props.onSelect) {
      this.props.onSelect(selectedIndex);
    }
  };

  private renderComponentChild = (element: TabElement, index: number): TabViewChildElement => {
    return {
      tab: React.cloneElement(element, { key: index }),
      content: element.props.children,
    };
  };

  private renderComponentChildren = (source: ChildrenProp): TabViewChildren => {
    return React.Children.toArray(source).reduce((acc: TabViewChildren, element: TabElement, index: number) => {
      const { tab, content } = this.renderComponentChild(element, index);
      return {
        tabs: [...acc.tabs, tab],
        content: [...acc.content, content],
      };
    }, new TabViewChildren());
  };

  public render(): React.ReactElement<ViewProps> {
    const { selectedIndex, children, indicatorStyle, ...derivedProps } = this.props;

    const { tabs, content } = this.renderComponentChildren(children);

    return (
      <View {...derivedProps}>
        <TabBar
          ref={this.tabBarRef}
          selectedIndex={selectedIndex}
          indicatorStyle={indicatorStyle}
          onSelect={this.onBarSelect}>
          {tabs}
        </TabBar>
        <ViewPager
          ref={this.viewPagerRef}
          selectedIndex={selectedIndex}
          shouldLoadComponent={this.props.shouldLoadComponent}
          onOffsetChange={this.onPagerOffsetChange}
          onSelect={this.onPagerSelect}>
          {content}
        </ViewPager>
      </View>
    );
  }
}

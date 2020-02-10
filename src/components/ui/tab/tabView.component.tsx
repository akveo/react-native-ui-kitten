/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import { TabElement } from './tab.component';
import { TabBar } from './tabBar.component';
import { ViewPager } from '../viewPager/viewPager.component';

type TabContentElement = React.ReactElement;
type ChildrenProp = TabElement | TabElement[];

class TabViewChildElement {
  tab: TabElement;
  content: TabContentElement;
}

class TabViewChildren {
  tabs: TabElement[] = [];
  content: TabContentElement[] = [];
}

export interface TabViewProps extends ViewProps {
  children: ChildrenProp;
  selectedIndex?: number;
  tabBarStyle?: StyleProp<ViewStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
  shouldLoadComponent?: (index: number) => boolean;
  onOffsetChange?: (offset: number) => void;
  onSelect?: (index: number) => void;
}

export type TabViewElement = React.ReactElement<TabViewProps>;

/**
 * `TabView` is a dynamic tabset component. Allows flipping through the tab "pages".
 *
 * @extends React.Component
 **
 * @property {number} selectedIndex - Determines current tab index.
 *
 * @property {StyleProp<ViewStyle>} tabBarStyle - Determines style TabBar component.
 *
 * @property {StyleProp<ViewStyle>} indicatorStyle - Determines style of selected tab indicator.
 *
 * @property {(index: number) => void} onSelect - Fires on "page" select with corresponding index.
 *
 * @property {ReactElement<TabProps> | ReactElement<TabProps>[]} children - Determines children of the component.
 *
 * @property {(index: number) => boolean} shouldLoadComponent - Determines loading behavior particular page and can be
 * used for lazy loading.
 *
 * @property {(offset: number) => void} onOffsetChange - Fires on scroll event with current scroll offset.
 *
 * @property {ViewProps} ...ViewProps - Any props applied to View component.
 *
 * @overview-example TabViewSimpleUsage
 *
 * @overview-example TabViewWithIcon
 *
 * @overview-example TabViewLazyLoading
 *
 * @example TabViewInlineStyling
 */
export class TabView extends React.Component<TabViewProps> {

  static defaultProps: Partial<TabViewProps> = {
    selectedIndex: 0,
  };

  private viewPagerRef: React.RefObject<ViewPager> = React.createRef();
  private tabBarRef: React.RefObject<any> = React.createRef();

  private onBarSelect = (index: number): void => {
    const { current: viewPager } = this.viewPagerRef;

    viewPager.scrollToIndex({ index, animated: true });
  };

  private onPagerOffsetChange = (offset: number): void => {
    const { current: tabBar } = this.tabBarRef;
    const tabCount: number = React.Children.count(tabBar.props.children);

    tabBar.scrollToOffset({ offset: offset / tabCount });
  };

  private onPagerSelect = (selectedIndex: number): void => {
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
    const children = React.Children.toArray(source) as TabElement[];

    return children.reduce((acc: TabViewChildren, element: TabElement, index: number) => {
      const { tab, content } = this.renderComponentChild(element, index);
      return {
        tabs: [...acc.tabs, tab],
        content: [...acc.content, content],
      };
    }, new TabViewChildren());
  };

  public render(): React.ReactElement<ViewProps> {
    const { style, selectedIndex, children, tabBarStyle, indicatorStyle, ...derivedProps } = this.props;

    const { tabs, content } = this.renderComponentChildren(children);

    return (
      <View
        style={[styles.container, style]}
        {...derivedProps}>
        <TabBar
          style={tabBarStyle}
          ref={this.tabBarRef}
          selectedIndex={selectedIndex}
          indicatorStyle={indicatorStyle}
          onSelect={this.onBarSelect}>
          {tabs}
        </TabBar>
        <ViewPager
          ref={this.viewPagerRef}
          {...derivedProps}
          style={[styles.container, style]}
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

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
});

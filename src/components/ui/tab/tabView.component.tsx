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
import { ChildrenWithProps } from '../../devsupport';
import {
  TabElement,
  TabProps,
} from './tab.component';
import { TabBar } from './tabBar.component';
import {
  ViewPager,
  ViewPagerProps,
} from '../viewPager/viewPager.component';

class TabViewChildElement {
  tab: TabElement;
  content: React.ReactElement;
}

class TabViewChildren {
  tabs: TabElement[] = [];
  contents: React.ReactElement[] = [];
}

export interface TabViewProps extends ViewPagerProps<TabProps> {
  tabBarStyle?: StyleProp<ViewStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
}

export type TabViewElement = React.ReactElement<TabViewProps>;

/**
 * A view with tabs and swipeable contents.
 *
 * @extends React.Component
 **
 * @property {ReactElement<TabProps> | ReactElement<TabProps>[]} children - Tabs to be rendered within the view.
 *
 * @property {number} selectedIndex - Index of currently selected tab.
 *
 * @property {(number) => void} onSelect - Called when tab is pressed or its content becomes visible.
 *
 * @property {(number) => boolean} shouldLoadComponent - A function to determine
 * whether content for particular tab should be rendered.
 * Useful when providing "lazy" loading behavior.
 *
 * @property {(number) => void} onOffsetChange - Called when scroll offset changes.
 *
 * @property {StyleProp<ViewStyle>} tabBarStyle - Style of TabBar component.
 *
 * @property {StyleProp<ViewStyle>} indicatorStyle - Style of selected tab indicator.
 *
 * @property {ViewProps} ...ViewProps - Any props applied to View component.
 *
 * @overview-example TabViewSimpleUsage
 * TabView is an alternative way to build tabbed screens, without a need to configure routing.
 *
 * @overview-example TabViewLazyLoading
 * Tab contents may be loaded lazily, by configuring `shouldLoadComponent` property.
 */
export class TabView extends React.Component<TabViewProps> {

  static defaultProps: Partial<TabViewProps> = {
    selectedIndex: 0,
  };

  private viewPagerRef = React.createRef<ViewPager>();
  private tabBarRef = React.createRef<TabBar>();

  private onBarSelect = (index: number): void => {
    this.props.onSelect && this.props.onSelect(index);
  };

  private onPagerOffsetChange = (offset: number): void => {

  };

  private onPagerSelect = (index: number): void => {
    this.props.onSelect && this.props.onSelect(index);
  };

  private renderComponentChild = (element: TabElement, index: number): TabViewChildElement => {
    return {
      tab: React.cloneElement(element, { key: index }),
      content: element.props.children,
    };
  };

  private renderComponentChildren = (source: ChildrenWithProps<TabProps>): TabViewChildren => {
    const children = React.Children.toArray(source) as TabElement[];

    return children.reduce((acc: TabViewChildren, element: TabElement, index: number) => {
      const { tab, content } = this.renderComponentChild(element, index);
      return {
        tabs: [...acc.tabs, tab],
        contents: [...acc.contents, content],
      };
    }, new TabViewChildren());
  };

  public render(): React.ReactElement<ViewProps> {
    const { style, selectedIndex, children, tabBarStyle, indicatorStyle, ...viewProps } = this.props;
    const { tabs, contents } = this.renderComponentChildren(children);

    return (
      <View
        {...viewProps}
        style={[styles.container, style]}>
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
          {...viewProps}
          style={[styles.container, style]}
          selectedIndex={selectedIndex}
          shouldLoadComponent={this.props.shouldLoadComponent}
          onOffsetChange={this.onPagerOffsetChange}
          onSelect={this.onPagerSelect}>
          {contents}
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

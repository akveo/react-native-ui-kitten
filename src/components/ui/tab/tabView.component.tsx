/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React, { useCallback, useRef } from 'react';
import {
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { ChildrenWithProps } from '../../devsupport';
import {
  TabElement,
  TabProps,
} from './tab.component';
import { TabBar, TabBarRef } from './tabBar.component';
import {
  ViewPager,
  ViewPagerProps,
} from '../viewPager/viewPager.component';

interface TabViewChildElement {
  tab: TabElement;
  content: React.ReactElement;
}

interface TabViewChildren {
  tabs: TabElement[];
  contents: React.ReactElement[];
}

export interface TabViewProps extends ViewPagerProps<TabProps> {
  tabBarStyle?: StyleProp<ViewStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
}

export type TabViewElement = React.ReactElement<TabViewProps>;

/**
 * A view with tabs and swipeable contents.
 *
 * @extends React.FC
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

export const TabView: React.FC<TabViewProps> = ({
  style,
  children,
  selectedIndex = 0,
  tabBarStyle,
  indicatorStyle,
  onSelect,
  shouldLoadComponent,
  ...viewProps
}) => {
  const viewPagerRef = useRef<ViewPager>(null);
  const tabBarRef = useRef<TabBarRef>(null);

  const onBarSelect = useCallback((index: number) => {
    onSelect?.(index);
  }, [onSelect]);

  const onPagerSelect = useCallback((index: number) => {
    onSelect?.(index);
  }, [onSelect]);

  const renderComponentChild = (element: TabElement, index: number): TabViewChildElement => {
    return {
      tab: React.cloneElement(element, { key: index }),
      content: element.props.children,
    };
  };

  const renderComponentChildren = (source: ChildrenWithProps<TabProps>): TabViewChildren => {
    const childrenArray = React.Children.toArray(source) as TabElement[];

    return childrenArray.reduce((acc: TabViewChildren, element: TabElement, index: number) => {
      const { tab, content } = renderComponentChild(element, index);
      return {
        tabs: [...acc.tabs, tab],
        contents: [...acc.contents, content],
      };
    }, { tabs: [], contents: [] });
  };

  const { tabs, contents } = renderComponentChildren(children);

  return (
    <View
      {...viewProps}
      style={[styles.container, style]}
    >
      <TabBar
        style={tabBarStyle}
        ref={tabBarRef}
        selectedIndex={selectedIndex}
        indicatorStyle={indicatorStyle}
        onSelect={onBarSelect}
      >
        {tabs}
      </TabBar>
      <ViewPager
        ref={viewPagerRef}
        {...viewProps}
        style={[styles.container, style]}
        selectedIndex={selectedIndex}
        shouldLoadComponent={shouldLoadComponent}
        onSelect={onPagerSelect}
      >
        {contents}
      </ViewPager>
    </View>
  );
};

TabView.displayName = 'TabView';

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
});

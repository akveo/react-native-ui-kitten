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
  tabBarStyle?: StyleProp<ViewStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
  shouldLoadComponent?: (index: number) => boolean;
  onOffsetChange?: (offset: number) => void;
  onSelect?: (index: number) => void;
}

export type TabViewProps = ViewProps & ComponentProps;

/**
 * Dynamic tabset component. Allows flipping through the tab "pages".
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
 * @property {TabElement | TabElement[]} children - Determines children of the component.
 *
 * @property {(index: number) => boolean} shouldLoadComponent - Determines loading behavior particular page and can be
 * used for lazy loading.
 *
 * @property {(offset: number) => void} onOffsetChange - Fires on scroll event with current scroll offset.
 *
 * @property ViewProps
 *
 * @example Simple usage example
 *
 * ```
 * import React from 'react';
 * import {
 *   TabView,
 *   Tab,
 * } from 'react-native-ui-kitten';
 *
 * export class TabViewShowcase extends React.Component {
 *   public state: State = {
 *     selectedIndex: 0,
 *   };
 *
 *   private onSelect = (selectedIndex: number) => {
 *     this.setState({ selectedIndex });
 *   };
 *
 *   public render(): React.ReactNode {
 *     return (
 *       <TabView
 *         selectedIndex={this.state.selectedIndex}
 *         onSelect={this.onSelect}>
 *         <Tab title='TAB 1'
 *           <Text>Tab 1</Text>
 *         </Tab>
 *         <Tab title='TAB 2'
 *           <Text>Tab 2</Text>
 *         </Tab>
 *         <Tab title='TAB 3'
 *           <Text>Tab 3</Text>
 *         </Tab>
 *       </TabView>
 *     );
 *   }
 * }
 * ```
 *
 * @example Lazy loading usage example
 *
 * ```
 * import React from 'react';
 * import {
 *   TabView,
 *   Tab,
 * } from 'react-native-ui-kitten';
 *
 * export class TabViewShowcase extends React.Component {
 *
 *   public state = {
 *     selectedIndex: 0,
 *   };
 *
 *   private onSelect = (selectedIndex: number) => {
 *     this.setState({ selectedIndex });
 *   };
 *
 *   private shouldLoadTabContent = (index: number): boolean => {
 *     return index === this.state.selectedIndex;
 *   };
 *
 *   public render(): React.ReactNode {
 *     return (
 *       <TabView
 *         selectedIndex={this.state.selectedIndex}
 *         shouldLoadComponent={this.shouldLoadTabContent}
 *         onSelect={this.onSelect}>
 *         <Tab title='TAB 1'>
 *           <Text>Tab 1</Text>
 *         </Tab>
 *         <Tab title='TAB 2'>
 *           <Text>Tab 2</Text>
 *         </Tab>
 *         <Tab title='TAB 3'>
 *           <Text>Tab 3</Text>
 *         </Tab>
 *       </TabView>
 *     );
 *   }
 * }
 * ```
 *
 * @example Inline styling example
 *
 * ```
 * import React from 'react';
 * import { TabView, Tab, TabViewProps } from 'react-native-ui-kitten';
 *
 * export const TabViewShowcase = (props?: TabViewProps): React.ReactElement<TabViewProps> => {
 *   return (
 *     <TabView
 *       style={styles.tabView}
 *       tabBarStyle={styles.tabBar}
 *       indicatorStyle={styles.tabViewIndicator}>
 *       <Tab titleStyle={styles.tabTitle} title='TAB 1'>
 *         <Text>Tab 1</Text>
 *       </Tab>
 *       <Tab titleStyle={styles.tabTitle} title='TAB 2'>
 *         <Text>Tab 2</Text>
 *       </Tab>
 *       <Tab titleStyle={styles.tabTitle} title='TAB 3'>
 *         <Text>Tab 3</Text>
 *       </Tab>
 *     </TabView>
 *   );
 * };
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
    const { selectedIndex, children, tabBarStyle, indicatorStyle, ...derivedProps } = this.props;

    const { tabs, content } = this.renderComponentChildren(children);

    return (
      <View {...derivedProps}>
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

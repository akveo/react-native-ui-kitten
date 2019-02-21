import React from 'react';
import {
  Dimensions,
  View,
  ViewProps,
} from 'react-native';
import { styled } from '@kitten/theme';
import {
  Tab as TabComponent,
  Props as TabProps,
} from './tab.component';
import {
  TabBar as TabBarComponent,
  Props as TabBarProps,
} from './tabBar.component';
import { ViewPager } from '../viewPager/viewPager.component';

type TabElement = React.ReactElement<TabProps>;
type ChildElement = React.ReactElement<ChildProps>;
type ChildContentElement = React.ReactElement<any>;

class TabViewChildElement {
  tab: TabElement;
  content: ChildContentElement;
}

class TabViewChildren {
  tabs: TabElement[] = [];
  content: ChildContentElement[] = [];
}

interface TabViewProps {
  children: ChildElement | ChildElement[];
  selectedIndex?: number;
  contentWidth?: number;
  shouldLoadComponent?: (index: number) => boolean;
  onOffsetChange?: (offset: number) => void;
  onSelect?: (index: number) => void;
}

const Tab = styled<TabComponent, TabProps>(TabComponent);
const TabBar = styled<TabBarComponent, TabBarProps>(TabBarComponent);

export type Props = TabViewProps & ViewProps;
export type ChildProps = TabProps & { children: ChildContentElement };

export class TabView extends React.Component<Props> {

  static defaultProps: Partial<Props> = {
    selectedIndex: 0,
    contentWidth: Dimensions.get('window').width,
  };

  private viewPagerRef: React.RefObject<ViewPager> = React.createRef();
  private tabBarRef: React.RefObject<TabBarComponent> = React.createRef();

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

  private createComponentChild = (element: ChildElement, index: number): TabViewChildElement => {
    const { children, ...elementProps } = element.props;

    return {
      tab: React.createElement(Tab, { key: index, ...elementProps }),
      content: children,
    };
  };

  private createComponentChildren = (source: ChildElement | ChildElement[]): TabViewChildren => {
    return React.Children.toArray(source).reduce((acc: TabViewChildren, element: ChildElement, index: number) => {
      const { tab, content } = this.createComponentChild(element, index);
      return {
        tabs: [...acc.tabs, tab],
        content: [...acc.content, content],
      };
    }, new TabViewChildren());
  };

  public render(): React.ReactElement<ViewProps> {
    const { selectedIndex, contentWidth, children, ...derivedProps } = this.props;
    const { tabs, content } = this.createComponentChildren(children);

    return (
      <View {...derivedProps}>
        <TabBar
          ref={this.tabBarRef}
          selectedIndex={selectedIndex}
          onSelect={this.onBarSelect}>
          {tabs}
        </TabBar>
        <ViewPager
          ref={this.viewPagerRef}
          selectedIndex={selectedIndex}
          contentWidth={contentWidth}
          shouldLoadComponent={this.props.shouldLoadComponent}
          onOffsetChange={this.onPagerOffsetChange}
          onSelect={this.onPagerSelect}>
          {content}
        </ViewPager>
      </View>
    );
  }
}

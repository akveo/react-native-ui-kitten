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
import { toArray } from '../service/common.service';

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

const TabBar = styled<TabBarComponent, TabBarProps>(TabBarComponent);
const Tab = styled<TabComponent, TabProps>(TabComponent);

export type Props = TabViewProps & ViewProps;
export type ChildProps = TabProps & { children: ChildContentElement };

export class TabView extends React.Component<Props> {

  static defaultProps: Partial<Props> = {
    selectedIndex: 0,
    contentWidth: Dimensions.get('window').width,
  };

  private viewPagerRef: React.RefObject<ViewPager> = React.createRef();
  private tabBarRef: React.RefObject<any> = React.createRef();

  private onBarSelect = (index: number) => {
    const { current: viewPager } = this.viewPagerRef;

    viewPager.scrollToIndex({ index });
  };

  private onPagerOffsetChange = (offset: number) => {
    const { current: tabBar } = this.tabBarRef;

    tabBar.scrollToOffset({ offset: offset / tabBar.props.children.length });
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
    return toArray(source).reduce((acc: TabViewChildren, element: ChildElement, index: number) => {
      const { tab, content } = this.createComponentChild(element, index);
      return {
        tabs: [...acc.tabs, tab],
        content: [...acc.content, content],
      };
    }, new TabViewChildren());
  };

  public render(): React.ReactNode {
    const { tabs, content } = this.createComponentChildren(this.props.children);

    return (
      <View {...this.props}>
        <TabBar
          ref={this.tabBarRef}
          selectedIndex={this.props.selectedIndex}
          onSelect={this.onBarSelect}>
          {tabs}
        </TabBar>
        <ViewPager
          ref={this.viewPagerRef}
          selectedIndex={this.props.selectedIndex}
          contentWidth={this.props.contentWidth}
          shouldLoadComponent={this.props.shouldLoadComponent}
          onOffsetChange={this.onPagerOffsetChange}
          onSelect={this.onPagerSelect}>
          {content}
        </ViewPager>
      </View>
    );
  }
}

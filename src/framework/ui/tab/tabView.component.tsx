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

type ChildElement = React.ReactElement<ChildElementProps>;
type ChildContentElement = React.ReactChild;
type ChildElementProps = TabProps & { children: ChildContentElement };

interface TabViewChildren {
  tabs?: React.ReactElement<TabProps>[];
  content?: ChildContentElement[];
}

interface TabViewProps {
  children: ChildElement | ChildElement[];
  selectedIndex?: number;
  contentWidth?: number;
  shouldLoadComponent?: (index: number) => boolean;
  onOffsetChange?: (offset: number) => void;
  onSelect?: (index: number) => void;
}

export type Props = TabViewProps & ViewProps;

interface State {
  children: TabViewChildren;
}

const TabBar = styled<TabBarComponent, TabBarProps>(TabBarComponent);
const Tab = styled<TabComponent, TabProps>(TabComponent);

export class TabView extends React.Component<Props> {

  static defaultProps: Partial<Props> = {
    selectedIndex: 0,
    contentWidth: Dimensions.get('window').width,
  };

  static getDerivedStateFromProps(props: Props): Partial<State> {
    const derivedChildren: ChildElement[] = toArray(props.children);
    return {
      children: createTabViewChildren(derivedChildren),
    };
  }

  public state: State = {
    children: {},
  };

  private viewPager: React.RefObject<ViewPager> = React.createRef();
  private tabBar: React.RefObject<any> = React.createRef();

  private onBarSelect = (index: number) => {
    this.viewPager.current.scrollToIndex({ index });
  };

  private onPagerOffsetChange = (offset: number) => {
    const { children } = this.state;
    this.tabBar.current.scrollToOffset({ offset: offset / children.tabs.length });
  };

  private onPagerSelect = (selectedIndex: number) => {
    if (this.props.onSelect) {
      this.props.onSelect(selectedIndex);
    }
  };

  render() {
    return (
      <View {...this.props}>
        <TabBar
          ref={this.tabBar}
          selectedIndex={this.props.selectedIndex}
          onSelect={this.onBarSelect}>
          {this.state.children.tabs}
        </TabBar>
        <ViewPager
          ref={this.viewPager}
          selectedIndex={this.props.selectedIndex}
          contentWidth={this.props.contentWidth}
          shouldLoadComponent={this.props.shouldLoadComponent}
          onOffsetChange={this.onPagerOffsetChange}
          onSelect={this.onPagerSelect}>
          {this.state.children.content}
        </ViewPager>
      </View>
    );
  }
}

function createTabViewChildren(source: ChildElement[]): TabViewChildren {
  const initialValue = {
    tabs: [],
    content: [],
  };

  return source.reduce((children: TabViewChildren, element: ChildElement, index: number): TabViewChildren => {
    const { children: elementChildren, ...elementProps } = element.props;
    const tab = React.createElement(Tab, { key: index, ...elementProps });

    return {
      tabs: [...children.tabs, tab],
      content: [...children.content, elementChildren],
    };
  }, initialValue);
}

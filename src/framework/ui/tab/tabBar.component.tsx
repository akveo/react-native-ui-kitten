import React from 'react';
import {
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';
import {
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import { TabBarIndicator } from './tabBarIndicator.component';
import { Props as ChildProps } from './tab.component';
import { toArray } from '../service/common.service';

type ChildElement = React.ReactElement<ChildProps>;

interface TabBarProps {
  children: ChildElement | ChildElement[];
  selectedIndex?: number;
  onSelect?: (index: number) => void;
}

export type Props = TabBarProps & StyledComponentProps & ViewProps;

interface State {
  children: ChildElement[];
}

export class TabBar extends React.Component<Props, State> {

  static defaultProps: Partial<Props> = {
    selectedIndex: 0,
  };

  static getDerivedStateFromProps(props: Props): Partial<State> {
    return {
      children: toArray(props.children),
    };
  }

  public state: State = {
    children: [],
  };

  private tabIndicator: React.RefObject<TabBarIndicator> = React.createRef();

  public scrollToIndex(params: { index: number, animated?: boolean }) {
    this.tabIndicator.current.scrollToIndex(params);
  }

  public scrollToOffset(params: { offset: number, animated?: boolean }) {
    this.tabIndicator.current.scrollToOffset(params);
  }

  private onChildPress = (index: number) => {
    if (this.props.onSelect) {
      this.props.onSelect(index);
    }
  };

  private renderChild = (element: ChildElement, index: number) => {
    return (
      <TouchableOpacity
        style={{ flex: 1 }}
        key={index}
        activeOpacity={1.0}
        onPress={() => this.onChildPress(index)}>
        {React.cloneElement(element, element.props)}
      </TouchableOpacity>
    );
  };

  private renderChildren = (elements: ChildElement[]): ChildElement[] => {
    return elements.map(this.renderChild);
  };

  private getComponentStyle = (source: StyleType): StyleType => {
    return {
      bar: {
        flexDirection: 'row',
        height: source.barSize,
      },
      indicator: {
        height: source.indicatorSize,
        borderRadius: source.indicatorBorderRadius,
        backgroundColor: source.indicatorColor,
      },
    };
  };

  render() {
    const componentStyle: StyleType = this.getComponentStyle(this.props.themedStyle);

    return (
      <View>
        <View
          {...this.props}
          style={[this.props.style, componentStyle.bar]}>
          {this.renderChildren(this.state.children)}
        </View>
        <TabBarIndicator
          ref={this.tabIndicator}
          style={componentStyle.indicator}
          selectedPosition={this.props.selectedIndex}
          positions={this.state.children.length}
        />
      </View>
    );
  }
}

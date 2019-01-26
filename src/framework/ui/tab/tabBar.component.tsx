import React from 'react';
import {
  TouchableWithoutFeedback,
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

export class TabBar extends React.Component<Props> {

  static defaultProps: Partial<Props> = {
    selectedIndex: 0,
  };

  private tabIndicatorRef: React.RefObject<TabBarIndicator> = React.createRef();

  public scrollToIndex(params: { index: number, animated?: boolean }) {
    const { current: tabIndicator } = this.tabIndicatorRef;

    tabIndicator.scrollToIndex(params);
  }

  public scrollToOffset(params: { offset: number, animated?: boolean }) {
    const { current: tabIndicator } = this.tabIndicatorRef;

    tabIndicator.scrollToOffset(params);
  }

  private onChildPress = (index: number) => {
    if (this.props.onSelect) {
      this.props.onSelect(index);
    }
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

  private createComponentChild = (element: ChildElement, index: number): ChildElement => {
    return (
      <TouchableWithoutFeedback
        {...element.props}
        style={{ flex: 1 }}
        key={index}
        onPress={() => this.onChildPress(index)}>
        {element}
      </TouchableWithoutFeedback>
    );
  };

  private createComponentChildren = (source: ChildElement | ChildElement[]): ChildElement[] => {
    return toArray(source).map(this.createComponentChild);
  };

  public render(): React.ReactNode {
    const componentStyle: StyleType = this.getComponentStyle(this.props.themedStyle);
    const children: ChildElement[] = this.createComponentChildren(this.props.children);

    return (
      <View>
        <View
          {...this.props}
          style={[this.props.style, componentStyle.bar]}>
          {children}
        </View>
        <TabBarIndicator
          ref={this.tabIndicatorRef}
          style={componentStyle.indicator}
          selectedPosition={this.props.selectedIndex}
          positions={children.length}
        />
      </View>
    );
  }
}

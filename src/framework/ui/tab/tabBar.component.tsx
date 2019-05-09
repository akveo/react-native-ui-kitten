/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import { TabBarIndicator } from './tabBarIndicator.component';
import { Props as TabProps } from './tab.component';

type TabElement = React.ReactElement<TabProps>;

interface TabBarProps {
  children: TabElement | TabElement[];
  selectedIndex?: number;
  indicatorStyle?: StyleProp<ViewStyle>;
  onSelect?: (index: number) => void;
}

export type Props = TabBarProps & StyledComponentProps & ViewProps;

/**
 * The `TabBar` component that manages Tab components.
 *
 * @extends React.Component
 *
 * @property {number} selectedIndex - Determines current tab index.
 *
 * @property {StyleProp<ViewStyle>} indicatorStyle - Determines style of selected tab indicator.
 *
 * @property {(index: number) => void} onSelect - Fires on onPress event and returns tab index.
 *
 * @property {React.ReactElement<TabProps>} children - Determines tabs.
 *
 * @property ViewProps
 *
 * @property StyledComponentProps
 *
 * @example TabBar usage and API example
 *
 * ```
 * import {
 *   TabBar,
 *   Tab,
 * } from '@kitten/ui';
 *
 * public state: State = {
 *   barSelectedIndex: 0,
 * };
 *
 * private onBarSelect = (index: number) => {
 *   this.setState({ barSelectedIndex: index });
 * };
 *
 * public render(): React.ReactNode {
 *   return (
 *     <TabBar
 *       onSelect={this.onBarSelect}
 *       selectedIndex={this.state.barSelectedIndex}>
 *       <Tab title='❤'/>
 *       <Tab title='💛️'/>
 *       <Tab title='💚️'/>
 *     </TabBar>
 *   );
 * }
 * ```
 * */

export class TabBar extends React.Component<Props> {

  static styledComponentName: string = 'TabBar';

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
    const { indicatorStyle } = this.props;
    const {
      indicatorHeight,
      indicatorBorderRadius,
      indicatorBackgroundColor,
      ...containerParameters
    } = source;

    return {
      container: containerParameters,
      indicator: {
        height: indicatorHeight,
        borderRadius: indicatorBorderRadius,
        backgroundColor: indicatorBackgroundColor,
        ...StyleSheet.flatten(indicatorStyle),
      },
    };
  };

  private renderComponentChild = (element: TabElement, index: number): TabElement => {
    const derivedStyle: TextStyle = StyleSheet.flatten(element.props.style);

    return React.cloneElement(element, {
      key: index,
      style: { ...derivedStyle, flex: 1 },
      selected: index === this.props.selectedIndex,
      onSelect: () => this.onChildPress(index),
    });
  };

  private renderComponentChildren = (source: TabElement | TabElement[]): TabElement[] => {
    return React.Children.map(source, this.renderComponentChild);
  };

  public render(): React.ReactElement<ViewProps> {
    const { style, themedStyle, selectedIndex, children, ...derivedProps } = this.props;
    const { container, indicator } = this.getComponentStyle(themedStyle);

    const componentChildren: TabElement[] = this.renderComponentChildren(children);

    return (
      <View>
        <View
          {...derivedProps}
          style={[style, container, styles.container]}>
          {componentChildren}
        </View>
        <TabBarIndicator
          ref={this.tabIndicatorRef}
          style={[indicator, styles.indicator]}
          selectedPosition={selectedIndex}
          positions={componentChildren.length}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  indicator: {},
});

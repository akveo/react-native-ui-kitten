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
import {
  styled,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import { TabProps } from './tab.component';
import { TabIndicator } from '../support/components';

type TabElement = React.ReactElement<TabProps>;
type ChildrenProp = TabElement | TabElement[];

interface ComponentProps {
  children: ChildrenProp;
  selectedIndex?: number;
  indicatorStyle?: StyleProp<ViewStyle>;
  onSelect?: (index: number) => void;
}

export type TabBarProps = StyledComponentProps & ViewProps & ComponentProps;

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
 *       <Tab title='Tab 1'/>
 *       <Tab title='Tab 2'/>
 *       <Tab title='Tab 3'/>
 *     </TabBar>
 *   );
 * }
 * ```
 * */

export class TabBarComponent extends React.Component<TabBarProps> {

  static styledComponentName: string = 'TabBar';

  static defaultProps: Partial<TabBarProps> = {
    selectedIndex: 0,
  };

  private tabIndicatorRef: React.RefObject<TabIndicator> = React.createRef();

  public scrollToIndex(params: { index: number, animated?: boolean }) {
    const { current: tabIndicator } = this.tabIndicatorRef;

    tabIndicator.scrollToIndex(params);
  }

  public scrollToOffset(params: { offset: number, animated?: boolean }) {
    const { current: tabIndicator } = this.tabIndicatorRef;

    tabIndicator.scrollToOffset(params);
  }

  private onTabSelect = (index: number) => {
    if (this.props.onSelect) {
      this.props.onSelect(index);
    }
  };

  private getComponentStyle = (source: StyleType): StyleType => {
    const { style, indicatorStyle } = this.props;

    const {
      indicatorHeight,
      indicatorBorderRadius,
      indicatorBackgroundColor,
      ...containerParameters
    } = source;

    return {
      container: {
        ...containerParameters,
        ...styles.container,
        ...StyleSheet.flatten(style),
      },
      indicator: {
        height: indicatorHeight,
        borderRadius: indicatorBorderRadius,
        backgroundColor: indicatorBackgroundColor,
        ...styles.indicator,
        ...StyleSheet.flatten(indicatorStyle),
      },
    };
  };

  private isTabSelected = (index: number): boolean => {
    const { selectedIndex } = this.props;

    return index === selectedIndex;
  };

  private renderTabElement = (element: TabElement, index: number): TabElement => {
    return React.cloneElement(element, {
      key: index,
      style: [styles.item, element.props.style],
      selected: this.isTabSelected(index),
      onSelect: () => this.onTabSelect(index),
    });
  };

  private renderTabElements = (source: ChildrenProp): TabElement[] => {
    return React.Children.map(source, this.renderTabElement);
  };

  public render(): React.ReactElement<ViewProps> {
    const { themedStyle, selectedIndex, children, ...derivedProps } = this.props;
    const componentStyle: StyleType = this.getComponentStyle(themedStyle);

    const tabElements: TabElement[] = this.renderTabElements(children);

    return (
      <View>
        <View
          {...derivedProps}
          style={componentStyle.container}>
          {tabElements}
        </View>
        <TabIndicator
          ref={this.tabIndicatorRef}
          style={componentStyle.indicator}
          selectedPosition={selectedIndex}
          positions={tabElements.length}
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
  item: {
    flex: 1,
  },
});

export const TabBar = styled<TabBarProps>(TabBarComponent);

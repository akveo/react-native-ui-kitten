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
  ChildrenWithProps,
  Overwrite,
  LiteralUnion,
} from '../../devsupport';
import {
  styled,
  StyledComponentProps,
  StyleType,
} from '../../theme';
import {
  TabElement,
  TabProps,
} from './tab.component';
import { TabIndicator } from '../shared/tabIndicator.component';

type TabBarStyledProps = Overwrite<StyledComponentProps, {
  appearance?: LiteralUnion<'default'>;
}>;

export interface TabBarProps extends ViewProps, TabBarStyledProps {
  children?: ChildrenWithProps<TabProps>;
  selectedIndex?: number;
  onSelect?: (index: number) => void;
  indicatorStyle?: StyleProp<ViewStyle>;
}

export type TabBarElement = React.ReactElement<TabBarProps>;

/**
 * A bar with tabs styled by Eva.
 * TabBar should contain Tab components to provide a useful navigation component.
 *
 * @extends React.Component
 *
 * @property {ReactElement<TabProps> | ReactElement<TabProps>[]} children - Tabs to be rendered within the bar.
 *
 * @property {number} selectedIndex - Index of currently selected tab.
 *
 * @property {(number) => void} onSelect - Called when tab is pressed.
 *
 * @property {StyleProp<ViewStyle>} indicatorStyle - Style of the indicator component.
 *
 * @property {ViewProps} ...ViewProps - Any props applied to View component.
 *
 * @overview-example TabBarSimpleUsage
 * In basic examples, tabs are wrapped within `TabBar`.
 *
 * @overview-example Using with React Navigation
 * TabBar can also be [configured with React Navigation](guides/configure-navigation)
 * to provide a navigational component.
 * ```
 * import React from 'react';
 * import { NavigationContainer } from '@react-navigation/native';
 * import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
 * import { TabBar, Tab, Layout, Text } from '@ui-kitten/components';
 *
 * const { Navigator, Screen } = createMaterialTopTabNavigator();
 *
 * const UsersScreen = () => (
 *   <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
 *     <Text category='h1'>USERS</Text>
 *   </Layout>
 * );
 *
 * const OrdersScreen = () => (
 *   <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
 *     <Text category='h1'>ORDERS</Text>
 *   </Layout>
 * );
 *
 * const TopTabBar = ({ navigation, state }) => (
 *   <TabBar
 *     selectedIndex={state.index}
 *     onSelect={index => navigation.navigate(state.routeNames[index])}>
 *     <Tab title='USERS'/>
 *     <Tab title='ORDERS'/>
 *   </TabBar>
 * );
 *
 * const TabNavigator = () => (
 *   <Navigator tabBar={props => <TopTabBar {...props} />}>
 *     <Screen name='Users' component={UsersScreen}/>
 *     <Screen name='Orders' component={OrdersScreen}/>
 *   </Navigator>
 * );
 *
 * export const AppNavigator = () => (
 *   <NavigationContainer>
 *     <TabNavigator/>
 *   </NavigationContainer>
 * );
 * ```
 *
 * @overview-example TabBarAccessories
 * Tabs also may contain [icons](guides/icon-packages), to provide a better user interfaces.
 *
 * @overview-example TabStyling
 * Tab and it's inner views can be styled by passing them as function components.
 * ```
 * import { Tab, Text } from '@ui-kitten/components';
 *
 * <Tab
 *   title={evaProps => <Text {...evaProps}>USERS</Text>}
 * />
 * ```
 *
 * @overview-example TabTheming
 * In most cases this is redundant, if [custom theme is configured](guides/branding).
 */
@styled('TabBar')
export class TabBar extends React.Component<TabBarProps> {

  static defaultProps: Partial<TabBarProps> = {
    selectedIndex: 0,
  };

  private tabIndicatorRef = React.createRef<TabIndicator>();

  public scrollToIndex(params: { index: number, animated?: boolean }): void {
    this.tabIndicatorRef.current?.scrollToIndex(params);
  }

  public scrollToOffset(params: { offset: number, animated?: boolean }): void {
    this.tabIndicatorRef.current?.scrollToOffset(params);
  }

  private onTabSelect = (index: number): void => {
    this.props.onSelect && this.props.onSelect(index);
  };

  private getComponentStyle = (source: StyleType) => {
    const {
      indicatorHeight,
      indicatorBorderRadius,
      indicatorBackgroundColor,
      ...containerParameters
    } = source;

    return {
      container: containerParameters,
      item: {},
      indicator: {
        height: indicatorHeight,
        borderRadius: indicatorBorderRadius,
        backgroundColor: indicatorBackgroundColor,
      },
    };
  };

  private isTabSelected = (index: number): boolean => {
    return index === this.props.selectedIndex;
  };

  private renderTabElement = (element: TabElement, index: number): TabElement => {
    return React.cloneElement(element, {
      key: index,
      style: [styles.item, element.props.style],
      selected: this.isTabSelected(index),
      onSelect: () => this.onTabSelect(index),
    });
  };

  private renderTabElements = (source: ChildrenWithProps<TabProps>): TabElement[] => {
    return React.Children.map(source, this.renderTabElement);
  };

  public render(): React.ReactElement<ViewProps> {
    const { eva, style, testID, indicatorStyle, selectedIndex, children, ...viewProps } = this.props;
    const evaStyle = this.getComponentStyle(eva.style);
    const tabElements: TabElement[] = this.renderTabElements(children);

    return (
      <View testID={testID}>
        <View
          {...viewProps}
          style={[evaStyle.container, styles.container, style]}>
          {tabElements}
        </View>
        <TabIndicator
          ref={this.tabIndicatorRef}
          style={[evaStyle.indicator, styles.indicator, indicatorStyle]}
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
  item: {
    flex: 1,
  },
  indicator: {},
});

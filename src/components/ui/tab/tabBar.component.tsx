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
import { Overwrite } from 'utility-types';
import { ChildrenWithProps } from '../../devsupport';
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
  appearance?: 'default' | string;
}>;

export interface TabBarProps extends ViewProps, TabBarStyledProps {
  selectedIndex?: number;
  onSelect?: (index: number) => void;
  children?: ChildrenWithProps<TabProps>;
  indicatorStyle?: StyleProp<ViewStyle>;
}

export type TabBarElement = React.ReactElement<TabBarProps>;

/**
 * The `TabBar` component that manages `Tab` components.
 *
 * @extends React.Component
 *
 * @property {number} selectedIndex - Determines index of the selected tab.
 *
 * @property {(index: number) => void} onSelect - Called when tab is pressed.
 *
 * @property {ReactElement<TabProps> | ReactElement<TabProps>[]} children - Tab components to render within the bar.
 *
 * @property {StyleProp<ViewStyle>} indicatorStyle - Determines style of the indicator component.
 *
 * @property {ViewProps} ...ViewProps - Any props applied to View component.
 *
 * @overview-example TabBarSimpleUsage
 *
 * @overview-example TabBarWithIcon
 *
 * @overview-example Using with React Navigation
 *
 * ```
 * import React from 'react';
 * import { SafeAreaView } from 'react-native';
 * import { NavigationContainer } from '@react-navigation/native';
 * import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
 * import { TabBar, Tab, Layout, Text } from '@ui-kitten/components';
 *
 * // React Navigation Top Tabs also requires installation of `react-native-tab-view`
 * // npm i react-native-tab-view
 *
 * const TopTab = createBottomTabNavigator();
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
 * const TopTabBar = ({ navigation, state }) => {
 *
 *   const onSelect = (index) => {
 *     navigation.navigate(state.routeNames[index]);
 *   };
 *
 *   return (
 *     <SafeAreaView>
 *       <TabBar selectedIndex={state.index} onSelect={onSelect}>
 *         <Tab title='USERS'/>
 *         <Tab title='ORDERS'/>
 *       </BottomNavigation>
 *     </SafeAreaView>
 *   );
 * };
 *
 * const TabNavigator = () => (
 *   <TopTab.Navigator tabBar={props => <TopTabBar {...props} />}>
 *     <TopTab.Screen name='Users' component={UsersScreen}/>
 *     <TopTab.Screen name='Orders' component={OrdersScreen}/>
 *   </TopTab.Navigator>
 * );
 *
 * export const AppNavigator = () => (
 *   <NavigationContainer>
 *     <TabNavigator/>
 *   </NavigationContainer>
 * );
 * ```
 */
export class TabBarComponent extends React.Component<TabBarProps> {

  static styledComponentName: string = 'TabBar';

  static defaultProps: Partial<TabBarProps> = {
    selectedIndex: 0,
  };

  private tabIndicatorRef: React.RefObject<TabIndicator> = React.createRef();

  public scrollToIndex(params: { index: number, animated?: boolean }): void {
    const { current: tabIndicator } = this.tabIndicatorRef;

    tabIndicator.scrollToIndex(params);
  }

  public scrollToOffset(params: { offset: number, animated?: boolean }): void {
    const { current: tabIndicator } = this.tabIndicatorRef;

    tabIndicator.scrollToOffset(params);
  }

  private onTabSelect = (index: number): void => {
    if (this.props.onSelect) {
      this.props.onSelect(index);
    }
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
    const { eva, style, indicatorStyle, selectedIndex, children, ...viewProps } = this.props;
    const evaStyle = this.getComponentStyle(eva.style);
    const tabElements: TabElement[] = this.renderTabElements(children);

    return (
      <View>
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

export const TabBar = styled<TabBarProps>(TabBarComponent);

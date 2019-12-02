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
import { TabElement } from './tab.component';
import { TabIndicator } from '../support/components/tabIndicator.component';

type ChildrenProp = TabElement | TabElement[];

interface ComponentProps {
  children: ChildrenProp;
  selectedIndex?: number;
  indicatorStyle?: StyleProp<ViewStyle>;
  onSelect?: (index: number) => void;
}

export type TabBarProps = StyledComponentProps & ViewProps & ComponentProps;
export type TabBarElement = React.ReactElement<TabBarProps>;

/**
 * The `TabBar` component that manages `Tab` components.
 *
 * @extends React.Component
 *
 * @property {number} selectedIndex - Determines current tab index.
 *
 * @property {StyleProp<ViewStyle>} indicatorStyle - Determines style of selected tab indicator.
 *
 * @property {(index: number) => void} onSelect - Fires on tab select with corresponding index.
 *
 * @property {ReactElement<TabProps> | ReactElement<TabProps>[]} children - Determines tabs.
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
 * import { createAppContainer, SafeAreaView } from 'react-navigation';
 * import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
 * import { TabBar, Tab, Layout, Text } from '@ui-kitten/components';
 *
 * // React Navigation also requires installing additional dependencies:
 * //
 * // npm i react-navigation react-navigation-tabs react-native-reanimated react-native-gesture-handler
 * //
 * // Then install it for ios:
 * //
 * // cd ios && pod install
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
 * const TabBarComponent = ({ navigation }) => {
 *
 *   const onSelect = (index) => {
 *     const selectedTabRoute = navigation.state.routes[index];
 *     navigation.navigate(selectedTabRoute.routeName);
 *   };
 *
 *   return (
 *     <SafeAreaView>
 *       <TabBar selectedIndex={navigation.state.index} onSelect={onSelect}>
 *         <Tab title='USERS'/>
 *         <Tab title='ORDERS'/>
 *       </TabBar>
 *     </SafeAreaView>
 *   );
 * };
 *
 * const TabNavigator = createMaterialTopTabNavigator({
 *   Users: UsersScreen,
 *   Orders: OrdersScreen,
 * }, {
 *   tabBarComponent: TabBarComponent,
 * });
 *
 * export const AppNavigator = createAppContainer(TabNavigator);
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

  private getComponentStyle = (source: StyleType): StyleType => {
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

  private renderTabElements = (source: ChildrenProp): TabElement[] => {
    return React.Children.map(source, this.renderTabElement);
  };

  public render(): React.ReactElement<ViewProps> {
    const { themedStyle, style, indicatorStyle, selectedIndex, children, ...derivedProps } = this.props;
    const componentStyle: StyleType = this.getComponentStyle(themedStyle);

    const tabElements: TabElement[] = this.renderTabElements(children);

    return (
      <View>
        <View
          {...derivedProps}
          style={[componentStyle.container, styles.container, style]}>
          {tabElements}
        </View>
        <TabIndicator
          ref={this.tabIndicatorRef}
          style={[componentStyle.indicator, styles.indicator, indicatorStyle]}
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

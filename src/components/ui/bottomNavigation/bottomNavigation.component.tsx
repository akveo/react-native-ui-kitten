/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React, { useCallback, useMemo } from 'react';
import {
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {
  ChildrenWithProps,
  LiteralUnion,
} from '../../devsupport';
import {
  useStyled,
  StyleType,
} from '../../theme';
import {
  BottomNavigationTabElement,
  BottomNavigationTabProps,
} from './bottomNavigationTab.component';
import {
  TabIndicator,
  TabIndicatorElement,
} from '../shared/tabIndicator.component';

export interface BottomNavigationProps extends ViewProps {
  children?: ChildrenWithProps<BottomNavigationTabProps>;
  selectedIndex?: number;
  onSelect?: (index: number) => void;
  indicatorStyle?: StyleProp<ViewStyle>;
  appearance?: LiteralUnion<'default' | 'noIndicator'>;
}

export type BottomNavigationElement = React.ReactElement<BottomNavigationProps>;

/**
 * A bar with tabs styled by Eva.
 * BottomNavigation should contain BottomNavigationTab components to provide a usable navigation component.
 *
 * @extends React.FC
 *
 * @property {ReactElement<TabProps> | ReactElement<TabProps>[]} children - Tabs to be rendered within the bar.
 *
 * @property {number} selectedIndex - Index of currently selected tab.
 *
 * @property {(number) => void} onSelect - Called when tab is pressed.
 *
 * @property {string} appearance - Appearance of the component.
 * Can be `default` or `noIndicator`.
 *
 * @property {StyleProp<ViewStyle>} indicatorStyle - Styles of the indicator.
 *
 * @property {ViewProps} ...ViewProps - Any props applied to View component.
 *
 * @overview-example BottomNavigationSimpleUsage
 * In basic examples, tabs are wrapped within `BottomNavigation`.
 *
 * @overview-example Using with React Navigation
 * BottomNavigation can also be [configured with React Navigation](guides/configure-navigation)
 * to provide a navigational component.
 *
 * ```
 * import React from 'react';
 * import { NavigationContainer } from '@react-navigation/native';
 * import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 * import { BottomNavigation, BottomNavigationTab, Layout, Text } from '@ui-kitten/components';
 *
 * const { Navigator, Screen } = createBottomTabNavigator();
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
 * const BottomTabBar = ({ navigation, state }) => (
 *   <BottomNavigation
 *     selectedIndex={state.index}
 *     onSelect={index => navigation.navigate(state.routeNames[index])}>
 *     <BottomNavigationTab title='USERS'/>
 *     <BottomNavigationTab title='ORDERS'/>
 *   </BottomNavigation>
 * );
 *
 * const TabNavigator = () => (
 *   <Navigator tabBar={props => <BottomTabBar {...props} />}>
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
 * @overview-example BottomNavigationAccessories
 * Tabs also may contain [icons](guides/icon-packages) to provide a better user interfaces.
 *
 * @overview-example BottomNavigationTabStyling
 * Tabs and it's inner views can be styled by passing them as function components.
 * ```
 * import { BottomNavigationTab, Text } from '@ui-kitten/components';
 *
 * <BottomNavigationTab
 *   title={evaProps => <Text {...evaProps}>USERS</Text>}
 * />
 * ```
 * @overview-example BottomNavigationTabTheming
 * In most cases this is redundant, if [custom theme is configured](guides/branding).
 *
 * @example BottomNavigationWithoutIndicator
 * To remove indicator, `appearance` property may be used.
 */

const getComponentStyle = (source: StyleType): StyleType => {
  const { indicatorHeight, indicatorBackgroundColor, ...containerParameters } = source;

  return {
    container: containerParameters,
    indicator: {
      height: indicatorHeight,
      backgroundColor: indicatorBackgroundColor,
    },
  };
};

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  style,
  children,
  selectedIndex = 0,
  onSelect,
  indicatorStyle,
  appearance,
  testID,
  ...viewProps
}) => {
  const { style: evaStyleRaw } = useStyled('BottomNavigation', { appearance });
  const evaStyle = useMemo(() => getComponentStyle(evaStyleRaw), [evaStyleRaw]);

  const onTabSelect = useCallback((index: number) => {
    onSelect?.(index);
  }, [onSelect]);

  const renderIndicatorElement = (positions: number, indicatorStyleProp: ViewStyle): TabIndicatorElement => {
    return (
      <TabIndicator
        key={0}
        style={[indicatorStyleProp, indicatorStyle]}
        selectedPosition={selectedIndex}
        positions={positions}
      />
    );
  };

  const renderTabElement = (element: BottomNavigationTabElement, index: number): BottomNavigationTabElement => {
    return React.cloneElement(element, {
      key: index,
      style: [styles.item, element.props.style],
      selected: index === selectedIndex,
      onSelect: () => onTabSelect(index),
    });
  };

  const renderTabElements = (source: ChildrenWithProps<BottomNavigationTabProps>): BottomNavigationTabElement[] => {
    return React.Children.map(source, renderTabElement);
  };

  const tabElements = renderTabElements(children);
  const hasIndicator = evaStyle.indicator.height > 0;

  return (
    <View testID={testID} {...viewProps}>
      {hasIndicator && renderIndicatorElement(tabElements.length, evaStyle.indicator)}
      <View style={[evaStyle.container, styles.elementsContainer, style]}>
        {tabElements}
      </View>
    </View>
  );
};

BottomNavigation.displayName = 'BottomNavigation';

const styles = StyleSheet.create({
  elementsContainer: {
    flexDirection: 'row',
  },
  item: {
    flex: 1,
  },
});

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ImageProps,
  TouchableOpacityProps,
  StyleProp,
  TextStyle,
} from 'react-native';
import {
  styled,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import {
  Text,
  TextProps,
} from '../text/text.component';
import { isValidString } from '../support/services';

type TitleElement = React.ReactElement<TextProps>;
type IconElement = React.ReactElement<ImageProps>;
type IconProp = (style: StyleType) => IconElement;

interface ComponentProps {
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  icon?: IconProp;
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
}

export type BottomNavigationTabProps = StyledComponentProps & TouchableOpacityProps & ComponentProps;

/**
 * The `BottomNavigatorTab` component is a part of the BottomTabNavigator component.
 * Bottom Navigator Tabs should be wrapped in BottomTabNavigator to provide usable component.
 *
 * @extends React.Component
 *
 * @property {boolean} selected - Determines whether component is selected.
 *
 * @property {string} title - Determines the title of the tab.
 *
 * @property {StyleProp<TextStyle>} titleStyle - Customizes title style.
 *
 * @property {(style: StyleType) => React.ReactElement<ImageProps>} icon - Determines the icon of the tab.
 *
 * @property {(selected: boolean) => void} onSelect - Triggered on select value.
 *
 * @property TouchableOpacityProps
 *
 * @property StyledComponentProps
 *
 * @example Simple usage example
 *
 * ```tsx
 * import { BottomNavigatorTab } from '@kitten/ui';
 * <BottomNavigatorTab selected={true}/>
 * ```
 *
 * @example with React Navigation usage example
 *
 * ```tsx
 * import { Image } from 'react-native';
 * import {
 *   BottomNavigation,
 *   BottomNavigationTab,
 * } from '@kitten/ui';
 * import {
 *   createBottomTabNavigator,
 *   NavigationContainer,
 *   NavigationContainerProps,
 *   NavigationScreenProp,
 *   NavigationState,
 *   NavigationRoute,
 * } from 'react-navigation';
 *
 * type CommonNavigationProps = NavigationProps & NavigationContainerProps;
 *
 * export const TabNavigatorScreen: NavigationContainer = createBottomTabNavigator({
 *   ...screens,
 * }, {
 *   initialRouteName: 'Screen1',
 *   tabBarComponent: (props: CommonNavigationProps) => renderBottomNavigation(props),
 * });
 *
 *function renderBottomNavigation(props: CommonNavigationProps): React.ReactElement<ViewProps> {
 *  const routes: NavigationRoute[] = props.navigation.state.routes;
 *  const index: number = props.navigation.state.index;
 *
 *  return (
 *   <BottomNavigation
 *     selectedIndex={index}
 *     onSelect={(selectedIndex: number) => navigateToTab(selectedIndex)}>
 *     <BottomNavigationTab
 *       title='Screen 1'
 *       icon={(style: StyleType) => <Image source={getIconSource(style, index)}/>}/>
 *     <BottomNavigationTab
 *       title='Screen 2'
 *       icon={(style: StyleType) => <Image source={getIconSource(style, index)}/>}/>
 *     <BottomNavigationTab
 *       title='Screen 3'
 *       icon={(style: StyleType) => <Image source={getIconSource(style, index)}/>}/>
 *    </BottomNavigation>
 *  );
 * }
 * ```
 * */

export class BottomNavigationTabComponent extends React.Component<BottomNavigationTabProps> {

  static styledComponentName: string = 'BottomNavigationTab';

  private onPress = () => {
    if (this.props.onSelect) {
      this.props.onSelect(!this.props.selected);
    }
  };

  private getComponentStyle = (source: StyleType): StyleType => {
    const { style, titleStyle } = this.props;

    const {
      iconWidth,
      iconHeight,
      iconMarginVertical,
      iconTintColor,
      textMarginVertical,
      textFontSize,
      textLineHeight,
      textFontWeight,
      textColor,
      ...containerStyle
    } = source;

    return {
      container: {
        ...containerStyle,
        ...styles.container,
        ...StyleSheet.flatten(style),
      },
      icon: {
        width: iconWidth,
        height: iconHeight,
        marginVertical: iconMarginVertical,
        tintColor: iconTintColor,
        ...styles.icon,
      },
      text: {
        marginVertical: textMarginVertical,
        fontSize: textFontSize,
        lineHeight: textLineHeight,
        fontWeight: textFontWeight,
        color: textColor,
        ...styles.text,
        ...StyleSheet.flatten(titleStyle),
      },
    };
  };

  private renderIconElement = (style: StyleType): IconElement => {
    const iconElement: IconElement = this.props.icon(style);

    return React.cloneElement(iconElement, {
      key: 1,
      style: [style, iconElement.props.style],
    });
  };

  private renderTitleElement = (style: StyleType): TitleElement => {
    const { title } = this.props;

    return (
      <Text
        key={2}
        style={style}>
        {title}
      </Text>
    );
  };

  private renderComponentChildren = (style: StyleType): React.ReactNodeArray => {
    const { icon, title } = this.props;

    return [
      icon && this.renderIconElement(style.icon),
      isValidString(title) && this.renderTitleElement(style.text),
    ];
  };

  public render(): React.ReactNode {
    const { style, themedStyle, ...derivedProps } = this.props;
    const { container, ...componentStyles } = this.getComponentStyle(themedStyle);

    const [iconElement, titleElement] = this.renderComponentChildren(componentStyles);

    return (
      <TouchableOpacity
        {...derivedProps}
        style={container}
        activeOpacity={1.0}
        onPress={this.onPress}>
        {iconElement}
        {titleElement}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {},
  text: {},
});

export const BottomNavigationTab = styled<BottomNavigationTabProps>(BottomNavigationTabComponent);

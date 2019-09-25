/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  ImageProps,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  StyleProp,
  TextStyle,
  ImageStyle,
} from 'react-native';
import {
  styled,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import {
  Text,
  TextElement,
} from '../text/text.component';
import { isValidString } from '../support/services';

type IconElement = React.ReactElement<ImageProps>;
type IconProp = (style: ImageStyle) => React.ReactElement<ImageProps>;
type ContentElement = React.ReactElement<any>;

interface ComponentProps {
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  icon?: IconProp;
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
  children?: ContentElement;
}

export type TabProps = StyledComponentProps & TouchableOpacityProps & ComponentProps;
export type TabElement = React.ReactElement<TabProps>;

/**
 * `Tab` component is a part of `TabBar` or `TabView` component.
 * `TabView` Tabs should be wrapped in `TabBar` or `TabView` to provide usable component.
 * See usage examples at `TabView` component documentation.
 *
 * @extends React.Component
 *
 * @property {string} title - Determines the title of the component.
 *
 * @property {StyleProp<TextStyle>} titleStyle - Determines style of the title.
 *
 * @property {React.ReactElement<any>} children - Determines content of the tab.
 *
 * @property {(style: StyleType) => React.ReactElement<ImageProps>} icon - Determines icon of the component.
 *
 * @property {boolean} selected - Determines tab selection state.
 *
 * @property {(selected: boolean) => void} onSelect = Fires on onSelect event.
 *
 * @property TouchableOpacityProps
 *
 * @property StyledComponentProps
 *
 * @overview-example Simple Usage
 *
 * ```
 * import React from 'react';
 * import { Tab } from 'react-native-ui-kitten';
 *
 * export const DashboardTab = (props) => (
 *   <Tab title='DASHBOARD' />
 * );
 * ```
 *
 * @overview-example With Icon
 *
 * ```
 * // IMPORTANT: To use Icon component make sure to follow this guide:
 * // https://akveo.github.io/react-native-ui-kitten/docs/guides/eva-icons
 *
 * import React from 'react';
 * import { Tab, Icon } from 'react-native-ui-kitten';
 *
 * const DashboardIcon = (style) => (
 *   <Icon {...style} name='layout' />
 * );
 *
 * export const DashboardTab = (props) => (
 *   <Tab title='DASHBOARD' icon={DashboardIcon} />
 * );
 * ```
 *
 * @example Using Asset Icons
 *
 * ```
 * import React from 'react';
 * import { Image } from 'react-native';
 * import { Tab } from 'react-native-ui-kitten';
 *
 * const DashboardIcon = (style) => (
 *   <Image style={style} source={require('path-to-assets/local-image.png')} />
 * );
 *
 * export const DashboardTab = (props) => (
 *   <Tab title='DASHBOARD' icon={DashboardIcon} />
 * );
 * ```
 *
 * @example Inline Styling
 *
 * ```
 * import React from 'react';
 * import { StyleSheet } from 'react-native';
 * import { Tab } from 'react-native-ui-kitten';
 *
 * export const TabShowcase = (props) => (
 *   <Tab
 *     style={styles.tab}
 *     titleStyle={styles.tabTitle}
 *     title='DASHBOARD'
 *   />
 * );
 *
 * const styles = StyleSheet.create({
 *   tab: { backgroundColor: 'white' },
 *   tabTitle: { color: 'black' },
 * });
 * ```
 */
export class TabComponent extends React.Component<TabProps> {

  static styledComponentName: string = 'Tab';

  static defaultProps: Partial<TabProps> = {
    selected: false,
  };

  private onPress = () => {
    if (this.props.onSelect) {
      this.props.onSelect(!this.props.selected);
    }
  };

  private getComponentStyle = (source: StyleType): StyleType => {
    const {
      textMarginVertical,
      textFontSize,
      textLineHeight,
      textFontWeight,
      textColor,
      iconWidth,
      iconHeight,
      iconMarginVertical,
      iconTintColor,
      ...containerParameters
    } = source;

    return {
      container: containerParameters,
      icon: {
        width: iconWidth,
        height: iconHeight,
        marginVertical: iconMarginVertical,
        tintColor: iconTintColor,
      },
      title: {
        marginVertical: textMarginVertical,
        fontSize: textFontSize,
        lineHeight: textLineHeight,
        fontWeight: textFontWeight,
        color: textColor,
      },
    };
  };

  private renderTitleElement = (style: TextStyle): TextElement => {
    const { title, titleStyle } = this.props;

    return (
      <Text
        key={1}
        style={[style, styles.title, titleStyle]}>
        {title}
      </Text>
    );
  };

  private renderIconElement = (style: ImageStyle): IconElement => {
    const iconElement: React.ReactElement<ImageProps> = this.props.icon(style);

    return React.cloneElement(iconElement, {
      key: 2,
      style: [style, styles.icon, iconElement.props.style],
    });
  };

  private renderComponentChildren = (style: StyleType): React.ReactNodeArray => {
    const { title, icon } = this.props;

    return [
      icon && this.renderIconElement(style.icon),
      isValidString(title) && this.renderTitleElement(style.title),
    ];
  };

  public render(): React.ReactElement<TouchableOpacityProps> {
    const { themedStyle, style, ...derivedProps } = this.props;
    const { container, ...componentStyles } = this.getComponentStyle(themedStyle);

    const [iconElement, titleElement] = this.renderComponentChildren(componentStyles);

    return (
      <TouchableOpacity
        activeOpacity={1.0}
        {...derivedProps}
        style={[container, styles.container, style]}
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
  title: {},
});

export const Tab = styled<TabProps>(TabComponent);

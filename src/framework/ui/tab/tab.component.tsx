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
type IconProp = (style: StyleType) => React.ReactElement<ImageProps>;
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

/**
 * The `Tab` component is a part of TabBar or TabView component.
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
 * @property {boolean} selected - Determines whether selected tab or not.
 *
 * @property {(selected: boolean) => void} onSelect = Fires on onSelect event.
 *
 * @property TouchableOpacityProps
 *
 * @property StyledComponentProps
 *
 * @example Tab simple usage example
 *
 * ```
 * import { Tab } from '@kitten/ui';
 *
 * <Tab
 *   title='Tab'
 *   selected={false}
 * />
 * ```
 *
 * @example Inline styling and API example
 *
 * ```
 * import { Tab } from '@kitten/ui';
 *
 * <Tab
 *   title='Tab'
 *   titleStyle={styles.tabTitle}
 *   icon={(style: StyleType) => <Image source={{ uri: ... }} style={style}/>}
 *   selected={false}
 * />
 * ```
 * */

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
    const { style, titleStyle } = this.props;

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
      container: {
        ...containerParameters,
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
      title: {
        marginVertical: textMarginVertical,
        fontSize: textFontSize,
        lineHeight: textLineHeight,
        fontWeight: textFontWeight,
        color: textColor,
        ...styles.title,
        ...StyleSheet.flatten(titleStyle),
      },
    };
  };

  private renderTitleElement = (style: StyleType): TitleElement => {
    const { title: text } = this.props;

    return (
      <Text
        key={1}
        style={style}>
        {text}
      </Text>
    );
  };

  private renderIconElement = (style: StyleType): IconElement => {
    const { icon } = this.props;

    const iconElement: React.ReactElement<ImageProps> = icon(style);

    return React.cloneElement(iconElement, {
      key: 2,
      style: [style, iconElement.props.style],
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
    const { themedStyle, ...derivedProps } = this.props;
    const { container, ...componentStyles } = this.getComponentStyle(themedStyle);

    const [iconElement, titleElement] = this.renderComponentChildren(componentStyles);

    return (
      <TouchableOpacity
        activeOpacity={1.0}
        {...derivedProps}
        style={container}
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

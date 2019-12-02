/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  ImageStyle,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
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
import { IconElement } from '../icon/icon.component';
import { isValidString } from '../support/services';

type IconProp = (style: ImageStyle) => IconElement;

interface ComponentProps {
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  icon?: IconProp;
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
}

export type BottomNavigationTabProps = StyledComponentProps & TouchableOpacityProps & ComponentProps;
export type BottomNavigationTabElement = React.ReactElement<BottomNavigationTabProps>;

/**
 * `BottomNavigationTab` component is a part of the `BottomNavigation` component.
 * `BottomNavigation` tabs should be wrapped in BottomNavigation to provide usable component.
 * See usage examples at `BottomNavigation` component documentation.
 *
 * @extends React.Component
 *
 * @property {boolean} selected - Determines whether component is selected.
 *
 * @property {string} title - Determines the title of the tab.
 *
 * @property {StyleProp<TextStyle>} titleStyle - Customizes title style.
 *
 * @property {(style: ImageStyle) => ReactElement} icon - Determines the icon of the tab.
 *
 * @property {(selected: boolean) => void} onSelect - Triggered on select value.
 *
 * @property {TouchableOpacityProps} ...TouchableOpacityProps - Any props applied to TouchableOpacity component.
 *
 * @overview-example BottomNavigationTabSimpleUsage
 *
 * @overview-example BottomNavigationTabWithIcon
 *
 * @example BottomNavigationTabInlineStyling
 */
export class BottomNavigationTabComponent extends React.Component<BottomNavigationTabProps> {

  static styledComponentName: string = 'BottomNavigationTab';

  private onPress = (): void => {
    if (this.props.onSelect) {
      this.props.onSelect(!this.props.selected);
    }
  };

  private getComponentStyle = (source: StyleType): StyleType => {
    const {
      iconWidth,
      iconHeight,
      iconMarginVertical,
      iconTintColor,
      textMarginVertical,
      textFontFamily,
      textFontSize,
      textLineHeight,
      textFontWeight,
      textColor,
      ...containerParameters
    } = source;

    return {
      container: containerParameters,
      text: {
        marginVertical: textMarginVertical,
        fontFamily: textFontFamily,
        fontSize: textFontSize,
        lineHeight: textLineHeight,
        fontWeight: textFontWeight,
        color: textColor,
      },
      icon: {
        width: iconWidth,
        height: iconHeight,
        marginVertical: iconMarginVertical,
        tintColor: iconTintColor,
      },
    };
  };

  private renderIconElement = (style: ImageStyle): IconElement => {
    const iconElement: IconElement = this.props.icon(style);

    return React.cloneElement(iconElement, {
      key: 1,
      style: [style, styles.icon, iconElement.props.style],
    });
  };

  private renderTitleElement = (style: TextStyle): TextElement => {
    const { title, titleStyle } = this.props;

    return (
      <Text
        key={2}
        style={[style, styles.text, titleStyle]}>
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

  public render(): React.ReactElement<TouchableOpacityProps> {
    const { style, themedStyle, ...restProps } = this.props;
    const { container, ...componentStyles } = this.getComponentStyle(themedStyle);
    const [iconElement, titleElement] = this.renderComponentChildren(componentStyles);

    return (
      <TouchableOpacity
        activeOpacity={1.0}
        {...restProps}
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
  text: {},
  icon: {},
});

export const BottomNavigationTab = styled<BottomNavigationTabProps>(BottomNavigationTabComponent);

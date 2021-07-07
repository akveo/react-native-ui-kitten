/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  ImageProps,
  NativeSyntheticEvent,
  StyleSheet,
  TargetedEvent,
} from 'react-native';
import {
  FalsyFC,
  FalsyText,
  RenderProp,
  TouchableWeb,
  TouchableWebElement,
  TouchableWebProps,
  Overwrite,
  LiteralUnion,
} from '../../devsupport';
import {
  Interaction,
  styled,
  StyledComponentProps,
  StyleType,
} from '../../theme';
import { TextProps } from '../text/text.component';

type BottomNavigationTabStyledProps = Overwrite<StyledComponentProps, {
  appearance?: LiteralUnion<'default' | string>;
}>;

export interface BottomNavigationTabProps extends TouchableWebProps, BottomNavigationTabStyledProps {
  title?: RenderProp<TextProps> | React.ReactText;
  icon?: RenderProp<Partial<ImageProps>>;
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
}

export type BottomNavigationTabElement = React.ReactElement<BottomNavigationTabProps>;

/**
 * A single tab within the BottomNavigation.
 * Bottom tabs should be rendered within BottomNavigation to provide a usable navigation component.
 *
 * @extends React.Component
 *
 * @property {ReactText | ReactElement | (TextProps) => ReactElement} title - String, number or a function component
 * to render within the tab.
 * If it is a function, expected to return a Text.
 *
 * @property {ReactElement | (ImageProps) => ReactElement} icon - Function component
 * to render within the tab.
 * Expected to return an Image.
 *
 * @property {TouchableOpacityProps} ...TouchableOpacityProps - Any props applied to TouchableOpacity component.
 *
 * @overview-example BottomNavigationTabSimpleUsage
 */

@styled('BottomNavigationTab')
export class BottomNavigationTab extends React.Component<BottomNavigationTabProps> {

  private onMouseEnter = (event: NativeSyntheticEvent<TargetedEvent>): void => {
    this.props.eva.dispatch([Interaction.HOVER]);
    this.props.onMouseEnter && this.props.onMouseEnter(event);
  };

  private onMouseLeave = (event: NativeSyntheticEvent<TargetedEvent>): void => {
    this.props.eva.dispatch([]);
    this.props.onMouseLeave && this.props.onMouseLeave(event);
  };

  private onPress = (): void => {
    this.props.onSelect && this.props.onSelect(!this.props.selected);
  };

  private getComponentStyle = (source: StyleType) => {
    const {
      iconWidth,
      iconHeight,
      iconMarginVertical,
      iconTintColor,
      textMarginVertical,
      textFontFamily,
      textFontSize,
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

  public render(): TouchableWebElement {
    const { eva, style, title, icon, ...touchableProps } = this.props;
    const evaStyle = this.getComponentStyle(eva.style);

    return (
      <TouchableWeb
        {...touchableProps}
        style={[evaStyle.container, styles.container, style]}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onPress={this.onPress}>
        <FalsyFC
          style={evaStyle.icon}
          component={icon}
        />
        <FalsyText
          style={evaStyle.text}
          component={title}
        />
      </TouchableWeb>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

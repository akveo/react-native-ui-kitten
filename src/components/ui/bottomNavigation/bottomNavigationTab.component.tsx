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
import { Overwrite } from 'utility-types';
import {
  FalsyFC,
  FalsyText,
  RenderProp,
  TouchableWeb,
  TouchableWebElement,
  TouchableWebProps,
} from '../../devsupport';
import {
  Interaction,
  styled,
  StyledComponentProps,
  StyleType,
} from '../../theme';
import { TextProps } from '../text/text.component';

type BottomNavigationTabStyledProps = Overwrite<StyledComponentProps, {
  appearance?: 'default' | string;
}>;

export interface BottomNavigationTabProps extends TouchableWebProps, BottomNavigationTabStyledProps {
  title?: RenderProp<TextProps> | React.ReactText;
  icon?: RenderProp<Partial<ImageProps>>;
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
}

export type BottomNavigationTabElement = React.ReactElement<BottomNavigationTabProps>;

/**
 * `BottomNavigationTab` component is a part of the `BottomNavigation`.
 * Bottom Navigation tabs should be wrapped in BottomNavigation to provide a usable component.
 *
 * @extends React.Component
 *
 * @property {string | (props: TextProps) => ReactElement} title - A string or a function component
 * to render within the tab.
 * If it is a function, it will be called with props provided by Eva.
 * Otherwise, renders a Text styled by Eva.
 *
 * @property {string | (props: ImageProps) => ReactElement} icon - A function component
 * to render within the tab.
 * Called with props provided by Eva.
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

  private onMouseEnter = (e: NativeSyntheticEvent<TargetedEvent>): void => {
    this.props.eva.dispatch([Interaction.HOVER]);

    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(e);
    }
  };

  private onMouseLeave = (e: NativeSyntheticEvent<TargetedEvent>): void => {
    this.props.eva.dispatch([]);

    if (this.props.onMouseLeave) {
      this.props.onMouseEnter(e);
    }
  };

  private onPress = (): void => {
    if (this.props.onSelect) {
      this.props.onSelect(!this.props.selected);
    }
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

export const BottomNavigationTab = styled<BottomNavigationTabProps>(BottomNavigationTabComponent);
